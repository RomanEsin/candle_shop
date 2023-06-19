<template>
  <v-footer padless>
    <v-card flat tile width="100%" class="secondary lighten-1">
      <v-card-text>
        <v-container fluid>
          <v-row>

            <v-col md="4">
              <div class="title white--text d-flex align-center justify-center logo-container">
                <v-img
                  contain
                  :width="50"
                  :height="50"
                  :aspect-ratio="1"
                  :src="logo"
                  class="align-center"
                >
                  <div style="padding-left: 120px">KOTOV</div>
                </v-img>
              </div>
              <div class="d-flex justify-center">
                <v-btn class="elevation-0" color="#FFD6AB">Связаться с нами</v-btn>
              </div>
              <div class="d-flex justify-center">
                <a class="link-style" href="/privacy">Политика конфиденциальности</a>
              </div>
              <div class="d-flex justify-center">
                <a class="link-style" href="/user-agreement">Пользовательское соглашение</a>
              </div>
            </v-col>

            <v-col md="2" class="align-end">
              <div class="title white--text">Каталог</div>
              <a class="body-2 link-style" href="/candles">Свечи</a>
              <br>
              <a class="body-2 link-style" href="/sets">Наборы</a>
              <br>
              <a class="body-2 link-style" href="/sashes">Саше</a>
            </v-col>

            <v-col md="2" class="align-end">
              <div class="title white--text">О компании</div>
              <a class="body-2 link-style" href="/about">О нас</a>
              <br>
              <a class="body-2 link-style" href="/delivery">Рекомендации по использованию</a>
              <br>
              <a class="body-2 link-style" href="/payment">Доставка</a>
            </v-col>

            <v-col md="2" class="align-end">
              <div class="title white--text">Контакты</div>
              <div class="body-2 white--text">
                Email: info@myshop.com
                <br>
                Телефон: +1234567890
                <br>
                Адрес: Улица Пушкина, дом Кукушкина
                <br>
                <v-btn icon>
                  <a href="https://t.me/your_telegram_username" target="_blank"><v-icon large color="#FFD6AB">mdi-telegram</v-icon></a>
                </v-btn>
                <v-btn icon>
                  <a href="https://instagram.com/your_instagram_username" target="_blank"><v-icon large color="#FFD6AB">mdi-instagram</v-icon></a>
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

.link-style {
  color: black;
  text-decoration: none;
}

.logo-container {
  padding: 2px;
}

</style>
