FROM node

WORKDIR /app/delivery

COPY package.json .

RUN npm install

CMD ["npm", "start"]

COPY . .