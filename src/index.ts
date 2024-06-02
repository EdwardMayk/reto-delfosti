import "reflect-metadata";
import app from "./app";
import { AppDataSource } from "./database/db";

 async function main() {
    try {
        await AppDataSource.connect();
        console.log("Database connected");

        app.listen(app.get("port"));
        console.log(`Server running on port ${app.get("port")}`);
        console.log(`API documentation available at http://localhost:${app.get("port")}/api-docs`);
    }
    catch (error) {
        console.error(error);
    }
}

main()