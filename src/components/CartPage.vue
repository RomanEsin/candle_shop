<template>
  <v-container class="mt-16">
    <v-row>
      <v-col cols="12">
        <h1>Моя корзина</h1>
        <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>
        <div v-else>
          <v-list two-line>
            <v-list-item v-for="item in items" :key="item.id">
              <v-row>
                <v-col cols="2">
                  <v-img :src="defaultImage" aspect-ratio="1" cover :width="80" :height="80"/>
                </v-col>
                <v-col cols="6">
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ item.product.title }} - {{ item.product.price }}₽
                    </v-list-item-title>
                    <v-list-item-subtitle>Количество: {{ item.quantity }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-col>
                <v-col cols="4" class="text-end">
                  <v-list-item-action>
                    <v-btn color="primary" @click="addToCart(item.product)">+</v-btn>
                    <v-btn color="secondary" @click="removeFromCart(item.product)">-</v-btn>
                  </v-list-item-action>
                </v-col>
              </v-row>
            </v-list-item>
          </v-list>
          <div>
            <h3>Общая сумма: {{ total }}₽</h3>
          </div>
        </div>
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
  computed: {
    total() {
      return this.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    },
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
};
</script>
