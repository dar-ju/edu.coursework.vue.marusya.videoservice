<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
// @ts-ignore
import { useUserStore } from '@/stores/userStore'
// @ts-ignore
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const route = useRoute()
const userStore = useUserStore()

const { movieCard, index } = defineProps({
  movieCard: {
    type: Object,
    required: false,
  },
  index: {
    type: Number,
    required: false,
  },
})

const accountPage = computed(() => route.name === 'account')

interface Movie {
  id: number
}

const handleDelete = async (id: number) => {
  const movieObj = userStore.favorites.find((movie: Movie) => movie.id === id)
  if (movieObj) {
    userStore.favorites = userStore.favorites.filter((item: Movie) => item.id !== movieObj.id)
    userStore.deleteFavorites(id)
  }
}
</script>

<template>
  <li class="movie__card">
    <router-link :to="`/${movieCard?.id}`" class="movie__link">
      <LoadingSpinner class="card-spinner movie__spinner" />
      <picture>
        <img
          v-if="movieCard?.posterUrl"
          class="img movie__img"
          :src="movieCard.posterUrl"
          :alt="movieCard.title"
        />
        <img
          v-else
          class="img movie__img"
          src="../../assets/img/no-cover-vertical.jpg"
          :alt="movieCard?.title"
        />
      </picture>
      <div v-if="index" class="movie__number">{{ index }}</div>
    </router-link>
    <button
      @click="handleDelete(movieCard?.id)"
      v-show="accountPage"
      class="btn-reset movie__delete"
    >
      <svg class="btn-close movie__close" viewBox="0 0 24 24" width="13" height="13">
        <use href="../../assets/img/icons/sprite.svg#close-button"></use>
      </svg>
    </button>
  </li>
</template>

<style>
.movie__card {
  position: relative;
  width: 224px;
  height: 340px;
  border-radius: 16px;
  box-shadow: 0px 0px 80px 0px var(--bckg_54lite-grey);
}

.movie__number {
  transition: background-color ease-in-out 0.3s;
}

.movie__link:focus .movie__number {
  background-color: var(--decor_blue_second);
}

.movie__img {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
  object-fit: cover;
  border-radius: 16px;
  transition: scale ease-in-out 0.3s;
}

.movie__img:hover {
  scale: 1.02;
}

.movie__number {
  position: absolute;
  min-width: 62px;
  height: 48px;
  padding: 8px 24px;
  left: -12px;
  top: -12px;
  border-radius: 50px;
  background-color: var(--bckg_white);
  color: var(--bckg_blue_main);
  font-size: 1.5rem;
  font-weight: 700;
  z-index: 20;
}

.movie__delete {
  opacity: 0;
  position: absolute;
  width: 40px;
  height: 40px;
  right: -20px;
  top: -20px;
  background-color: var(--bckg_white);
  border-radius: 50%;
}

.movie__close {
  stroke: var(--button_black);
  stroke-width: 2px;
}

.movie__card:hover .movie__delete {
  transition: opacity 0.3s ease-in-out;
  opacity: 1;
  z-index: 20;
}

.movie__spinner {
  position: absolute !important;
}

@media (max-width: 768px) {
  .movie__card {
    min-width: 224px;
    box-shadow: 0px 0px 40px 0px var(--bckg_54lite-grey);
  }
}

@media (max-width: 528px) {
  .movie__card {
    width: 335px;
    height: 502px;
  }
}
</style>
