<script lang="ts">
import { BasketItem } from "~/shared/interfaces";

export default {
  props: {
    items: {
      type: Array as () => BasketItem[],
      required: true,
    },
  },
};
</script>
<template>
  <div>
    <h3>{{ product.name.full }}</h3>
    
  </div>
</template>
<style scoped>
.basket-list {
  list-style: none;
  padding: 0;
}

.basket-item {
  border: 1px solid #e5e5e5;
  padding: 10px;
  margin-bottom: 10px;
}

.basket-item h3 {
  margin: 0 0 10px;
}

.basket-item p {
  margin: 5px 0;
}
.basket-list-button-wrapper {
  width: 20%;
}
</style>
