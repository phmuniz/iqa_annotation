import json
import os
from glob import glob
from dotenv import load_dotenv

load_dotenv(os.path.join(".env"))

imgs_path = glob(os.path.join(os.getenv("IMAGES_PATH"), "*png"))
data_json_path = os.getenv("JSON_PATH")

data = {}

for img in imgs_path:
    img_name = os.path.basename(img)

    data[img_name] = {
        "blur": 1,
        "brightness": 1,
        "distance": 1,
        "framing": 1,
        "interference": 1,
        "general_quality": 1,
        "discarded": False,
        "audited": False
    }

sorted_data = dict(
    sorted(data.items(), key=lambda item: int(item[0].replace(".png", "")))
)

with open(data_json_path, "w") as f:
    json.dump(sorted_data, f, indent=4)
