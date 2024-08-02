<script>
import Vue from "vue";

export default Vue.extend({
  name: "PriceEntity",
  props: {
    price: {
      type: Number,
      required: true,
    },
    instalmentMonths: {
      type: Number,
      default: 12
    }
  },
});
</script>
<template>
    <div class="item-card-prices">
      <div class="item-card__debet">
        <span class="item-card__prices-title">Цена</span>
        <span class="item-card__prices-price">{{ price }} ₸</span>
      </div>
      <div class="item-card__instalment">
        <div class="item-card__prices-title">В рассрочку</div>
        <div class="item-card__prices-price-2">
          {{ Math.ceil(price / instalmentMonths) }}₸
        </div>
        <span class="item-card__add-info">{{ instalmentMonths }}x</span>
      </div>
    </div>
  </template>
<style scoped>
.item-card-prices {
  width: 100%;
  display: flex;
}

.item-card__debet {
  padding-right: 9px;
  border-right: 1px solid #e5e5e5;
  min-height: 42px;
}

.item-card__instalment {
  margin-left: 10px;
  white-space: nowrap;
  min-height: 42px;
}

.item-card__prices-title {
  display: block;
  color: #999;
  margin-bottom: 4px;
  min-height: 21px;
}

.item-card__prices-price {
  font-size: 17px;
  white-space: nowrap;
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  font-weight: 500;
  letter-spacing: -0.02em;
}
.item-card__prices-price-2 {
  display: inline-block;
  background: #ffd300;
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  font-weight: 500;
  font-size: 14px;
  padding: 2px 3px;
}

.item-card__add-info {
  display: inline-block;
  color: #999;
  font-size: 13px;
  letter-spacing: -0.05em;
  margin-left: 5px;
}
</style>
