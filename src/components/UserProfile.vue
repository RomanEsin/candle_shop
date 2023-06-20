<template>
  <v-container class="mt-16">
    <h1>Личный кабинет</h1>

    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model="name" label="Имя" :rules="nameRules" required></v-text-field>
      <v-text-field v-model="email" label="E-mail" :rules="emailRules" required></v-text-field>
      <v-btn color="red" @click="logout">Выйти</v-btn>
    </v-form>

    <h2>История заказов</h2>
    <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>
    <div v-else>
      <div v-for="order in orders" :key="order.id">
        <v-list-item>
          <div>
            <v-row>
              <v-col cols="3" class="text-h6">
                Номер заказа: {{ order.id }}
              </v-col>
              <v-col cols="3" class="text-h6">
                Дата заказа: {{ formatDate(order.create_date) }}
              </v-col>
              <v-col cols="3" class="text-h6">
                Сумма: {{ order.total }}₽
              </v-col>
              <v-col cols="3" class="text-h6 font-weight-bold">
                Статус: {{ getStatusTitle(order.status) }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="text-h6">
                Описание: {{ getStatusDescription(order.status) }}
              </v-col>
            </v-row>
          </div>
        </v-list-item>
        <v-divider></v-divider>
      </div>
    </div>
  </v-container>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';
import router from '@/router';

export default {
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      (v) => !!v || 'Имя обязательно',
      (v) => (v && v.length <= 10) || 'Имя должно быть менее 10 символов',
    ],
    surname: '',
    phone: '',
    phoneRules: [
      (v) => !!v || 'Номер телефона обязателен',
      (v) => (v && v.length <= 10) || 'Номер телефона должен быть менее 10 символов',
    ],
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail обязателен',
      (v) => /.+@.+\..+/.test(v) || 'E-mail должен быть действительным',
    ],
    loading: true,
    orders: [],
    user: null
  }),

  methods: {
    getStatusTitle(status) {
      const statuses = {
        created: "Заказ создан",
        paid: "Заказ оплачен",
        canceled: "Заказ отменен",
        delivered: "Заказ выполнен"
      };
      return statuses[status];
    },
    getStatusDescription(status) {
      const descriptions = {
        created: "Мы получили ваш заказ и обрабатываем его",
        paid: "Мы получили оплату и готовим ваш заказ",
        canceled: "Мы отменили ваш заказ",
        delivered: "Мы доставили ваш заказ"
      };
      return descriptions[status];
    },
    async loadOrders() {
      const config = {
        headers: {
          Authorization: Cookies.get('Authorization'),
          'Content-Type': 'application/json',
        },
      };

      try {
        const response = await axios.get('https://shop.asap-it.tech/api/orders', config);
        this.orders = response.data.map(order => ({
          ...order,
          total: this.calculateTotal(order.basket.basket_items),
        }));
        this.loading = false;
      } catch (error) {
        console.error(error);
      }
    },
    calculateTotal(items) {
      return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    },
    formatDate(date) {
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      return new Date(date).toLocaleDateString(undefined, options);
    },
    logout() {
      Cookies.remove('Authorization');
      this.$router.push('/login');
    },
    async loadUser() {
      const config = {
        headers: {
          Authorization: Cookies.get('Authorization'),
          'Content-Type': 'application/json',
        },
      };

      try {
        const response = await axios.get('https://shop.asap-it.tech/api/users/me', config);
        this.user = response.data;
        this.name = this.user.name;
        this.email = this.user.email;
        const expiresInMinutes = 60; // Пример 60 минут
        const date = new Date();
        date.setTime(date.getTime() + (expiresInMinutes * 60 * 1000));

        Cookies.set('AdminAccess', this.user.is_superuser, { expires: date });
      } catch (error) {
        console.error(error);
      }
    }
  },
  async created() {
    await this.loadUser();
    await this.loadOrders();
  },
};
</script>
