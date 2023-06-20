<template>
  <v-container fluid class="mt-16">
    <v-row v-if="loading" align="center" justify="center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <v-card class="elevation-0">
          <v-card-title>
            <span class="headline">Заказ #{{ order.id }}</span>
          </v-card-title>
          <v-card-text>
            <div>
              <strong>Адрес:</strong> {{ order.address }}
            </div>
            <div>
              <strong>Комментарий:</strong> {{ order.comment }}
            </div>
            <v-select
              v-model="selectedStatus"
              :items="statuses"
              label="Изменить статус"
              outlined
              dense
            ></v-select>
            <v-btn color="primary" @click="updateStatus">Изменить статус</v-btn>
            <div>
              <strong>Общая стоимость заказа:</strong> {{ calculateTotal(order.basket.basket_items) }}
            </div>
            <div>
              <h3>Продукты:</h3>
              <v-row>
                <v-col cols="10" md="2" v-for="(item, index) in order.basket.basket_items" :key="index">
                  <v-card class="elevation-0 pa-8" style="background: #eeeeee; border-radius: 16px">
                    <v-img :src="item.product.image" aspect-ratio="1" />
                    <v-card-title>{{ item.product.title }}</v-card-title>
                    <v-card-text>
                      <div>
                        <strong>Цена:</strong> {{ item.product.price }}
                      </div>
                      <div>
                        <strong>Количество:</strong> {{ item.quantity }}
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      order: null,
      loading: true,
      selectedStatus: null,
      statuses: [
        { title: 'Заказ создан', value: 'created' },
        { title: 'Заказ оплачен', value: 'paid' },
        { title: 'Заказ отменен', value: 'canceled' },
        { title: 'Заказ выполнен', value: 'delivered' },
      ],
    };
  },
  methods: {
    async getOrder() {
      try {
        const response = await axios.get(`https://shop.asap-it.tech/api/orders/${this.$route.params.id}`);
        this.order = response.data;
        this.selectedStatus = this.order.status;
        this.loading = false;
      } catch (error) {
        console.error(error);
        this.loading = false;
        // Обработка ошибок, например, показывать сообщение об ошибке
      }
    },

    calculateTotal(items) {
      return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    },

    async updateStatus() {
      try {
        const response = await axios.put(`https://shop.asap-it.tech/api/orders/${this.$route.params.id}`, { status: this.selectedStatus });
        this.order = response.data;
        // Обработка успешного обновления статуса заказа, например, показывать сообщение об успешном обновлении
      } catch (error) {
        console.error(error);
        // Обработка ошибок, например, показывать сообщение об ошибке
      }
    },
  },
  created() {
    this.getOrder();
  },
};
</script>
