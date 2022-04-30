<template>
  <div id="input" class="search-box ml-2">
    <div class="position-relative">
      <input
        type="text"
        class="form-control rounded"
        placeholder="Search..."
        v-model="filter.title"
      />
      <i class="mdi mdi-magnify search-icon"></i>
    </div>
  </div>

  <table id="movies">
    <tr v-for="item in movies || []" :key="item.imdbID">
      <td class="text-left">{{ item.imdbID }}</td>
      <td>
        <div id="title">{{ item.Title }}</div></td>
      <td>{{ item.Year }}</td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import { reactive, ref, unref } from "@vue/reactivity";
import { computed, onMounted, watch } from "vue";
import { useMovieApi, Filter, useFavourite, Movies } from "../services/movie";

const filter = reactive<Filter>({
  title: "",
  pages: 0,
});

const favouriteLists = ref<Array<Movies>>();

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

<style scoped lang="scss">
.search-box {
  .form-control {
    border-radius: 30px;
    padding-left: 40px;
  }
  .search-icon {
    font-size: 16px;
    position: absolute;
    left: 13px;
    top: 0;
    line-height: 28px;
  }
}

.text-left {
  text-align: left !important;
}
</style>
