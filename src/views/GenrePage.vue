<script setup>
import GenreSection from '@/components/sections/GenreSection.vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <section class="genre__section">
    <div class="genre__title-block">
      <router-link to="/genres" class="genre__back">
        <svg class="btn-icons-fill" viewBox="0 0 14 21" width="14" height="21">
          <use href="../assets/img/icons/sprite.svg#back-arrow"></use>
        </svg>
      </router-link>
      <h1 class="main-title genre__title">{{ name[0].toUpperCase() + name.slice(1) }}</h1>
    </div>
    <GenreSection :name="name" />
  </section>
</template>

<style scoped>
.genre__section {
  display: flex;
  flex-direction: column;
  padding-top: 64px;
  padding-bottom: 160px;
}

.genre__title-block {
  display: flex;
  margin-bottom: 78px;
  gap: 18px;
  align-items: center;
}

.genre__back {
  padding: 10px 13px;
  font-size: 0;
}

@media (max-width: 768px) {
  .genre__section {
    padding-top: 16px;
  }

  .genre__title-block {
    margin-bottom: 40px;
    padding-right: 20px;
    padding-left: 20px;
  }

  .genre__back {
    padding: 10px 7px;
  }
}
</style>
