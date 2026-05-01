import React, { useState } from "react";
import axios from "axios";
function StudentForm() {
  const [prediction, setPrediction] = useState("");  
  const [formData, setFormData] = useState({
    name: "",
    rollno: "",
    studyHours: "",
    branch: "",
    course: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData, 
        [name]: value,
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // validation
    if(
      !formData.name ||
      !formData.rollno ||
      !formData.studyHours || 
      !formData.branch ||
      !formData.course
    ){
      alert("Please fill all the fields");
      return;
    }
    try{
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        ...formData,
        studyHours: Number(formData.studyHours),
      });
      setPrediction(response.data.prediction);

      setFormData({
        name: "",
        rollno: "",
        studyHours: "",
        branch: "",
        course: "",
      });
    }catch(error){
      alert("Error connecting to backend");
    }
  }


  return (
    <div className="std_form">
      <h2>Student Prediction Form</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange}/>
        <input name="rollno" placeholder="Roll No" value={formData.rollno} onChange={handleChange}/>
        <input name="studyHours" placeholder="Study Hours"  value={formData.studyHours} onChange={handleChange}/>
        <select name="branch" value={formData.branch} onChange={handleChange}>
          <option value="">Select Branch</option>
          <option value="COMPUTER_SCIENCE">Computer Science</option>
          <option value="MATHS">Maths</option>
          <option value="PHYSICS">Physics</option>
          <option value="CHEMISTRY">Chemistry</option>
          <option value="BOTANY">Botany</option>
          <option value="ZOOLOGY">Zoology</option>
        </select>
        <select name="course" value={formData.course}
        onChange={handleChange}>
          <option value="">Select Course</option>
          <option value="B.TECH">B.Tech</option>
          <option value="B.SC">B.Sc</option>
          <option value="M.SC">M.Sc</option>
          <option value="PH.D.">Ph.D</option>
        </select>
        <div className="button">
          <button type="submit">Predict</button>
        </div>
      </form>
      {prediction && (
        <h3 className="prediction">Prediction: {Number(prediction).toFixed(2)}</h3>
      )}
    </div>
  );
}
export default StudentForm;
