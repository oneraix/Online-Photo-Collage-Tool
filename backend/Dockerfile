FROM python:3.11-slim

WORKDIR /app

COPY backend/ .

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

CMD ["flask", "run", "--host=0.0.0.0"]
