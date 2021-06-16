<template>
  <v-container>
    <v-row
      justify="center"
      style="min-height: 100vh;"
      align-content="space-between"
    >
      <v-col
        cols="12"
        class="text-h5 text-sm-h4 text-md-h3 font-weight-bold text-center"
        style="color: #181C43; padding-top: 15vh;"
      >
        Hello, John Doe!
      </v-col>
      <v-col cols="12" sm="8" class="pa-0">
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
