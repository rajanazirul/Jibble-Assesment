import { computed, ref, unref, watch } from "vue";

export interface Filter {
  title: string;
  pages: number;
}

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

export function useMovieApi(filter: Filter) {
  const datas = ref<Info>();
  const error = ref(null);

  const movies = computed(() => {
    const { favouriteData } = useFavourite();
    const v = unref(datas);
    const movieData = v?.data || [];
    movieData.map((element) => {
      favouriteData.filter((i: string) => {
        if (i === element.imdbID) {
          element.status = true;
        }
      });
    });
    return movieData;
  });

  const total_pages = computed(() => {
    const v = unref(datas);
    return v?.total_pages;
  });

  async function getData() {
    await fetch(
      `https://jsonmock.hackerrank.com/api/movies/search/?Title=${filter.title}`,
    )
      .then((res) => res.json())
      .then((json) => (datas.value = json))
      .catch((err) => (error.value = err));
  }

  async function getDataPage() {
    await fetch(
      `https://jsonmock.hackerrank.com/api/movies/search/?Title=${filter.title}&page=${filter.pages}`,
    )
      .then((res) => res.json())
      .then((json) => (datas.value = json))
      .catch((err) => (error.value = err));
  }

  return { datas, movies, total_pages, error, getData, getDataPage };
}

export function useFavourite() {
  const favourite = localStorage.getItem("favourite");
  const favouriteData = favourite ? JSON.parse(favourite) : [];
  const error = ref(null);

  async function setFavourite(imdbID: string) {
    const index = favouriteData.indexOf(imdbID);
    if (index == -1) {
      await favouriteData.push(imdbID);
    }
    localStorage.setItem("favourite", JSON.stringify(favouriteData));
  }

  async function removeFavourite(imdbID: string) {
    const index = favouriteData.indexOf(imdbID);
    if (index > -1) {
      await favouriteData.splice(index, 1);
    }
    localStorage.setItem("favourite", JSON.stringify(favouriteData));
  }

  async function getDataFavourite() {
    const favouriteList = ref<Array<object>>([]);
    favouriteData.forEach(async (element: string) => {
      await fetch(
        `https://jsonmock.hackerrank.com/api/movies/search/?imdbID=${element}`,
      )
        .then((res) => res.json())
        .then((json: Info) => {
          favouriteList.value.push(json.data[0]);
        })
        .catch((err) => (error.value = err));
    });

    return favouriteList.value;
  }

  return {
    favouriteData,
    setFavourite,
    removeFavourite,
    getDataFavourite,
  };
}
