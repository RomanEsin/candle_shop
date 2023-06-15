<template>
  <v-footer padless>
    <v-card flat tile width="100%" class="secondary lighten-1">
      <v-card-text>
        <v-container fluid>
          <v-row>

            <v-col md="4">
              <div class="title white--text">
                <v-img
                  class="mb-2"
                  contain
                  :width="60"
                  :height="60"
                  :src="logo"
                ></v-img>
                Мой магазин
              </div>
            </v-col>

            <v-col md="4">
              <div class="title white--text">О нас</div>
              <div class="body-2 white--text">
                Мы - надежный интернет-магазин, предлагающий качественные товары.
              </div>
            </v-col>

            <v-col md="4">
              <div class="title white--text">Контакты</div>
              <div class="body-2 white--text">
                Email: info@myshop.com
                <br>
                Телефон: +1234567890
              </div>
              <div class="title white--text">Адрес</div>
              <div class="body-2 white--text">
                Улица Пушкина, дом Кукушкина
              </div>
            </v-col>

          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
import logo from '@/assets/logo.png';

export default {
  name: 'MyFooter',
  data: () => ({
    logo, // Замените на ваше изображение
  }),
};
</script>

<style scoped>

.title {
  font-weight: bold;
  margin-bottom: 1rem;
}
</style>
