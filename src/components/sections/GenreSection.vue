<script setup lang="ts">
import { onMounted } from 'vue'
import MovieCard from '@/components/cards/MovieCard.vue'
// @ts-ignore
import { useMovieStore } from '@/stores/movieStore'

const movie15 = useMovieStore()
let page = 1

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
})

onMounted(async () => {
  await movie15.getOptional({ count: 15, page: page, genre: props.name })
  page = 6
})

const handleLoad = async () => {
  for (let i = 0; i < 2; i++) {
    await movie15.getOptionalLoad({ count: 5, page: page, genre: props.name })
    page++
  }
}
</script>

<template>
  <ul class="list-reset genre__list">
    <MovieCard v-for="movieCard of movie15.optional" :key="movieCard.id" :movieCard="movieCard" />
  </ul>
  <button
    v-show="movie15.loaded.length"
    @click="handleLoad"
    class="btn-reset btn btn-primary genre__btn"
  >
    Показать ещё
  </button>
</template>

<style scoped>
.genre__list {
  display: flex;
  margin-bottom: 64px;
  flex-wrap: wrap;
  row-gap: 59px;
  column-gap: 40px;
  justify-content: center;
}

.genre__btn {
  align-self: center;
}

@media (max-width: 768px) {
  .genre__list {
    padding-right: 20px;
    padding-left: 20px;
  }
}
</style>
