import express from "express"; // Importing express for router creation
import { Publisher } from "../../db/sequelize.mjs"; // Importing Publisher model from sequelize
import { success } from "../helper.mjs"; // Importing success helper function
import { auth } from "../../auth/auth.mjs"; // Importing auth middleware

const getAllPublishersRouter = express(); // Creating a new instance of express router

/**
 * @swagger
 * /api/publishers:
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
 *                       example: La liste des éditeurs a bien été récupéré
 *                     id_category:
 *                       type: integer
 *                       description: L'ID de la catégorie.
 *                       example: 1
 *                     catName:
 *                       type: string
 *                       description: Le nom de la catégorie.
 *                       example: horreur
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
 *                       example:  La liste des éditeurs n'a pas pu être récupérée. Merci de réessayer dans quelques instants.
 */

// Endpoint for getting all publishers
getAllPublishersRouter.get("/", auth,(req, res) => {
    // Get all publishers
    Publisher.findAll()
        .then((publisher) => {
            // Returning success message along with all publishers
            const message = `La liste des éditeurs a bien été récupéré`;
            res.json(success(message, publisher))
        })
        .catch((error) => {
            // If an error occurs during the process, return a generic error message
            const message = `La liste des éditeurs n'a pas pu être récupérée. Merci de réessayer dans quelques instants.`
            res.status(500).json({message, data: error})
        })
})

export { getAllPublishersRouter } // Exporting the router for use in other files
