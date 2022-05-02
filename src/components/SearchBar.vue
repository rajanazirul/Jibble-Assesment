<template>
  <div class="container">
    <div class="search-box">
      <input
        type="text"
        class="search-input"
        placeholder="Search.."
        v-model="filter.title"
      />

      <button class="search-button" @click="emits(`submit`, filter)">
        <i class="mdi mdi-magnify search-icon"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "@vue/runtime-core";
import { Filter } from "../services/movie";

const filter = reactive<Filter>({
  title: "",
  pages: 1,
});

const emits = defineEmits(["submit"]);
</script>
