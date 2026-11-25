#!/usr/bin/env python3
"""
用 GitHub API 把本地文件提交到 Moyufan/blog 的 main 分支。
本地 git 协议连不上 GitHub 时用它。

用法（在 D:\blog 目录下运行）：
  python publish-api.py 文件路径 [文件路径...] -m "提交说明"

示例：
  python publish-api.py public/sponsor/wechat.png src/config.ts -m "更新收款码"
  python publish-api.py src/content/blog/my-post.md -m "发布新文章"

认证：
  优先用环境变量 GH_TOKEN；没有则从 git credential-manager 读取已保存的凭据。
  不需要安装第三方库，用 Python 自带的 urllib 即可。
"""
from __future__ import annotations

import argparse
import base64
import json
import os
import subprocess
import sys
import urllib.error
import urllib.request
from pathlib import Path

REPO = "Moyufan/blog"
BRANCH = "main"
ROOT = Path(__file__).resolve().parent
API = f"https://api.github.com/repos/{REPO}"

TOKEN = ""


def get_token() -> str:
    """优先读环境变量，其次读 git credential-manager 里保存的凭据。"""
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
    raise SystemExit("没找到 GitHub token。请设置 GH_TOKEN，或先在本机登录 Git。")


def api(method: str, path: str, payload=None):
    """调用 GitHub REST API，失败时打印错误详情。"""
    data = None
    headers = {
        "Authorization": f"Bearer {TOKEN}",
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "blog-api-publisher",
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


def main() -> None:
    global TOKEN

    parser = argparse.ArgumentParser(description="通过 GitHub API 提交文件到博客仓库")
    parser.add_argument("files", nargs="+", help="要提交的文件路径（相对 D:\\blog，支持中文和空格）")
    parser.add_argument("-m", "--message", default="chore: 通过 API 更新文件", help="提交说明")
    args = parser.parse_args()

    TOKEN = get_token()

    # 1. 读取当前 main 的 sha 和 tree
    ref = api("GET", f"/git/ref/heads/{BRANCH}")
    parent_sha = ref["object"]["sha"]
    parent_commit = api("GET", f"/git/commits/{parent_sha}")
    base_tree_sha = parent_commit["tree"]["sha"]

    # 2. 把每个本地文件传成 blob
    entries = []
    for rel in args.files:
        local_path = ROOT / rel
        if not local_path.is_file():
            raise SystemExit(f"文件不存在：{local_path}")
        content = local_path.read_bytes()
        blob = api(
            "POST",
            "/git/blobs",
            {
                "content": base64.b64encode(content).decode("ascii"),
                "encoding": "base64",
            },
        )
        repo_path = Path(rel).as_posix()
        entries.append(
            {"path": repo_path, "mode": "100644", "type": "blob", "sha": blob["sha"]}
        )
        print(f"已准备 {repo_path} ({len(content) / 1024:.0f} KB)")

    # 3. 基于当前 tree 生成新 tree
    tree = api("POST", "/git/trees", {"base_tree": base_tree_sha, "tree": entries})

    # 4. 创建提交，并把 main 指向它
    commit = api(
        "POST",
        "/git/commits",
        {
            "message": args.message,
            "parents": [parent_sha],
            "tree": tree["sha"],
        },
    )
    api("PATCH", f"/git/refs/heads/{BRANCH}", {"sha": commit["sha"], "force": False})

    print(f"\n提交成功：https://github.com/{REPO}/commit/{commit['sha']}")


if __name__ == "__main__":
    main()
