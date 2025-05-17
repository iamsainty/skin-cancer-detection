import torch
from torchvision import transforms
from PIL import Image

# Load model
model_path = 'model/image_based_pytorch.pth'
model = torch.load(model_path, map_location=torch.device('cpu'))
model.eval()

# Preprocess image
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])

def predict(image_file):
    image = Image.open(image_file).convert('RGB')
    img_tensor = transform(image).unsqueeze(0)  # add batch dim

    with torch.no_grad():
        output = model(img_tensor)
        percentage = float(torch.sigmoid(output).item()) * 100  # convert to percentage

    return round(percentage, 2)
