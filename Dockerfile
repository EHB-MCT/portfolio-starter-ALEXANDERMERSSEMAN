# Stage 1: Build
FROM node:18-alpine AS builder

# Stel de werkdirectory in
WORKDIR /usr/src/app

# Kopieer package.json en package-lock.json naar de werkdirectory in de image
COPY package*.json ./

# Installeer alle npm dependencies
RUN npm install

# Kopieer de broncode naar de werkdirectory in de image
COPY . .

# Stage 2: Production
FROM node:18-alpine

# Kopieer alleen de production dependencies vanuit de build stage
COPY --from=builder /usr/src/app/package*.json ./
RUN npm install --only=production

# Kopieer de gebuilde applicatie en andere benodigde bestanden vanuit de build stage
COPY --from=builder /usr/src/app .

# Stel de omgeving in
ENV NODE_ENV=production

# Stel de poort in waarop de app draait
EXPOSE 3453

# Commando om de app te starten
CMD ["node", "app.js"]
