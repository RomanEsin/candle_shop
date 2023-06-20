<template>
  <v-app-bar app class="elevation-0" color="dark"
             dark style="background-color:#eeee">
    <v-row no-gutters justify="space-between" align="center" fill-height>
      <v-col cols="3">
        <v-btn text to="/catalog">
          Каталог
        </v-btn>
      </v-col>

      <v-col cols="6" class="d-flex align-center justify-center">
        <v-toolbar-title>
          <router-link to="/" class="no-underline">
            <div class="font-weight-bold">KOTOV</div>
          </router-link>
        </v-toolbar-title>
      </v-col>

      <v-col cols="3">
        <router-link to="/profile" class="no-underline">
          <v-btn icon>
            <v-icon class="text-black">mdi-account</v-icon>
          </v-btn>
        </router-link>

        <router-link to="/orders" class="no-underline">
          <v-btn icon>
            <v-icon class="text-black">mdi-cube</v-icon>
          </v-btn>
        </router-link>

        <router-link to="/cart" class="no-underline">
          <v-btn icon>
            <v-icon class="text-black">mdi-cart</v-icon>
          </v-btn>
        </router-link>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
import logo from '@/assets/logo.png';
import Cookies from "js-cookie";

export default {
  name: 'NavbarMain',
  data() {
    return {
      logo,
      isAdmin: Cookies.get('AdminAccess') === 'true',
    };
  },
};
</script>

<style scoped lang="scss">
.search-field {
  max-width: 200px;
}

.no-underline {
  text-decoration: none;
}

.no-underline:visited {
  color: inherit;
}
</style>
