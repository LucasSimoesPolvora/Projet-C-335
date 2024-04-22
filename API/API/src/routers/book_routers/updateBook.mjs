import express from "express"; // Importing express for router creation
import { Book } from "../../db/sequelize.mjs"; // Importing Book model from sequelize
import { success } from "../helper.mjs"; // Importing success helper function
import { auth } from "../../auth/auth.mjs"; // Importing auth middleware

const updateBookRouter = express(); // Creating a new instance of express router

// Endpoint for updating a specific book by ID
updateBookRouter.put("/:id", auth,(req, res) => {
    const bookId = req.params.id; // Extracting book ID from request parameters
    // Updating the book with the provided data
    Book.update(req.body, { where: { id_book: bookId } })
        .then((_) => {
            // Finding the updated book by its primary key (ID)
            return Book.findByPk(bookId)
                .then((updatedBook) => {
                    // If the updated book doesn't exist, return 404 error
                    if (updatedBook === null) {
                        const message = "Le livre demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
                        return res.status(404).json({ message });
                    }
                    // If the book is updated successfully, return success message along with the updated book data
                    const message = `Le livre ${updatedBook.booTitle} dont l'id vaut ${updatedBook.id_book} a été mis à jour avec succès !`;
                    res.json(success(message, updatedBook));
                });
        })
        .catch((error) => {
            // If an error occurs during the process, return a generic error message
            const message = "Le livre n'a pas pu être mis à jour. Merci de réessayer dans quelques instants.";
            res.status(500).json({ message, data: error });
        });
});

export { updateBookRouter }; // Exporting the router for use in other files
