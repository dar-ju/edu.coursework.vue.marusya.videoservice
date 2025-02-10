<script setup lang="ts">
import { onMounted } from 'vue'
// @ts-ignore
import GenreCard from '@/components/cards/GenreCard.vue'
// @ts-ignore
import { useMovieStore } from '@/stores/movieStore'

const movieGenre = useMovieStore()

const props = defineProps({
  genresTitle: {
    type: String,
    required: false,
  },
})

onMounted(async () => {
  await movieGenre.getGenres()
})
</script>

<template>
  <section class="genres__section">
    <h1 class="main-title genres__title">{{ genresTitle }}</h1>
    <ul class="list-reset genres__list">
      <GenreCard
        v-for="(genreName, index) of movieGenre.genres"
        :key="index"
        :genreName="genreName"
      />
    </ul>
  </section>
</template>

<style scoped>
.genres__section {
  padding-top: 66px;
  padding-bottom: 160px;
}

.genres__title {
  margin-bottom: 63px;
}

.genres__list {
  display: flex;
  flex-wrap: wrap;
  row-gap: 64px;
  column-gap: 40px;
}

@media (max-width: 768px) {
  .genres__section {
    padding: 16px 20px 40px;
  }

  .genres__title {
    margin-bottom: 40px;
  }

  .genres__list {
    row-gap: 24px;
    justify-content: center;
  }
}
</style>
