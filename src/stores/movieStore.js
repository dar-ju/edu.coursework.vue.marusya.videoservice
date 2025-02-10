import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getRandomMovieApi, getTop10MoviesApi, getGenresMoviesApi, getMoviesApi } from '@/api/movies'

export const useMovieStore = defineStore('movie', () => {

  const movie = ref({})
  const getRandom = async () => {
    // loading.value = true
    const response = await getRandomMovieApi();
    movie.value = response;
    // loading.value = false
  };

  const top10 = ref({})
  const getTop10 = async () => {
    const response = await getTop10MoviesApi();
    top10.value = response;
  };

  const genres = ref({})
  const getGenres = async () => {
    const response = await getGenresMoviesApi();
    genres.value = response;
  };

  const optional = ref({}) // массив загруженных фильмов
  const loaded = ref({}) // проверка кол-ва загруженных фильмов для отображении кнопки
  const getOptional = async (params) => {
    loaded.value = {}
    const response = await getMoviesApi(params);
    loaded.value = response
    if (!isNaN(params)) movie.value = response
    else optional.value = response;
  };
  const getOptionalLoad = async (params) => {
    loaded.value = {}
    const response = await getMoviesApi(params);
    loaded.value = response
    optional.value = [...optional.value, ...response];
  };

  // загрузка фильмов из строки поиска
  const searchLoaded = ref({})
  const getSearch = async (params) => {
    searchLoaded.value = {}
    const response = await getMoviesApi(params);
    searchLoaded.value = response
  };

  // продолжительность фильма в формате Ч ч ММ мин
  function runtime(totalMinutes) {
    const hours = (totalMinutes - (totalMinutes % 60)) / 60
    const minutes = totalMinutes % 60
    return `${hours} ч ${minutes} мин`
  }

  // фон для цвета плашки рейтинга
  const ratingColor = (value) => {
    if (value >= 8.6) return 'var(--bckg_gold)'
    if (value >= 7.5) return 'var(--bckg_green)'
    if (value >= 6.3) return 'var(--bckg_lite-grey)'
    return 'var(--bckg_red)'
  }

  return {
    getRandom,
    movie,
    getTop10,
    top10,
    getGenres,
    genres,
    getOptional,
    getOptionalLoad,
    optional,
    loaded,
    getSearch,
    searchLoaded,
    runtime,
    ratingColor,
  };
});
