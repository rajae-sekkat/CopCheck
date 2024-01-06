from flask import Flask, jsonify, request
import mysql.connector
import face_recognition
import cv2
import numpy as np
import base64
from flask_cors import CORS
import traceback

app = Flask(__name__)
CORS(app)

@app.route('/')
def welcome():
    return "Welcome to CopCheck!"

@app.route('/person', methods=['POST', 'GET'])
def get_person_info():
    try:
        if 'image' not in request.files:
            return jsonify({"error": "No 'image' file provided in the request."}), 400

        image_file = request.files['image']
        image_file = request.files.get('image')

        if image_file.filename == '':
            return jsonify({"error": "'image' file is empty."}), 400

        allowed_extensions = {'jpg', 'jpeg', 'png', 'gif'}
        if '.' in image_file.filename and image_file.filename.rsplit('.', 1)[1].lower() not in allowed_extensions:
            return jsonify({"error": "Invalid file extension for 'image' file."}), 400

        img = cv2.imdecode(np.frombuffer(image_file.read(), np.uint8), cv2.IMREAD_COLOR)
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        encode = face_recognition.face_encodings(img)[0]

        mydb = mysql.connector.connect(
            host="localhost",
            user="root",
            password="",
            database="co"
        )

        mycursor = mydb.cursor()
        mycursor.execute("SELECT id, image FROM faces")
        db_data = mycursor.fetchall()

        matched_id = None
        match_found = False

        for row in db_data:
            _, image_data = row
            nparr = np.frombuffer(image_data, np.uint8)
            db_img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            db_img = cv2.cvtColor(db_img, cv2.COLOR_BGR2RGB)
            db_encode = face_recognition.face_encodings(db_img)[0]
            results = face_recognition.compare_faces([db_encode], encode)

            if results[0]:
                matched_id = row[0]
                match_found = True
                break  # Stop iteration if a match is found

        if match_found:
            query = "SELECT id, name, adress, profession ,identity ,  city , age, description FROM faces WHERE id = %s"
            mycursor.execute(query, (matched_id,))
            person_data = mycursor.fetchone()

            query = "SELECT image FROM faces WHERE id = %s"
            mycursor.execute(query, (matched_id,))
            image_data = mycursor.fetchone()[0]

            encoded_image = base64.b64encode(image_data).decode('utf-8')

            mydb.close()

            if person_data:
                person_info = {
                    "ID": person_data[0],
                    "Name": person_data[1],
                    "Profession": person_data[2],
                    "Idetity Card": person_data[3],
                    "Address": person_data[4],
                    "City": person_data[5],
                    "Age": person_data[6],
                    "Description": person_data[7],
                    "Image": encoded_image
                }
                return jsonify(person_info)
            else:
                return jsonify({"message": "Person not found."}), 404
        else:
            return jsonify({"message": "No match found."}), 404

    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='192.168.180.126', port=5000, debug=True)
