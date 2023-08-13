const { Sequelize } = require('sequelize');
const DataTypes = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define('Activity', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      difficulty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
      },
      duration: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 0.5,
            max: 10
        }
      },
      season: {
        type: DataTypes.ENUM("Verano", "Otoño", "Invierno", "Primavera"),
        allowNull: false
      },
      countryId: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      imageURL:{
        type: DataTypes.TEXT,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      }
    },
    {
      timestamps: false
    })
}