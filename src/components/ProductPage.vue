<template>
  <v-container>
    <v-row class="mt-16">
      <v-progress-circular
        v-if="loading"
        indeterminate
        size="70"
        width="7"
        class="mx-auto"
      ></v-progress-circular>
      <v-col v-if="!loading" cols="12" sm="6">
        <v-img
          :src="product.image"
          aspect-ratio="1.7"
        ></v-img>
      </v-col>
      <v-col v-if="!loading" cols="12" sm="6">
        <v-card class="elevation-0">
          <v-card-title>{{ product.title }}</v-card-title>
          <v-card-subtitle>{{ product.price }} ₽</v-card-subtitle>
          <v-card-text>{{ product.description }}</v-card-text>
          <v-card-actions class="justify-center">
            <v-btn color="primary" text-color="black">Добавить в корзину</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import mainbackground from '@/assets/mainbackground.png';

export default {
  name: 'ProductPage',
  data() {
    return {
      loading: true,
      default_img: mainbackground,
      product: null,
    };
  },
  async created() {
    try {
      const res = await fetch(`https://shop.asap-it.tech/api/products/${this.$route.params.id}`);
      this.product = await res.json();
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  },
};
</script>
