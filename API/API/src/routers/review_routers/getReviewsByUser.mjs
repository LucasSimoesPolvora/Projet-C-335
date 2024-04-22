import express from "express"; // Importing express for router creation
import { Book as User, Review } from "../../db/sequelize.mjs"; // Importing Book and Review models from sequelize
import { success } from "../helper.mjs"; // Importing success helper function
import { auth } from "../../auth/auth.mjs"; // Importing auth middleware

const getReviewsByUserRouter = express(); // Creating a new instance of express router

// Route to get reviews by user ID
getReviewsByUserRouter.get("/:id/reviews", auth, (req, res) => {
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
            // Find all reviews associated with the user ID
            Review.findAll({
                where: { fk_user: { [Op.eq]: user.id_user } },
            }).then((reviews) => {
                // If reviews are found, return them along with a success message
                if(reviews.length !=0){
                    const message = `Voici tout les reviews de l'utilisateur "${user.usePseudo}"`;
                    res.json(success(message, reviews));
                }
            });
        }).catch((error) => {
            // If there's an error in fetching data, return a 500 error
            const message = "La liste des reviews n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
            res.status(500).json({ message, data: error });
        })        
    }
});

export { getReviewsByUserRouter }