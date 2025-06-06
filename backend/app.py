from flask import Flask
from config import Config
from flask_cors import CORS 
from flask import send_from_directory


def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(Config)

    from routes.collage import collage_bp
    app.register_blueprint(collage_bp, url_prefix='/api')

    #Thêm route phục vụ ảnh trong static/collages
    @app.route('/static/collages/<path:filename>')
    def serve_collage(filename):
        return send_from_directory('static/collages', filename)

    return app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)
