<template>
  <v-container class="mt-16">
    <v-row>
      <v-col cols="12">
        <v-img
          :src="blog.image"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          height="300px"
          cover
        >
          <v-container class="fill-height">
            <v-row align="end">
              <v-col class="text-white" cols="12">
                <h1 class="display-1">{{ blog.title }}</h1>
              </v-col>
            </v-row>
          </v-container>
        </v-img>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="mt-5">
        <div v-html="blog.content"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      blog: {},
    };
  },
  watch: {
    '$route.params.id': {
      immediate: true, // это означает, что обработчик будет вызван сразу при создании компонента
      async handler(newType) {
        await this.getData();
      },
    },
  },
  methods: {
    async getData() {
      const response = await axios.get(`https://shop.asap-it.tech/api/blog/${this.$route.params.id}`);
      this.blog = response.data;
    }
  },
  async created() {
    await this.getData()
  },
};
</script>
