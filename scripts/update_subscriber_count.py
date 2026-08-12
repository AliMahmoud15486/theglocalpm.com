#!/usr/bin/env python3
"""Write the real Kit subscriber count into index.html.

Run by .github/workflows/subscriber-count.yml on a schedule. The count has
to come from Kit's API, which needs a secret key — that key cannot live in
the page, so the number is baked in at build time instead of fetched by the
browser.

Below MIN_TO_SHOW the badge is removed rather than shown: "7 PMs subscribed"
is worse social proof than none at all.

Usage:
    KIT_API_KEY=... python3 scripts/update_subscriber_count.py [--dry-run]
"""

import json
import os
import pathlib
import re
import sys
import urllib.error
import urllib.request

API = "https://api.kit.com/v4/subscribers?status=active&include_total_count=true"
PAGE = pathlib.Path(__file__).resolve().parent.parent / "index.html"
START = "<!-- SUBSCRIBER_BADGE_START -->"
END = "<!-- SUBSCRIBER_BADGE_END -->"

# Don't show the badge until the number helps rather than hurts.
MIN_TO_SHOW = 100


def fetch_count(api_key):
    req = urllib.request.Request(API, headers={
        "X-Kit-Api-Key": api_key,
        "Accept": "application/json",
    })
    with urllib.request.urlopen(req, timeout=30) as res:
        data = json.load(res)

    # Kit has moved this field between versions, so probe the plausible
    # locations and fail loudly rather than silently writing a wrong number.
    for path in (("pagination", "total_count"), ("total_count",), ("pagination", "total")):
        node = data
        for key in path:
            if not isinstance(node, dict) or key not in node:
                node = None
                break
            node = node[key]
        if isinstance(node, int):
            return node

    raise SystemExit(
        "Could not find a total count in the Kit response.\n"
        "Top-level keys: " + ", ".join(sorted(data)) + "\n"
        "pagination: " + json.dumps(data.get("pagination"), indent=2)
    )


def badge_html(count):
    # Round down to a clean figure so the number doesn't visibly twitch daily.
    shown = count - (count % 50) if count >= 200 else count
    return (
        f'{START}\n'
        f'    <div class="flex justify-center mb-6">\n'
        f'      <div class="bg-orange-50 border-2 border-[#1A1A1A] px-4 py-1 rounded-full font-bold text-xs flex items-center gap-2">\n'
        f'        <span class="material-symbols-outlined" style="font-size:18px; font-variation-settings:\'FILL\' 1;">groups</span>\n'
        f'        {shown:,}+ PMs subscribed\n'
        f'      </div>\n'
        f'    </div>\n'
        f'    {END}'
    )


def main():
    dry_run = "--dry-run" in sys.argv

    api_key = os.environ.get("KIT_API_KEY")
    if not api_key:
        raise SystemExit("KIT_API_KEY is not set.")

    try:
        count = fetch_count(api_key)
    except urllib.error.HTTPError as e:
        raise SystemExit(f"Kit API returned HTTP {e.code}: {e.read()[:300].decode('utf-8', 'replace')}")

    print(f"confirmed subscribers: {count}")
    print(f"threshold to display : {MIN_TO_SHOW}")

    html = PAGE.read_text(encoding="utf-8")
    if START not in html or END not in html:
        raise SystemExit(f"Badge markers missing from {PAGE.name}; nothing was changed.")

    replacement = badge_html(count) if count >= MIN_TO_SHOW else f"{START}\n    {END}"
    if count < MIN_TO_SHOW:
        print("below threshold -> badge hidden")

    updated = re.sub(
        re.escape(START) + r".*?" + re.escape(END),
        lambda _: replacement,
        html,
        flags=re.S,
    )

    if updated == html:
        print("no change")
        return

    if dry_run:
        print("--dry-run: not writing")
        return

    PAGE.write_text(updated, encoding="utf-8")
    print("index.html updated")


if __name__ == "__main__":
    main()
