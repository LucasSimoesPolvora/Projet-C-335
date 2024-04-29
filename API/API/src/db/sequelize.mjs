import { Sequelize, DataTypes } from "sequelize";
import { books, epub } from "./mock-data.mjs";
import { bookModel, reviewModel, userModel, wroteModel, publisherModel, categoryModel, authorModel, categorizeModel, epubModel } from "../models/db_books.mjs";

/**
 * Establishes a connection to the MySQL database using Sequelize.
 * @param {string} "db_books" - The name of the database to connect to.
 * @param {string} "root" - The username for database authentication.
 * @param {string} "root" - The password for database authentication.
 * @param {object} options - Additional options for configuring the connection.
 * @param {string} options.host - The hostname of the database server.
 * @param {number} options.port - The port number of the database server.
 * @param {string} options.dialect - The dialect of the database (e.g., "mysql").
 * @param {boolean} options.logging - Whether to log SQL queries and errors.
 */
const sequelize = new Sequelize(
    "db_books",
    "root",
    "root",
    {
        host: "localhost",
        port: 6033,
        dialect: "mysql",
        logging: false,
        define: {
            timestamps: false,
          },
    }
);

let initDb = () => {
    return sequelize
                .sync({force: true})
                .then((_) => {
                    importEpub()
                    console.log("La base de données a bien été synchronisée")
                })
}

let importEpub = () => {
    epub.map((e) => {
        Epub.create({
            epub: e.epub,
        })
    })
}

// let importUser = () => {
//     users.map((user) => {
//         bcry
//     })
// }

const Publisher = publisherModel(sequelize, DataTypes);
const Book = bookModel(sequelize, DataTypes);
const Review = reviewModel(sequelize, DataTypes);
const Category = categoryModel(sequelize, DataTypes);
const User = userModel(sequelize, DataTypes);
const Wrote = wroteModel(sequelize, DataTypes);
const Author = authorModel(sequelize, DataTypes);
const Categorize = categorizeModel(sequelize, DataTypes);
const Epub = epubModel(sequelize, DataTypes)

export { initDb, sequelize, Book, Review, Publisher, Category, User, Wrote, Author, Categorize, Epub };