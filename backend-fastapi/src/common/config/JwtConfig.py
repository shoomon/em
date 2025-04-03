from dotenv import load_dotenv
import os

load_dotenv()

JWT_SECRET = os.getenv("JWT_SECRET")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM")
SPRING_REISSUE_URL = os.getenv("SPRING_REISSUE_URL")
