<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "MenuFeature",
  data() {
    return {
      menu: [{
        name: 'Все категорий',
        route: '/'
      },
      {
        name: 'Телефоны',
        route: '/products?id=655b223d8576c038f93b3b88'
      },
      {
        name: 'Ноутбуки',
        route: '/products?id=65ad113850f450f6a852075c'
      },
      {
        name: 'Избранные',
        route: '/favourites'
      },
      {
        name: 'Корзина',
        route: '/basket'
      },
       ],
    };
  },
});
</script>
<template>
  <ul class="main-menu">
    <li v-for="(item, index) in menu" :key="index">
      <nuxt-link class="menu-span-text" :to="item.route" as="script"> {{ item.name }}</nuxt-link>
    </li>
  </ul>
</template>
<style scoped>
.main-menu {
  border-left: 1px solid #e5e5e5;
  border-top: 1px solid #e5e5e5;
}

.main-menu:hover {
  background-color: #f5f5f5;
}
.main-menu > li {
  display: flex;
  align-items: center;
  height: 45px;
  border-right: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
}

.main-menu > li:hover {
  cursor: pointer;
  background-color: #fff;
  border-left: 2px solid black;
  border-right: none;
  height: 45px;
}

.menu-span-text {
  margin-left: 15px;
  font-weight: 500;
  color: #0089d0;
  text-align: center;
  font-size: 13px;
  line-height: 1.2;
  letter-spacing: normal;
  text-transform: uppercase;
  user-select: none;
  text-decoration: none;
}
.menu-span-text:hover {
  text-decoration: underline;
}
</style>
