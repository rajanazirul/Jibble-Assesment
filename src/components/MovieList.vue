<template>
  <search-bar @submit="submitSearch" />
  {{ filter }}
  <div>
    <div class="container">
      <div class="search-box">
        <input
          type="text"
          class="search-input"
          placeholder="Search.."
          v-model="filter.title"
        />

        <button class="search-button" @click="submit()">
          <i class="mdi mdi-magnify search-icon"></i>
        </button>
      </div>
    </div>

    <div id="table" class="col-sm-12">
      <div class="offset">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>User ID</th>
              <th>Favourite</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in movies" :key="p.imdbID">
              <td>{{ p.imdbID }}</td>
              <td>{{ p.Title }}</td>
              <td>{{ p.Year }}</td>
              <td>
                <favourite-button
                  :item="p"
                  :filter="filter"
                  @add="add(p.imdbID)"
                  @remove="remove(p.imdbID)"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <table-pagination
      :totalPages="total_pages || 1"
      :currentPage="filter.pages"
      :maxVisibleButtons="10"
      @pagechanged="onPageChange"
    />

    <div id="table" class="col-sm-12">
      <div class="offset">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th class="text-left">IMDB</th>
              <th class="text-left">Title</th>
              <th class="text-left">Year</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="items in favouriteName" :key="items.imdbID">
              <td>{{ items.imdbID }}</td>
              <td>{{ items.Title }}</td>
              <td>{{ items.Year }}</td>
              <td>
                <button
                  class="icon"
                  type="button"
                  @click="
                    () => {
                      removeFavourite(items.imdbID);
                      getDataPage();
                    }
                  "
                >
                  <i class="mdi mdi-delete"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, unref } from "@vue/reactivity";
import { computed, onMounted, watch } from "vue";
import { useMovieApi, Filter, useFavourite, Movies } from "../services/movie";
import TablePagination from "./TablePagination.vue";
import FavouriteButton from "./FavouriteButton.vue";
import SearchBar from "./SearchBar.vue";

const filter = reactive<Filter>({
  title: "",
  pages: 1,
});

const favouriteLists = ref<Array<Movies>>();

const favouriteName = computed(() => {
  const v = unref<Array<Movies>>(favouriteLists);
  return v;
});

const { movies, total_pages, getData, getDataPage } = useMovieApi(filter);
const { setFavourite, removeFavourite, getDataFavourite } = useFavourite();

function onPageChange(page: number) {
  filter.pages = page;
  getDataPage();
}

function submit() {
  getData();
}

function submitSearch(v: Filter) {
  filter.title = v.title;
}

function add(imdbID: string) {
  setFavourite(imdbID);
  getDataPage();
}

function remove(imdbID: string) {
  removeFavourite(imdbID);
  getDataPage();
}

watch(
  movies,
  () => getDataFavourite().then((res) => (favouriteLists.value = res)),
  {
    immediate: true,
  },
);

onMounted(getData());
</script>

<style scoped>
.search-box {
  width: 100%;
  position: relative;
  display: flex;
}
.search-input {
  width: 100%;
  padding: 10px;
  border: 4px solid #111d5e;
  border-radius: 10px 0 0 10px;
  border-right: none;
  outline: none;
  font-size: 20px;
  color: tomato;
  background: none;
}
.search-button {
  text-align: center;
  height: 61px;
  width: 40px;
  outline: none;
  cursor: pointer;
  border: 4px solid #111d5e;
  border-radius: 0 10px 10px 0;
  border-left: none;
  background: none;
  font-size: 20px;
  border-left: 4px solid #111d5e;
}
.container {
  width: 100%;
  position: relative;
}

button.page-link {
  display: inline-block;
}
button.page-link {
  font-size: 20px;
  color: #29b3ed;
  font-weight: 500;
}
.offset {
  width: 500px !important;
  margin: 20px auto;
}

#table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#table td,
#table th {
  border: 1px solid #ddd;
  padding: 8px;
}

#table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #111d5e;
  color: white;
}
</style>
