const Factory = require('rosie').Factory;
const faker = require('faker');

const fakeMi = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const idx = Math.floor(Math.random() * 25);
  return letters[idx];
};

const User = Factory.define('user').attrs({
  first_name: () => faker.name.firstName(),
  last_name: () => faker.name.lastName(),
  mi: () => fakeMi(),
  suffix: () => faker.name.suffix(),
  username: () => faker.internet.userName(),
  email: () => faker.internet.email(),
  password: () => faker.internet.password(),
});

module.exports.User = User;
