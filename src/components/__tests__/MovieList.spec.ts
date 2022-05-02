import { describe, it, expect } from "vitest";
import MovieList from "../MovieList.vue";
import TablePagination from "../TablePagination.vue";
import SearchBar from "../SearchBar.vue";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import useFavouriteState from "../../store/useFavouriteState";

/** 
1. Should render movie, title, year and imdbId
2. Should change page when click pagination
3. should search movie when click
4. should add favourite to store
5. should delete favourite
*/

describe("MovieList", () => {
  it("Should render movie, title, year and imdbId", () => {
    const wrapper = mount(MovieList);
    const movies = wrapper.get('[data-test="movies"]');
    expect(movies.text()).toBe("IMDB");
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
    const changeEvent = wrapper.emitted("pagechanged");
    expect(changeEvent[0]).toEqual([1]);
  });

  it("should search movie when click", async () => {
    const wrapper = mount(SearchBar);
    await wrapper.get(`input`).setValue("spiderman");
    await wrapper.get(`button`).trigger(`click`);
    const changeEvent = await wrapper.emitted("submit");
    expect(changeEvent[0]).toEqual(["spiderman"]);
  });

  it("should add and delete favourite to store", async () => {
    const { getFavourite, addFavourite, removeFavourite } = useFavouriteState();
    const obj = { Title: "Italian Spiderman", Year: 2007, imdbID: "tt2705436" };
    await addFavourite(obj);
    const fav = getFavourite();
    expect(fav.value).toEqual([
      { Title: "Italian Spiderman", Year: 2007, imdbID: "tt2705436" },
    ]);

    const id = "tt2705436";
    await removeFavourite(id);
    expect(fav.value).toEqual([]);

  });
});
