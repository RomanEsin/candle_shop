<template>
  <v-container>
    <h1>Личный кабинет</h1>

    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model="name" label="Имя" :rules="nameRules" required></v-text-field>
      <v-text-field v-model="surname" label="Фамилия" :rules="nameRules" required></v-text-field>
      <v-text-field v-model="phone" label="Номер телефона" :rules="phoneRules"
                    required></v-text-field>
      <v-text-field v-model="email" label="E-mail" :rules="emailRules" required></v-text-field>
      <v-btn color="primary" @click="updateProfile">Обновить</v-btn>
    </v-form>

    <h2>История заказов</h2>
    <v-data-table :headers="headers" :items="orders" class="elevation-1"></v-data-table>
  </v-container>
</template>

<script>
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
    headers: [
      {
        text: 'Номер заказа',
        value: 'orderNumber',
      },
      {
        text: 'Дата заказа',
        value: 'orderDate',
      },
      {
        text: 'Сумма',
        value: 'total',
      },
    ],
    orders: [], // История заказов, полученная от сервера
  }),

  methods: {
    updateProfile() {
      // Отправить данные на сервер для обновления профиля
    },
  },

  created() {
    // Получить информацию о профиле и историю заказов от сервера
  },
};
</script>
