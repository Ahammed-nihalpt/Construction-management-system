export const payValidation = (formvalues, value) => {
  let errors = {};
  if (!formvalues.for) {
    errors.for = "Reason for Payment is required";
  }
  if (!formvalues.amount) {
    errors.amount = "Amount is required";
  } else if (!/^\d+(\.\d{1,2})?$/.test(formvalues.amount)) {
    errors.amount = "Please enter a valid amount (e.g. 100 or 100.50).";
  }
  if (!value) {
    errors.pid = "Please select a project";
  }
  return errors;
};
