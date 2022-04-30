<template>
  <search-bar />
  <hello-world />
  <table-renderer :filter="{title: `as`,
  pages: 0}"/>
</template>

<script setup lang="ts">
import SearchBar from "../components/SearchBar.vue";
import HelloWorld from "../components/HelloWorld.vue";
import TableRenderer from "../components/TableRenderer.vue";
</script>
