<script setup>
import MovieCard from '@/components/cards/MovieCard.vue'
// import { useuserStore } from '@/stores/userStore'
import { useUserStore } from '@/stores/userStore'
import { useMovieStore } from '@/stores/movieStore'
import { ref, onMounted } from 'vue'

// const userStore = useuserStore()
const userStore = useUserStore()
const movieStore = useMovieStore()

const accountMenu = ref('favorites')
const favoriteTitle = ref('')
const setupTitle = ref('')

onMounted(() => {
  // если зашли напрямую по ссылке проверям авторизацию, перенаправляем на главную
  if (!userStore?.profileStore?.favorites) {
    window.location.href = '/'
    return
  }
  // console.log(userStore.profileStore.favorites)
  if (window.innerWidth > 768) {
    favoriteTitle.value = 'Избранные фильмы'
    setupTitle.value = 'Настройка аккаунта'
  } else {
    favoriteTitle.value = 'Избранное'
    setupTitle.value = 'Настройки'
  }
  favoriteCollect()
})

// собираем массив избранных фильмов
function favoriteCollect() {
  userStore.favorites = []
  const favoritesId = userStore.profileStore.favorites
  favoritesId.forEach(async (element) => {
    await movieStore.getOptional(Number(element))
    userStore.favorites.push(movieStore.movie)
  })
}

// выход из профиля
const handleLogOut = async () => {
  await userStore.logout()
  window.location.href = '/'
}
</script>

<template>
  <main v-if="userStore?.profileStore?.favorites">
    <section class="account__section">
      <h1 class="main-title account__title">Мой аккаунт</h1>
      <ul class="list-reset account__menu">
        <li
          @click="accountMenu = 'favorites'"
          :class="{ 'account__menu-underline': accountMenu == 'favorites' }"
          class="account__menu-item"
        >
          <svg class="btn-icons-fill" viewBox="0 0 24 24" width="24" height="24">
            <use href="../assets/img/icons/sprite.svg#btn-like"></use>
          </svg>
          {{ favoriteTitle }}
        </li>
        <li
          @click="accountMenu = 'settings'"
          :class="{ 'account__menu-underline': accountMenu == 'settings' }"
          class="account__menu-item"
        >
          <svg class="btn-icons-fill" viewBox="0 0 24 24" width="24" height="24">
            <use href="../assets/img/icons/sprite.svg#name"></use>
          </svg>
          {{ setupTitle }}
        </li>
      </ul>
      <ul v-show="accountMenu === 'favorites'" class="list-reset account__favorite-list">
        <MovieCard
          v-for="movieCard of userStore.favorites"
          :key="movieCard.id"
          :movieCard="movieCard"
        />
      </ul>
      <div v-show="accountMenu === 'settings'" class="account__settings-wrapper">
        <ul class="list-reset account__settings-list">
          <li class="account__settings-item">
            <div class="account__settings-round account__settings-round_name">
              {{
                userStore.profileStore.name.charAt(0).toUpperCase() +
                userStore.profileStore.surname.charAt(0).toUpperCase()
              }}
            </div>
            <div class="account__settings-group">
              <span class="account__settings-title">Имя Фамилия</span>
              <span class="account__settings-value">{{
                userStore?.profileStore?.name + ' ' + userStore?.profileStore?.surname
              }}</span>
            </div>
          </li>

          <li class="account__settings-item">
            <div class="account__settings-round account__settings-round_email">
              <svg class="account__settings-round_email" viewBox="0 0 24 24" width="24" height="24">
                <use href="../assets/img/icons/sprite.svg#email"></use>
              </svg>
            </div>
            <div class="account__settings-group">
              <span class="account__settings-title">Электронная почта"</span>
              <span class="account__settings-value">{{ userStore?.profileStore?.email }}</span>
            </div>
          </li>
        </ul>
        <button @click.prevent="handleLogOut" class="btn-reset btn btn-primary account__btn">
          Выйти из аккаунта
        </button>
      </div>
    </section>
  </main>
</template>

<style scoped>
.account__section {
  padding-top: 76px;
  padding-bottom: 160px;
  margin-bottom: 246px;
}

.account__title {
  margin-bottom: 75px;
}

.account__menu {
  display: flex;
  margin-bottom: 64px;
  gap: 70px;
}

.account__menu-item {
  display: flex;
  padding-bottom: 8px;
  align-items: center;
  gap: 4px;
  font-size: 1.5rem;
  border-bottom: 2px solid transparent;
  cursor: pointer;
}

.account__menu-underline {
  border-bottom: 2px solid var(--decor_purple);
}

.account__favorite-list {
  display: flex;
  flex-wrap: wrap;
  row-gap: 64px;
  column-gap: 40px;
}

.account__settings-list {
  display: flex;
  margin-bottom: 66px;
  gap: 40px;
  flex-direction: column;
}

.account__settings-item {
  display: flex;
  gap: 16px;
  align-items: center;
}

.account__settings-round {
  display: flex;
  width: 60px;
  height: 60px;
  align-items: center;
  justify-content: center;
  background-color: var(--bckg_50lite-grey);
  border-radius: 50%;
}

.account__settings-round_name {
  font-size: 1.5rem;
  font-weight: 700;
}

.account__settings-round_email {
  fill: var(--decor_white);
}

.account__settings-group {
  display: flex;
  gap: 4px;
  flex-direction: column;
}

.account__settings-title {
  font-size: 1.1rem;
}

.account__settings-value {
  font-size: 1.5rem;
  font-weight: 700;
}

@media (max-width: 768px) {
  .account__section {
    padding: 16px 20px 152px;
    margin-bottom: 0;
  }

  .account__title {
    margin-bottom: 40px;
  }

  .account__menu {
    margin-bottom: 40px;
  }
}

@media (max-width: 528px) {
  .account__section {
    position: relative;
    padding: 16px 0;
  }

  .account__title {
    padding: 0 20px;
  }

  .account__menu {
    padding: 0 20px;
    gap: 24px;
  }

  .account__favorite-list {
    margin-bottom: 112px;
    padding: 40px 0;
    padding-left: 20px;
    overflow: auto;
    flex-wrap: nowrap;
  }

  .account__settings-wrapper {
    margin-bottom: 232px;
    padding: 0 20px;
  }

  .account__btn {
    width: 100%;
  }
}
</style>
