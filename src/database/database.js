import Sequelize from "sequelize";

export const sequelize = new Sequelize("tst", "postgres", "1235", {
    host: "localhost",
    dialect: "postgres",
});
