<template>
  <div id="table" class="col-sm-12">
    <div class="offset">
      <table class="table">
        <thead>
          <tr>
            <th class="text-left">IMDB</th>
            <th class="text-left">Title</th>
            <th class="text-left">Year</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="items in movies" :key="items.imdbID" data-test="movies">
            <td>{{ items.imdbID }}</td>
            <td>{{ items.Title }}</td>
            <td>{{ items.Year }}</td>
          </tr>
        </tbody>
      </table>

      <div>
        <table-pagination
          :totalPages="pages.total_pages || 1"
          :currentPage="filter.pages"
          :maxVisibleButtons="10"
          @pagechanged="onPageChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "@vue/runtime-core";
import useMovieState from "../store/useMovieState";
import TablePagination from "./TablePagination.vue";

const { getMovies, getMoviesList, fetchMovies, getFilter, onPageChange } =
  useMovieState();

const movies = getMoviesList();
const filter = getFilter();
const pages = getMovies();

onMounted(fetchMovies());
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
