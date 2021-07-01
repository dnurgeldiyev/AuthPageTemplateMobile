<template>
  <v-app style="background: #FAF3F3;">
    <v-main style="overflow: hidden">
      <router-view />
      <app-toast>
        <template v-slot="{ isShown, message, color }">
          <v-snackbar
            :timeout="-1"
            :value="isShown"
            :color="color"
            bottom
            elevation="24"
            rounded="pill"
            min-width="20em"
          >
            <p class="text-center  pt-3 font-weight-bold">
              {{ message }}
            </p>
            <template v-slot:action="{}">
              <v-icon left @click="closeNotification">
                mdi-close
              </v-icon>
            </template>
          </v-snackbar>
        </template>
      </app-toast>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  methods: {
    closeNotification() {
      this.$toast.close();
    }
  }
};
</script>
<style scoped>
.v-snack__wrapper {
  min-width: 100px !important;
}
</style>
