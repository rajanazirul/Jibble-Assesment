<template>
  <ul class="pagination">
    <li class="pagination-item">
      <button
        type="button"
        @click="onClickFirstPage"
        v-if="props.currentPage != 1"
        class="page-link"
      >
        <p>First</p>
      </button>
    </li>

    <li class="pagination-item">
      <button
        type="button"
        @click="onClickPreviousPage"
        v-if="props.currentPage != 1"
        class="page-link"
      >
        <p>Previous</p>
      </button>
    </li>

    <!-- Visible Buttons Start -->
    <li v-for="page in pages" :key="page.name" class="pagination-item">
      <div>
        <button
          type="button"
          @click="onClickPage(page.name)"
          class="page-link"
          data-test="pagination"
        >
          <p>{{ page.name }}</p>
        </button>
      </div>
    </li>

    <!-- Visible Buttons End -->
    <li class="pagination-item">
      <button
        type="button"
        @click="onClickNextPage"
        :disabled="isInLastPage"
        class="page-link"
      >
        <p>Next {{ props.total_pages }}</p>
      </button>
    </li>

    <li class="pagination-item">
      <button
        type="button"
        @click="onClickLastPage"
        v-if="props.currentPage !== props.totalPages"
        class="page-link"
      >
        <p>Last</p>
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from "@vue/runtime-core";

const props = defineProps({
  maxVisibleButtons: {
    type: Number,
    required: false,
    default: 3,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
});

const emits = defineEmits(["pagechanged"]);

const startPage = computed(() => {
  // When on the first page
  if (props.currentPage === 1) {
    return 1;
  }

  // When on the last page
  if (props.currentPage === props.totalPages) {
    return props.totalPages - props.maxVisibleButtons;
  }

  // When inbetween
  return props.currentPage - 1;
});

const pages = computed(() => {
  const range = [];
  for (
    let i = startPage.value;
    i <=
    Math.min(startPage.value + props.maxVisibleButtons - 1, props.totalPages);
    i++
  ) {
    range.push({
      name: i,
      isDisabled: i === props.currentPage,
    });
  }
  return range;
});

const isInLastPage = computed(() => {
  return props.currentPage === props.totalPages;
});

function onClickFirstPage() {
  emits("pagechanged", 1);
}

function onClickPreviousPage() {
  emits("pagechanged", props.currentPage - 1);
}

function onClickPage(page) {
  emits("pagechanged", page);
}

function onClickNextPage() {
  const v = props.currentPage + 1;
  emits("pagechanged", v);
}

function onClickLastPage() {
  emits("pagechanged", props.totalPages);
}
</script>

<style scoped>
.pagination {
  list-style-type: none;
}
.pagination-item {
  display: inline-block;
  margin-right: 10px;
}
button.page-link {
  display: inline-block;
}
button.page-link {
  font-size: 20px;
  color: #29b3ed;
  font-weight: 500;
}
</style>
