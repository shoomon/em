from src.emotion_detection.application.EmotionDetectionService import getEmotionDetectionService

emotionDetectionService = None

def startUpEvent():
    global emotionDetectionService
    emotionDetectionService = getEmotionDetectionService()