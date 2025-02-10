import { defineStore } from 'pinia';
import { ref } from 'vue';
import { gsap } from 'gsap'

export const useModalStore = defineStore('modal', () => {
  const showAuthModal = ref(false);
  const showTrailerModal = ref(false);
  const isRegisterMode = ref(false);
  const isRegisterSucessful = ref(false);
  const isSearchField = ref(false);

  const loginPoint = () => {
    gsap.from('.modal', { opacity: 0, y: -150 })
    isRegisterMode.value = false;
    showAuthModal.value = true;
  };

  const switchAuthModal = () => {
    gsap.from('.modal', { opacity: 0, y: -150 })
    showAuthModal.value = !showAuthModal.value;
  };

  const switchAuthModalMode = () => {
    gsap.from('.modal__input', { opacity: 0 })
    isRegisterMode.value = !isRegisterMode.value;
  };

  const switchRegisterSuccesful = () => {
    isRegisterSucessful.value = !isRegisterSucessful.value;
  };

  const switchTrailerModal = () => {
    gsap.from('.modal', { opacity: 0, y: -150 })
    showTrailerModal.value = !showTrailerModal.value;
  };

  const switchSearchField = () => {
    isSearchField.value = !isSearchField.value;
  };

  return { loginPoint, showAuthModal, switchAuthModal, isRegisterMode, switchAuthModalMode, isRegisterSucessful, switchRegisterSuccesful, showTrailerModal, switchTrailerModal, isSearchField, switchSearchField };
});
