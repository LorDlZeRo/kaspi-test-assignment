<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { CardEntity } from '~/entities/card';
import { RatingEntity } from '~/entities/rating';
import { PriceEntity } from '~/entities/price';
import { ProductCardWidget } from '~/widgets/cardProduct';

export default Vue.extend({
  name: 'FavouritesPage',
  components: {
    CardEntity,
    RatingEntity,
    PriceEntity,
    ProductCardWidget,
  },
  computed: {
    ...mapGetters(['getFavouriteProducts']),
  },
});
</script>
<template>
  <div>
    <div v-if="getFavouriteProducts.length === 0">
      <p class="fav-page-text">Избранных товаров нет</p>
    </div>
    <ProductCardWidget v-else :products="getFavouriteProducts" />
  </div>
</template>
<style scoped>
.fav-page-text {
  margin-left: 50px;
}
</style>