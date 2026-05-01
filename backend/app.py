from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle 
app = Flask(__name__)
CORS(app)

# model load (yahi rehna chhahiye)
with open("model.pkl", "rb") as f:
    model= pickle.load(f)

print("Model loaded successfully")

branches = [
    'AGRICULTURE',
    'APPLIED_BOTANY',
    'BOTANY',
    'BOTANY_CHEMISTRY',
    'BOTANY_ZOOLOGY',
    'CHEMISTRY',
    'COMPUTER_SCIENCE',
    'MATHS',
    'MATHS_CHEMISTRY',
    'PHYSICS',
    'PHYSICS_MATHS',
    'ZOOLOGY',
    'ZOOLOGY_CHEMISTRY'
]

courses = ['B.SC', 'B.TECH', 'M.SC', 'PH.D.']

#api route
@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    study_hours = float(data.get("studyHours", 0))
    selected_branch = data.get("branch", "")
    selected_course = data.get("course", "")

    # Branch encoding (correct index match)
    branch_features = [1 if selected_branch == b else 0 for b in branches]
    course_features = [1 if selected_course == c else 0 for c in courses]

    #final input (exact order)
    final_input = [study_hours] + branch_features + course_features
    print("Final Input:", final_input) # debugging line
    prediction = model.predict([final_input])[0]
    predictions = max(0, min(100, prediction))

    return jsonify({
        "prediction": str(predictions)
    })

if __name__ == "__main__":
    app.run(debug = True)
