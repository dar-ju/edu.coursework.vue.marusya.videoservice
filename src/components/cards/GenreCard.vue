<script setup lang="ts">
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const { genreName } = defineProps({
  genreName: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <li class="genres__item">
    <LoadingSpinner class="card-spinner" />
    <router-link
      :to="{ name: 'genre', params: { name: genreName } }"
      :style="{ backgroundImage: `url('/assets/img/genres/${genreName}.jpg')` }"
      class="genres__card"
    >
      <div class="genres__title-box">{{ genreName[0].toUpperCase() + genreName.slice(1) }}</div>
    </router-link>
  </li>
</template>

<style>
.genres__item {
  position: relative;
}

.genres__card {
  display: flex;
  position: inherit;
  min-width: 290px;
  min-height: 304px;
  border-radius: 24px;
  box-shadow: 0px 0px 80px 0px var(--bckg_54lite-grey);
  cursor: pointer;
  background-size: auto 225px;
  background-position: top;
  background-repeat: no-repeat;
  z-index: 10;
  transition: background-size ease-in-out 0.4s;
}

.genres__card:hover {
  background-size: auto 235px;
}

.genres__card:focus .genres__title-box {
  color: var(--decor_blue_second);
}

.genres__title-box {
  width: 100%;
  padding: 22px 50px 30px 50px;
  align-self: end;
  text-align: center;
  background-color: var(--bckg_lite-black);
  border-radius: 0 0 24px 24px;
  font-size: 1.5rem;
  font-weight: 700;
  transition: color ease-in-out 0.3s;
}

.card-spinner {
  position: absolute !important;
}

@media (max-width: 768px) {
  .genres__card {
    min-width: 335px;
    background-size: auto 255px;
  }

  .genres__card:hover {
    background-size: auto 265px;
  }
}
</style>
