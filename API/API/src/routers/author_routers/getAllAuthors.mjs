import express from "express"; // Importing express for router creation
import { Author } from "../../db/sequelize.mjs"; // Importing Author model from sequelize
import { success } from "../helper.mjs"; // Importing success helper function
import { auth } from "../../auth/auth.mjs"; // Importing auth middleware

const getAllAuthorsRouter = express(); // Creating a new instance of express router

/**
 * @swagger
 * /api/authors:
 *   get:
 *     tags: [Author]
 *     security:
 *       - bearerAuth: []
 *     summary: Rechercher tous les auteurs.
 *     description: Rechercher tous les auteurs.
 *     responses:
 *       200:
 *         description: Donne les auteurs.
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
 *                       example: La liste des auteurs a bien été récupéré
 *                     id_author:
 *                       type: integer
 *                       description: L'ID de l'auteur.
 *                       example: 1
 *                     autFirstName:
 *                       type: string
 *                       description: Le prénom de l'auteur.
 *                       example: Sun 
 *                     autLastName:
 *                       type: string
 *                       description: Le nom de l'auteur.
 *                       example: Tzu
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
 *                       example:  La liste des auteurs n'a pas pu être récupérée. Merci de réessayer dans quelques instants.
 */
 

// Endpoint for getting all authors
getAllAuthorsRouter.get("/", (req, res) => {
    // Get all authors
    Author.findAll({})
        .then((author) => {
            // Returning success message along with all authors
            const message = `La liste des auteurs a bien été récupéré`;
            res.json(success(message, author))
        })
        .catch((error) => {
            // If an error occurs during the process, return a generic error message
            const message = `La liste des auteurs n'a pas pu être récupérée. Merci de réessayer dans quelques instants.`
            res.status(500).json({message, data: error})
        })
})

export { getAllAuthorsRouter } // Exporting the router for use in other files
