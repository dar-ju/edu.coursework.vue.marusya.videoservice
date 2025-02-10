<script setup lang="ts">
import { onMounted, ref, watch, watchEffect, nextTick } from 'vue'
import { useRoute } from 'vue-router'
// @ts-ignore
import { useMovieStore } from '@/stores/movieStore'
// @ts-ignore
import { useModalStore } from '@/stores/modalStore'
import SearchResult from './SearchResult.vue'

const route = useRoute()
const movieStore = useMovieStore()
const modalStore = useModalStore()
const searchText = ref('')
const isMobile = ref(false)
const searchInput = ref<HTMLInputElement | null>(null)

onMounted(() => {
  if (window.innerWidth < 768) isMobile.value = true
})

let debounceTimeout: ReturnType<typeof setTimeout>
watch(searchText, (newValue) => {
  if (newValue.length > 2) {
    clearTimeout(debounceTimeout)
    debounceTimeout = setTimeout(() => {
      sendToServer(newValue)
    }, 1000)
  } else movieStore.searchLoaded = {}
})

async function sendToServer(value: string) {
  await movieStore.getSearch({ count: 5, title: value })
}

watchEffect(() => {
  if (route.path) {
    searchText.value = ''
  }
})

watch(
  () => modalStore.isSearchField,
  () => {
    nextTick(() => {
      searchInput.value?.focus()
    })
  },
)

const handleClose = () => {
  searchText.value = ''
  modalStore.isSearchField = false
}
</script>

<template>
  <form
    class="header__form"
    :class="{ header__form_hidden: isMobile, 'header__form-mobile': modalStore.isSearchField }"
  >
    <svg class="header__arrow-icon" viewBox="0 0 24 24" width="24" height="24">
      <use href="@/assets/img/icons/sprite.svg#search"></use>
    </svg>
    <input
      v-model="searchText"
      ref="searchInput"
      class="header__search"
      type="search"
      name="search"
      placeholder="Поиск"
      aria-label="Поле поиска"
    />
    <button @click.prevent.stop="handleClose" class="btn-reset header__close-button">
      <svg viewBox="0 0 24 24" width="24" height="24">
        <use href="../assets/img/icons/sprite.svg#close"></use>
      </svg>
    </button>
    <ul
      v-show="Object.keys(movieStore.searchLoaded).length > 0"
      class="list-reset header__search-result"
    >
      <SearchResult
        v-for="searchItem in movieStore.searchLoaded"
        :key="searchItem.id"
        :searchItem="searchItem"
      />
    </ul>
  </form>
</template>

<style scoped>
.header__form {
  position: relative;
  width: 100%;
  min-width: 200px;
}

.header__form_hidden {
  display: none;
}

.header__form-mobile {
  display: initial;
  position: absolute;
  width: calc(100% - 40px);
  min-width: 200px;
  left: 20px;
  top: 10px;
}

.header__search {
  width: 100%;
  min-height: 48px;
  padding-left: 52px;
  border-radius: 8px;
  color: var(--text_50white);
  background-color: var(--bckg_grey);
}

.header__search-result {
  display: flex;
  position: absolute;
  min-width: 560px;
  max-width: 90%;
  padding: 8px;
  top: 60px;
  right: 0;
  z-index: 20;
  flex-direction: column;
  border-radius: 8px;
  background-color: var(--bckg_grey);
}

.header__arrow-icon {
  position: absolute;
  left: 18px;
  top: 13px;
  fill: var(--decor_50white);
}

.header__close-button {
  position: absolute;
  right: 20px;
  top: 12px;
}

@media (max-width: 600px) {
  .header__search-result {
    flex-direction: row;
    right: initial;
    left: 0;
    overflow: auto;
  }
}
</style>
