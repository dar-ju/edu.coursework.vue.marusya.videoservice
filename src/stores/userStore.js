import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getUserProfile, userLogout, addFavoriteApi, deleteFavoriteApi } from '@/api/users'

export const useUserStore = defineStore('auth', () => {
  const authResponse = ref(false);
  const profileStore = ref({});
  const loading = ref(false)

  const authSet = async (status) => {
    loading.value = true
    authResponse.value = status;
    if (authResponse.value) await profileGet()
    loading.value = false
  };

  async function profileGet() {
    loading.value = true
    const response = await getUserProfile()
    profileStore.value = response
    loading.value = false
  }

  async function logout() {
    const response = await userLogout()
    if (response.result) {
      authResponse.value = false
      profileStore.value = {}
    }
  }

  const addFavorites = async (id) => {
    await addFavoriteApi(id);
    const response = await getUserProfile()
    profileStore.value.favorites = response.favorites
  };

  const deleteFavorites = async (id) => {
    await deleteFavoriteApi(id);
    const response = await getUserProfile();
    profileStore.value.favorites = response.favorites
  };

  return {
    authResponse,
    authSet,
    profileGet,
    profileStore,
    logout,
    loading,
    addFavorites,
    deleteFavorites
  };
});
