<template>
  <div id="table" class="col-sm-12">
    <div class="offset" id="search">
      <div>
        <search-bar @submit="submit" />
      </div>
      <table class="table" id="movies">
        <thead>
          <tr>
            <th data-test="movies" class="text-left">IMDB</th>
            <th class="text-left">Title</th>
            <th class="text-left">Year</th>
            <th class="text-left">Favourite</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="items in status" :key="items.imdbID">
            <td>{{ items.imdbID }}</td>
            <td>{{ items.Title }}</td>
            <td>{{ items.Year }}</td>
            <td>
              <favourite-button
                :item="items"
                :filter="filter"
                @add="add(items)"
                @remove="remove(items.imdbID)"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div id="page">
        <table-pagination
          :totalPages="pages.total_pages || 1"
          :currentPage="filter.pages"
          :maxVisibleButtons="10"
          @pagechanged="onPageChange"
        />
      </div>

      <div class="offset" id="favourite">
        <h1>Favourite Table</h1>
        <table class="table">
          <thead>
            <tr>
              <th class="text-left">IMDB</th>
              <th class="text-left">Title</th>
              <th class="text-left">Year</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="items in favourite" :key="items.imdbID">
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
import { onMounted } from "@vue/runtime-core";
import useMovieState from "../store/useMovieState";
import TablePagination from "./TablePagination.vue";
import SearchBar from "./SearchBar.vue";
import FavouriteButton from "./FavouriteButton.vue";
import useFavouriteState from "../store/useFavouriteState";

const { getMovies, fetchMovies, getFilter, onPageChange, submit, getStatus } =
  useMovieState();

const { addFavourite, removeFavourite, getFavourite } = useFavouriteState();

const filter = getFilter();
const pages = getMovies();
const status = getStatus();
const favourite = getFavourite();

function add(data: object) {
  addFavourite(data);
  fetchMovies();
}

function remove(imdbID: string) {
  removeFavourite(imdbID);
  fetchMovies();
}

onMounted(fetchMovies());
</script>

<style scoped>
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
