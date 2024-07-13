import Sequelize  from "sequelize";

export const sequelizeD = new Sequelize('testeo','postgres','1235',{
    host: 'localhost',
    dialect: 'postgres'
})