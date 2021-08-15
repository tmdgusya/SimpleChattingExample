module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "message",
    {
      id: {
        type: DataTypes.BIGINT(11),
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.BIGINT(11),
        allowNull: true,
      },
      room_id: {
        type: DataTypes.BIGINT(11),
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );
};
