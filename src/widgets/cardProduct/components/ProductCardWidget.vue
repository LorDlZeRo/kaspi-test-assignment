<script lang="ts">
import Vue from "vue";
import { mapActions } from "vuex";
import { PriceEntity } from "~/entities/price";
import { RatingEntity } from "~/entities/rating";
import { CardEntity } from "~/entities/card";
import { MainButton } from "~/shared/ui";
import { Product } from "~/shared/interfaces";

export default Vue.extend({
  name: "ProductCardWidget",
  props: {
    products: {
      type: Array as () => Product[],
      required: true,
    },
  },
  components: {
    PriceEntity,
    RatingEntity,
    CardEntity,
    MainButton,
  },
  methods: {
    ...mapActions(["setFavourites", "addToBasket"]),
    toggleFavourite(item: Product) {
      if (item) {
        this.setFavourites(item._id);
      }
    },
    addToCart(item: Product) {
      this.addToBasket(item);
    },
  },
});
</script>

<template>
  <ul class="card-list-container">
    <li class="card-list" v-for="item in products" :key="item._id">
      <CardEntity :item="item">
        <RatingEntity size="small" />
        <div class="order-count-text-wrapper">
          <span :class="`order-count-text`" as="script">
            Количество заказов: {{ item.orderCount }}
          </span>
        </div>
        <PriceEntity :price="item.price" />
        <div class="card-button-wrapper">
          <MainButton color="blue" @click="addToCart(item)">Добавить в корзину</MainButton>
        </div>
        <div class="fav-wrapper">
          <font-awesome-icon
            :icon="['fas', 'heart']"
            :color="item.isFavorite ? 'red' : 'grey'"
            class="favourite-icon"
            @click="toggleFavourite(item)"
          />
        </div>
      </CardEntity>
    </li>
  </ul>
</template>

<style scoped>
.card-list-container {
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  width: 722px;
  border-left: 1px solid #e5e5e5;
  border-top: 1px solid #e5e5e5;
}
.card-list {
  width: 240px;
  border-right: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
}
.card-button-wrapper {
  margin-top: 10px;
  width: 100%;
}
.favourite-icon {
  margin-top: 10px;
}
.order-count-text-wrapper {
  width: 100%;
}
.order-count-text {
  color: #0089d0;
  font-size: 14px;
}
</style>
