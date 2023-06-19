<template>
  <v-container fluid class="pa-0">
    <v-row align="center" justify="center" shrink>
      <v-col>
        <v-img
          :src="backgroundImage"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        >
          <v-container class="fill-height">
            <v-row align="center">
              <v-col>
                <h1 class="text-white">
                  KOTOV Handmade
                </h1>
              </v-col>
            </v-row>
          </v-container>
        </v-img>
      </v-col>
    </v-row>

    <v-progress-circular v-if="loading" indeterminate color="primary" class="mb-8"></v-progress-circular>
    <div v-else>
      <h2 class="text-center mt-4">Популярное</h2>
      <v-row class="ma-8">
        <v-col cols="12" sm="4" v-for="product in products" :key="product.id">
          <router-link :to="`/product/${product.id}`">
            <v-img
              cover=""
              class="rounded-lg"
              :src="product.image"
              aspect-ratio="1.7"
              :height="300"
            ></v-img>
          </router-link>
          <div class="text-center pt-4 font-weight-bold text-h6">{{ product.name }}</div>
        </v-col>
      </v-row>
    </div>

    <v-carousel cycle height="400px" hide-delimiters show-arrows="hover">
      <v-carousel-item
        v-for="i in 6"
        :key="i"
      >
        <v-img
          cover
          :src="backgroundImage"
        ></v-img>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script>
import mainbackground from '@/assets/mainbackground.png';
import axios from 'axios';

export default {
  name: 'MainPage',
  data() {
    return {
      loading: true,
      products: [],
      backgroundImage: mainbackground,
    };
  },
  methods: {
    async getTop() {
      axios
        .get('https://shop.asap-it.tech/api/products/top')
        .then((response) => {
          this.products = response.data.map((item) => ({
            id: item.id,
            name: item.title,
            price: item.price,
            image: item.image,
            quantity: 0,
          }));
          this.loading = false;
        })
        .catch((error) => {
          console.error(error);
          this.loading = false;
        });
    }
  },
  async created() {
    await this.getTop();
  }
};
</script>

<style scoped lang="scss">
</style>
