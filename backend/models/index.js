const { Sequelize } = require('sequelize')
const config = require('../config/serverConfig')

const sequelize = new Sequelize(config.DATABASE, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.DIALECT
});

const db = {}
db.sequelize = sequelize;
db.models = {};


db.models.User = require('./user')(sequelize, Sequelize.DataTypes);
db.models.Friends=require('./friends')(sequelize,Sequelize.DataTypes);

Object.keys(db.models).forEach(modelName => {
    if (db.models[modelName].associate) {
        db.models[modelName].associate(db.models);
    }
});

module.exports = db;
