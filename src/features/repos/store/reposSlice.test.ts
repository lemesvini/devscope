import { reposSlice, sortChanged } from "./reposSlice";

const reducer = reposSlice.reducer;

describe("reposSlice", () => {
  it("starts sorted by stars in descending order", () => {
    expect(reducer(undefined, { type: "init" })).toEqual({ key: "stars", direction: "desc" });
  });

  it("toggles the direction when the active key is selected again", () => {
    const state = reducer({ key: "stars", direction: "desc" }, sortChanged("stars"));
    expect(state).toEqual({ key: "stars", direction: "asc" });
  });

  it("switches to a new key in descending order", () => {
    const state = reducer({ key: "stars", direction: "asc" }, sortChanged("forks"));
    expect(state).toEqual({ key: "forks", direction: "desc" });
  });

  it("sorts names in ascending order by default", () => {
    const state = reducer({ key: "stars", direction: "desc" }, sortChanged("name"));
    expect(state).toEqual({ key: "name", direction: "asc" });
  });
});
