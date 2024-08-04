<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import { ProductCardWidget } from "~/widgets/cardProduct";
import { Spinner } from "~/shared/ui";

export default Vue.extend({
  name: "IndexPage",
  components: {
    ProductCardWidget,
    Spinner,
  },

  created() {
    const url = process.env.API_URL;
     this.$store.dispatch("fetchProducts", url);
  },
  computed: {
    ...mapGetters(['filteredProducts']),
    amountPage() {
      return this.$store.getters["getAmountPage"];
    },
    isLoading() {
      return this.$store.state.loading;
    },
  },
});
</script>

<template>
  <div v-if="isLoading" class="spinner">
    <Spinner />
  </div>
  <ProductCardWidget v-else :products="filteredProducts" />
</template>
