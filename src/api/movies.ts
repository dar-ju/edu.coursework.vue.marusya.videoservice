export const getMoviesApi = async (params: number | string) => {
  const baseUrl = 'https://cinemaguide.skillbox.cc/movie'
  let url
  const numericParam = typeof params === 'string' ? Number(params) : params
  if (!isNaN(numericParam)) url = `${baseUrl}/${params}`
  else {
    const query = Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&')
    url = `${baseUrl}?${query}`
  }
  try {
    const fetchResponse = await fetch(url)
    const response = await fetchResponse.json()
    return response
  } catch (err) {
    throw new Error(`movies response was not ok, error: ${err}`)
  }
}

async function innerFunction(param: number | string) {
  try {
    const fetchResponse = await fetch(`https://cinemaguide.skillbox.cc/movie/${param}`)
    const response = await fetchResponse.json()
    return response
  } catch (err) {
    throw new Error(`movie ${param} response was not ok, error: ${err}`)
  }
}

export const getTop10MoviesApi = () => {
  return innerFunction('top10')
}

export const getGenresMoviesApi = () => {
  return innerFunction('genres')
}

export const getByIdMovieApi = (id: number) => {
  return innerFunction(id)
}

export const getRandomMovieApi = async () => {
  return await innerFunction('random')
}
