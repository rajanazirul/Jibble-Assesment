import { describe, it, expect } from "vitest";
import HelloWorld from "../HelloWorld.vue";
import { mount } from "@vue/test-utils";

describe("SearchBar", () => {
 

  it("renders properly", () => {
    const wrapper = mount(HelloWorld, {
      props: { msg: "Hello Vitest" },
    });
    expect(wrapper.text()).toContain("IMDBTitleYearFavouriteIMDBTitleYear");
  });
});
