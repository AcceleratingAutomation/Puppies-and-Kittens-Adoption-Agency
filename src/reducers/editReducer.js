function editReducer(state, action) {
  switch (action.type) {
    case "setAdopterEdit":
      return { ...state, ...action.value };
    default:
      throw new Error();
  }
}

export default editReducer;
