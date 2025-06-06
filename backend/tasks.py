import os
import time
from celery_worker import celery
from PIL import Image
from utils.image_utils import resize_images, add_border, merge_images
from utils.s3_utils import upload_to_s3, generate_presigned_url

# @celery.task(bind=True)
# def process_collage(self, image_paths, mode, border_size, border_color):
#     images = [Image.open(path) for path in image_paths]
#     resized = resize_images(images, mode)
#     bordered = [add_border(img, border_size, border_color) for img in resized]
#     collage = merge_images(bordered, mode)

#     output_filename = f'static/collages/{self.request.id}.jpg'
#     collage.save(output_filename)
#     return output_filename 

@celery.task(bind=True)
def process_collage(self, image_paths, mode, border_size, border_color):
    from PIL import Image
    from utils.image_utils import resize_images, add_border, merge_images

    images = [Image.open(path) for path in image_paths]
    resized = resize_images(images, mode)
    bordered = [add_border(img, border_size, border_color) for img in resized]
    collage = merge_images(bordered, mode)

    local_path = f'temp/collages/{self.request.id}.jpg'
    collage.save(local_path)

    s3_key = f"collages/{self.request.id}.jpg"
    upload_to_s3(local_path, s3_key)
    s3_url = generate_presigned_url(s3_key)

    return s3_url



# TEMP_DIRS = ['temp/collages', 'temp/uploads']


# @celery.task
# def cleanup_temp_files(days_old=1):
#     cutoff = time.time() - days_old * 86400  

#     for dir_name in TEMP_DIRS:
#         for filename in os.listdir(dir_name):
#             filepath = os.path.join(dir_name, filename)
#             if os.path.isfile(filepath):
#                 if os.path.getmtime(filepath) < cutoff:
#                     try:
#                         os.remove(filepath)
#                         print(f"[CLEANUP] Removed {filepath}")
#                     except Exception as e:
#                         print(f"[CLEANUP] Error deleting {filepath}: {e}")