import { describe, it, expect, beforeEach } from "vitest";
import SearchBar from "../SearchBar.vue";
import { mount, shallowMount } from "@vue/test-utils";
import TableRenderer from "../TableRenderer.vue"
describe("SearchBar", () => {


  it("Test Input properly", async () => {
    const wrapper = mount(SearchBar);
    const input = wrapper.find('input')
    await input.setValue('this is input')
    expect(input.element.value).toContain("this is input");
  });

  it("Test Computed Properties", async () => {
    const wrapper = shallowMount(TableRenderer, {
      props: {
        title: `as`,
        pages: 0
      }
    });
    expect(wrapper.text()).toBe("[]")
  });

});
