FROM node

WORKDIR /app/user

COPY package.json .

RUN npm install

CMD ["npm", "start"]

COPY . .