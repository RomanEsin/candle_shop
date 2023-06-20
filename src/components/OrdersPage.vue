<template>
  <v-container fluid class="mt-16">
    <h1 class="mb-8">Заказы</h1>
    <v-row v-if="loading" align="center" justify="center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-row>
    <v-row v-else>
      <v-col cols="12" md="6" v-for="(order, index) in orders" :key="index">
        <router-link :to="'/orders/' + order.id" class="no-underline">
          <v-card class="elevation-0 order-card ma-0" style="background: #eeeeee">
            <v-card-title>
              <span class="headline">Заказ №{{ order.id }}</span>
            </v-card-title>
            <v-card-text class="text-left ml-8">
              <p><strong>Статус:</strong> {{ order.status }}</p>
              <p><strong>Сумма заказа:</strong> {{ calculateTotal(order.basket.basket_items) }}</p>
              <p><strong>Кол-во позиций:</strong> {{ order.basket.basket_items.length }}</p>
              <p><strong>Адрес:</strong> {{ order.address }}</p>
            </v-card-text>
          </v-card>
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      loading: false,
      orders: [],
    };
  },
  methods: {
    calculateTotal(basketItems) {
      return basketItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    },
  },
  async mounted() {
    this.loading = true;
    try {
      const response = await axios.get('https://shop.asap-it.tech/api/orders/all');
      this.orders = response.data;
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
.order-card {
  transition: transform .2s;
  border-radius: 16px;
  background-color: #f5f5f5;
}

.order-card:hover {
  transform: scale(1.03);
}

.no-underline {
  text-decoration: none;
  color: black;
}

.no-underline:visited {
  color: inherit;
}
</style>
