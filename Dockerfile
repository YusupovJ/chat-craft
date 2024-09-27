# docker obraz 
FROM node:16

# docker directoria 
WORKDIR /api/craft-chat

# docker npm i -g yarn ustanovka yarn na container esli on net na obraze 
# RUN if [ ! -x "$(command -v yarn)" ]; then npm install -g yarn; fi
# esli vam ne nada proverat ustanovlen li yarn to vod kod tupa ustanovki
# RUN npm install -g yarn 

# docker copy pockage.js iz korna fila v container, RUN i commanda
COPY package.json ./

# docker install
RUN npm install

# docker copy na coren container
COPY . .

# docker start project
CMD ["npm", "run", "dev"]

# docker port 
EXPOSE 7777