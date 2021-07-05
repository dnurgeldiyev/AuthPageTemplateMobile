<template>
  <v-col cols="12" class="py-0">
    <v-row justify="space-between" class="px-4 form-title">
      <v-col cols="auto">
        {{ title }}
      </v-col>
      <v-col cols="auto" v-if="!disabled">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on" size="15">
              mdi-help-circle
            </v-icon>
          </template>
          <span style="width: 1rem">
            Password must contain 8+ symbols, 1 special and 2 capital letters
          </span>
        </v-tooltip>
      </v-col>
    </v-row>

    <v-text-field
      :append-icon="passwordShow ? 'mdi-eye-off' : 'mdi-eye'"
      :type="passwordShow ? 'text' : 'password'"
      :rules="isValid ? [rulesmethod] : []"
      v-model="value"
      outlined
      rounded
      flat
      dense
      :background-color="error ? 'rgba(255,102,131,0.38)' : '#F3F3FA'"
      @click:append="passwordShow = !passwordShow"
    />
  </v-col>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    Valid: {
      type: Boolean,
      required: true
    },
    rules: {
      type: Array,
      required: true
    },
    password: {
      type: String
    },
    disabled: {
      type: Boolean,
      required: true
    }
  },
  name: "PasswordField",
  data() {
    return {
      value: "",
      error: false,
      passwordShow: false
    };
  },
  computed: {
    isValid: function() {
      return this.Valid;
    },
    isPassword: function() {
      return this.password;
    }
  },
  methods: {
    rulesmethod() {
      let i, res;

      for (i = 0; i < this.rules.length; i++) {
        if (!this.disabled) {
          [res, this.error] = this.rules[i](this.value);
        } else {
          [res, this.error] = this.rules[i](this.value, this.isPassword);
        }
        if (this.error) {
          this.$emit("getDataFromChild", null);
          return res;
        }
      }
      this.$emit("getDataFromChild", this.value);
      return true;
    }
  }
};
</script>

<style scoped>
.form-title {
  font-size: 0.9rem;
}
.v-text-field--outlined >>> fieldset {
  border: none !important;
}
</style>
