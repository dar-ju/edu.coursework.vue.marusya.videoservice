<script setup lang="ts">
import { ref } from 'vue'
// @ts-ignore
import { useModalStore } from '@/stores/modalStore'
// @ts-ignore
import { useUserStore } from '@/stores/userStore'
import { authUser, userRegister } from '@/api/users'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const modalStore = useModalStore()
const userStore = useUserStore()
const email = ref('')
const name = ref('')
const lastname = ref('')
const password = ref('')
const confirmPassword = ref('')
const errors = ref<string[]>([])

const loginResponse = ref({})
async function loginFunction(login: string, password: string) {
  const response = await authUser(login, password)
  loginResponse.value = response
}

interface RegisterSuccessResponse {
  result: true
}

interface RegisterErrorResponse {
  error: string
}

// функция обращения к серверу для регистрации
const registerResponse = ref<RegisterSuccessResponse | RegisterErrorResponse | null>(null)
async function registerFunction(email: string, password: string, name: string, surname: string) {
  const response = await userRegister(email, password, name, surname)
  registerResponse.value = response
}

const handleCheckForm = async () => {
  errors.value = []
  // проверки на валидность полей
  const regularEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const regularPassword = /^(?=.*\d).{6,}$/
  // проверки на заполнение полей
  if (!regularEmail.test(email.value)) errors.value.push('email')
  if (!password.value) errors.value.push('password')
  if (modalStore.isRegisterMode) {
    if (!name.value) errors.value.push('name')
    if (!lastname.value) errors.value.push('lastname')
    if (!regularPassword.test(password.value)) errors.value.push('password')
    if (!confirmPassword.value || password.value !== confirmPassword.value)
      errors.value.push('confirmPassword')

    // если ошибок в полях нет
    if (!errors.value.length) {
      await registerFunction(email.value, password.value, name.value, lastname.value)
      // проверка на уже зарегистрированного пользователя
      if (registerResponse.value && 'result' in registerResponse.value) {
        modalStore.switchRegisterSuccesful()
      } else errors.value.push('register')
      return
    }
  }
  // если была попытка авторизироваться
  if (!errors.value.length) {
    await loginFunction(email.value, password.value)
    if (loginResponse.value && 'result' in loginResponse.value) {
      userStore.authSet(loginResponse.value.result)
      modalStore.switchAuthModal()
    }
  }
}
// проверка на ошибку полей
const errorCheck = (error: string) => {
  return errors.value.includes(error)
}
// нажатие на Вход после регистрации
const handleAfterRegister = () => {
  inputsClear()
  modalStore.switchRegisterSuccesful()
  modalStore.switchAuthModalMode()
}

const hadnleCloseModal = () => {
  inputsClear()
  modalStore.switchAuthModal()
}

const handleSwitchModes = () => {
  errors.value = []
  modalStore.switchAuthModalMode()
}

function inputsClear() {
  const fields = [email, name, lastname, password, confirmPassword]
  fields.forEach((item) => (item.value = ''))
}
</script>

