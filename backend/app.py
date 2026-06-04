import os
from datetime import datetime, timedelta
from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app) 
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(BASE_DIR, 'standups.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

UPLOAD_FOLDER = os.path.join(BASE_DIR, 'uploads')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

db = SQLAlchemy(app)
class StandupPost(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    author = db.Column(db.String(100), nullable=False)
    yesterday = db.Column(db.Text, nullable=False)
    today = db.Column(db.Text, nullable=False)
    blockers = db.Column(db.Text, nullable=True)
    has_blocker = db.Column(db.Boolean, default=False)
    file_attachment = db.Column(db.String(255), nullable=True)
    temperature = db.Column(db.String(20), nullable=True)
    weather_condition = db.Column(db.Integer, nullable=True)
    
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "author": self.author,
            "yesterday": self.yesterday,
            "today": self.today,
            "blockers": self.blockers,
            "has_blocker": self.has_blocker,
            "file_attachment": self.file_attachment,
            "temperature": self.temperature,
            "weather_condition": self.weather_condition,
            "timestamp": self.timestamp.isoformat() + "Z" 
        }

with app.app_context():
    db.create_all()

@app.route('/', methods=['GET'])
def api_root():
    return jsonify({
        "status": "healthy",
        "message": "KonvergeSync Standup API Backend is running successfully!",
        "endpoints": {
            "get_posts": "/standups/ (GET)",
            "create_post": "/standups/ (POST)",
            "stats": "/standups/stats/ (GET)"
        }
    }), 200

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/standups/', methods=['GET', 'POST'])
def handle_standups():
    if request.method == 'GET':
        posts = StandupPost.query.order_by(StandupPost.timestamp.desc()).all()
        return jsonify([post.to_dict() for post in posts]), 200

    if request.method == 'POST':
        author = request.form.get('author')
        yesterday = request.form.get('yesterday')
        today = request.form.get('today')
        blockers = request.form.get('blockers', '')
        has_blocker = request.form.get('has_blocker') == 'true'
        temp = request.form.get('temperature')
        cond = request.form.get('weather_condition')

        if not all([author, yesterday, today]):
            return jsonify({"error": "Missing required fields"}), 400

        file_attachment = None
        if 'file' in request.files:
            file = request.files['file']
            if file.filename != '':
                filename = secure_filename(file.filename)
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                file_attachment = f"/uploads/{filename}"

        new_post = StandupPost(
            author=author,
            yesterday=yesterday,
            today=today,
            blockers=blockers,
            has_blocker=has_blocker,
            file_attachment=file_attachment,
            temperature=temp if temp else None,
            weather_condition=int(cond) if cond else None
        )
        db.session.add(new_post)
        db.session.commit()

        return jsonify(new_post.to_dict()), 201

@app.route('/standups/stats/', methods=['GET'])
def get_stats():
    today = datetime.utcnow().date()
    stats = []
    for i in range(6, -1, -1):
        target_date = today - timedelta(days=i)
        
        posts_that_day = StandupPost.query.filter(
            db.func.date(StandupPost.timestamp) == target_date
        ).all()

        stats.append({
            "date": target_date.strftime("%a"),
            "posts": len(posts_that_day),
            "blockers": sum(1 for p in posts_that_day if p.has_blocker)
        })

    return jsonify(stats), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)