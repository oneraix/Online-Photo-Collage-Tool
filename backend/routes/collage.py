from flask import Blueprint, request, jsonify, send_file, redirect
import os
import uuid
from werkzeug.utils import secure_filename
from tasks import process_collage
from config import Config
from io import BytesIO


collage_bp = Blueprint('collage', __name__)

@collage_bp.route('/create-task', methods=['POST'])
def create_task():
    images = request.files.getlist('images')
    print(f"[DEBUG] Uploaded images: {[img.filename for img in images]}")
    mode = request.form.get('mode', 'horizontal')
    border_size = int(request.form.get('border_size', 0))
    border_color = request.form.get('border_color', '#000000')

    image_paths = []
    for img in images:
        filename = f"{uuid.uuid4().hex}_{secure_filename(img.filename)}"
        filepath = os.path.join(Config.UPLOAD_FOLDER, filename)
        img.save(filepath)
        image_paths.append(filepath)

    task = process_collage.delay(image_paths, mode, border_size, border_color)
    return jsonify({'task_id': task.id})

@collage_bp.route('/check-status', methods=['GET'])
def check_status():
    task_id = request.args.get('id')
    task = process_collage.AsyncResult(task_id)
    return jsonify({'status': task.state})


@collage_bp.route('/get-collage', methods=['GET'])
def get_collage():
    task_id = request.args.get('id')
    if not task_id:
        return jsonify({'error': 'Missing id parameter'}), 400

    task = process_collage.AsyncResult(task_id)
    if task.state != 'SUCCESS':
        return jsonify({'error': 'Collage not ready yet'}), 404

    collage_url = task.result
    return jsonify({'url': collage_url})


# @collage_bp.route('/download', methods=['GET'])
# def download_collage():
#     collage_url = request.args.get('url')
#     if not collage_url:
#         return jsonify({'error': 'Missing url parameter'}), 400

#     # Redirect thẳng tới S3 để trình duyệt tự tải file
#     return redirect(collage_url, code=302)