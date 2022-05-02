import { computed, reactive, readonly } from "vue";

export interface Movies {
  Title: string;
  Year: number;
  imdbID: string;
  status: boolean;
}

export interface Info {
  page: number;
  per_page: number;
  total_pages: number;
  data: Array<Movies>;
}

export interface Filter {
  title: string;
  pages: number;
}

const defaultState = {
  movies: {
    page: 0,
    per_page: 0,
    total_pages: 0,
    data: [{ "Title": "Waterworld", "Year": 1995, "imdbID": "tt0114898" }]
  },

  filter: {
    title: "",
    pages: 1,
  },

  error: "",
};

const state = reactive(defaultState);

const getters = {
  getMovies: () => {
    return computed(() => state.movies);
  },

  getMoviesList: () => {
    return computed(() => state.movies.data);
  },

  getFilter: () => {
    return computed(() => state.filter);
  },
};

const actions = {
  fetchMovies: async () => {
    await fetch(
      `https://jsonmock.hackerrank.com/api/movies/search/?Title=${state.filter.title}&page=${state.filter.pages}`,
    )
      .then((res) => res.json())
      .then((json) => (state.movies = json))
      .catch((err) => (state.error = err));
  },

  onPageChange: async (page: number) => {
    state.filter.pages = page;
    await actions.fetchMovies();
  },

};

export default () => ({
  state: readonly(state),
  ...getters,
  ...actions,
});