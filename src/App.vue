<template>
  <v-app>
    <v-main>
      <v-container>
        <sitting-in-a-room/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import SittingInARoom from './components/SittingInARoom.vue';

export default {
  name: 'App',

  components: {
    SittingInARoom
  },

  data: () => ({
    //
  }),
};
</script>
