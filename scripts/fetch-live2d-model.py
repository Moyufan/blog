#!/usr/bin/env python3
"""
从 Cubism 官方样例仓库下载 Live2D 模型到 public/live2d/<模型名>/

用法（在项目根目录执行）：
    python scripts/fetch-live2d-model.py Hiyori
    python scripts/fetch-live2d-model.py Wanko Mao Rice

可用的官方样例（Cubism 3，均可被当前 cubism4 runtime 加载）：
    Haru    女性角色，2 张 2048 纹理，动作丰富
    Hiyori  经典看板娘，体型小，适合页面挂件
    Mao     女性角色，1 张纹理，较轻量
    Rice    小只可爱风，2 张纹理
    Mark    男性角色，1 张纹理
    Natori  男性和服角色，1 张纹理
    Wanko   小狗，最贴近"宠物"定位

注意：官方样例模型仅可用于个人非商业用途。商用需自行取得授权。
"""
from __future__ import annotations

import json
import os
import sys
import urllib.request

BASE = "https://cdn.jsdelivr.net/gh/Live2D/CubismWebSamples@develop/Samples/Resources"
ROOT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "live2d")

HEADERS = {"User-Agent": "Mozilla/5.0"}


def fetch(url: str) -> bytes:
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=120) as resp:
        return resp.read()


def collect_refs(node, out: list[str]) -> None:
    """递归收集 model3.json 里所有被引用的相对路径"""
    if isinstance(node, dict):
        for value in node.values():
            collect_refs(value, out)
    elif isinstance(node, list):
        for item in node:
            collect_refs(item, out)
    elif isinstance(node, str):
        low = node.lower()
        if low.endswith((".json", ".moc3", ".png", ".wav", ".ogg", ".mp3")):
            out.append(node)


def download_model(name: str) -> None:
    config_name = f"{name}.model3.json"
    config_url = f"{BASE}/{name}/{config_name}"
    print(f"[{name}] 拉取 {config_name} ...")
    try:
        raw = fetch(config_url)
    except Exception as exc:  # noqa: BLE001
        print(f"[{name}] 失败：{exc}")
        return

    config = json.loads(raw)
    refs: list[str] = [config_name]
    collect_refs(config, refs)
    # 去重且保持顺序
    seen, files = set(), []
    for item in refs:
        if item not in seen:
            seen.add(item)
            files.append(item)

    target_dir = os.path.join(ROOT, name)
    total = 0
    ok = 0
    for rel in files:
        dst = os.path.join(target_dir, *rel.split("/"))
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        try:
            data = fetch(f"{BASE}/{name}/{rel}")
            with open(dst, "wb") as fh:
                fh.write(data)
            total += len(data)
            ok += 1
            print(f"  {len(data)/1024:8.1f} KB  {rel}")
        except Exception as exc:  # noqa: BLE001
            print(f"  跳过（{exc}）  {rel}")

    print(f"[{name}] 完成：{ok}/{len(files)} 个文件，共 {total/1048576:.1f} MB\n")


def main() -> None:
    names = sys.argv[1:]
    if not names:
        print(__doc__)
        raise SystemExit(1)
    os.makedirs(ROOT, exist_ok=True)
    for name in names:
        download_model(name)


if __name__ == "__main__":
    main()
