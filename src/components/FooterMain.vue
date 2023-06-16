<template>
  <v-footer padless>
    <v-card flat tile width="100%" class="secondary lighten-1">
      <v-card-text>
        <v-container fluid>
          <v-row>

            <v-col md="3">
              <div class="title white--text d-flex align-center justify-center">
                <v-img
                  contain
                  :width="50"
                  :height="50"
                  :src="logo"
                ></v-img>
                <div>KOTOV</div>
              </div>
              <div class="d-flex justify-center">
                <v-btn color="primary">Связаться с нами</v-btn>
              </div>
              <div class="d-flex justify-center">
                <a class="white--text" href="/privacy">Политика конфиденциальности</a>
              </div>
              <div class="d-flex justify-center">
                <a class="white--text" href="/user-agreement">Пользовательское соглашение</a>
              </div>
            </v-col>

            <v-col md="3">
              <div class="title white--text">Каталог</div>
              <a class="body-2 white--text" href="/candles">Свечи</a>
              <br>
              <a class="body-2 white--text" href="/sets">Наборы</a>
              <br>
              <a class="body-2 white--text" href="/sashes">Саше</a>
            </v-col>

            <v-col md="3">
              <div class="title white--text">О компании</div>
              <a class="body-2 white--text" href="/about">О нас</a>
              <br>
              <a class="body-2 white--text" href="/delivery">Доставка</a>
              <br>
              <a class="body-2 white--text" href="/payment">Оплата</a>
            </v-col>

            <v-col md="3">
              <div class="title white--text">Контакты</div>
              <div class="body-2 white--text">
                Email: info@myshop.com
                <br>
                Телефон: +1234567890
                <br>
                Адрес: Улица Пушкина, дом Кукушкина
                <br>
                <v-btn icon color="white">
                  <a href="https://t.me/your_telegram_username" target="_blank"><v-icon large>mdi-telegram</v-icon></a>
                </v-btn>
                <v-btn icon color="white">
                  <a href="https://instagram.com/your_instagram_username" target="_blank"><v-icon large>mdi-instagram</v-icon></a>
                </v-btn>
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
