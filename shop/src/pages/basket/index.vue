<script lang="ts">
import { mapState, mapActions } from "vuex";
import { MainButton } from "~/shared/ui";

export default {
  components: {
    MainButton,
  },
  computed: {
    ...mapState(["basket", "isBasketCheckedOut", "totalAmount"]),
  },

  methods: {
    ...mapActions([
      "removeFromBasket",
      "updateBasketItemQuantity",
      "checkoutBasket",
      "calculateTotalAmount",
    ]),
    onQuantityChange(productId: string, event: Event) {
      const target = event.target as HTMLInputElement;
      if (target) {
        this.updateBasketItemQuantity({
          productId,
          quantity: parseInt(target.value, 10),
        });
      }
    },
    deleteItem(productId: string, orderId: string) {
      console.log(orderId);
      this.removeFromBasket({ productId, orderId });
    },
    checkoutBasket2() {
      this.checkoutBasket();
    },
  },
};
</script>

<template>
  <div class="basket-container">
    <ul v-if="basket.length > 0" class="basket-list">
      <li
        v-for="item in basket"
        :key="item.product._id + item.orderId"
        class="basket-item"
      >
        <h3>{{ item.product.name.full }}</h3>
        <p>Цена: {{ item.product.price * item.quantity }} ₸</p>
        <p>
          Количество:
          <input
            type="number"
            :value="item.quantity"
            @input="onQuantityChange(item.product._id, $event)"
            min="1"
            :disabled="item.isPurchased"
          />
        </p>
        <div class="basket-list-button-wrapper">
          <MainButton
            @click="deleteItem(item.product._id, item.orderId)"
            :disabled="item.isPurchased"
          >
            Удалить
          </MainButton>
        </div>
      </li>
      <p>Общая сумма: {{ totalAmount }} ₸</p>

      <MainButton
        color="blue"
        :disabled="totalAmount === 0"
        @click="checkoutBasket2"
      >
        Оплатить</MainButton
      >
    </ul>
    <p class="basket-page-text" v-else>Корзина пуста</p>
  </div>
</template>

<style scoped>
.basket-page-text {
  margin-left: 50px;
}
.basket-list {
  list-style: none;
  padding: 0;
  margin: 0 30px;
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
