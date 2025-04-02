from pydantic import BaseModel

class EmotionUpdateRequest(BaseModel):
    song_id: int
    emotion: str