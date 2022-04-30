import { describe, it, expect } from "vitest";
import SearchBar from "../SearchBar.vue";
import { mount } from "@vue/test-utils";

describe("SearchBar", () => {
  // beforeEach(() => {
  //   const app = createApp({});
  //   app.use(vuetify);
  // });

  it("renders properly", () => {
    const wrapper = mount(SearchBar, {
      props: { msg: "Hello Vitest" },
    });
    expect(wrapper.text()).toContain(",");
  });
});
