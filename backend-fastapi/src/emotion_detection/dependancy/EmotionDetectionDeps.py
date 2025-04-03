from src.emotion_detection.application.EmotionDetectionService import EmotionDetectionService

emotionDetectionService = EmotionDetectionService('src/emotion_detection/ai_model')

def getEmotionDetectionService():
    return emotionDetectionService