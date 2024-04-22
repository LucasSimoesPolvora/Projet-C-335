import express from "express";
import { success } from "./routers/helper.mjs";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.mjs";


/**
 * Importing the book routers
 */
import { getAllBooksRouter } from "./routers/book_routers/getAllBooks.mjs"
import { getBookRouter } from "./routers/book_routers/getBook.mjs"
import { deleteBookRouter } from "./routers/book_routers/deleteBook.mjs"
import { createBookRouter } from "./routers/book_routers/createBook.mjs"
import { updateBookRouter } from "./routers/book_routers/updateBook.mjs"
import { getBooksByUserRouter } from "./routers/book_routers/getBooksByUser.mjs";
import { getBooksByCategoryRouter } from "./routers/book_routers/getBooksByCategory.mjs";
import { getBooksByAuthor } from "./routers/book_routers/getBooksByAuthor.mjs";

/**
 * Importing the review routers
 */
import { getReviewsByBookRouter} from "./routers/review_routers/getReviewsByBook.mjs"
import { createReviewRouter } from "./routers/review_routers/createReview.mjs";
import { getReviewsByUserRouter } from "./routers/review_routers/getReviewsByUser.mjs";

/**
 * Importing the categories router
 */
import { getAllCategoriesRouter } from "./routers/category_routers/getAllCategories.mjs";
import { getCategoryRouter } from "./routers/category_routers/getCategory.mjs";

/**
 * Importing the authors router
 */
import { getAllAuthorsRouter } from "./routers/author_routers/getAllAuthors.mjs";
import { getAuthorRouter } from "./routers/author_routers/getAuthor.mjs";


/**
 * Importing the publishers routes
 */
import { getAllPublishersRouter } from "./routers/publisher_routers/getAllPublishers.mjs";
import { getPublisherRouter } from "./routers/publisher_routers/getPublisher.mjs";

/**
 * Importing the login router
 */
import { loginRouter } from "./routers/login_routers/login.mjs";

const app = express();
app.use(express.json());
const port = 3000;


/**
 * Handles GET requests to the root endpoint ("/").
 * Responds with a JSON object indicating a successful response.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
app.get("/", (req,res) => {
    res.json(success())
})

/**
 * Redirects requests to the root URL.
 * @param {string} path - The path of the incoming request.
 * @param {Object} reqBody - The request body object.
 * @param {Object} resBody - The response body object.
 */
app.get("/api/", (req,res) => {
    res.redirect(`http://localhost:${port}/`)
})

/**
 * Starts the server and listens for incoming connections on the specified port.
 * Once the server is running, logs the URL where it's accessible.
 * @param {number} port - The port number on which the server should listen.
 */
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
});

/**
 * Mounts Swagger UI middleware at the specified route.
 * This middleware serves the Swagger UI interface, allowing users to interact with API documentation.
 * @param {string} "/api-docs" - The route where the Swagger UI will be accessible.
 * @param {function} swaggerUi.serve - Middleware function that serves Swagger UI assets.
 * @param {function} swaggerUi.setup(swaggerSpec, options) - Middleware function that sets up Swagger UI with provided Swagger specification and options.
 * @param {object} swaggerSpec - The Swagger specification object describing the API.
 * @param {object} { explorer: true } - Options object passed to customize Swagger UI behavior (e.g., enabling the explorer).
 */
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, { explorer: true })
);

/**
 * Mounts routers for the books of the API 
 */
app.use("/api/books", getAllBooksRouter)
app.use("/api/books", getBookRouter)
app.use("/api/books", deleteBookRouter)
app.use("/api/books", createBookRouter)
app.use("/api/books", updateBookRouter)
app.use("/api/users", getBooksByUserRouter)
app.use("/api/authors", getBooksByAuthor)
app.use("/api/categories", getBooksByCategoryRouter)

/**
 * Mounts routers for the reviews of the API 
 */
app.use("/api/books", getReviewsByBookRouter)
app.use("/api/books", createReviewRouter)
app.use("/api/users", getReviewsByUserRouter)

/**
 * Mounts routers for the categories of the API 
 */
app.use("/api/categories", getAllCategoriesRouter)
app.use("/api/categories", getCategoryRouter)

/**
 * Mounts routers for the authors of the API 
 */
app.use("/api/authors", getAllAuthorsRouter)
app.use("/api/authors", getAuthorRouter)

/**
 *  Mounts routers for the publishers of the API
 */
app.use("/api/publishers", getAllPublishersRouter)
app.use("/api/publishers", getPublisherRouter)

/**
 * Mounts routers for the login of the API 
 */
app.use("/api/login", loginRouter)


/**
 * This route is for the unfindable routes that the user gives and it gives an 404 error
 */
app.use(({ res }) => {
    const message = "Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL."
    res.status(404).json(message)
})