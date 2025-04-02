EMOTIONS = ["기쁨", "슬픔", "분노", "두려움", "우울"]
COLLECTION_NAME = "music"

from qdrant_client import QdrantClient
client = QdrantClient(host="localhost", port=6333)
