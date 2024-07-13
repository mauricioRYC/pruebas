import { DataTypes } from "sequelize";
import { sequelizeD } from "../database/databaseD.js";

export const Data = sequelizeD.define(
    "identificador",
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        datos_json: {
            type: DataTypes.JSONB,
        },
    },
    {
        timestamps: false,
        createdAt: true,
        updatedAt: false,
        freezeTableName: true, // Prevents table name from being pluralized
    },
);
