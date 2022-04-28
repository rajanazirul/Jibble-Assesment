import { ref } from "vue";

export function useMovieApi(title: string, page: number) {
  const data = ref(null);
  const error = ref(null);

  fetch(
    `https://jsonmock.hackerrank.com/api/movies/search/?Title=${title}&page=${page}`
  )
    .then((res) => res.json())
    .then((json) => (data.value = json))
    .catch((err) => (error.value = err));

  return { data, error };
}
