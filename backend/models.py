from pydantic import BaseModel


class Content(BaseModel):

    ext: str
    filesize: int
    format_note: str
    resolution: str | None
    url: str


class Video(BaseModel):

    filename: str
    contents: list[Content]
