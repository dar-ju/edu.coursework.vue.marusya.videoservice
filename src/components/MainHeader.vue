<script setup lang="ts">
// @ts-ignore
import { useModalStore } from '@/stores/modalStore'
// @ts-ignore
import { useUserStore } from '@/stores/userStore'
import router from '@/router/router'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import SearchForm from './SearchForm.vue'

const modalStore = useModalStore()
const userStore = useUserStore()
const route = useRoute()
const activePage = ref('')

const handleOpenSearchLine = () => {
  modalStore.isSearchField = true
}

watch(
  () => route.name,
  (newName) => {
    activePage.value = newName as string
  },
)

userStore.profileGet()

const handleClick = async () => {
  if (!modalStore.showAuthModal) modalStore.loginPoint()
  if (modalStore.isRegisterSucessful) modalStore.switchRegisterSuccesful()
}

const gotoAccount = () => {
  router.push('/my-account')
}
</script>

<template>
  <div class="header__wrapper header__wrapper_hide">
    <router-link to="/" class="header__logo">
      <img src="@/assets/img/logo-light.png" alt="Логотип Маруся" />
    </router-link>
    <div class="header__menu-wrapper">
      <nav>
        <ul class="list-reset header__menu">
          <li
            class="header__text header__text_hide"
            :class="{ header__text_underline: activePage === 'main' }"
          >
            <router-link to="/" class="header__text">Главная</router-link>
          </li>
          <li class="header__text" :class="{ header__text_underline: activePage === 'genres' }">
            <router-link to="genres" class="header__text">Жанры</router-link>
          </li>
        </ul>
      </nav>
      <SearchForm />
    </div>
    <a
      @click.prevent="userStore?.profileStore?.name ? gotoAccount() : handleClick()"
      class="header__text"
      :class="{ header__text_underline: activePage === 'account' }"
      href="#"
      >{{
        userStore.loading
          ? 'Загрузка...'
          : userStore.profileStore.name
            ? userStore.profileStore.name
            : 'Войти'
      }}</a
    >
  </div>
  <div class="header__mobile-wrapper header__mobile-wrapper_visible">
    <router-link to="/" class="header__logo-mobile">
      <img src="@/assets/img/logo-light.png" alt="Логотип Маруся" />
    </router-link>
    <nav>
      <ul class="list-reset header__mobile-menu-list">
        <li>
          <router-link to="genres" class="btn-icons-fill" tabindex="0">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <use href="../assets/img/icons/sprite.svg#genres"></use>
            </svg>
          </router-link>
        </li>
        <li>
          <a
            @click="handleOpenSearchLine"
            @keydown.enter="handleOpenSearchLine"
            class="btn-icons-fill"
            tabindex="0"
          >
            <SearchForm v-show="modalStore.isSearchField" />
            <svg viewBox="0 0 24 24" width="24" height="24">
              <use href="../assets/img/icons/sprite.svg#search"></use>
            </svg>
          </a>
        </li>
        <li>
          <a
            @click.prevent="userStore?.profileStore?.name ? gotoAccount() : handleClick()"
            @keydown.enter="userStore?.profileStore?.name ? gotoAccount() : handleClick()"
            class="btn-icons-fill"
            tabindex="0"
          >
            <svg viewBox="0 0 24 24" width="24" height="24">
              <use href="../assets/img/icons/sprite.svg#user"></use>
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.header__wrapper {
  display: flex;
  padding-top: 24px;
  padding-bottom: 24px;
  gap: 80px;
  justify-content: space-between;
  align-items: center;
}

.header__logo {
  width: 163px;
  min-width: 143px;
}

.header__menu-wrapper {
  display: flex;
  width: 100%;
  gap: 40px;
  align-items: center;
  justify-content: space-between;
}

.header__menu {
  display: flex;
  min-width: 212px;
  gap: 40px;
}

.header__text {
  padding-bottom: 6px;
  font-size: 1.5rem;
  color: var(--text_white);
  border-bottom: 2px solid transparent;
  transition: color ease-in-out 0.3s;
}

.header__text:hover,
.header__text:focus {
  color: var(--decor_blue_second);
}

.header__text_underline {
  border-bottom: 2px solid var(--decor_purple);
}

/* MOBILE MENU */
.header__mobile-wrapper {
  display: none;
  padding: 16px 20px;
  gap: 140px;
  align-items: center;
  justify-content: space-between;
}

.header__mobile-menu-list {
  display: flex;
  gap: 20px;
}

.header__logo-mobile {
  max-width: 144px;
  min-width: 80px;
}

/* MEDIA */
@media (max-width: 1024px) {
  .header__wrapper {
    gap: 30px;
  }

  .header__menu-wrapper {
    gap: 15px;
  }

  .header__logo {
    min-width: 120px;
  }
}

@media (max-width: 768px) {
  .header__wrapper {
    padding-top: 16px;
    padding-bottom: 16px;
  }

  .header__wrapper_hide {
    display: none;
  }

  .header__mobile-wrapper_visible {
    display: flex;
    gap: 0;
  }

  .header__logo {
    min-width: 80px;
  }
}
</style>
