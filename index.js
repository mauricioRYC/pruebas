import app from "./src/app.js";
import { sequelize } from "./src/database/database.js";
import { sequelizeD } from "./src/database/databaseD.js";

async function main() {
    try {
        await sequelizeD.sync({ force: false });
        console.log("Connection has been established successfully.");
        try {
            await sequelize.sync({ force: false });
            console.log("Connection has been established succesfully tst");
        } catch (error) {
            console.log("ERROR EN TST");
        }
        app.listen(8080, () => {
            console.log("Servidor OK", 8080);
        });
        app.listen(4000);
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

main();
