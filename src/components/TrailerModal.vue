<script setup lang="ts">
// @ts-nocheck
import { ref, computed, watch, onMounted } from 'vue'
import { useModalStore } from '@/stores/modalStore'
import { useMovieStore } from '@/stores/movieStore'

const modalStore = useModalStore()
const movieStore = useMovieStore()

const videoId = ref('')
const modalState = computed(() => modalStore.showTrailerModal)
const player = ref(null)
const isPaused = ref(0)
const isPlayerInitialized = ref(false)
const videoWidth = ref(960)
const videoHeight = ref(540)

// размер экрана
onMounted(() => {
  if (window.innerWidth < 1024) {
    videoWidth.value = 663
    videoHeight.value = 375
  }
  if (window.innerWidth < 768) {
    videoWidth.value = 375
    videoHeight.value = 212
  }
})

// обновление videoId
watch(modalState, () => {
  if (modalState.value) {
    const url = movieStore.movie.trailerUrl
    const id = url.split('=')[1]
    videoId.value = id
  }
})

// обновление видео в плеере
watch(videoId, (newId, oldId) => {
  if (player.value && newId !== oldId) {
    player.value.loadVideoById(newId)
  }
})

// модальное окно
watch(
  () => modalStore.showTrailerModal,
  (isVisible) => {
    if (isVisible) {
      if (!isPlayerInitialized.value) initYoutube()
      else if (player.value) player.value.playVideo()
    } else {
      if (player.value) {
        player.value.pauseVideo()
      }
    }
  },
)

const onPlayerStateChange = (event) => {
  isPaused.value = event.data
}

const initYoutube = () => {
  isPlayerInitialized.value = true
  player.value = new YT.Player('player', {
    width: videoWidth.value,
    height: videoHeight.value,
    videoId: videoId.value,
    playerVars: {
      autoplay: 1, // Автоматическое воспроизведение
      controls: 0, // Отключить элементы управления
      modestbranding: 1, // Отключить логотип YouTube
      rel: 0, // Не показывать похожие видео в конце
      showinfo: 0, // Не показывать информацию о видео
      iv_load_policy: 3, // Отключить аннотации
      fs: 0, // Отключить кнопку полноэкранного режима
      cc_load_policy: 0, // Отключить субтитры
      enablejsapi: 1, // Включить API для взаимодействия с плеером
      disablekb: 1, // Отключить клавиатурные сокращения
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  })
}

const onPlayerReady = (event) => {
  if (modalStore.showTrailerModal) {
    event.target.playVideo()
  } else {
    player.value.playVideo()
  }
}

// скрипт YouTube API
const loadYoutubeApi = () => {
  const tag = document.createElement('script')
  tag.src = 'https://www.youtube.com/iframe_api'
  const firstScriptTag = document.getElementsByTagName('script')[0]
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
  window.onYouTubeIframeAPIReady = () => {
    initYoutube()
  }
}

// управление паузой
const togglePlayPause = () => {
  if (player.value) {
    if (isPaused.value === YT.PlayerState.PLAYING) {
      player.value.pauseVideo()
    } else {
      player.value.playVideo()
    }
  }
}

// загружаем YouTube API при монтировании
loadYoutubeApi()
</script>

<template>
  <div :class="{ 'is-visible': modalState }" class="modal__background">
    <div class="modal">
      <div id="app" class="modal__iframe" @click="togglePlayPause">
        <div id="player"></div>
      </div>
      <div :class="{ 'is-visible-trailer-name': isPaused == 2 }" class="modal__film-name">
        {{ movieStore.movie.title }}
      </div>
      <button @click="modalStore.showTrailerModal = false" class="btn-reset modal__close">
        <svg viewBox="0 0 24 24" width="24" height="24">
          <use href="../assets/img/icons/sprite.svg#close-button"></use>
        </svg>
      </button>
      <div class="modal__border modal__border_top"></div>
      <div class="modal__border modal__border_bottom"></div>
    </div>
    <div @click="modalStore.showTrailerModal = false" class="modal__overlay"></div>
  </div>
</template>

<style scoped>
.modal__background {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: var(--bckg_lite-90black);
  z-index: 100;
}

.modal__overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.modal {
  position: absolute;
  width: 100%;
  flex-direction: column;
  justify-content: flex-end;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -40%);
  width: 960px;
  height: 540px;
  outline: 1px solid var(--decor_80white);
  background-color: var(--bckg_grey);
  z-index: 150;
}

.modal__iframe {
  display: flex;
  position: absolute;
  width: inherit;
  height: inherit;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
}

.is-visible {
  display: flex;
}

.modal__trailer {
  width: 100%;
  height: 100%;
  position: absolute;
  transform: scale(1.35);
  transform-origin: center;
}

.modal__film-name {
  display: none;
  position: absolute;
  width: 100%;
  margin-bottom: 57px;
  padding: 24px 40px;
  bottom: 0;
  background-color: var(--bckg_lite-50black);
  z-index: 160;
  font-size: 1.5rem;
  font-weight: 700;
  pointer-events: none;
}

.is-visible-trailer-name {
  display: block;
}

.modal__wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal__logo {
  display: block;
  max-width: 157px;
  margin: 0 auto;
  margin-bottom: 40px;
}

.modal__title {
  margin: 0;
  margin-bottom: 24px;
  align-self: center;
  color: var(--text_black);
}

.modal__form {
  display: flex;
  width: 100%;
  margin-bottom: 24px;
  flex-direction: column;
}

.modal__inputs {
  display: flex;
  margin-bottom: 24px;
  gap: 12px;
  flex-direction: column;
}

.modal__input-wrapper {
  position: relative;
}

.modal__input {
  width: 100%;
  min-height: 56px;
  padding: 16px;
  padding-left: 52px;
  outline: 1px solid var(--decor_40black);
  border-radius: 8px;
  color: var(--text_black);
}

.modal__input::placeholder {
  color: var(--text_40black);
}

.modal__icon {
  position: absolute;
  top: 16px;
  left: 16px;
  fill: var(--decor_40black);
}

.modal__error {
  outline: 1px solid var(--decor_red);
}

.modal__error-icon {
  fill: var(--decor_red);
}

.modal__warning {
  font-size: 0.75rem;
  color: var(--decor_red);
}

.modal__registration {
  font-weight: 700;
  color: var(--text_black);
}

.modal__successful-registration {
  display: flex;
  flex-direction: column;
}

.modal__close {
  position: absolute;
  width: 48px;
  height: 48px;
  top: 0;
  right: -72px;
  background-color: var(--bckg_white);
  border-radius: 50%;
  z-index: 10;
}

.modal__border {
  position: absolute;
  left: 0;
  right: 0;
  height: 59px;
  background-color: black;
}

.modal__border_top {
  top: 0;
}

.modal__border_bottom {
  bottom: 0;
}

@media (max-width: 1120px) {
  .modal__close {
    width: 32px;
    height: 32px;
    top: 16px;
    right: 16px;
  }
}

@media (max-width: 1024px) {
  .modal {
    width: 663px;
    height: 375px;
    outline: none;
  }

  .modal__film-name {
    margin-bottom: 0;
    font-size: 1.1rem;
  }
}

@media (max-width: 768px) {
  .modal {
    width: 375px;
    height: 212px;
  }

  .modal__border {
    height: 40px;
  }

  .modal__film-name {
    position: absolute;
    width: 100%;
    bottom: -70px;
  }
}
</style>
