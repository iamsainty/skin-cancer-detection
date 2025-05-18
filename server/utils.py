import torch
from PIL import Image
from torchvision import transforms
import timm
import torch.nn as nn

# ✅ Match the model structure saved in your .pth
class EfficientNetCustom(nn.Module):
    def __init__(self):
        super(EfficientNetCustom, self).__init__()
        self.model = timm.create_model('efficientnet_b0', pretrained=False, num_classes=0, global_pool='')
        self.pooling = nn.AdaptiveAvgPool2d(1)
        self.linear = nn.Linear(self.model.num_features, 1)

    def forward(self, x):
        x = self.model(x)
        x = self.pooling(x).flatten(1)
        x = self.linear(x)
        return x

# 🔥 Load model
model = EfficientNetCustom()

# Load .pth file
state_dict = torch.load('model/image_based_pytorch.pth', map_location=torch.device('cpu'))

# Remove "model." prefix from state_dict keys
new_state_dict = {k.replace('model.', ''): v for k, v in state_dict.items()}
model.load_state_dict(new_state_dict)
model.eval()

# 🧼 Transform image
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])

# 🧠 Predict
def predict(image_file):
    image = Image.open(image_file).convert('RGB')
    img_tensor = transform(image).unsqueeze(0)

    with torch.no_grad():
        output = model(img_tensor)
        percentage = float(torch.sigmoid(output).item()) * 100

    return round(percentage, 2)
