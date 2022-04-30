import { describe, it, expect, beforeEach } from "vitest";
import { createApp } from "vue";
import HelloWorld from "../HelloWorld.vue";
import { mount } from "@vue/test-utils";
import vuetify from "@/plugins/vuetify";

describe("HelloWorld", () => {
  beforeEach(() => {
    const app = createApp({});
    app.use(vuetify);
  });

  it("renders properly", () => {
    const wrapper = mount(HelloWorld, {
      props: { msg: "Hello Vitest" },
    });
    expect(wrapper.text()).toContain(",");
  });
});
