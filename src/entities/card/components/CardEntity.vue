<script>
import Vue from "vue";

export default Vue.extend({
  name: "CardEntity",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
});
</script>
<template>
  <div class="card" :id="item._id">
    <div class="card-image-container">
      <img
        :src="'https://netlifylordlzerotest.netlify.app' + item.photo"
        width="50px"
        class="card-image"
      />
    </div>
    <div class="card-divider"></div>
    <div class="card-name-wrapper">
      <nuxt-link to="/" class="card-text-name-link" as="script">{{
        item.name.short
      }}</nuxt-link>
    </div>
    <slot></slot>
  </div>
</template>
<style>
.card {
  padding: 20px 10px 20px 10px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.card-image-container {
  height: 150px;
}
.card-divider {
  margin-top: 20px;
  border-top: 1px solid #e5e5e5;
  width: 90%;
}
.card-name-wrapper {
  margin-top: 10px;
  height: 40px;
}
.card-text-name-link {
  color: #0089d0;
  font-size: 14px;
  text-decoration: none;
}
.card-text-name-link:hover {
  text-decoration: underline;
}
.card-image {
  width: 100%;
  max-height: 100%;
  object-fit: contain;
}
</style>
