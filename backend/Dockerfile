FROM node:22-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

RUN DATABASE_URL=postgresql://user:password@localhost:5432/database yarn prisma generate

EXPOSE 5000

CMD ["yarn", "start"]
