module.exports = (sequelize, DataTypes) => {
    const Friends = sequelize.define('Friends', {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      friendUsernames: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: []
      }
    });
   
    Friends.associate = (models) => {
      Friends.belongsTo(models.User, { foreignKey: 'username', targetKey: 'login', as: 'user' });
    };
     
    return Friends;
  };
  