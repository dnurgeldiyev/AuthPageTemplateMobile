<template>
  <v-container>
    <v-row justify="center" align="center" style="height: 100vh">
      <v-col cols="12" lg="3" md="6" sm="8">
        <v-row justify="center" class="pb-2" style="font-size: 1.7rem;">
          <v-col cols="auto" class="font-weight-bold">
            Sign In
          </v-col>
        </v-row>

        <v-card elevation="0" class="rounded-xl py-1">
          <v-form ref="form" lazy-validation>
            <v-container>
              <v-row>
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
import TextField from "@/components/TextField";
import PasswordField from "@/components/PasswordField";
import {required, password, email} from "@/service/rulesList";

export default {
  name: "SignIn",
  components: { TextField, PasswordField },
  data() {
    return {
      password: "",
      email: "",

      isValid: false,

      rules: {
        required,
        password,
        email,
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
