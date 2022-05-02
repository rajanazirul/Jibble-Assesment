import { useFavourite } from "@/services/movie";
import { computed, reactive, readonly, unref } from "vue";
import useFavouriteState from "../store/useFavouriteState";

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

export interface MovieState {
  movies: Info;
  filter: Filter;
  error: string;
}

const defaultState: MovieState = {
  movies: {
    page: 1,
    per_page: 1,
    total_pages: 1,
    data: [],
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

  getStatus: () => {
    return computed(() => {
      const { getFavourite } = useFavouriteState();
      const favouriteData = unref(getFavourite());
      const movieData = state.movies.data || [];
      movieData.map((element) => {
        favouriteData.filter((i) => {
          if (i.imdbID === element.imdbID) {
            element.status = true;
          }
        });
      });
      return movieData;
    });
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

  submit: async (title: string) => {
    state.filter.title = title;
    await actions.fetchMovies();
  },
};

export default () => ({
  state: readonly(state),
  ...getters,
  ...actions,
});