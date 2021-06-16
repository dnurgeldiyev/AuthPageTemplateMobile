<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" lg="3" md="4" sm="8">
        <v-row justify="center" class="pb-2" style="font-size: 1.7rem;">
          <v-col cols="auto" class="font-weight-bold">
            Sign Up
          </v-col>
        </v-row>

        <v-card elevation="0" class="rounded-xl">
          <v-form ref="form" lazy-validation>
            <v-container>
              <v-row>
                <v-col cols="12" class="pb-0">
                  <v-row justify="space-between" class="px-4 form-titel">
                    <v-col cols="auto">
                      Fullname
                    </v-col>
                  </v-row>

                  <v-text-field
                    :rules="isValid ? [rules.required] : []"
                    v-model="fullname"
                    outlined
                    rounded
                    flat
                    dense
                    :background-color="
                      fullname === '' && isValid
                        ? 'rgba(255,102,131,0.38)'
                        : '#F3F3FA'
                    "
                  />
                </v-col>
                <v-col cols="12" class="py-0">
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
                  />
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-row justify="space-between" class="px-4 form-titel">
                    <v-col cols="auto">
                      Repeat Password
                    </v-col>
                  </v-row>

                  <v-text-field
                    :append-icon="
                      repeatPasswordShow ? 'mdi-eye-off' : 'mdi-eye'
                    "
                    :type="repeatPasswordShow ? 'text' : 'password'"
                    :rules="
                      isValid ? [rules.required, rules.repeatPassword] : []
                    "
                    v-model="repeatPassword"
                    :disabled="password === ''"
                    outlined
                    rounded
                    flat
                    dense
                    :background-color="
                      passwordError ? 'rgba(255,102,131,0.38)' : '#F3F3FA'
                    "
                    @click:append="repeatPasswordShow = !repeatPasswordShow"
                  />
                </v-col>
                <v-col cols="12" class="pt-0">
                  <v-btn
                    width="100%"
                    autocapitalize="false"
                    rounded
                    dark
                    @click="userSignUp"
                    color="#1E1A3E"
                  >
                    Sign Up
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
        <v-row justify="center" class="pt-2" style="font-size: 0.9rem;">
          <v-col cols="12" align="center">
            Already have an account?
          </v-col>
          <v-col cols="12" align="center">
            <router-link :to="{ name: 'SignIn' }" class="styleLink"
              >Sign In</router-link
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "SignUp",
  data() {
    return {
      fullname: "",
      password: "",
      repeatPassword: "",
      email: "",

      isValid: false,

      fullnameError: false,
      passwordError: false,
      emailError: false,

      passwordShow: false,
      repeatPasswordShow: false,
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
        repeatPassword: v => {
          return this.password === v || "The password does not match";
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
    async userSignUp() {
      if (!this.isValid) {
        this.isValid = true;
        await this.$nextTick(() => {});
      }

      if (this.$refs.form.validate() === false) {
        return;
      }

      this.$router.push({ name: "Main" });
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
