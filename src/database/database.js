const { v4: uuidv4 } = require('uuid');

let database = {};

const getDatabase = () => {
  return database;
};

const getPersonById = (id) => {
  return database[id] ?? 'Person does not exist.';
};

const addPerson = (data) => {
  let personId = uuidv4();

  database[personId] = {
    name: data.name,
    age: data.age,
    hobbies: data.hobbies
  };

  return {
    status: true,
    id: personId
  };
};

const changePerson = (personId, data) => {
  database[personId] = {...database[personId], ...data};

  return true;
}

const removePerson = (personId) => {
  delete database[personId];

  return true;
};

module.exports = { getDatabase, getPersonById, addPerson, changePerson, removePerson };