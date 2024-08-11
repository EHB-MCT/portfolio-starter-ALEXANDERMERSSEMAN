# Gebruik een officiële Node.js image als basis
FROM node:18-alpine

# Stel de werkdirectory in binnen de container
WORKDIR /usr/src/app

# Kopieer package.json en package-lock.json
COPY package*.json ./

# Installeer de npm dependencies
RUN npm install

# Kopieer de rest van de applicatie
COPY . .

# Stel de omgeving in (optioneel, maar handig)
ENV NODE_ENV=production

# Stel de poort in waarop de app draait
EXPOSE 3000

# Commando om de app te starten
CMD ["node", "app.js"]
