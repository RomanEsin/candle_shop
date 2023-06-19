<template>
  <v-container>
    <v-row class="mt-16">
      <!-- Этот столбец будет служить панелью фильтров -->
      <v-col cols="12" md="3">
        <h2>Фильтры</h2>

        <!-- Фильтр по цене -->
        <div>
          <h3>Цена до:</h3>
          <v-slider
            v-model="priceFilter"
            :min="minPrice"
            :max="maxPrice"
            thumb-label
          ></v-slider>
        </div>

        <div>
          <h3>Тип товара</h3>
          <v-select
            v-model="typeFilter"
            :items="productTypes"
            label="Выберите тип товара"
            outlined
            dense
          ></v-select>
        </div>

        <div>
          <v-btn @click="fetchProducts" class="elevation-0">Применить</v-btn>
        </div>
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
            <div>
              <v-card class="ma-5 product-card elevation-0">
              <router-link
                :to="{ name: 'product', params: { id: product.id } }"
                class="no-underline"
              >
                <v-img
                  :src="product.image"
                  aspect-ratio="1"
                  :height="300"
                  cover
                ></v-img>
                <v-card-title>{{ product.name }}</v-card-title>
                <v-card-subtitle>{{ product.price }} ₽</v-card-subtitle>
              </router-link>
            </v-card>
            </div>
            <v-card-actions class="justify-center">
              <div v-if="quantities[product.id] > 0" class="d-flex align-center justify-center">
                <v-btn small color="black" @click="changeQuantity(product, -1)">-</v-btn>
                <div class="mx-2">{{ quantities[product.id] }}</div>
                <v-btn small color="black" @click="changeQuantity(product, 1)">+</v-btn>
              </div>
              <v-btn v-else background-color="#FFD6AB" text-color="black" class="d-flex align-center pa-4
          justify-center" @click="addToCart(product)">Добавить в корзину
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';

export default {
  name: 'CatalogPage',
  data() {
    return {
      loading: true,
      priceRange: [0, 5000],
      minPrice: 0,
      maxPrice: 5000,
      products: [],
      card: null,
      quantities: {},
      // Фильтры
      priceFilter: 5000, // Диапазон цен для фильтрации
      typeFilter: null, // Тип товара для фильтрации
      productTypes: [
        { title: 'Любой', value: null },
        { title: 'Свечи', value: 'candle' },
        { title: 'Аромасаше', value: 'arome_sashe' },
        { title: 'Бомбочки для ванны', value: 'bath_bomb' },
      ], // Возможные типы товаров
    };
  },
  mounted() {
    // this.fetchProducts();
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
            image: item.image,
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
    async fetchProducts() {
      this.loading = true;
      this.products = [];
      try {
        const response = await axios.post(
          'https://shop.asap-it.tech/api/products/filter',
          {
            price_from: 0,
            price_to: this.priceFilter,
            type: this.typeFilter,
          },
          {
            headers: {
              Authorization: Cookies.get('Authorization'),
              'Content-Type': 'application/json',
            },
          }
        );

        this.products = response.data.map((item) => ({
          id: item.id,
          name: item.title,
          price: item.price,
          image: item.image,
          quantity: 0,
        }));
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async addToCart(product) {
      if (Cookies.get("Authorization") == null) {
        this.$router.push('/login');
        return;
      }

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
  transition: transform .2s;
  border-radius: 15px;
  background-color: #f5f5f5;
}

.product-card:hover {
  transform: scale(1.05);
}

.no-underline {
  text-decoration: none;
  color: black;
}

.no-underline:visited {
  color: inherit;
}

.v-btn {
  background-color: #eeeeee !important;
  border-radius: 10px;
}

.v-card-subtitle {
  color: black !important;
  padding-bottom: 16px;
}

</style>
