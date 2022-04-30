import { shallowMount } from "@vue/test-utils";
import HomeView from "@/HomeView.vue";

describe("HomeView.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "as";
    const wrapper = shallowMount(HomeView, {
      propsData: { msg },
    });
    expect(wrapper.text()).toContain(msg);
  });
});
