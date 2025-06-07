FROM node:18-alpine

WORKDIR /app

COPY frontend/ .

RUN npm install

CMD ["npm", "run", "dev", "--", "--host"]

