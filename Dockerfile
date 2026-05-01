# Build Stage
FROM node:20 AS build
WORKDIR /app/frontend
COPY mall-dashboard/package*.json ./
RUN npm install
COPY mall-dashboard/ .
RUN npm run build

# Production Stage
FROM node:20
WORKDIR /app
COPY mall-dashboard/package*.json ./
# Install all dependencies including those needed for backend
RUN npm install

# Copy built frontend
COPY --from=build /app/frontend/dist ./dist
# Copy backend code
COPY mall-dashboard/src/backend ./src/backend

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080
CMD ["node", "src/backend/server.js"]
