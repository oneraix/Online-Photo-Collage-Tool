from flask import Flask
from config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    from routes.collage import collage_bp
    app.register_blueprint(collage_bp, url_prefix='/api')

    return app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)