<template>
  <div :class="{ 'is-visible': modalStore.showAuthModal }" class="modal">
    <img class="modal__logo" src="@/assets/img/logo-dark.png" alt="Логотип Маруся темный" />
    <div v-show="!modalStore.isRegisterSucessful" class="modal__wrapper">
      <h2 class="modal__title" v-show="modalStore.isRegisterMode">Регистрация</h2>
      <form @submit.prevent="handleCheckForm" class="modal__form">
        <div class="modal__inputs">
          <div class="modal__input-wrapper">
            <input
              class="modal__input"
              :class="{ modal__error: errorCheck('email') }"
              placeholder="Электронная почта"
              v-model="email"
            />
            <svg
              class="modal__icon"
              :class="{ 'modal__error-icon': errorCheck('email') }"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <use href="../assets/img/icons/sprite.svg#email"></use>
            </svg>
            <label v-show="errorCheck('email')" class="modal__warning" for="email"
              >Введите корректный адрес email.</label
            >
            <label v-show="errorCheck('register')" class="modal__warning" for="email"
              >Пользователь с таким email уже зарегистрирован.</label
            >
          </div>

          <div v-show="modalStore.isRegisterMode" class="modal__input-wrapper">
            <input
              :class="{ modal__error: errorCheck('name') }"
              class="modal__input"
              type="text"
              placeholder="Имя"
              v-model="name"
            />
            <svg
              class="modal__icon"
              :class="{ 'modal__error-icon': errorCheck('name') }"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <use href="../assets/img/icons/sprite.svg#name"></use>
            </svg>
          </div>

          <div v-show="modalStore.isRegisterMode" class="modal__input-wrapper">
            <input
              :class="{ modal__error: errorCheck('lastname') }"
              class="modal__input"
              type="text"
              placeholder="Фамилия"
              v-model="lastname"
            />
            <svg
              class="modal__icon"
              :class="{ 'modal__error-icon': errorCheck('lastname') }"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <use href="../assets/img/icons/sprite.svg#name"></use>
            </svg>
          </div>

          <div class="modal__input-wrapper">
            <input
              :class="{ modal__error: errorCheck('password') }"
              class="modal__input"
              type="password"
              name="password"
              placeholder="Пароль"
              v-model="password"
            />
            <svg
              class="modal__icon"
              :class="{ 'modal__error-icon': errorCheck('password') }"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <use href="../assets/img/icons/sprite.svg#password"></use>
            </svg>
            <label
              v-show="modalStore.isRegisterMode && errorCheck('password')"
              class="modal__warning"
              for="password"
              >Пароль должен быть не короче 6 символов, а также содержать хотябы одну цифру.</label
            >
          </div>

          <div v-show="modalStore.isRegisterMode" class="modal__input-wrapper">
            <input
              v-show="modalStore.isRegisterMode"
              :class="{ modal__error: errorCheck('confirmPassword') }"
              class="modal__input"
              type="password"
              name="confirmPassword"
              placeholder="Подтвердите пароль"
              v-model="confirmPassword"
            />
            <svg
              class="modal__icon"
              :class="{ 'modal__error-icon': errorCheck('confirmPassword') }"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <use href="../assets/img/icons/sprite.svg#password"></use>
            </svg>
            <label
              v-show="modalStore.isRegisterMode && errorCheck('confirmPassword')"
              class="modal__warning"
              for="confirmPassword"
              >Пароли не совпадают.</label
            >
          </div>
        </div>
        <button class="btn-reset btn">
          {{ modalStore.isRegisterMode ? 'Создать аккаунт' : 'Войти' }}
          <LoadingSpinner v-show="userStore.loading" />
        </button>
      </form>
      <a @click.prevent="handleSwitchModes" href="" class="modal__registration">{{
        modalStore.isRegisterMode ? 'У меня есть пароль' : 'Регистрация'
      }}</a>
    </div>

    <div v-show="modalStore.isRegisterSucessful" class="modal__successful-registration">
      <h2 class="modal__title">Регистрация завершена</h2>
      <p class="modal__info">Используйте вашу электронную почту для входа</p>
      <button @click="handleAfterRegister" class="btn-reset btn">Войти</button>
    </div>

    <button @click="hadnleCloseModal" class="btn-reset modal__close">
      <svg viewBox="0 0 24 24" width="24" height="24">
        <use href="../assets/img/icons/sprite.svg#close-button"></use>
      </svg>
    </button>
  </div>
</template>

<style scoped>
.modal {
  display: none;
  position: fixed;
  left: 50%;
  top: 35%;
  width: 420px;
  padding: 64px 40px;
  transform: translate(-50%, -40%);
  border-radius: 24px;
  background-color: var(--bckg_white);
  z-index: 100;
}

.is-visible {
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
  transition: outline ease-in-out 0.3s;
}

.modal__input::placeholder {
  color: var(--text_40black);
}

.modal__input::placeholder:hover,
.modal__input::placeholder:focus {
  color: var(--text_50black);
}

.modal__input:focus,
.modal__input:hover {
  outline: 1px solid var(--decor_blue_second);
}

.modal__input:focus + svg,
.modal__input:hover + svg {
  fill: var(--decor_blue_second);
}

.modal__icon {
  position: absolute;
  top: 16px;
  left: 16px;
  fill: var(--decor_40black);
  transition: fill ease-in-out 0.3s;
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

.modal__info {
  margin: 0;
  margin-bottom: 24px;
  font-size: 1.1rem;
  text-align: center;
}

.modal__close {
  position: absolute;
  width: 48px;
  height: 48px;
  top: 0;
  right: -72px;
  background-color: var(--bckg_white);
  border-radius: 50%;
}

/* MEDIA */
@media (max-width: 768px) {
  .modal {
    width: 335px;
    max-height: 90vh;
    padding: 64px 20px 32px;
    top: 30%;
    overflow-y: auto;
  }
  .modal__close {
    top: 13px;
    right: 7px;
  }
}
</style>
