import { computed, reactive, readonly, watch } from "vue";

export interface Movies {
  Title: string;
  Year: number;
  imdbID: string;
  status: boolean;
}

export interface State {
  favourite: Array<Movies>;
}

const STATE_NAME = "favourite";

const defaultState: State = {
  favourite: [],
};

const getDefaultState = () => {
  if (localStorage.getItem(STATE_NAME) !== null) {
    return JSON.parse(localStorage.getItem(STATE_NAME));
  }

  return defaultState;
};

const state = reactive(getDefaultState());

const getters = {
  getFavourite: () => {
    return computed(() => state.favourite);
  },
};

const actions = {
  addFavourite: async (favouriteData: Movies) => {
    state.favourite.push(favouriteData);
  },

  removeFavourite: async (imdbID: string) => {
    const indexOfMovie = state.favourite.findIndex(
      (i: Movies) => i.imdbID === imdbID,
    );
    state.favourite.splice(indexOfMovie, 1);
  },
};

watch(
  () => state,
  () => {
    localStorage.setItem(STATE_NAME, JSON.stringify(state));
  },
  { deep: true }
);

export default () => {
  if (localStorage.getItem(STATE_NAME) === null) {
    localStorage.setItem(STATE_NAME, JSON.stringify(state));
  }
  return {
    state: readonly(state),
    ...getters,
    ...actions,
  };
};