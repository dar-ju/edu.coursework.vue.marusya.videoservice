<script setup lang="ts">
// @ts-ignore
import { useMovieStore } from '@/stores/movieStore'

const movieStore = useMovieStore()

const { searchItem } = defineProps({
  searchItem: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <li class="search__item">
    <router-link
      :key="Date.now()"
      :to="`/${searchItem.id}`"
      class="search__link"
      @click="movieStore.searchLoaded = {}"
    >
      <img :src="searchItem.posterUrl" :alt="searchItem.title" class="search__img" />
      <div class="search__wrapper">
        <div class="search__info">
          <span
            class="search__rating"
            :style="{ backgroundColor: movieStore.ratingColor(searchItem.tmdbRating) }"
            >{{ searchItem.tmdbRating.toFixed(1) }}</span
          >
          <span class="search__info-text">{{ searchItem.releaseYear }}</span>
          <span class="search__info-text">{{ searchItem.genres.join(' ') }}</span>
          <span class="search__info-text">{{ movieStore.runtime(searchItem.runtime) }}</span>
        </div>
        <span class="search__title">{{ searchItem.title }}</span>
      </div>
    </router-link>
  </li>
</template>

<style scoped>
.search__link {
  display: flex;
  padding: 20px 8px;
  border: 1px solid transparent;
  box-sizing: border-box;
  cursor: pointer;
  transition: border ease-in-out 0.3s;
}

.search__link:hover {
  border: 1px solid var(--decor_50white);
  border-radius: 6px;
}

.search__img {
  width: 40px;
  margin-right: 16px;
}

.search__wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-repeat: no-repeat;
  background-size: contain;
}

.search__info {
  display: flex;
  gap: 12px;
}

.search__rating {
  padding: 2px 8px;
  padding-left: 22px;
  border-radius: 16px;
  background-image: url('../assets/img/icons/star.svg');
  background-repeat: no-repeat;
  background-position: left 8px center;
  background-size: 10px;
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 16px;
}

.search__info-text {
  font-size: 0.88rem;
  line-height: 20px;
}

.search__title {
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 24px;
}

@media (max-width: 600px) {
  .search__item {
    min-width: 220px;
  }

  .search__link {
    flex-direction: column;
  }

  .header__search-result {
    flex-direction: row;
    right: initial;
    left: 0;
  }

  .search__img {
    width: 100%;
    margin-right: 16px;
    margin-bottom: 16px;
  }

  .search__info {
    flex-wrap: wrap;
  }
}
</style>
