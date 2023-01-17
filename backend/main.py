from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from handlers import get_downloadable_contents

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def main_page():
    return {"message": "Hello World"}


@app.post("/videos")
def extract_videos(video_url: str):
    if not video_url:
        raise HTTPException(400, "Video URL is required")
    return get_downloadable_contents(video_url)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", reload=True)
