#!/usr/bin/env python3
"""
通过 GitHub API 把本地某个已提交 commit 的完整变动（含新增/修改/删除）
同步到远端 main 分支。用于 git push 协议走不通的场景。

与原仓库 publish-api.py 的区别：支持删除文件、支持从 commit 自动推导变动。

用法：
    python publish-api-sync.py                          # 推送本地最后一个提交(HEAD)
    python publish-api-sync.py --commit HEAD~1          # 指定某个提交
    python publish-api-sync.py -m "自定义说明"          # 自定义提交说明

认证（二选一）：
    1) 设环境变量 GH_TOKEN 为你的 Personal Access Token
    2) 或先在 git credential manager 里保存 GitHub 凭据

注意：API 推送会在远端生成一个新 sha 的提交。推送后需同步本地：
    git fetch origin && git reset --hard origin/main
"""
from __future__ import annotations

import argparse
import base64
import json
import os
import subprocess
import urllib.error
import urllib.request
from pathlib import Path

REPO = "Moyufan/blog"
BRANCH = "main"
API = f"https://api.github.com/repos/{REPO}"
DEFAULT_REPO_DIR = r"E:\blog"

TOKEN = ""


def get_token() -> str:
    token = os.environ.get("GH_TOKEN", "").strip()
    if token:
        return token
    try:
        result = subprocess.run(
            ["git", "credential", "fill"],
            input="protocol=https\nhost=github.com\n\n",
            capture_output=True,
            text=True,
            check=True,
        )
    except (OSError, subprocess.CalledProcessError) as exc:
        raise SystemExit(f"读取 Git 凭据失败：{exc}")
    for line in result.stdout.splitlines():
        if line.startswith("password="):
            return line.split("=", 1)[1].strip()
    raise SystemExit(
        "没找到 GitHub token。请设 GH_TOKEN 环境变量，或先在本机登录 Git。"
    )


def api(method: str, path: str, payload=None):
    data = None
    headers = {
        "Authorization": f"Bearer {TOKEN}",
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "blog-api-sync",
    }
    if payload is not None:
        data = json.dumps(payload).encode("utf-8")
        headers["Content-Type"] = "application/json"
    request = urllib.request.Request(API + path, data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(request, timeout=180) as response:
            body = response.read().decode("utf-8")
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")
        raise SystemExit(f"API 请求失败 {method} {path}: HTTP {exc.code}\n{detail[:500]}")
    except urllib.error.URLError as exc:
        raise SystemExit(f"网络请求失败：{exc}")
    return json.loads(body) if body else {}


def git(repo_dir: Path, *args: str) -> str:
    result = subprocess.run(
        ["git", "-C", str(repo_dir), *args],
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
        check=True,
    )
    return result.stdout.strip()


def main() -> None:
    global TOKEN

    parser = argparse.ArgumentParser(description="通过 GitHub API 同步本地 commit 的完整变动")
    parser.add_argument("--repo-dir", default=DEFAULT_REPO_DIR, help="本地仓库目录")
    parser.add_argument("--commit", default="HEAD", help="要推送的本地提交，默认 HEAD")
    parser.add_argument("-m", "--message", default=None, help="提交说明，默认取原 commit 的标题")
    args = parser.parse_args()

    repo_dir = Path(args.repo_dir)
    if not (repo_dir / ".git").exists():
        raise SystemExit(f"不是 git 仓库：{repo_dir}")

    TOKEN = get_token()

    # 1. 读取本地 commit 的变动列表（含删除）
    status_out = git(repo_dir, "diff", "--name-status", f"{args.commit}^", args.commit)
    changes = []
    for line in status_out.splitlines():
        if not line.strip():
            continue
        parts = line.split("\t")
        status = parts[0].strip()
        if status.startswith("R") or status.startswith("C"):
            # 重命名/复制：视为删旧 + 增新
            old_path, new_path = parts[1], parts[2]
            changes.append(("D", old_path))
            changes.append(("A", new_path))
        else:
            changes.append((status[0], parts[1]))

    if not changes:
        raise SystemExit("该提交没有文件变动。")

    # 提交说明默认取原 commit 标题
    message = args.message or git(repo_dir, "log", "-1", "--format=%s", args.commit)

    # 2. 获取远端 main 当前 ref / commit / tree
    ref = api("GET", f"/git/ref/heads/{BRANCH}")
    parent_sha = ref["object"]["sha"]
    parent_commit = api("GET", f"/git/commits/{parent_sha}")
    base_tree_sha = parent_commit["tree"]["sha"]

    # 3. 构建 tree entries：新增/修改上传 blob，删除用 sha=null
    entries = []
    for status, rel in changes:
        if status == "D":
            entries.append(
                {"path": Path(rel).as_posix(), "mode": "100644", "type": "blob", "sha": None}
            )
            print(f"删除  {rel}")
            continue

        local_path = repo_dir / rel
        if not local_path.is_file():
            raise SystemExit(f"文件不存在（无法作为新增/修改推送）：{local_path}")
        content = local_path.read_bytes()
        blob = api(
            "POST",
            "/git/blobs",
            {"content": base64.b64encode(content).decode("ascii"), "encoding": "base64"},
        )
        entries.append(
            {"path": Path(rel).as_posix(), "mode": "100644", "type": "blob", "sha": blob["sha"]}
        )
        print(f"上传  {rel} ({len(content) / 1024:.0f} KB)")

    # 4. 生成新 tree / commit / 更新 ref
    tree = api("POST", "/git/trees", {"base_tree": base_tree_sha, "tree": entries})
    commit = api(
        "POST",
        "/git/commits",
        {"message": message, "parents": [parent_sha], "tree": tree["sha"]},
    )
    api("PATCH", f"/git/refs/heads/{BRANCH}", {"sha": commit["sha"], "force": False})

    print(f"\n提交成功：https://github.com/{REPO}/commit/{commit['sha']}")
    print("提示：API 推送生成了新 sha，本地请同步：")
    print("  git fetch origin && git reset --hard origin/main")


if __name__ == "__main__":
    main()
