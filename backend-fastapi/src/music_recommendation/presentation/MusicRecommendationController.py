from fastapi import APIRouter, HTTPException
import numpy as np
import uuid
from qdrant_client.models import PointStruct, PointIdsList
from pydantic import BaseModel
from src.common.config.QdrantConfig import qdrantClient, COLLECTION_NAME
from src.common.EmotionLabels import EMOTIONS
from src.music_recommendation.util.VectorUtil import VectorUtil

musicRecommendationController = APIRouter(
    prefix="/recommendation",
    tags=["recommendation"]
)

VECTOR_DIM = len(EMOTIONS)

#todo: key는 해시기반 UUID로 변환
class UpsertSongRequest(BaseModel):
    key: str
    title: str
    artistName: str
    spotifyAlbumUrl: str
    albumImageUrl: str
    emotion: str

class EmotionCountRequest(BaseModel):
    emotion_counts: dict

@musicRecommendationController.delete("/song/{key}")
def delete_song(key: str):
    try:
        result = qdrantClient.retrieve(collection_name=COLLECTION_NAME, ids=[key])
        if not result:
            raise HTTPException(status_code=404, detail="음악을 찾을 수 없습니다.")

        qdrantClient.delete(
            collection_name=COLLECTION_NAME,
            points_selector=PointIdsList(points=[key])
        )
        return {"message": f"key={key} 삭제 완료"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@musicRecommendationController.post("/upsert")
def upsert_song(req: UpsertSongRequest):
    if req.emotion not in EMOTIONS:
        raise HTTPException(status_code=400, detail="유효하지 않은 감정입니다.")

    emotion_index = EMOTIONS.index(req.emotion)
    result = qdrantClient.retrieve(COLLECTION_NAME, [req.key], with_vectors=True)

    if not result:
        vector = VectorUtil.smooth_one_hot(emotion_index, len(result), 0.02)
        add_song(req,vector)
        return

    old_vector = np.array(result[0].vector)
    count = result[0].payload.get("update_count", 1)
    new_vector = VectorUtil.update_music_vector_by_emotion(old_vector, emotion_index, count)

    qdrantClient.upsert(
        collection_name=COLLECTION_NAME,
        points=[PointStruct(
            id=req.key,
            vector=new_vector.tolist(),
            payload={
                "title": result[0].payload["title"],
                "artistName": result[0].payload["artistName"],
                "spotifyAlbumUrl": result[0].payload["spotifyAlbumUrl"],
                "albumImageUrl": result[0].payload["albumImageUrl"],
                "update_count": count + 1
            }
        )]
    )
    return {"message": f"감정 '{req.emotion}' 반영됨 → {result[0].payload['title']}"}

@musicRecommendationController.get("/info")
def get_data_list(offset: int=0, limit: int=100):
    vectors = []

    scroll_result = qdrantClient.scroll(
        collection_name=COLLECTION_NAME,
        offset=offset,
        limit=limit,
        with_payload=True,
        with_vectors=True
    )

    for point in scroll_result[0]:
        vectors.append({
            "id": point.id,
            "title": point.payload.get("title"),
            "artistName": point.payload.get("artistName"),
            "spotifyAlbumUrl": point.payload.get("spotifyAlbumUrl"),
            "albumImageUrl": point.payload.get("albumImageUrl"),
            "update_count": point.payload.get("update_count", 0),
            "vector": point.vector
        })

    return vectors

@musicRecommendationController.post("/my")
def recommend_music(req: EmotionCountRequest):
    vec = np.array([req.emotion_counts.get(em, 0) for em in EMOTIONS], dtype=np.float32)
    if vec.sum() == 0:
        raise HTTPException(status_code=400, detail="감정 통계가 비어 있습니다.")
    normalized_vec = vec / vec.sum()

    results = qdrantClient.search(
        collection_name=COLLECTION_NAME,
        query_vector=normalized_vec.tolist(),
        limit=20
    )

    return {
        "recommendations": [
            {
                "title": res.payload["title"],
                "artistName": res.payload["artistName"],
                "spotifyAlbumUrl": res.payload["spotifyAlbumUrl"],
                "albumImageUrl": res.payload["albumImageUrl"],
                "score": round(res.score, 3)
            }
            for res in results
        ]
    }

def add_song(req: UpsertSongRequest, vector):
    if len(vector) != VECTOR_DIM:
        raise HTTPException(status_code=400, detail="벡터 차원이 맞지 않습니다.")

    qdrantClient.upsert(
        collection_name=COLLECTION_NAME,
        points=[PointStruct(
            id=req.key,
            vector=vector,
            payload={
                "title": req.title,
                "artistName": req.artistName,
                "spotifyAlbumUrl": req.spotifyAlbumUrl,
                "albumImageUrl": req.albumImageUrl,
                "update_count": 1
            }
        )]
    )
    return {"message": f"등록 완료: {req.title}"}