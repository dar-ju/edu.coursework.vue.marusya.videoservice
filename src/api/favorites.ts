export const getFavoritesApi = async () => {
  try {
    const fetchResponse = await fetch('https://cinemaguide.skillbox.cc/favorites')
    console.log(fetchResponse)

    const response = await fetchResponse.json()
    console.log(response)

    return response
  } catch (err) {
    throw new Error(`favorites response was not ok: ${err}`)
  }
}

export const addFavoriteApi = async (id: number) => {
  try {
    const fetchResponse = await fetch('https://cinemaguide.skillbox.cc/favorites', {
      method: 'POST',
      credentials: 'include',
      body: `id=${id}`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    const response = await fetchResponse.json()
    return response
  } catch (err) {
    throw new Error(`add favorites was not ok, error: ${err}`)
  }
}

export const deleteFavoriteApi = async (id: number) => {
  try {
    const fetchResponse = await fetch(`https://cinemaguide.skillbox.cc/favorites/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
    return fetchResponse
  } catch (err) {
    throw new Error(`add favorites was not ok, error: ${err}`)
  }
}
