FROM mcr.microsoft.com/playwright:v1.39.0-jammy
RUN mkdir /tests
COPY . /tests
WORKDIR /tests
RUN npm install
RUN npx @playwright/test install
RUN npx playwright install-deps

