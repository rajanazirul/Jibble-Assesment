<template>
  <div class="container">
    <div class="search-box">
      <input
        type="text"
        class="search-input"
        placeholder="Search.."
        v-model="title"
      />
      <button class="search-button" @click="emits(`submit`, title)">
        <i class="mdi mdi-magnify search-icon"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "@vue/runtime-core";

const title = ref();

const emits = defineEmits(["submit"]);
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
</style>
