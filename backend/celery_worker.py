from celery import Celery
from config import Config

celery = Celery('collage_worker', broker=Config.CELERY_BROKER_URL)
celery.conf.update(result_backend=Config.CELERY_RESULT_BACKEND)

from tasks import * 
