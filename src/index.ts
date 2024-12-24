import { App } from "vue";
import ShowMore from "./components/ShowMore.vue";

export { ShowMore };

export default {
  install: (app: App) => {
    app.component("ShowMore", ShowMore);
  },
};
