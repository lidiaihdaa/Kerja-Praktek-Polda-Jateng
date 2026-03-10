from flask import Flask, request, jsonify
from deepface import DeepFace
import os

app = Flask(__name__)

# Folder sementara untuk menyimpan foto yang sedang dicek
UPLOAD_FOLDER = 'temp_faces'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/verify', methods=['POST'])
def verify_face():
    try:
        # 1. Terima foto dari absen (webcam) dan ID User dari Laravel
        if 'image' not in request.files:
            return jsonify({"success": False, "message": "Tidak ada foto yang dikirim"}), 400
            
        file = request.files['image']
        user_id = request.form.get('user_id')
        
        # 2. Simpan foto dari webcam sementara
        temp_img_path = os.path.join(UPLOAD_FOLDER, f"temp_{user_id}.jpg")
        file.save(temp_img_path)

        # 3. Tentukan lokasi foto wajah asli (foto profil) yang ada di database Laravel
        # Catatan: Sesuaikan path ini dengan letak folder penyimpanan Laravel milikmu/Disa
        reference_img_path = f"../backend/storage/app/public/faces/user_{user_id}.jpg"

        if not os.path.exists(reference_img_path):
            os.remove(temp_img_path)
            return jsonify({"success": False, "message": "Foto profil referensi tidak ditemukan"}), 404

        # 4. PROSES SOFT COMPUTING: Pencocokan Wajah dengan Deep Learning
        # Kita menggunakan model 'ArcFace' atau 'Facenet' karena akurasinya sangat tinggi
        result = DeepFace.verify(
            img1_path=temp_img_path, 
            img2_path=reference_img_path, 
            model_name="ArcFace",
            enforce_detection=True # Memastikan benar-benar ada wajah di foto
        )

        # 5. Hapus foto sementara agar memori tetap bersih
        os.remove(temp_img_path)

        # 6. Kembalikan hasil ke Laravel
        if result["verified"]:
            return jsonify({
                "success": True, 
                "match": True, 
                "distance": result["distance"], # Semakin kecil jaraknya, semakin mirip
                "message": "Wajah Cocok!"
            }), 200
        else:
            return jsonify({
                "success": True, 
                "match": False, 
                "distance": result["distance"],
                "message": "Wajah TIDAK Cocok!"
            }), 200

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

if __name__ == '__main__':
    # Jalankan API AI di port 5000
    app.run(port=5000, debug=True)