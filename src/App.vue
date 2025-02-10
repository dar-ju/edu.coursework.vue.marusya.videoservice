<script setup lang="ts">
import MainHeader from './components/MainHeader.vue'
import MainFooter from './components/MainFooter.vue'
import AuthModal from './components/AuthModal.vue'
import TrailerModal from './components/TrailerModal.vue'
</script>

<template>
  <header>
    <MainHeader />
  </header>
  <router-view></router-view>
  <footer>
    <MainFooter />
  </footer>
  <TrailerModal />
  <AuthModal />
</template>

<style scoped></style>
