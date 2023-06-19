<template>
  <v-container class="mt-16">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-0">
          <v-toolbar color="#eeeeee" dark flat>
            <v-toolbar-title>Регистрация</v-toolbar-title>
          </v-toolbar>
          <v-form ref="form">
            <v-text-field
              v-model="name"
              label="Имя"
              required
            ></v-text-field>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="Email"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="Пароль"
              type="password"
              required
            ></v-text-field>
            <v-btn color="primary" @click="register">Регистрация</v-btn>
            <p class="error-text">{{ errorMessage }}</p>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      name: '',
      errorMessage: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        (v) => !!v || 'Password is required',
      ],
    };
  },
  methods: {
    async register() {
      if (this.$refs.form.validate()) {
        // Вызовите ваш API для регистрации здесь
        const response = await fetch('https://shop.asap-it.tech/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
            name: this.name,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          // Установим сообщение об ошибке, если ответ не ok
          this.errorMessage = data.message;
        } else {
          // Если регистрация успешна, перенаправим пользователя на страницу входа
          this.$router.push('/login');
        }
      }
    },
  },
};
</script>

<style>
.error-text {
  color: red;
}
</style>
