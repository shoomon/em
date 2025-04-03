from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import Request, HTTPException

class JWTAuthMiddleware(BaseHTTPMiddleware):
    def __init__(self, app):
        super.__init__(app)