module.exports = (sequelize, DataTypes) => {
    const Library = sequelize.define(
      "Library",
      {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
          },
          title: {
            type: DataTypes.STRING,
          },
          page: {
            type: DataTypes.STRING,
          },
          year: {
            type: DataTypes.STRING,
          },
          description: {
            type: DataTypes.STRING,
          },
          createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
          },
          updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
          },
      },
      {
        tableName: "book",
      }
    );
    return Library;
  };