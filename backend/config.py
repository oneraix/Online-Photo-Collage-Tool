import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    UPLOAD_FOLDER = 'temp/uploads'
    COLLAGE_FOLDER = 'static/collages'
    CELERY_BROKER_URL = 'redis://localhost:6379/0'
    CELERY_RESULT_BACKEND = 'redis://localhost:6379/0'

    S3_BUCKET = 'my-collage-bucket'
    S3_REGION = 'ap-southeast-2'
    S3_ACCESS_KEY = os.getenv('AWS_ACCESS_KEY_ID')
    S3_SECRET_KEY = os.getenv('AWS_SECRET_ACCESS_KEY')
    COLLAGE_URL_PREFIX = f'https://{S3_BUCKET}.s3.{S3_REGION}.amazonaws.com/'

    CELERY_BROKER_URL = 'redis://localhost:6379/0'
    CELERY_RESULT_BACKEND = 'redis://localhost:6379/0'