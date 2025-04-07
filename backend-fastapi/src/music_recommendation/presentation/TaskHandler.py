import asyncio
from asyncio import Queue, Lock
from src.music_recommendation.presentation.MusicRecommendationController import upsert_song

task_queue = Queue()
processing_lock = Lock()

async def task_worker():
    while True:
        task = await task_queue.get()
        async with processing_lock:
            await upsert_song(task)
        task_queue.task_done()

