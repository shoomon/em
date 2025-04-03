from fastapi import FastAPI
from src.dummy.presentation.DummyController import dummyController
from src.music_recommendation.presentation.MusicRecommendationController import musicRecommendationController
from src.emotion_detection.presentation.EmotionDetectionController import emotionDetectionController
app = FastAPI()
app.include_router(dummyController)
app.include_router(musicRecommendationController)
app.include_router(emotionDetectionController)

# ----------------------------- #
# 초기화: 컬렉션 생성
# @app.on_event("startup")
# def init_collection():
#     collections = [col.name for col in client.get_collections().collections]
#     if COLLECTION_NAME in collections:
#         client.delete_collection(collection_name=COLLECTION_NAME)
#
#     client.recreate_collection(
#         collection_name=COLLECTION_NAME,
#         vectors_config=VectorParams(size=VECTOR_DIM, distance=Distance.COSINE)
#     )
#     print("Qdrant 컬렉션 초기화 완료")
