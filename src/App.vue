<template>
  <v-app>
    <NavbarMain/>
    <router-view/>
    <FooterMain/>
  </v-app>
</template>

<script>
import FooterMain from '@/components/FooterMain.vue';
import NavbarMain from './components/NavbarMain.vue';

export default {
  name: 'App',
  components: {
    NavbarMain,
    FooterMain,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
