<template>
  <v-container>
    <v-row class="mt-16">
      <!-- Этот столбец будет служить панелью фильтров -->
      <v-col cols="12" md="3">
        <h2>Фильтры</h2>
        <v-checkbox
          v-for="filter in filters"
          :key="filter.text"
          v-model="filter.value"
          :label="filter.text"
        ></v-checkbox>
      </v-col>

      <!-- Этот столбец будет отображать карточки товаров -->
      <v-col cols="12" sm="9">
        <v-row>
          <v-progress-circular
            v-if="loading"
            indeterminate
            size="70"
            width="7"
            class="mx-auto"
          ></v-progress-circular>
          <v-col cols="12" sm="6" md="4" v-for="product in products" :key="product.id">
            <v-card class="ma-5 product-card elevation-0">
              <router-link
                :to="{ name: 'product', params: { id: product.id } }"
                class="no-underline"
              >
                <v-img
                  :src="product.image"
                  aspect-ratio="1.7"
                ></v-img>
                <v-card-title>{{ product.name }}</v-card-title>
                <v-card-subtitle>{{ product.price }} ₽</v-card-subtitle>
              </router-link>
              <v-card-actions class="justify-center">
                <div v-if="quantities[product.id] > 0" class="d-flex align-center justify-center">
                  <v-btn small color="primary" @click="changeQuantity(product, -1)">-</v-btn>
                  <div class="mx-2">{{ quantities[product.id] }}</div>
                  <v-btn small color="primary" @click="changeQuantity(product, 1)">+</v-btn>
                </div>
                <v-btn v-else color="primary" text-color="black" class="d-flex align-center
          justify-center font" @click="addToCart(product)">Добавить в корзину
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import mainbackground from '@/assets/mainbackground.png';
// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from 'js-cookie';

export default {
  name: 'CatalogPage',
  data() {
    return {
      loading: true,
      filters: [
        {
          text: 'Фильтр 1',
          value: false,
        },
        {
          text: 'Фильтр 2',
          value: false,
        },
        // добавьте дополнительные фильтры здесь
      ],
      products: [],
      card: null,
      quantities: {},
    };
  },
  mounted() {
    const config = {
      headers: {
        Authorization: Cookies.get('Authorization'),
        'Content-Type': 'application/json',
      },
    };
    axios
      .get('https://shop.asap-it.tech/api/basket', config)
      .then((newResponse) => {
        const { data } = newResponse;
        data.basket_items.forEach((item) => {
          this.quantities[item.product.id] = item.quantity;
        });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => axios
        .get('https://shop.asap-it.tech/api/products')
        .then((response) => {
          this.products = response.data.map((item) => ({
            id: item.id,
            name: item.title,
            price: item.price,
            image: mainbackground, // Пока мы используем статическое изображение
            quantity: 0,
          }));
          this.loading = false;
        })
        .catch((error) => {
          console.error(error);
          this.loading = false;
        }));
  },
  methods: {
    async addToCart(product) {
      try {
        const response = await fetch(`https://shop.asap-it.tech/api/basket/${product.id}`, {
          method: 'POST',
          headers: {
            Authorization: Cookies.get('Authorization'),
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok) {
          this.quantities[product.id] = data.quantity;
        } else {
          // обработка ошибок
        }
      } catch (error) {
        // обработка ошибок
      }
    },
    async removeFromCart(product) {
      try {
        const response = await fetch(`https://shop.asap-it.tech/api/basket/${product.id}`, {
          method: 'DELETE',
          headers: {
            Authorization: Cookies.get('Authorization'),
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok) {
          this.quantities[product.id] = data.quantity;
        } else {
          // обработка ошибок
        }
      } catch (error) {
        // обработка ошибок
      }
    },
    async changeQuantity(product, change) {
      // Здесь отправьте запрос к API для обновления количества товара в корзине
      // Если запрос успешен, обновите product.inCart
      if (change > 0) {
        await this.addToCart(product);
      } else {
        await this.removeFromCart(product);
      }
    },
  },
};
</script>

<style scoped>
.product-card {
  transition: transform .2s; /* Animation */
}

.product-card:hover {
  transform: scale(1.05);
}

.no-underline {
  text-decoration: none;
}

.no-underline:visited {
  color: inherit;
}
</style>
