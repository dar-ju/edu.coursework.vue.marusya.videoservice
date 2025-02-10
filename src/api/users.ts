// USER
export const authUser = async (email: string, password: string) => {
  try {
    const fetchResponse = await fetch('https://cinemaguide.skillbox.cc/auth/login', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const response = await fetchResponse.json()
    return response
  } catch (err) {
    throw new Error(`auth response was not ok, error: ${err}`)
  }
}

export const getUserProfile = async () => {
  try {
    const fetchResponse = await fetch('https://cinemaguide.skillbox.cc/profile', {
      method: 'GET',
      credentials: 'include',
    })
    if (!fetchResponse.ok) {
      return { error: 'Failed to fetch profile' }
    }
    const response = await fetchResponse.json()
    return response
  } catch (err) {
    throw new Error(`get profile response was not ok: ${err}`)
  }
}

export const userLogout = async () => {
  try {
    const fetchResponse = await fetch('https://cinemaguide.skillbox.cc/auth/logout', {
      method: 'GET',
      credentials: 'include',
    })
    const response = await fetchResponse.json()
    return response
  } catch (err) {
    throw new Error(`logout was not ok: ${err}`)
  }
}

export const userRegister = async (
  email: string,
  password: string,
  name: string,
  surname: string,
) => {
  try {
    const fetchResponse = await fetch('https://cinemaguide.skillbox.cc/user', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
        surname: surname,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const response = await fetchResponse.json()
    return response
  } catch (err) {
    throw new Error(`auth response was not ok, error: ${err}`)
  }
}

// FAVORITES
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
