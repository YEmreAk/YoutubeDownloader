from typing import Any

from models import Content, Video
from yt_dlp import YoutubeDL


def get_downloadable_contents(url: str) -> list[Video]:
    mp3_options = {
        'format': 'bestaudio/best',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
        'outtmpl': '%(playlist)s/%(playlist_index)s - %(title)s.%(ext)s',
        # 'playliststart': 1,
        # 'playlistend': 5,
    }
    best_options = {
        'format': 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]',
        'outtmpl': '%(playlist)s/%(playlist_index)s - %(title)s.%(ext)s',
        # 'playliststart': 1,
        # 'playlistend': 5,
    }
    with YoutubeDL(best_options) as ydl:
        videos = []
        info: Any = ydl.extract_info(url, download=False)
        if "entries" in info: entries = info["entries"]
        else: entries = [info]
        for entry in entries:
            contents = []
            formats = list(filter(lambda x: "filesize" in x and x["audio_channels"], entry["formats"]))
            for f in formats:
                contents.append(
                    Content(
                        filesize=f["filesize"] if "filesize" in f and f["filesize"] else f["filesize_approx"],
                        ext=f["ext"],
                        format_note=f["format_note"],
                        resolution=f["resolution"] if "resolution" in f else None,
                        url=f["url"],
                    )
                )
            videos.append(Video(filename=entry["title"], contents=contents))
        return videos
