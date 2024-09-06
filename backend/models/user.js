module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: false, 
        primaryKey: true
      },
      login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      node_id: {
        type: DataTypes.STRING,
        allowNull: true
      },
      avatar_url: {
        type: DataTypes.STRING,
        allowNull: true
      },
      url: {
        type: DataTypes.STRING,
        allowNull: true
      },
      html_url: {
        type: DataTypes.STRING,
        allowNull: true
      },
      followers_url: {
        type: DataTypes.STRING,
        allowNull: true
      },
      following_url: {
        type: DataTypes.STRING,
        allowNull: true
      },
      gists_url: {
        type: DataTypes.STRING,
        allowNull: true
      },
      starred_url: {
        type: DataTypes.STRING,
        allowNull: true
      },
      subscriptions_url: {
        type: DataTypes.STRING,
        allowNull: true
      },
      organizations_url: {
        type: DataTypes.STRING,
        allowNull: true
      },
      repos_url: {
        type: DataTypes.STRING,
        allowNull: true
      },
      events_url: {
        type: DataTypes.STRING,
        allowNull: true
      },
      received_events_url: {
        type: DataTypes.STRING,
        allowNull: true
      },
      type: {
        type: DataTypes.STRING,
        allowNull: true
      },
      site_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      company: {
        type: DataTypes.STRING,
        allowNull: true
      },
      blog: {
        type: DataTypes.STRING,
        allowNull: true
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true
      },
      hireable: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      twitter_username: {
        type: DataTypes.STRING,
        allowNull: true
      },
      public_repos: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      public_gists: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      followers: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      following: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true
      }
    }, {
      tableName: 'Users',
      timestamps: false
    });
  
    return User;
  };
  