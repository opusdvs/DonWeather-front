# Multi-stage build для Vue.js приложения с Vite

# Этап сборки
FROM node:20-alpine AS build

# Установка рабочей директории
WORKDIR /app

# Копирование файлов зависимостей
COPY package*.json ./

# Установка зависимостей
RUN npm ci

# Копирование исходного кода
COPY . .

# Сборка приложения
RUN npm run build

# Этап production
FROM nginx:alpine

# Копирование собранных файлов из этапа сборки
COPY --from=build /app/dist /usr/share/nginx/html

# Открытие порта 80
EXPOSE 80

# Запуск nginx
CMD ["nginx", "-g", "daemon off;"]