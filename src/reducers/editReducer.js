function editReducer(state, action) {
  switch (action.type) {
    case "setAdopterEdit":
      return { ...state, ...action.value };
    case "setAdminEdit":
      return { ...state, ...action.value };
    case "setFosterEdit":
      return { ...state, ...action.value };
    case "setRescueEdit":
      return { ...state, ...action.value };
    case "setVeterinarianEdit":
      return { ...state, ...action.value };
    default:
      throw new Error();
  }
}

export default editReducer;
