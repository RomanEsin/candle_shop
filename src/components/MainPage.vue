<template>
  <v-container fluid class="pa-0">
    <v-row align="center" justify="center" shring>
      <v-col>
        <v-img
          :src="backgroundImage"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        >
          <v-container class="fill-height">
            <v-row align="center">
              <v-col>
                <h1 class="text-white">
                  KOTOV Handmade
                </h1>
              </v-col>
            </v-row>
          </v-container>
        </v-img>
      </v-col>
    </v-row>

    <v-row class="ma-8">
      <v-col cols="12" sm="4" v-for="n in 3" :key="n">
        <v-img
          class="rounded-lg"
          :src="backgroundImage"
          aspect-ratio="1.7"
        ></v-img>
        <div class="text-center pt-4">{{ candleNames[n-1] }}</div>
      </v-col>
    </v-row>

    <v-carousel cycle height="400px" hide-delimiters show-arrows="hover">
      <v-carousel-item
        v-for="i in 6"
        :key="i"
      >
        <v-img
          cover
          :src="backgroundImage"
        ></v-img>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script>
import mainbackground from '@/assets/mainbackground.png';

export default {
  name: 'MainPage',
  data() {
    return {
      candleNames: ['Candle 1', 'Candle 2', 'Candle 3'],
      backgroundImage: mainbackground,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
