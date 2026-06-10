# vibe-coding-movie

TMDB API를 사용한 Netflix 스타일 현재 상영작 웹사이트입니다.

## 실행 방법

1. `config.example.js`를 복사해 `config.js`를 만듭니다.

```bash
cp config.example.js config.js
```

2. [TMDB](https://www.themoviedb.org/settings/api)에서 발급받은 API 키를 `config.js`에 입력합니다.

3. `index.html`을 브라우저에서 열거나 로컬 서버로 실행합니다.

> `config.js`는 Git에 올라가지 않습니다. API 키는 이 파일에만 보관하세요.

## 배포

### GitHub Pages

배포 URL: https://akdhfbfj.github.io/vibe-coding-movie/

1. GitHub 저장소 → **Settings** → **Secrets and variables** → **Actions**
2. `TMDB_API_KEY` 시크릿 추가
3. **Settings** → **Pages** → Source를 **GitHub Actions**로 설정
4. `main` 브랜치에 push하면 자동 배포됩니다.

### Vercel

1. Vercel 프로젝트 → **Settings** → **Environment Variables**
2. `TMDB_API_KEY` 추가 (Production, Preview, Development 모두)
3. 재배포하면 빌드 시 `config.js`가 자동 생성됩니다.
