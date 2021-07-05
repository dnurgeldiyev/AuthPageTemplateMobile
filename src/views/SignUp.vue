<template>
  <v-container>
    <v-row justify="center" align="center" style="height: 100vh">
      <v-col cols="12" lg="3" md="6" sm="8">
        <v-row justify="center" class="pb-2" style="font-size: 1.7rem;">
          <v-col cols="auto" class="font-weight-bold">
            Sign Up
          </v-col>
        </v-row>

        <v-card elevation="0" class="rounded-xl py-1">
          <v-form ref="form" lazy-validation>
            <v-container>
              <v-row>
                <TextField
                  title="Fullname"
                  :Valid="isValid"
                  :rules="[rules.required]"
                  @getDataFromChild="
                    v => {
                      this.fullname = v;
                    }
                  "
                />
                <TextField
                  title="Email"
                  :Valid="isValid"
                  :rules="[rules.required, rules.email]"
                  @getDataFromChild="
                    v => {
                      this.email = v;
                    }
                  "
                />
                <PasswordField
                  title="Password"
                  :Valid="isValid"
                  :rules="[rules.required, rules.password]"
                  :password="null"
                  :disabled="false"
                  @getDataFromChild="
                    v => {
                      this.password = v;
                    }
                  "
                />

                <PasswordField
                  title="Repeat Password"
                  :Valid="isValid"
                  :rules="[rules.passwordRepeat]"
                  :password="password"
                  :disabled="true"
                  @getDataFromChild="
                    v => {
                      this.passwordRepeat = v;
                    }
                  "
                />

                <v-col cols="12" class="pt-0">
                  <v-btn
                    width="100%"
                    autocapitalize="false"
                    rounded
                    dark
                    @click="userSignUp"
                    color="#1E1A3E"
                    tabindex="5"
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
import { authData } from "@/service/authData";
import { required, email, password, passwordRepeat } from "@/service/rulesList";
import TextField from "@/components/TextField";
import PasswordField from "@/components/PasswordField";

export default {
  name: "SignUp",
  components: { PasswordField, TextField },
  data() {
    return {
      fullname: null,
      password: null,
      passwordRepeat: null,
      email: null,

      isValid: false,

      rules: {
        required,
        password,
        passwordRepeat,
        email
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

      console.log(this.fullname, this.email, this.password);

      let authResult = authData(this.fullname, this.email, this.password);

      if (!authResult) {
        this.$toast.show({
          message: "Email already exists",
          status: "error"
        });
        return;
      }

      this.$router.push({ name: "Main", params: { fullname: this.fullname } });
    }
  }
};
</script>

<style scoped>
.styleLink {
  color: black;
}
</style>
