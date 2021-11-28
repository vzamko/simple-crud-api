const createValidator = (data) => {
  if (!data || !data.name || !data.age || !data.hobbies) {
    return true;
  }

  return (
    typeof data.name !== "string" ||
    !Number.isInteger(Number.parseInt(data.age)) ||
    !Array.isArray(data.hobbies)
  );
};

module.exports = createValidator;
