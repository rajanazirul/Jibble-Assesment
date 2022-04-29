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
          <v-btn
            v-if="item.status"
            icon
            @click="
              () => {
                removeFavourite(item.imdbID);
                getDataPage();
              }
            "
          >
            <v-icon color="green">mdi-star</v-icon>
          </v-btn>
          <v-btn
            v-else
            icon
            @click="
              () => {
                setFavourite(item.imdbID);
                getDataPage();
              }
            "
          >
            <v-icon color="white">mdi-star</v-icon>
          </v-btn>
        </tr>
      </tbody>
    </v-table>

    <v-pagination
      v-model="filter.pages"
      :length="total_pages"
      @click="getDataPage"
    ></v-pagination>

    <v-table theme="dark">
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
          <v-btn
            icon
            @click="
              () => {
                removeFavourite(items.imdbID);
                getDataPage();
              }
            "
          >
            <v-icon color="red">mdi-delete</v-icon>
          </v-btn>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script setup lang="ts">
import { reactive, ref, unref } from "@vue/reactivity";
import { computed, onMounted, watch } from "vue";
import { useMovieApi, Filter, useFavourite, Movies } from "../services/movie";

const favouriteLists = ref<Array<Movies>>();

const filter = reactive<Filter>({
  title: "",
  pages: 0,
});

const favouriteName = computed(() => {
  const v = unref<Array<Movies>>(favouriteLists);
  return v;
});

const { movies, total_pages, getData, getDataPage } = useMovieApi(filter);

const { setFavourite, removeFavourite, getDataFavourite } = useFavourite();

watch(
  movies,
  () => getDataFavourite().then((res) => (favouriteLists.value = res)),
  {
    immediate: true,
  }
);

onMounted(getData);
</script>
