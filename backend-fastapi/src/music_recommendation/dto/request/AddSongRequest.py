from pydantic import BaseModel

class AddSongRequest(BaseModel):
    song_id: int
    title: str
    artistName: str
    spotifyAlbumUrl: str
    albumImageUrl: str
    vector: list[float]