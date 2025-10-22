


export const validateString = (value) => {
  return value?.length <3 || value===null ? "Must be at least 3 characters" : null;
}