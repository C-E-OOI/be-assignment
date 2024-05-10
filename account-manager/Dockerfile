FROM node:16-alpine
WORKDIR /app/account-manager

# Salin package.json dan tsconfig.json
COPY ./account-manager/package*.json ./
COPY ./account-manager/tsconfig.json ./

# Install dependencies
RUN npm install && npm install prisma -g && npm install typescript -g

# Salin kode sumber
COPY ./account-manager/src ./src

# Kompilasi TypeScript
RUN npm run build

# Salin schema Prisma
COPY ./prisma ./prisma
RUN npx prisma generate

# Salin file lainnya
COPY ./account-manager/ ./

CMD ["npm", "run", "dev"]