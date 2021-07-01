<template>
  <v-container>
    <v-row justify="center" align="center" style="height: 100vh">
      <v-col cols="12" lg="3" md="6" sm="8">
        <v-row justify="center" class="pb-2" style="font-size: 1.7rem;">
          <v-col cols="auto" class="font-weight-bold">
            Sign In
          </v-col>
        </v-row>

        <v-card elevation="0" class="rounded-xl">
          <v-form ref="form" lazy-validation>
            <v-container>
              <v-row>
                <v-col cols="12" class="py-0 mt-2">
                  <v-row justify="space-between" class="px-4 form-titel">
                    <v-col cols="auto">
                      Email
                    </v-col>
                  </v-row>

                  <v-text-field
                    :rules="isValid ? [rules.required, rules.email] : []"
                    v-model="email"
                    outlined
                    rounded
                    flat
                    dense
                    :background-color="
                      emailError ? 'rgba(255,102,131,0.38)' : '#F3F3FA'
                    "
                    tabindex="1"
                  />
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-row justify="space-between" class="px-4 pb-1 form-titel">
                    <v-col cols="auto">
                      Password
                    </v-col>
                    <v-col cols="auto">
                      <v-tooltip v-model="toolShow" top>
                        <template v-slot:activator="{}">
                          <v-icon @click="toolShow = !toolShow" size="15">
                            mdi-help-circle
                          </v-icon>
                        </template>
                        <span style="width: 1rem">
                          Password must contain 8+ symbols, 1 special and 2
                          capital letters
                        </span>
                      </v-tooltip>
                    </v-col>
                  </v-row>

                  <v-text-field
                    :append-icon="passwordShow ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="passwordShow ? 'text' : 'password'"
                    :rules="isValid ? [rules.required, rules.password] : []"
                    v-model="password"
                    outlined
                    rounded
                    flat
                    dense
                    :background-color="
                      passwordError ? 'rgba(255,102,131,0.38)' : '#F3F3FA'
                    "
                    @click:append="passwordShow = !passwordShow"
                    tabindex="2"
                  />
                </v-col>
                <v-col cols="12" class="pt-0">
                  <v-btn
                    width="100%"
                    autocapitalize="false"
                    rounded
                    dark
                    @click="userSignIn"
                    color="#1E1A3E"
                    tabindex="3"
                  >
                    Sign In
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
        <v-row justify="center" class="pt-2" style="font-size: 0.9rem;">
          <v-col cols="12" align="center">
            Don’t have an account yet?
          </v-col>
          <v-col cols="12" align="center">
            <router-link :to="{ name: 'SignUp' }" class="styleLink"
              >Sign Up</router-link
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { isAuthorized } from "@/service/authData";

export default {
  name: "SignIn",
  data() {
    return {
      password: "",
      email: "",

      isValid: false,

      passwordError: false,
      emailError: false,

      passwordShow: false,
      toolShow: false,

      rules: {
        required: v => {
          return !!v || "This field is required!!!";
        },
        password: v => {
          this.passwordError = true;
          if (v.search("^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*-+`]).{8,}$") < 0)
            return "The password does not match the rules";

          this.passwordError = false;
          return true;
        },
        email: v => {
          this.emailError = true;
          if (v.search("^.{3,}@.{4,}\\..{2,}$") < 0) return "Enter valid email";
          this.emailError = false;
          return true;
        }
      }
    };
  },
  methods: {
    async userSignIn() {
      if (!this.isValid) {
        this.isValid = true;
        await this.$nextTick(() => {});
      }

      let authorized = isAuthorized(this.email, this.password);

      if (this.$refs.form.validate() === false || !authorized) {
        this.passwordError = true;
        this.emailError = true;
        this.$toast.show({
          message: "Wrong email or password",
          status: "error"
        });
        return;
      }

      this.$router.push({
        name: "Main",
        params: { fullname: authorized }
      });
    }
  }
};
</script>

<style scoped>
.form-titel {
  font-size: 0.9rem;
}
.v-text-field--outlined >>> fieldset {
  border: none;
}
.styleLink {
  color: black;
}
</style>
