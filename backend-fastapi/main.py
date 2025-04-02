from fastapi import FastAPI, APIRouter, HTTPException
from pydantic import BaseModel
from qdrant_client.models import Distance, VectorParams, PointStruct, PointIdsList
import numpy as np

from common import EMOTIONS, COLLECTION_NAME, client
from dummy import dummy_router

app = FastAPI()

# 설정
router = APIRouter(prefix="/recommend")
VECTOR_DIM = len(EMOTIONS)

app.include_router(dummy_router)
app.include_router(router)

# ----------------------------- #
# 초기화: 컬렉션 생성
@app.on_event("startup")
def init_collection():
    collections = [col.name for col in client.get_collections().collections]
    if COLLECTION_NAME in collections:
        client.delete_collection(collection_name=COLLECTION_NAME)

    client.recreate_collection(
        collection_name=COLLECTION_NAME,
        vectors_config=VectorParams(size=VECTOR_DIM, distance=Distance.COSINE)
    )
    print("Qdrant 컬렉션 초기화 완료")


# ----------------------------- #
# 벡터 도우미 함수

def smooth_one_hot(index: int, size: int, smooth_value: float = 0.02):
    vec = np.full(size, smooth_value)
    vec[index] = 1.0 - smooth_value * (size - 1)
    return vec


def update_music_vector_by_emotion(old_vector, selected_emotion_index, update_count, smooth_value=0.02):
    user_vec = smooth_one_hot(selected_emotion_index, len(old_vector), smooth_value)
    alpha = 1 / (update_count + 1)
    updated = (1 - alpha) * np.array(old_vector) + alpha * user_vec
    return updated


# ----------------------------- #
# 요청 바디 모델

class AddSongRequest(BaseModel):
    song_id: int
    title: str
    artistName: str
    spotifyAlbumUrl: str
    albumImageUrl: str
    vector: list[float]


class EmotionCountRequest(BaseModel):
    emotion_counts: dict


class EmotionUpdateRequest(BaseModel):
    song_id: int
    emotion: str


# ----------------------------- #
# API 엔드포인트

@app.post("/song")
def add_song(req: AddSongRequest):
    if len(req.vector) != VECTOR_DIM:
        raise HTTPException(status_code=400, detail="벡터 차원이 맞지 않습니다.")

    client.upsert(
        collection_name=COLLECTION_NAME,
        points=[PointStruct(
            id=req.song_id,
            vector=req.vector,
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

@app.delete("/song/{song_id}")
def delete_dummy_song(song_id: int):
    try:
        result = client.retrieve(collection_name=COLLECTION_NAME, ids=[song_id])
        if not result:
            raise HTTPException(status_code=404, detail=f"song_id={song_id}가 존재하지 않습니다.")

        client.delete(
            collection_name=COLLECTION_NAME,
            points_selector=PointIdsList(points=[song_id])
        )
        return {"message": f"song_id={song_id} 삭제 완료"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/update")
def apply_user_emotion(req: EmotionUpdateRequest):
    if req.emotion not in EMOTIONS:
        raise HTTPException(status_code=400, detail="유효하지 않은 감정입니다.")

    emotion_index = EMOTIONS.index(req.emotion)
    result = client.retrieve(COLLECTION_NAME, [req.song_id], with_vectors=True)

    if not result:
        raise HTTPException(status_code=404, detail="노래를 찾을 수 없습니다.")

    old_vector = np.array(result[0].vector)
    count = result[0].payload.get("update_count", 1)
    new_vector = update_music_vector_by_emotion(old_vector, emotion_index, count)

    client.upsert(
        collection_name=COLLECTION_NAME,
        points=[PointStruct(
            id=req.song_id,
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

@app.get("/info")
def get_data_list(offset: int=0, limit: int=100):
    vectors = []

    scroll_result = client.scroll(
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

@app.post("/my")
def recommend_music(req: EmotionCountRequest):
    vec = np.array([req.emotion_counts.get(em, 0) for em in EMOTIONS], dtype=np.float32)
    if vec.sum() == 0:
        raise HTTPException(status_code=400, detail="감정 통계가 비어 있습니다.")
    normalized_vec = vec / vec.sum()

    results = client.search(
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