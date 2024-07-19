import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Otro = sequelize.define("otro", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    identificadornew: { type: DataTypes.TEXT },
});
