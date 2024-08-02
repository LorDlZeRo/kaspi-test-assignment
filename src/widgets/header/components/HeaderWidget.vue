<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import { LogoEntity } from "~/entities/logo";

export default Vue.extend({
  name: "HeaderWidget",
  components: {
    LogoEntity
  },
  computed: {
    ...mapState(["basket"]),
    unpurchasedItemCount(): number {
      return this.basket.reduce((count, item) => {
        return item.isPurchased ? count : count + item.quantity;
      }, 0);
    },
  },

});
</script>
<template>
  <div class="header-component">
    <LogoEntity />
    <div>
      <span class="basket-icon-text">{{ unpurchasedItemCount }}</span>
      <font-awesome-icon :icon="['fass', 'cart-shopping']" class="fa-lg basket-icon" />
    </div>
  </div>
</template>
<style>
.header-component {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.basket-icon-text {
  color: #1398db;
  font-size: 14px;
  font-weight: bold;
}
.basket-icon {
  color: #1398db;
}
</style>
