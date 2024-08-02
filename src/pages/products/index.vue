<script lang="ts">
import Vue from "vue";
import { ProductCardWidget } from "~/widgets/cardProduct";
import { Spinner } from "~/shared/ui";
import { mapGetters } from "vuex";

export default Vue.extend({
  name: "ProductPage",
  components: {
    ProductCardWidget,
    Spinner
  },
  created() {
    const productId = this.$route.query.id as string;
    const baseUrl = process.env.API_URL;
    const url = `${baseUrl}?id=${productId}`;
    this.$store.dispatch('fetchProducts', url);
  },
  watch: {
    '$route.query.id': {
      immediate: true,
      handler(newId) {
        if (newId) {
          const baseUrl = process.env.API_URL;
          const url = `${baseUrl}?id=${newId}`;
          this.$store.dispatch('fetchProducts', url);
        }
      }
    }
  },
  computed: {
    ...mapGetters(['filteredProducts']),
    isLoading() {
      return this.$store.state.loading;
    },
  }
});
</script>
<template>
  <div>
    <div v-if="isLoading" class="spinner">
      <Spinner />
    </div>
    <ProductCardWidget v-else :products="filteredProducts" />
  </div>
</template>