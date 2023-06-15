<template>
  <v-container>
    <v-row justify="center" align="center" class="mt-16">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-0">
          <v-toolbar color="#eeeeee" dark flat>
            <v-toolbar-title>Вход</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="Email"
                name="email"
                prepend-icon="mdi-email"
                type="text"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Пароль"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                required
              ></v-text-field>
            </v-form>
            <p class="error-text">{{ errorMessage }}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="login">Войти</v-btn>
            <v-btn color="black" @click="goToRegister">Зарегистрироваться</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from 'js-cookie';

export default {
  data: () => ({
    valid: true,
    email: '',
    password: '',
    errorMessage: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
  }),
  methods: {
    async login() {
      if (this.$refs.form.validate()) {
        this.errorMessage = '';
        // Формируем данные в формате x-www-form-urlencoded
        const formData = new FormData();
        formData.append('username', this.email);
        formData.append('password', this.password);

        // Call your login API here
        const response = await fetch('https://shop.asap-it.tech/api/auth/jwt/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams(formData).toString(),
        });

        const data = await response.json();

        if (!response.ok) {
          // Set the error message if the response is not ok
          this.errorMessage = 'Неверный логин или пароль';
        } else {
          Cookies.set('Authorization', `Bearer ${data.access_token}`);
          this.$router.push('/profile');
        }
      }
    },
    goToRegister() {
      this.$router.push('/register');
    },
  },
};
</script>

<style scoped>
.error-text {
  color: red;
}
</style>
