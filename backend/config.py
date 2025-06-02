import os

class Config:
    UPLOAD_FOLDER = 'temp/uploads'
    COLLAGE_FOLDER = 'static/collages'
    CELERY_BROKER_URL = 'redis://localhost:6379/0'
    CELERY_RESULT_BACKEND = 'redis://localhost:6379/0'
