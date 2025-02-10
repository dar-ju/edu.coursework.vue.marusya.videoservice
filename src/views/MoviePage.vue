<script setup lang="ts">
import HeroSection from '@/components/sections/HeroSection.vue'
import AboutMovieSection from '@/components/sections/AboutMovieSection.vue'

const props = defineProps({
  movie: {
    type: String,
    required: true,
  },
})

window.scrollTo({ top: 0, behavior: 'smooth' })
</script>

<template>
  <main>
    <HeroSection :movie="props.movie" :key="Date.now()" />
    <AboutMovieSection title="О&nbspфильме" />
  </main>
</template>

<style scoped></style>
