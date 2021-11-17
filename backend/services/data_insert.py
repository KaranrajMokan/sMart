import pymongo
import os
from dotenv import load_dotenv
load_dotenv('../.env')

pymongo_client=os.environ.get("PYMONGO_CLIENT")
import pandas as pd

df = pd.read_csv("flipkart_com-ecommerce_sample.csv")

db_client = pymongo.MongoClient(pymongo_client)
db = db_client['smartDB']
products = db['products']


count=0
for index, row in df.iterrows():
    if count>9717:
        categories = row['product_category_tree']
        categories = categories.split(" , ")
        image = row['image']
        if type(image) == str:
            image = image.split(", ")
        Dict = {
        "uniq_id" : row['uniq_id'],
        "product_url" : row['product_url'],
        "product_name" : row['product_name'],
        "product_categories" : categories,
        "pid" : row['pid'],
        "retail_price" : row['retail_price'],
        "discount_price" : row['discounted_price'],
        "image_url" : image,
        "description" : row['description'],
        "product_rating" : row['product_rating'] 
        }
        products.insert_one(Dict)
    count+=1
   
