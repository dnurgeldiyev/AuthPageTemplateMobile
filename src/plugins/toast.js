import { toastEventBus } from "../event.bus";

export default Vue => {
  const toast = {
    show(args) {
      toastEventBus.$emit("show", args);
    },
    close() {
      toastEventBus.$emit("close");
    }
  };
  let timer = null;
  Vue.$toast = toast;
  Vue.prototype.$toast = toast;
  Vue.component("app-toast", {
    data() {
      return {
        isShown: false,
        message: "",
        status: ""
      };
    },

    computed: {
      color() {
        switch (this.status) {
          case "success":
            return "#27a745";
          case "error":
            return "#dc3545";
          case "info":
            return "#007bfe";
          case "warning":
            return "#ffc106";
          default:
            return "";
        }
      }
    },

    methods: {
      show({ message = "", status = "", duration = 5000 } = {}) {
        if (message === "" && status === "") {
          return;
        }
        this.isShown = true;
        this.message = message;
        this.status = status;
        clearTimeout(timer);
        timer = setTimeout(() => {
          this.isShown = false;
          this.message = "";
          this.status = "";
          timer = null;
        }, duration);
      },
      close() {
        this.isShown = false;
      }
    },

    mounted() {
      toastEventBus.$on("show", this.show);
      toastEventBus.$on("close", this.close);
    },

    beforeDestroy() {
      toastEventBus.$off("show", this.show);
      toastEventBus.$off("close", this.close);
    },

    render(h) {
      return h(
        "div",
        this.$scopedSlots.default({
          isShown: this.isShown,
          message: this.message,
          color: this.color
        })
      );
    }
  });
};
