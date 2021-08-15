module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "room",
    {
      id: {
        type: DataTypes.BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      user_id: {
        type: DataTypes.BIGINT(11),
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );
};
