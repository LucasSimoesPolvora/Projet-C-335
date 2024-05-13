import { Sequelize, DataTypes } from "sequelize";
import { books } from "./mock-data.mjs";
import { bookModel } from "../models/db_books.mjs";

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
                    importBooks()
                    console.log("La base de données a bien été synchronisée")
                })
}

// let importEpub = () => {
//     epub.map((e) => {
//         Epub.create({
//             epub: e.epub,
//         })
//     })
// }

let importBooks = () => {
    books.map((book) => {
        Book.create({
            id_book: book.id_book,
            booTitle: book.booTitle,
            booPageCount: book.booPageCount,
            booExcerpt: book.booExcerpt,
            booSummary: book.booSummary,
            booAvgRating: book.booAvgRating,
            booCoverImage: book.booCoverImage,
            booPublishDate: book.booPublishDate,
            booEpub: book.booEpub,
            booAuthor: book.booAuthor
        })
    })
}

const Book = bookModel(sequelize, DataTypes);


export { initDb, sequelize, Book };