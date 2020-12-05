import axios from 'axios';

const API_KEY = '1172fc2ae56a45677284ff05c420b54f';
const BASE_URL = 'https://api.themoviedb.org/3';

axios.defaults.baseURL = BASE_URL;

export const BASE_URL_POSTER = 'https://image.tmdb.org/t/p/original';

export function popularFetch(page = 1) {
  return axios
    .get(`/trending/all/day?api_key=${API_KEY}&page=${page}`)
    .then(res => res.data);
}

export function searchMoviesByKeyword(keyword, page = 1) {
  return axios
    .get(
      `/search/movie?api_key=${API_KEY}&language=en-US&query=${keyword}&page=${page}&include_adult=false`,
    )
    .then(res => res.data);
}

export function gethMovieDetailsById(id) {
  return axios
    .get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`,
    )
    .then(res => res.data);
}

export function getCastsByMovieId(id) {
  return axios
    .get(`/movie/${id}/credits?api_key=${API_KEY}&language=en-US`)
    .then(res => res.data);
}

export function getUserReviewsAboutFilmById(id, page = 1) {
  return axios
    .get(`/movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=${page}`)
    .then(res => res.data);
}
