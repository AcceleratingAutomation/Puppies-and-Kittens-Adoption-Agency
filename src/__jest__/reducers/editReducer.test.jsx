import editReducer from "../../reducers/editReducer";

describe("edit reducer should", () => {
  const initialState = {};

  it("set adopter edit", () => {
    const action = { type: "setAdopterEdit", value: { adopter: "John Doe" } };
    const expectedState = { adopter: "John Doe" };
    expect(editReducer(initialState, action)).toEqual(expectedState);
  });

  it("set admin edit", () => {
    const action = { type: "setAdminEdit", value: { admin: "Jane Doe" } };
    const expectedState = { admin: "Jane Doe" };
    expect(editReducer(initialState, action)).toEqual(expectedState);
  });

  it("set foster edit", () => {
    const action = { type: "setFosterEdit", value: { foster: "John Smith" } };
    const expectedState = { foster: "John Smith" };
    expect(editReducer(initialState, action)).toEqual(expectedState);
  });

  it("set rescue edit", () => {
    const action = { type: "setRescueEdit", value: { rescue: "Jane Smith" } };
    const expectedState = { rescue: "Jane Smith" };
    expect(editReducer(initialState, action)).toEqual(expectedState);
  });

  it("set veterinarian edit", () => {
    const action = {
      type: "setVeterinarianEdit",
      value: { veterinarian: "John Doe" },
    };
    const expectedState = { veterinarian: "John Doe" };
    expect(editReducer(initialState, action)).toEqual(expectedState);
  });

  it("throw an error for unknown action type", () => {
    const action = { type: "unknown", value: {} };
    expect(() => editReducer(initialState, action)).toThrow(Error);
  });
});
