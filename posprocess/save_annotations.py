import json
import os
import pandas as pd
from dotenv import load_dotenv

load_dotenv(os.path.join(".env"))

data_json_path = os.getenv("JSON_PATH")

with open(data_json_path, "r") as f:
    data_json = json.load(f)

df = pd.DataFrame.from_dict(data_json, orient="index")

df = df.reset_index().rename(columns={"index": "Filename"})
df = df.rename(columns={"blur": "blur / focus"})
df = df.rename(columns={"general_quality": "general perception"})

cols_to_blank = ["blur / focus", "brightness", "distance", "framing", "interference", "general perception", "discarded"]

df.loc[df["audited"] == False, cols_to_blank] = pd.NA

df_quality = df.drop(columns=["blur / focus", "brightness", "distance", "framing", "interference", "general perception", "audited"])
df_quality = df_quality.rename(columns={"discarded": "quality_label"})
df_quality = df_quality.replace({True: 0, False: 1})
df_quality["quality_label"] = df_quality["quality_label"].astype("Int64")

df = df.drop(columns=["audited", "discarded"])

pd.DataFrame.to_csv(df_quality, "quality_label.csv", index=False)
df.to_excel("annotations.ods", index=False)
