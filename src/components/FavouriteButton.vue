<template>
  <button v-if="item.status" type="button" @click="emits(`remove`)">
    <i class="mdi mdi-star"></i>
  </button>
  <button v-else class="red" type="button" @click="emits(`add`)">
    <i class="mdi mdi-star"></i>
  </button>
</template>

<script setup lang="ts">
import { computed } from "@vue/runtime-core";

const props = defineProps({
  item: {
    status: {
      type: Boolean,
    },
    imdbId: {
      type: String,
    },
  },
  filter: {
    title: {
      type: String,
    },
    pages: {
      type: Number,
    },
  },
});

const emits = defineEmits(["add", "remove"]);

const item = computed(() => {
  return props.item;
});
</script>

<style scoped>
.red {
  color: rgb(109, 2, 2);
}
</style>
