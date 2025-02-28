# 1. Node.js 18 이미지 사용
FROM node:18 AS build

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. package.json과 package-lock.json 복사
COPY package*.json ./

# 4. 의존성 설치 install 대신 ci를 사용하여 동일한 버전 설치
RUN npm ci

# 5. 애플리케이션 소스 복사
COPY . .

# 6. 빌드
RUN npm run build

# 7. Node.js 18 이미지를 다시 사용하여 실행 환경 구성
FROM node:18

# 8. 작업 디렉토리 설정
WORKDIR /app

# 9. serve 패키지 글로벌 설치 (정적 파일 제공)
RUN npm install -g serve

# 10. 빌드된 파일 복사
COPY --from=build /app/dist .

# 11. 컨테이너 실행 시 정적 파일 제공
CMD ["serve", "-s", ".", "-l", "3000"]

# 12. 컨테이너에서 3000번 포트 사용
EXPOSE 3000
