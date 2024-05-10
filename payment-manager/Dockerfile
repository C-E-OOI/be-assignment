FROM node:16-alpine
WORKDIR /app/payment-manager

# Salin package.json dan tsconfig.json
COPY ./payment-manager/package*.json ./
COPY ./payment-manager/tsconfig.json ./

# Install dependencies
RUN npm install && npm install prisma -g && npm install typescript -g

# Salin kode sumber
COPY ./payment-manager/src ./src

# Kompilasi TypeScript
RUN npm run build

# Salin schema Prisma
COPY ./prisma ./prisma
RUN npx prisma generate

# Salin file lainnya
COPY ./payment-manager/ ./

CMD ["npm", "run", "dev"]