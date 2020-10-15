<template>
  <div class="index">
    <Notice title="Snipcart-powered demo store." />
    <Header title="ReplicaZone" />
    <div class="index__gallery">
      <template v-for="(product, index) in products">
        <Product :data="product" :key="index" />
      </template>
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Header from "~/components/Header.vue";
import Notice from "~/components/Notice.vue";
import Product from "~/components/Product.vue";
import Footer from "~/components/Footer.vue";

import { getContentfulProducts, toProduct } from "~/assets/products.ts";

export default Vue.extend({
  components: {
    Header,
    Notice,
    Product,
    Footer
  },
  head() {
    return {
      title: "ReplicaZone - Snipcart Demo"
    };
  },
  async asyncData({ route }) {
    const cProds = await getContentfulProducts()
    return {
      products: cProds.map(toProduct)
    };
  }
});
</script>

