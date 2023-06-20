<template>
  <v-container class="mt-16">
    <v-row>
      <v-col cols="12">
        <h1>Оформление заказа</h1>
        <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>
        <div v-else>
          <v-list two-line>
            <v-list-item v-for="item in items" :key="item.id">
              <v-row>
                <v-col cols="2">
                  <v-img :src="defaultImage" aspect-ratio="1" cover :width="80" :height="80"/>
                </v-col>
                <v-col cols="8">
                  <v-list-item-title>
                    {{ item.product.title }} - {{ item.product.price }}₽
                  </v-list-item-title>
                  <v-list-item-subtitle>Количество: {{ item.quantity }}</v-list-item-subtitle>
                </v-col>
              </v-row>
            </v-list-item>
          </v-list>
          <div>
            <h3>Общая сумма: {{ total }}₽</h3>
          </div>
          <div>
            <v-combobox
              v-model="searchAddress"
              :items="addresses"
              item-text="address"
              item-value="id"
              label="Введите и выберите адрес"
              @input="loadAddresses"
              @change="addressSelected"
              return-object
            ></v-combobox>
          </div>

          <div>
            <v-textarea
              v-model="comment"
              label="Комментарий"
              placeholder="Ваши комментарии к заказу..."
            ></v-textarea>
          </div>
          <div>
            <v-btn
              color="#FFD6AB"
              :disabled="!selectedAddress"
              @click="createOrder"
            >
              Оформить заказ
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline">Заказ создан</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="handleOk">Ок</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      addresses: [],
      searchAddress: '',
      comment: '',
      selectedAddress: null,
      dialog: false,
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
    async loadAddresses() {
      try {
        if (this.searchAddress == null) {
          return;
        }
        if (this.searchAddress.length < 3) {
          return;
        }
        const response = await axios.get(`https://shop.asap-it.tech/api/get_address?q=${this.searchAddress}`);
        this.addresses = response.data.addresses;
      } catch (error) {
        console.error(error);
      }
    },
    async addressSelected() {
      this.selectedAddress = this.searchAddress;
      console.log(this.searchAddress);
    },
    async createOrder() {
      const config = {
        headers: {
          Authorization: Cookies.get('Authorization'),
          'Content-Type': 'application/json',
        },
      };

      try {
        await axios.post(
          'https://shop.asap-it.tech/api/orders',
          {
            address: this.selectedAddress,
            comment: this.comment || null,
          },
          config,
        );
        this.dialog = true;
      } catch (error) {
        console.error(error);
      }
    },
    handleOk() {
      this.dialog = false;
      this.$router.push('/profile');
    },
  },
  async created() {
    await this.loadCart();
  },
};
</script>
