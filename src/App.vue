<template>
  <v-app style="background: #FAF3F3;">
    <v-main>
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
            <p class="text-center">
              Wrong email or password
            </p>
          </v-snackbar>
        </template>
      </app-toast>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App"
};
</script>
<style scoped>
.v-snack__wrapper{
 min-width: 100px !important;
}
</style>
