<template>
  <v-col cols="12" class="py-0">
    <v-row justify="space-between" class="px-4 form-title">
      <v-col cols="auto">
        {{ title }}
      </v-col>
    </v-row>

    <v-text-field
      :rules="isValid ? [rulesmethod] : []"
      v-model="value"
      outlined
      rounded
      flat
      dense
      :background-color="
        isValid && error ? 'rgba(255,102,131,0.38)' : '#F3F3FA'
      "
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
  },
  name: "TextField",
  data() {
    return {
      value: "",
      error: false,
    };
  },
  computed: {
    isValid: function() {
      return this.Valid;
    }
  },
  methods: {
    rulesmethod() {
      let i, res;
      for (i = 0; i < this.rules.length; i++) {
        [res, this.error] = this.rules[i](this.value);
        if (res !== true) {
          return res;
        }
      }
      this.$emit("getDataFromChild",this.value);
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
