<script setup lang="ts">
// @ts-ignore
import { useMovieStore } from '@/stores/movieStore'

const movieAbout = useMovieStore()

const props = defineProps({
  title: {
    type: String,
    required: false,
  },
})

const currency = (val: number) => {
  const converted = new Intl.NumberFormat('ru-RU').format(val)
  if (movieAbout.movie.language === 'ru') return `${converted} руб.`
  else return `${converted} $`
}
</script>

<template>
  <section class="about-movie__section">
    <h1 class="main-title about-movie__title">{{ props.title }}</h1>
    <ul class="list-reset about-movie__list">
      <li v-show="movieAbout.movie.language" class="about-movie__item">
        <span class="about-movie__name">Язык оригинала</span>
        <span class="about-movie__separator"></span>
        <span class="about-movie__value">{{ movieAbout.movie.language }}</span>
      </li>
      <li v-show="movieAbout.movie.budget" class="about-movie__item">
        <span class="about-movie__name">Бюджет</span>
        <span class="about-movie__separator"></span>
        <span class="about-movie__value">{{ currency(movieAbout.movie.budget) }}</span>
      </li>
      <li v-show="movieAbout.movie.revenue" class="about-movie__item">
        <span class="about-movie__name">Выручка</span>
        <span class="about-movie__separator"></span>
        <span class="about-movie__value">{{ currency(movieAbout.movie.revenue) }}</span>
      </li>
      <li v-show="movieAbout.movie.director" class="about-movie__item">
        <span class="about-movie__name">Режиссёр</span>
        <span class="about-movie__separator"></span>
        <span class="about-movie__value">{{ movieAbout.movie.director }}</span>
      </li>
      <li v-show="movieAbout.movie.production" class="about-movie__item">
        <span class="about-movie__name">Продакшен</span>
        <span class="about-movie__separator"></span>
        <span class="about-movie__value">{{ movieAbout.movie.production }}</span>
      </li>
      <li v-show="movieAbout.movie.awardsSummary" class="about-movie__item">
        <span class="about-movie__name">Награды</span>
        <span class="about-movie__separator"></span>
        <span class="about-movie__value">{{ movieAbout.movie.awardsSummary }}</span>
      </li>
    </ul>
  </section>
</template>

<style>
.about-movie__section {
  padding-top: 40px;
  padding-bottom: 120px;
}

.about-movie__title {
  margin-bottom: 64px;
}

.about-movie__list {
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.about-movie__item {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.about-movie__name {
  font-size: 1.1rem;
}

.about-movie__separator {
  flex-grow: 1;
  border-bottom: 2px dotted var(--text_white);
}

.about-movie__value {
  width: 70%;
  align-self: flex-end;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .about-movie__section {
    padding: 40px 20px 32px;
  }

  .about-movie__title {
    margin-bottom: 40px;
  }

  .about-movie__value {
    width: 60%;
  }
}

@media (max-width: 528px) {
  .about-movie__value {
    width: 60%;
  }

  .about-movie__list {
    gap: 12px;
  }

  .about-movie__item {
    flex-direction: column;
    gap: 4px;
  }

  .about-movie__name {
    font-size: 0.75rem;
    color: var(--text_70white);
  }

  .about-movie__separator {
    display: none;
  }

  .about-movie__value {
    align-self: flex-start;
  }
}
</style>
