import express from "express"; // Importing express for router creation
import { Book, Review } from "../../db/sequelize.mjs"; // Importing Book and Review models from sequelize
import { success } from "../helper.mjs"; // Importing success helper function
import { auth } from "../../auth/auth.mjs"; // Importing auth middleware

const getReviewsByBookRouter = express(); // Creating a new instance of express router

/**
 * @swagger
 * /api/books/{id}/reviews:
 *   get:
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     summary: rechercher un avis.
 *     description: rechercher un avis.
 *     responses:
 *       200:
 *         description: rechercher un avis.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Voici tout les reviews du livre "l'art de la guerre"
 *                     fk_user:
 *                       type: integer
 *                       description: La FK du user.
 *                       example: 1
 *                     fk_book:
 *                       type: integer
 *                       description: La FK du livre.
 *                       example: 1
 *                     revDate:
 *                       type: date
 *                       description: Date de l'avis.
 *                       example: 22/11/2023 11:33
 *                     revComment:
 *                       type: string
 *                       description: Commentaire de l'avis.
 *                       example: Tres bon livre
 *                     revRating:
 *                       type: integer
 *                       description: Note de l'avis.
 *                       example: 4
 *       401:
 *         description: Pas de jeton d'authentification.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example:  Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.
 *       404:
 *         description: Aucun livre trouvé avec l'ID spécifié.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Le livre demandé n'existe pas. Merci de réessayer avec un autre identifiant.
 *       500:
 *         description: erreur du serveur.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example:  La liste des reviews n'a pas pu être récupérée. Merci de réessayer dans quelques instants.
 */

// Route to get reviews by book ID
getReviewsByBookRouter.get("/:id/reviews", auth, (req, res) => {
    // Check if the book ID parameter exists in the request
    if(req.params.id) {
        // Find a record in the "Book" table where the book ID matches
        return Book.findOne({
            where: { id_book: req.params.id },
        }).then((book) => {
            // If no record is found for the book ID, return a 404 error
            if (book === null) {
                const message = "Le livre demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
                return res.status(404).json({ message });
            }
            // Find all reviews associated with the book ID
            Review.findAll({
                where: { fk_book: book.id_book },
            }).then((reviews) => {
                // If reviews are found, return them along with a success message
                if(reviews.length !=0){
                    const message = `Voici tout les reviews du livre "${book.booTitle}"`;
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


export { getReviewsByBookRouter }; // Exporting the router for use in other files
