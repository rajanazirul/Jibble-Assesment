import { computed, ref, unref, watch } from "vue";

export interface Filter {
  title: string;
  pages: number;
}

export interface Movies {
  Title: string;
  Year: number;
  imdbID: string;
}

export interface Info {
  page: number;
  per_page: number;
  total_pages: number;
  data: Array<Movies>;
}

export function useMovieApi(filter: Filter) {
  const data = ref<Info>();
  const error = ref(null);

  const movies = computed(() => {
    const v = unref(data);
    return v?.data;
  });
  const total_pages = computed(() => {
    const v = unref(data);
    return v?.total_pages;
  });

  async function getData() {
    await fetch(
      `https://jsonmock.hackerrank.com/api/movies/search/?Title=${filter.title}`
    )
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err));
  }

  async function getDataPage() {
    await fetch(
      `https://jsonmock.hackerrank.com/api/movies/search/?Title=${filter.title}&page=${filter.pages}`
    )
      .then((res) => res.json())
      .then((json) => (data.value = json))
      .catch((err) => (error.value = err));
  }

  watch(filter, () => getData());
  return { movies, total_pages, error, getData, getDataPage };
}
