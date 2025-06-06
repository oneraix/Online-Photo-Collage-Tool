import boto3
from config import Config  # cấu hình của bạn (chứa S3_BUCKET, AWS credentials, etc.)
from botocore.client import Config as BotoConfig

# S3 client với Signature Version 4
s3 = boto3.client(
    's3',
    region_name='ap-southeast-2',
    config=BotoConfig(signature_version='s3v4')
)

def upload_to_s3(file_path, key):
    with open(file_path, 'rb') as f:
        s3.upload_fileobj(
            f,
            Config.S3_BUCKET,
            key,
            ExtraArgs={'ContentType': 'image/jpeg'}  
        )

def generate_presigned_url(key, expiration=3600):
    return s3.generate_presigned_url(
        'get_object',
        Params={
            'Bucket': Config.S3_BUCKET,
            'Key': key,
            'ResponseContentDisposition': 'attachment; filename="collage.jpg"',
            'ResponseContentType': 'image/jpeg'
        },
        ExpiresIn=expiration
    )