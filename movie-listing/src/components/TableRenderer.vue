<template>
  <div>
    {{ evens }}
  </div>
</template>

<script lang="ts">
import { computed, onMounted, unref, watch } from "@vue/runtime-core";
import { useMovieApi } from "../services/movie";

export default {
  name: "NumberRenderer",
  props: {
    filter: {
      title: String,
      pages: Number,
    },
  },
  setup(props) {
    const { movies, total_pages, getData, getDataPage } = useMovieApi(
      props.filter
    );

    const evens = computed(() => {
      const even = unref(movies);
      return even;
    });

    onMounted(getData());

    return { movies, evens };
  },
};
</script>

<style></style>
