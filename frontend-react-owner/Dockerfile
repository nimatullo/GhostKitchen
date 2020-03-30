FROM node

WORKDIR /app/owner

COPY package.json .

RUN npm install

CMD ["npm", "start"]

COPY . .