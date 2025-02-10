<script setup>
import { ref, onMounted } from 'vue'
import { useMovieStore } from '@/stores/movieStore'
import { useUserStore } from '@/stores/userStore'
import { useModalStore } from '@/stores/modalStore'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { gsap } from 'gsap'

const movieStore = useMovieStore()
const userStore = useUserStore()
const modalStore = useModalStore()

const showTrailer = ref(false)

const props = defineProps({
  movie: {
    type: String,
    required: false,
  },
})

onMounted(async () => {
  if (props.movie) movieStore.getOptional(props.movie)
  else await movieStore.getRandom()
})

// сокращение описания до 2 предложений
function descriptionShorter() {
  let descr
  if (movieStore.movie.plot) {
    if (movieStore.movie.plot.includes('. ')) {
      descr = movieStore.movie.plot.split('. ')
    } else return movieStore.movie.plot
    if (descr.length > 1) {
      descr = descr.slice(0, 2).join('. ')
    } else descr = descr[0]
    gsap.from('.hero__descr', { opacity: 0, y: -5 })
    return descr
  }
}

// проверка есть ли в избранном
const favoriteCheck = () => {
  if (userStore?.profileStore?.name) {
    const movieId = String(movieStore.movie.id)
    const movieFavorites = userStore.profileStore.favorites
    const isIdInFavorites = movieFavorites.find((id) => movieId === id)
    return isIdInFavorites
  }
}

// нажатие на "Добавить в избранное"
const handleFavorite = async () => {
  // если пользователь залогинен
  if (userStore?.profileStore?.name) {
    const movieId = String(movieStore.movie.id)
    // удаление или добавление в избранном
    favoriteCheck()
      ? await userStore.deleteFavorites(movieId)
      : await userStore.addFavorites(movieId)
  } else modalStore.loginPoint()
}

const handleScroll = async () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleRandom = async () => {
  movieStore.getRandom()
  handleScroll()
}
</script>

<template>
  <section v-if="movieStore.movie" class="hero__section">
    <div class="hero__about">
      <div class="hero__wrapper">
        <div v-if="movieStore.movie.tmdbRating" class="hero__top">
          <span
            class="hero__rating"
            :style="{ backgroundColor: movieStore.ratingColor(movieStore.movie.tmdbRating) }"
            >{{ movieStore.movie.tmdbRating.toFixed(1) }}</span
          >
          <span class="hero__about-item">{{ movieStore.movie.releaseYear }}</span>
          <span class="hero__about-item">{{ movieStore.movie.genres.join(' ') }}</span>
          <span class="hero__about-item hero__about-item_width">{{
            movieStore.runtime(movieStore.movie.runtime)
          }}</span>
        </div>
        <h1 class="main-title hero__title">{{ movieStore.movie.title }}</h1>
        <span class="hero__descr">{{
          props.movie ? movieStore.movie.plot : descriptionShorter()
        }}</span>
      </div>
      <div class="hero__buttons">
        <button
          @click.prevent="modalStore.showTrailerModal = true"
          class="btn-reset btn btn-primary hero__trailer-btn"
        >
          Трейлер
        </button>
        <div class="hero__buttons hero__buttons-secondary">
          <button v-show="!props.movie" class="btn-reset btn btn-secondary hero__about-btn">
            <router-link :to="`/${movieStore.movie.id}`"> О&nbsp;фильме </router-link>
          </button>
          <button @click.prevent="handleFavorite" class="btn-reset btn btn-icons">
            <svg
              :class="{ 'hero__btn-like_infavorite': favoriteCheck() }"
              class="btn-icons-fill hero__btn-like"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <use href="../../assets/img/icons/sprite.svg#btn-like"></use>
            </svg>
          </button>
          <button
            v-show="!props.movie"
            @click="handleRandom"
            class="btn-reset btn btn-icons hero__random-btn"
          >
            <svg class="btn-icons-fill" viewBox="0 0 24 24" width="24" height="24">
              <use href="../../assets/img/icons/sprite.svg#btn-random"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div class="hero__image-wrapper">
      <LoadingSpinner class="card-spinner hero__spinner" />
      <img
        v-if="movieStore.movie.backdropUrl"
        class="img hero__image"
        :src="movieStore.movie.backdropUrl"
        :alt="movieStore.movie.title"
      />
      <img
        v-else
        class="img hero__image"
        src="../../assets/img/no-cover-horizontal.jpg"
        :alt="movieStore.movie.title"
      />
    </div>
  </section>
  <div v-else>Loading...</div>
</template>

<style scoped>
.hero__section {
  display: flex;
  padding-top: 32px;
  padding-bottom: 40px;
  gap: 20px;
}

.hero__about {
  max-width: 100%;
  min-width: 400px;
  width: 600px;
  padding: 30px 0;
}

.hero__wrapper {
  display: flex;
  max-width: 600px;
  margin-bottom: 60px;
  flex-direction: column;
  gap: 16px;
}

.hero__top {
  display: flex;
  gap: 16px;
  align-items: center;
}

.hero__rating {
  padding: 4px 12px;
  padding-left: 32px;
  border-radius: 16px;
  background-image: url('../../assets/img/icons/star.svg');
  background-repeat: no-repeat;
  background-position: left 12px center;
  font-size: 1.1rem;
  font-weight: 700;
}

.hero__about-item {
  color: var(--text_70white);
  font-size: 1.1rem;
}

.hero__about-item_width {
  min-width: 100px;
}

.hero__title {
  margin-bottom: 16px;
}

.hero__descr {
  color: var(--text_70white);
  font-size: 1.5rem;
}

.hero__buttons {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.hero__image-wrapper {
  width: 680px;
  position: relative;
  align-self: center;
}

.hero__image {
  position: inherit;
  min-width: 375px;
  object-fit: cover;
  border-radius: 16px;
  z-index: 10;
}

.hero__spinner {
  position: absolute;
}

.hero__btn-like {
  fill: transparent;
  stroke: var(--button_white);
}

.hero__btn-like_infavorite {
  fill: var(--bckg_blue_second);
  stroke: none;
}

/* MEDIA */
@media (max-width: 1024px) {
  .hero__section {
    padding-top: 0;
    flex-direction: column;
  }

  .hero__about {
    order: 1;
  }

  .hero__image-wrapper {
    width: 100%;
  }

  .hero__wrapper {
    max-width: initial;
  }
}

@media (max-width: 768px) {
  .hero__section {
    padding: 0 20px 24px;
  }

  .hero__image {
    min-width: initial;
  }

  .hero__about {
    min-width: initial;
  }

  .hero__about-item {
    font-size: 0.75rem;
  }

  .hero__descr {
    font-size: 1.1rem;
  }

  .hero__trailer-btn {
  }
}

@media (max-width: 480px) {
  .hero__trailer-btn {
    flex-grow: 1;
  }

  .hero__buttons-secondary {
    width: 100%;
    flex-wrap: nowrap;
  }

  .hero__about-btn {
    flex-grow: 1;
  }
}
</style>
