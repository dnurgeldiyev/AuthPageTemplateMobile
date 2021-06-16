<template>
  <v-container>
    <v-row
      justify="center"
      style="min-height: 100vh;"
      align-content="space-between"
    >
      <v-col
        cols="12"
        class="pt-10 text-h5 font-weight-bold text-center"
        style="color: #181C43;"
      >
        Hello, John Doe!
      </v-col>
      <v-col cols="12" sm="3" class="pa-0">
        <v-img
          width="100vw"
          height="auto"
          class="mx-auto"
          src="@/assets/woman.png"
        ></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Main"
};
</script>

<style scoped></style>
