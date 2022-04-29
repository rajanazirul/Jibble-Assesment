<template>
  <v-container>
    <v-text-field
      v-model="filter.title"
      class="mr-2 py-2"
      hide-details="auto"
      label="Search for Movie"
      append-icon="mdi-magnify"
    />

    <v-table theme="dark">
      <thead>
        <tr>
          <th class="text-left">IMDB</th>
          <th class="text-left">Title</th>
          <th class="text-left">Year</th>
          <th class="text-left">Favourite</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in movies" :key="item.imdbID">
          <td>{{ item.imdbID }}</td>
          <td>{{ item.Title }}</td>
          <td>{{ item.Year }}</td>
          <v-switch v-model="sw" :label="`Campaign Status`"></v-switch>
        </tr>
      </tbody>
    </v-table>

    <v-pagination
      v-model="filter.pages"
      :length="total_pages"
      @click="getDataPage"
    ></v-pagination>

    <!-- {{ movies }} -->
  </v-container>
</template>

<script setup lang="ts">
import { reactive, ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { useMovieApi, Filter } from "../services/movie";

const filter = reactive<Filter>({
  title: "",
  pages: 0,
});

const sw = ref();

const { movies, total_pages, getData, getDataPage } = useMovieApi(filter);

onMounted(getData);
</script>
