import { searchSlice, sortChanged } from "./searchSlice";

const reducer = searchSlice.reducer;

describe("searchSlice", () => {
  it("starts sorted by best match", () => {
    expect(reducer(undefined, { type: "init" })).toEqual({ sort: "best-match", order: "desc" });
  });

  it("switches to a new sort in descending order", () => {
    const state = reducer({ sort: "followers", order: "asc" }, sortChanged("repositories"));
    expect(state).toEqual({ sort: "repositories", order: "desc" });
  });

  it("toggles the order when the active sort is selected again", () => {
    const state = reducer({ sort: "followers", order: "desc" }, sortChanged("followers"));
    expect(state).toEqual({ sort: "followers", order: "asc" });
  });

  it("keeps best match without an order toggle", () => {
    const state = reducer({ sort: "best-match", order: "desc" }, sortChanged("best-match"));
    expect(state).toEqual({ sort: "best-match", order: "desc" });
  });
});
