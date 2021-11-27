const { v4: uuidv4 } = require('uuid');

let database = {
  "990f6247-261b-4041-9558-5ba8e852db1f": {
    name: 'anonymous',
    age: 0,
    hobbies: []
  },
  [uuidv4()]: {
    name: "Valera",
    age: "27",
    hobbies: [
      "games",
      "music"
    ]
  }
};

const getDatabase = () => {
  return database;
};

const getPersonById = (id) => {
  return database[id] ?? 'Person does not exist.';
};

const addPerson = (data) => {
  database[uuidv4()] = {
    name: data.name,
    age: data.age,
    hobbies: data.hobbies
  };

  return true;
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