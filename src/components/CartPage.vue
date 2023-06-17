<template>
  <v-container class="mt-16">
    <v-row>
      <v-col cols="12" md="6">
        <h1>Моя корзина</h1>
        <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>
        <div v-else>
          <v-list two-line>
            <v-list-item v-for="item in items" :key="item.id">
              <v-row align="center">
                <v-col cols="2">
                  <v-img :src="defaultImage" aspect-ratio="1" cover :width="80" :height="80"/>
                </v-col>
                <v-col cols="6">
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ item.product.title }} - {{ item.product.price }}₽
                    </v-list-item-title>
                  </v-list-item-content>
                </v-col>
                <v-col cols="4" class="text-center">
                  <v-list-item-action>
                    <v-btn color="#eeeeee" :width="30" :height="30" elevation="0" icon
                           class="mr-2" @click="removeFromCart(item.product)">-
                    </v-btn>
                    <span class="mx-2 font-weight-bold">{{ item.quantity }}</span>
                    <v-btn color="#eeeeee" :width="30" :height="30" elevation="0" icon
                           class="ml-2" @click="addToCart(item.product)">+
                    </v-btn>
                    <v-btn color="white" :width="40" :height="40" icon elevation="0"
                           class="mx-2" @click="removeFromCart(item.product)">
                      <v-icon color="grey darken-2" :width="60" :height="60">mdi-delete</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-col>
              </v-row>
            </v-list-item>
          </v-list>
        </div>
      </v-col>

      <v-col cols="12" md="6">
        <v-row align="center" justify="center" style="height: 100%;">
          <div v-if="!loading && items.length > 0" class="text-end">
            <h3>Количество товаров: {{ totalCount }}</h3>
            <h3>Общая сумма: {{ total }}₽</h3>
            <v-btn color="primary">Оформить заказ</v-btn>
          </div>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';
import mainbackground from '@/assets/mainbackground.png';

export default {
  data() {
    return {
      defaultImage: mainbackground,
      loading: true,
      items: [],
    };
  },
  methods: {
    async loadCart() {
      const config = {
        headers: {
          Authorization: Cookies.get('Authorization'),
          'Content-Type': 'application/json',
        },
      };

      try {
        const response = await axios.get('https://shop.asap-it.tech/api/basket', config);
        this.items = response.data.basket_items;
        this.loading = false;
      } catch (error) {
        console.error(error);
      }
    },
    async addToCart(product) {
      const config = {
        headers: {
          Authorization: Cookies.get('Authorization'),
          'Content-Type': 'application/json',
        },
      };

      try {
        await axios.post(`https://shop.asap-it.tech/api/basket/${product.id}`, {}, config);
        this.loadCart();
      } catch (error) {
        console.error(error);
      }
    },
    async removeFromCart(product) {
      const config = {
        headers: {
          Authorization: Cookies.get('Authorization'),
          'Content-Type': 'application/json',
        },
      };

      try {
        await axios.delete(`https://shop.asap-it.tech/api/basket/${product.id}`, config);
        this.loadCart();
      } catch (error) {
        console.error(error);
      }
    },
  },
  async created() {
    this.loadCart();
  },
  computed: {
    total() {
      return this.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    },
    totalCount() {
      return this.items.reduce((sum, item) => sum + item.quantity, 0);
    },
  },
};
</script>
<style scoped>
.v-chip {
  font-size: 1.2em;
}
</style>
