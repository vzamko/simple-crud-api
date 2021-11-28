const jsonValidator = (data) => {
  try {
    JSON.parse(data);
  } catch (e) {
    return e.toString();
  }

  return false;
};

module.exports = jsonValidator;
