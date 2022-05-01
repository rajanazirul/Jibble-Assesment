<template>
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
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, unref, watch } from "@vue/runtime-core";
import { Movies, useFavourite, useMovieApi } from "../services/movie";

const props = defineProps({
  filter: {
    type: Object,
  },
});

const favouriteLists = ref<Array<Movies>>();

const favouriteName = computed(() => {
  const v = unref<Array<Movies>>(favouriteLists);
  return v;
});

const { movies } = useMovieApi(props.filter);

const { getDataFavourite } = useFavourite();

watch(
  movies,
  () => {
    getDataFavourite().then((res) => (favouriteLists.value = res));
  },
  {
    immediate: true,
  },
);
</script>
