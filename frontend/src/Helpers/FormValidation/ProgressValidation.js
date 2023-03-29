export const validateProgress = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = "Progress title required";
  }
  if (!values.progress) {
    errors.progress = "Progress is required";
  }
  if (!values.description) {
    errors.description = "Description is required";
  }
  return errors;
};
