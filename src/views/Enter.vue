<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" lg="3" md="4" sm="8">
        <v-row justify="center">
          <v-col
            cols="auto"
            class="text-h5 font-weight-bold text-center"
            style="color: #181C43;"
          >
            Ready for a great User experience?
          </v-col>

          <v-col cols="8" class="text-subtitle-1 text-center">
            Bring your media to the next level!
          </v-col>

          <v-col cols="12">
            <v-row justify="center" align="center">
              <v-col cols="auto">
                <v-card
                  class="rounded-pill white py-3 px-4"
                  :to="{ name: 'SignUp' }"
                >
                  Sign up
                </v-card>
              </v-col>

              <v-col cols="auto">
                <v-card
                  class="pa-3 rounded-circle black"
                  :to="{ name: 'SignIn' }"
                >
                  <v-icon dark>
                    mdi-arrow-right
                  </v-icon>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="pa-0">
            <v-img
              width="82vw"
              height="auto"
              class="mx-auto"
              src="@/assets/woman x5F 2.png"
            ></v-img>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Enter"
};
</script>
