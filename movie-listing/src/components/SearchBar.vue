<template>
  <div class="search-box ml-2">
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

  {{ filter }}
</template>

<script setup lang="ts">
import { reactive } from "@vue/reactivity";
import { Filter } from "../services/movie";

const filter = reactive<Filter>({
  title: "",
  pages: 0,
});
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
</style>
