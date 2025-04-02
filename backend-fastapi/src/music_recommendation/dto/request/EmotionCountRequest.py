from pydantic import BaseModel

class EmotionCountRequest(BaseModel):
    emotion_counts: dict