import cv2
import numpy as np
from tensorflow.keras.models import load_model

model = load_model("model/skin_cancer_model.h5")

def predict_image(image_path):
    img = cv2.imread(image_path)
    img = cv2.resize(img, (64, 64))
    img = img / 255.0
    img = np.expand_dims(img, axis=0)

    prediction = model.predict(img)
    classes = ['Benign', 'Malignant']
    predicted_class = classes[np.argmax(prediction)]

    print(f"Prediction: {predicted_class} ({np.max(prediction)*100:.2f}%)")
    return predicted_class

if _name_ == "_main_":
    import sys
    if len(sys.argv) < 2:
        print("Usage: python predict.py <image_path>")
    else:
        predict_image(sys.argv[1])