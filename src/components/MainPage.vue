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
                <h1 class="text-white text-h2 font-weight-black mb-8">
                  KOTOV Handmade
                </h1>
                <p class="text-white text-h6">
                  KOTOV Handmade предлагает искусно изготовленные ручные свечи, сочетающие в себе
                  мастерство и страсть. В нашем ассортименте представлены уникальные свечи от
                  классических до ароматизированных. Уверены, что в эпоху массового производства,
                  ручная работа - истинная роскошь. Наши свечи не только красивы, но и качественны,
                  являясь маленькими произведениями искусства, добавляющими уют в ваш дом.
                </p>
              </v-col>
            </v-row>
          </v-container>
        </v-img>
      </v-col>
    </v-row>

    <v-progress-circular v-if="loading" indeterminate color="primary"
                         class="mb-8"></v-progress-circular>
    <div v-else>
      <h2 class="text-center mt-4 mb-4">Популярное</h2>
      <v-row class="ml-8 mr-8 mb-8">
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

    <v-progress-circular v-if="loadingSlides" indeterminate color="primary"
                         class="mb-8"></v-progress-circular>
    <div v-else>
      <h2 class="text-center mt-4 mb-4">Блог</h2>
      <v-carousel cycle height="400px" hide-delimiters show-arrows="hover">
        <v-carousel-item
          v-for="(slide, i) in slides"
          :key="i"
        >
          <router-link :to="`/blog/${slide.id}`" class="no-underline">
            <v-img
              cover
              :src="slide.image"
            >
              <v-container class="fill-height">
                <v-row align="end">
                  <v-col class="text-white" cols="12">
                    <h1 class="display-1">{{ slide.title }}</h1>
                  </v-col>
                </v-row>
              </v-container>
            </v-img>
          </router-link>
        </v-carousel-item>
      </v-carousel>
    </div>
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
      loadingSlides: true,
      products: [],
      backgroundImage: mainbackground,
      slides: [],
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
  },
  async mounted() {
    try {
      this.loadingSlides = true;
      const response = await axios.get('https://shop.asap-it.tech/api/blog');
      this.slides = response.data;
    } catch (error) {
      console.error(error);
    } finally {
      this.loadingSlides = false;
    }
  },
};
</script>

<style scoped lang="scss">
.no-underline {
  text-decoration: none;
  color: inherit;
}

.no-underline:visited {
  text-decoration: none;
  color: inherit;
}
</style>
