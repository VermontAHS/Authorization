const knex = require('knex');
const config = require('../../knexfile');
const bcrypt = require('bcrypt');
const saltRounds = 12;
const env = process.env.NODE_ENV || 'development';
const client = knex(config[env]);

const emailExists = email => {
  return client('users')
    .where({ email: email })
    .then(res => {
      if (res.length > 0) return true;
      return false;
    });
};

const usernameExists = username => {
  return client('users')
    .where({ username: username })
    .then(res => {
      if (res.length > 0) return true;
      return false;
    });
};

const doesExist = (email, username) => {
  return emailExists(email).then(email => {
    return usernameExists(username).then(res => {
      return {
        email: email,
        username: res,
      };
    });
  });
};

const authenticateUser = params => {
  return usernameExists(params.username).then(response => {
    if (!response) return response;

    return getByUsername(params.username).then(result => {
      return bcrypt.compare(params.password, result.password).then(verified => {
        if (!verified) return verified;

        return {
          id: result.id,
          first_name: result.first_name,
          last_name: result.last_name,
          mi: result.mi,
          suffix: result.suffix,
          username: result.username,
          email: result.email,
          created_at: result.created_at,
        };
      });
    });
  });
};

const createUser = params => {
  return doesExist(params.email, params.username).then(result => {
    if (result.username || result.email) {
      return {
        message: 'User already exists',
        username: result.username,
        result: result.email,
      };
    } else {
      return bcrypt.hash(params.password, saltRounds).then(hash => {
        return client('users').insert({
          username: params.username,
          first_name: params.first_name,
          last_name: params.last_name,
          mi: params.mi || '',
          suffix: params.suffix || '',
          email: params.email,
          password: hash,
        });
      });
    }
  });
};

const deleteByUsername = username => {
  return client('users')
    .where({ username: username })
    .del()
    .then(response => {
      if (response === 0) return false;
      return true;
    });
};

const getByUserId = id => {
  return client('users')
    .where({ id: id })
    .then(result => {
      if (result.length === 0) return {};
      return {
        id: result[0].id,
        first_name: result[0].first_name,
        last_name: result[0].last_name,
        mi: result[0].mi,
        suffix: result[0].suffix,
        username: result[0].username,
        email: result[0].email,
        created_at: result[0].created_at,
      };
    });
};

const getByUsername = username => {
  return client('users')
    .where({ username: username })
    .then(result => {
      if (result.length === 0) return {};
      return result[0];
    });
};

const updateUserDetails = (username, params) => {
  return getByUsername(username).then(result => {
    if (Object.keys(result).length === 0) return false;

    return client('users')
      .where({ username: username })
      .update({
        first_name: params.first_name || result.first_name,
        last_name: params.last_name || result.last_name,
        mi: params.mi || result.mi,
        suffix: params.suffix || result.suffix,
      })
      .then(response => {
        if (response === 0) return false;
        return true;
      });
  });
};

const updateUserPassword = (username, password) => {
  return getByUsername(username).then(result => {
    if (Object.keys(result).length === 0) return false;

    return bcrypt
      .hash(password, saltRounds)
      .then(hash => {
        return client('users')
          .where({ username: username })
          .update({ password: hash });
      })
      .then(response => {
        if (response === 0) return false;
        return true;
      });
  });
};

module.exports = {
  authenticateUser: authenticateUser,
  emailExists: emailExists,
  createUser: createUser,
  deleteByUsername: deleteByUsername,
  doesExist: doesExist,
  getByUserId: getByUserId,
  getByUsername: getByUsername,
  updateUserDetails: updateUserDetails,
  updateUserPassword: updateUserPassword,
  usernameExists: usernameExists,
};
