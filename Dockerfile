# Stage1: Build frontend
FROM node:19 AS frontend-build
WORKDIR /usr/src
COPY frontend/ ./frontend/
RUN cd frontend && npm install && ENVIRONMENT=production.local npm run build

# Stage2: Build backend
FROM node:19 AS backend-build
WORKDIR /usr/src
COPY backend/ ./backend/
RUN cd backend && npm install && ENVIRONMENT=production.local npm run build
RUN ls

# Stage3: Package the app
FROM node:19
WORKDIR /root/
COPY --from=frontend-build /usr/src/frontend/build ./frontend/build
COPY --from=backend-build /usr/src/backend/dist ./backend/
RUN ls

EXPOSE 5000

CMD ["node", "./backend/api.bundle.js"]