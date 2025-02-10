<script setup>
import { onMounted } from 'vue'
import MovieCard from '@/components/cards/MovieCard.vue'
import { useMovieStore } from '@/stores/movieStore'

const movieTop = useMovieStore()

const props = defineProps({
  top10Title: {
    type: String,
    required: false,
  },
})

onMounted(async () => {
  await movieTop.getTop10()
})
</script>

<template>
  <section class="top10__section">
    <h1 class="main-title top10__title">{{ top10Title }}</h1>
    <ul class="list-reset top10__list">
      <MovieCard
        v-for="(movieCard, index) of movieTop.top10"
        :key="movieCard.id"
        :movieCard="movieCard"
        :index="index + 1"
      />
    </ul>
  </section>
</template>

<style scoped>
.top10__section {
  padding-top: 40px;
  padding-bottom: 120px;
}

.top10__title {
  margin-bottom: 64px;
  font-size: 2.5rem;
}

.top10__list {
  display: flex;
  flex-wrap: wrap;
  row-gap: 64px;
  column-gap: 40px;
}

@media (max-width: 768px) {
  .top10__section {
    position: relative;
    padding: 32px 0;
  }

  .top10__title {
    margin-bottom: 0;
    padding-left: 20px;
  }

  .top10__list {
    padding: 40px 0;
    padding-left: 20px;
    overflow: auto;
    flex-wrap: nowrap;
  }
}
</style>
