const API_KEY = typeof TMDB_CONFIG !== 'undefined' ? TMDB_CONFIG.API_KEY : '';
const API_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko-KR`;
const IMAGE_BASE = 'https://image.tmdb.org/t/p';

const heroEl = document.getElementById('hero');
const heroTitle = document.getElementById('hero-title');
const heroMeta = document.getElementById('hero-meta');
const heroOverview = document.getElementById('hero-overview');
const movieList = document.getElementById('movie-list');
const navbar = document.querySelector('.navbar');

function getPosterUrl(path, size = 'w500') {
  if (!path) return null;
  return `${IMAGE_BASE}/${size}${path}`;
}

function getBackdropUrl(path) {
  if (!path) return null;
  return `${IMAGE_BASE}/w1280${path}`;
}

function formatReleaseDate(dateStr) {
  if (!dateStr) return '개봉일 미정';
  const [year, month, day] = dateStr.split('-');
  return `${year}.${month}.${day} 개봉`;
}

function getAdultInfo(isAdult) {
  return isAdult
    ? { label: '성인 관람', className: 'adult' }
    : { label: '일반 관람', className: 'general' };
}

function createMovieCard(movie) {
  const card = document.createElement('article');
  card.className = 'movie-card';
  card.setAttribute('role', 'listitem');

  const posterUrl = getPosterUrl(movie.poster_path);
  const adultInfo = getAdultInfo(movie.adult);

  card.innerHTML = `
    <div class="movie-card__poster-wrap">
      ${
        posterUrl
          ? `<img class="movie-card__poster" src="${posterUrl}" alt="${movie.title} 포스터" loading="lazy">`
          : `<div class="movie-card__no-poster">포스터 없음</div>`
      }
      <span class="movie-card__adult-badge movie-card__adult-badge--${adultInfo.className}">${adultInfo.label}</span>
    </div>
    <h3 class="movie-card__title">${movie.title}</h3>
    <p class="movie-card__date">${formatReleaseDate(movie.release_date)}</p>
  `;

  card.addEventListener('click', () => setHero(movie));

  return card;
}

function setHero(movie) {
  const adultInfo = getAdultInfo(movie.adult);

  heroTitle.textContent = movie.title;
  heroMeta.innerHTML = `<span class="rating-badge rating-badge--${adultInfo.className}">${adultInfo.label}</span>`;
  heroOverview.textContent = movie.overview || '줄거리 정보가 없습니다.';

  const backdrop = getBackdropUrl(movie.backdrop_path) || getPosterUrl(movie.poster_path, 'w780');
  if (backdrop) {
    heroEl.style.backgroundImage = `url(${backdrop})`;
  }

  heroEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function showError(message) {
  movieList.innerHTML = `
    <div class="error">
      <strong>영화를 불러오지 못했습니다</strong>
      <p>${message}</p>
    </div>
  `;
}

async function fetchMovies() {
  if (!API_KEY || API_KEY === 'YOUR_TMDB_API_KEY_HERE') {
    showError('config.js 파일에 TMDB API 키를 설정해 주세요. (config.example.js 참고)');
    heroTitle.textContent = 'API 키가 필요합니다';
    heroMeta.textContent = '';
    heroOverview.textContent = 'config.example.js를 복사해 config.js를 만들고 API 키를 입력하세요.';
    return;
  }

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`API 오류 (${response.status})`);
    }

    const data = await response.json();
    const movies = data.results;

    if (!movies || movies.length === 0) {
      showError('표시할 상영작이 없습니다.');
      return;
    }

    movieList.innerHTML = '';
    movieList.setAttribute('role', 'list');

    movies.forEach((movie) => {
      movieList.appendChild(createMovieCard(movie));
    });

    setHero(movies[0]);
  } catch (error) {
    showError(error.message);
    heroTitle.textContent = '오류가 발생했습니다';
    heroMeta.textContent = '';
    heroOverview.textContent = '';
  }
}

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

fetchMovies();
