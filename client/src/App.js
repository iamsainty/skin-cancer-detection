import React, { useState } from "react";
import axios from "axios";

function App() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post("http://127.0.0.1:5000/predict", formData);
      setResult(res.data.prediction);
    } catch (err) {
      console.error(err);
      setResult("Error occurred");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Skin Cancer Detection</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Check</button>
      {result !== null && <h2>Prediction: {result}% chance of skin cancer</h2>}
    </div>
  );
}

export default App;
