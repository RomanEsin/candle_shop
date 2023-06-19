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

    <h2 class="text-center mt-4">Популярное</h2>

    <v-row class="ma-8">
      <v-col cols="12" sm="4" v-for="product in products" :key="product.id">
        <router-link :to="`/product/${product.id}`">
          <v-img
            class="rounded-lg"
            :src="product.image"
            aspect-ratio="1.7"
          ></v-img>
        </router-link>
        <div class="text-center pt-4">{{ product.name }}</div>
      </v-col>
    </v-row>

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

export default {
  name: 'MainPage',
  data() {
    return {
      products: [
        {
          id: 'candle-1',
          name: 'Candle 1',
          image: mainbackground
        },
        {
          id: 'candle-2',
          name: 'Candle 2',
          image: mainbackground
        },
        {
          id: 'candle-3',
          name: 'Candle 3',
          image: mainbackground
        }
      ],
      backgroundImage: mainbackground,
    };
  },
};
</script>

<style scoped lang="scss">
</style>
