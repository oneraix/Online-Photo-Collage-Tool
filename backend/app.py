from flask import Flask, send_from_directory
from config import Config
from flask_cors import CORS


def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(Config)

    from routes.collage import collage_bp
    app.register_blueprint(collage_bp, url_prefix='/api')

    # Thêm route phục vụ ảnh trong static/collages
    @app.route('/static/collages/<path:filename>')
    def serve_collage(filename):
        return send_from_directory('static/collages', filename)

    return app


# Cho flask run sử dụng
app = create_app()

# Cho phép chạy bằng python app.py
if __name__ == '__main__':
    app.run(debug=True)