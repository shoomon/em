from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import torch.nn.functional as F
import pickle

class EmotionDetectionService:
    def __init__(self, model_path: str):
        with open(model_path + "/label_encoder.pkl", "rb") as f:
            data = pickle.load(f)
            self.label_list = data.classes_.tolist()
        self.tokenizer = AutoTokenizer.from_pretrained(model_path)
        self.model = AutoModelForSequenceClassification.from_pretrained(model_path)
        self.model.eval()

    def predict(self, text: str):
        text = text.replace("\n", " ").replace("\r", " ")
        inputs = self.tokenizer(text, return_tensors="pt").to(self.model.device)
        with torch.no_grad():
            logits = self.model(**inputs).logits
            probs = F.softmax(logits, dim=-1).squeeze().tolist()

        pred_idx = torch.argmax(logits).item()
        return {
            "label": self.label_list[pred_idx],
            "confidence": probs[pred_idx],
            "all_probs": dict(zip(self.label_list, probs))
        }