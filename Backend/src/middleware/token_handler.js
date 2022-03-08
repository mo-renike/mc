const jwt = require('jsonwebtoken');
const config = require('config');
const db = require('../lib/database/query');

const serverConfig = config.get('databaseConfig');

module.exports = {
  create: async (id) => {
    const token = jwt.sign({ _id_user: id }, serverConfig.JWT_KEY);
    return token;
  },

  verify: async (token) => {
    const isAuth = (await db.search_one('user_tokens', 'token', token))[0];
    return isAuth ? isAuth.id_user : null;
  },
};
