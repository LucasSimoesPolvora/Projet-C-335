import express from "express"; // Importing express for router creation
import { Category } from "../../db/sequelize.mjs"; // Importing Category model from sequelize
import { success } from "../helper.mjs"; // Importing success helper function
import { auth } from "../../auth/auth.mjs"; // Importing auth middleware

const getAllCategoriesRouter = express(); // Creating a new instance of express router

/**
 * @swagger
 * /api/categories:
 *   put:
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     summary: Rechercher toutes les catégories.
 *     description: Rechercher toutes les catégories.
 *     parameters:
 *     responses:
 *       200:
 *         description: Rechercher les catégories.
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
 *                       example: Le livre l'art de la guerre dont l'id vaut 1 a été mis à jour avec succès !
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
 *                       example: 22/11/2023
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
 *                       example:  La liste de catégories n'a pas pu être récupérée. Merci de réessayer dans quelques instants.
 */

// Endpoint for getting all categories
getAllCategoriesRouter.get("/", (req, res) => {
    // Get all categories
    Category.findAll()
        .then((category) => {
            // Returning success message along with all categories
            const message = `La liste des catégories a bien été récupérée`;
            res.json(success(message, category))
        })
        .catch((error) => {
            // If an error occurs during the process, return a generic error message
            const message = `La liste de catégories n'a pas pu être récupérée. Merci de réessayer dans quelques instants.`
            res.status(500).json({message, data: error})
        })
})

export { getAllCategoriesRouter } // Exporting the router for use in other files
