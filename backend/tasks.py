import os
from celery_worker import celery
from PIL import Image
from utils.image_utils import resize_images, add_border, merge_images

@celery.task(bind=True)
def process_collage(self, image_paths, mode, border_size, border_color):
    images = [Image.open(path) for path in image_paths]
    resized = resize_images(images, mode)
    bordered = [add_border(img, border_size, border_color) for img in resized]
    collage = merge_images(bordered, mode)

    output_path = f'static/collages/{self.request.id}.jpg'
    collage.save(output_path)
    return output_path
