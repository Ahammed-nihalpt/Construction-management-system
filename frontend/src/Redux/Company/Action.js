export const ToggleAction = (status) => {
  return {
    type: "Toggle",
    status: status,
  };
};

export const ClickedAction = (on = "") => {
  return {
    type: "Clicked",
    on: on,
  };
};

export const AddData = (data) => {
  return {
    type: "Add Data",
    data: data,
  };
};

export const Addpermission = (data) => {
  return {
    type: "Add Permission",
    data: data,
  };
};
