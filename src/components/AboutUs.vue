<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="display-1">О нас</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="6">
        <v-img :src="image1" aspect-ratio="1.7"></v-img>
      </v-col>
      <v-col md="6">
        <p>Текст о вашей компании, миссии, истории и так далее.</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="6">
        <p>Дополнительная информация или интересные факты о вашей компании.</p>
      </v-col>
      <v-col md="6">
        <v-img :src="image2" aspect-ratio="1.7"></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import image1 from '@/assets/img.png'; // Замените на реальный путь к вашему изображению
import image2 from '@/assets/mainbackground.png'; // Замените на реальный путь к вашему изображению

export default {
  data() {
    return {
      image1,
      image2,
    };
  },
};
</script>

<style scoped>
h1 {
  margin-bottom: 2em;
}
</style>
