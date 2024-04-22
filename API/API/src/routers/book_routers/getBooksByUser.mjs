import express from "express"; // Importing express for router creation
import { Book, User } from "../../db/sequelize.mjs"; // Importing Book and Review models from sequelize
import { success } from "../helper.mjs"; // Importing success helper function
import { auth } from "../../auth/auth.mjs"; // Importing auth middleware

const getBooksByUserRouter = express(); // Creating a new instance of express router

// Route to get books by user ID
getBooksByUserRouter.get("/:id/books", auth, (req, res) => {
    // Check if the user ID parameter exists in the request
    if(req.params.id) {
        // Find a record in the "User" table where the user ID matches
        return User.findOne({
            where: { id_user: req.params.id },
        }).then((user) => {
            // If no record is found for the user ID, return a 404 error
            if (user === null) {
                const message = "L'utilisateur demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
                return res.status(404).json({ message });
            }
            // Find all books associated with the user ID
            Book.findAll({
                where: { fk_user: user.id_user },
            }).then((books) => {
                // If books are found, return them along with a success message
                if(books.length !=0){
                    const message = `Voici tout les livres de l'utilisateur "${user.usePseudo}"`;
                    return res.json(success(message, books));
                }
            });
        }).catch((error) => {
            // If there's an error in fetching data, return a 500 error
            const message = "La liste des livres n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
            res.status(500).json({ message, data: error });
        })        
    }
});

export { getBooksByUserRouter }; // Exporting the router for use in other files