const initialState = {
  toggle: true,
  clicked: "",
  data: {},
  permissions: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "Toggle":
      return {
        ...state,
        toggle: action.status,
      };

    case "Clicked":
      return {
        ...state,
        clicked: action.on,
      };

    case "Add Data":
      return {
        ...state,
        data: action.data,
      };

    case "Add Permission":
      return {
        ...state,
        permissions: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
