from fastapi import FastAPI
from main.dummy.presentation.DummyController import dummyController
from main.music_recommendation.presentation.MusicRecommendationController import musicRecommendationController
app = FastAPI()
app.include_router(dummyController)
app.include_router(musicRecommendationController)

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
