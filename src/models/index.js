const dbConfig = require("../config/database");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  timezone: dbConfig.timezone,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Address = require("./address")(sequelize, Sequelize);
db.User = require("./user")(sequelize, Sequelize, db.Address);

//definindo os relacionamentos, que um endereço pertence à um usuário, e que o usuário tem um endereço
db.Address.belongsTo(db.User, { foreignKey: 'user_id', as: 'user' });
db.User.hasOne(db.Address, { foreignKey: 'id_address', as: 'address' });

module.exports = db;