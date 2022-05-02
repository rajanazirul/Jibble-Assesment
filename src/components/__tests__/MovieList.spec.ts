import { describe, it, expect, beforeEach } from "vitest";
import MovieList from "../MovieList.vue";
import { mount, shallowMount } from "@vue/test-utils";
import TableRenderer from "../TableRenderer.vue";

// it test click search, output object
// it test click pagination, output object
// it test setfavourite, output object
// it test removeFavourite, output object

describe("MovieList", () => {
  it("Test seach", () => {
    const wrapper = mount(MovieList);
    const input = wrapper.find("input");
    input.setValue("Waterworld");
    wrapper.find("button").trigger("click");
    expect(wrapper.emitted()).toBe("");
  });

  it("Test Computed Properties", async () => {
    const wrapper = shallowMount(TableRenderer, {
      props: {
        title: `as`,
        pages: 0,
      },
    });
    expect(wrapper.text()).toBe("[]");
  });
});
