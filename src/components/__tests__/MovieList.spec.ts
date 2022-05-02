import { describe, it, expect, beforeEach } from "vitest";
import MovieList from "../MovieList.vue";
import TablePagination from "../TablePagination.vue";
import { mount, shallowMount } from "@vue/test-utils";
import { nextTick } from "vue";

/** 
1. Should render movie, title, year and imdbId
2. Should change page when click pagination
3. should search movie when click
4. should add favourite to store when click
5. should delete favourite when click
*/

describe("MovieList", () => {
  it("Should render movie, title, year and imdbId", () => {
    const wrapper = mount(MovieList);
    const movies = wrapper.get('[data-test="movies"]');
    expect(movies.text()).toBe('tt0114898Waterworld1995');
  });

  it("Should emit page number when click button", async () => {
    const wrapper = mount(TablePagination, {
      props: {
        totalPages: 10,
        currentPage: 1,
        maxVisibleButtons: 10,
      },
    });
    const button = wrapper.find('[data-test="pagination"]');
    await button.trigger("click");
    await nextTick();
    // expect(wrapper.text()).toContain('First');
    // expect(wrapper.emitted()).toHaveProperty('increment')
    const changeEvent = wrapper.emitted('pagechanged');
    expect(changeEvent[0]).toEqual([1]);
  });

});
