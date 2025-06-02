from flask import Blueprint, request, jsonify
import os
import uuid
from werkzeug.utils import secure_filename
from tasks import process_collage
from config import Config

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
    if task.state == 'SUCCESS':
        return jsonify({'status': 'DONE', 'collage_id': task.result})
    return jsonify({'status': task.state})

@collage_bp.route('/get-collage', methods=['GET'])
def get_collage():
    collage_path = request.args.get('id')
    return jsonify({'url': f'/{collage_path}'})
