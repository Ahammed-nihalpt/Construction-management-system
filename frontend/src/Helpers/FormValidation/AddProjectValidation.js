export const AddProductImageValidate = (image) => {
  if (!image) {
    return "Please select a image";
  }
};

export const AddProjectvalidate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Name is required";
  } else if (!/^[A-Za-z\s]*$/.test(values.name)) {
    errors.name = "Name should only contain alphabets";
  }
  if (!values.description) {
    errors.description = "description is required";
  } else if (!/^[A-Za-z\s]*$/.test(values.description)) {
    errors.description = "description should only contain alphabets";
  }
  if (!values.startDate) {
    errors.startDate = "Date is required";
  }
  if (!values.location) {
    errors.location = "Location is required";
  }
  if (!values.endDate) {
    errors.endDate = "Date is required";
  }
  if (!values.amount) {
    errors.amount = "Amount is required";
  } else if (isNaN(Number(values.amount))) {
    errors.amount = "Invalid amount";
  }
  if (!values.duration) {
    errors.duration = "Duration is required";
  } else if (isNaN(Number(values.duration))) {
    errors.duration = "Invalid duration";
  }

  return errors;
};

export const editProjectValidation = (values) => {
  const errors = {};
  console.log(values);
  if (!values.project_name) {
    errors.project_name = "Name is required";
  } else if (!/^[A-Za-z\s]*$/.test(values.name)) {
    errors.project_name = "Name should only contain alphabets";
  }
  if (!values.description) {
    errors.description = "description is required";
  } else if (!/^[A-Za-z\s]*$/.test(values.description)) {
    errors.description = "description should only contain alphabets";
  }
  if (!values.start_Date) {
    errors.start_Date = "Date is required";
  }
  if (!values.location) {
    errors.location = "Location is required";
  }
  if (!values.end_Date) {
    errors.end_Date = "Date is required";
  }
  if (!values.tender_amount) {
    errors.tender_amount = "Amount is required";
  } else if (/\D/.test(values.tender_amount)) {
    errors.tender_amount = "Invalid amount";
  }
  if (!values.duration) {
    errors.duration = "Duration is required";
  } else if (isNaN(Number(values.duration))) {
    errors.duration = "Invalid duration";
  }
  console.log(errors);
  return errors;
};

export const addUserValidation = (values) => {
  const errors = {};
  console.log(values);
  if (!values.name) {
    errors.name = "Name is required";
  } else if (!/^[A-Za-z\s]*$/.test(values.name)) {
    errors.name = "Name should only contain alphabets";
  }
  if (!values.designation) {
    errors.designation = "designation is required";
  }
  if (!values.password) {
    errors.password = "Password is required";
  }
  if (!values.email) {
    errors.email = "email is required";
  } else if (
    !String(values.email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  ) {
    errors.email = "Invalid email address";
  }
  if (!values.contact) {
    errors.contact = "contact is required";
  } else if (/\D/.test(values.contact)) {
    errors.contact = "Invalid contact";
  } else if (values.contact.length !== 10) {
    errors.contact = "Invalid contact";
  }
  return errors;
};
