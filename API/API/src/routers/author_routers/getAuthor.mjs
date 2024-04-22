import express from "express"; // Importing express for router creation
import { Author } from "../../db/sequelize.mjs"; // Importing Author model from sequelize
import { success } from "../helper.mjs"; // Importing success helper function
import { auth } from "../../auth/auth.mjs"; // Importing auth middleware

const getAuthorRouter = express();

/**
 * @swagger
 * /api/authors/{id}:
 *   get:
 *     tags: [Author]
 *     security:
 *       - bearerAuth: []
 *     summary: Rechercher un auteur par son ID.
 *     description: Rechercher un auteur par son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de l'auteur à rechercher
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Récupérer un auteur.
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
 *                       example: L'auteur dont l'id vaut 1 a bien été récupéré
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
 *       404:
 *         description: Aucun auteur trouvé avec l'ID spécifié.
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
 *                       example: L'auteur demandé n'existe pas. Merci de réessayer avec un autre identifiant.
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
 *                       example:  L'auteur n'a pas pu être récupéré. Merci de réessayer dans quelques instants
 */

// Route to get author by ID
getAuthorRouter.get("/:id", (req, res) => {
    // Find an author by primary key (ID)
    Author.findByPk(req.params.id)
        .then((author) => {
            // If no author is found for the given ID, return a 404 error
            if(author === null){
                const message = `L'auteur demandé n'existe pas. Merci de réessayer avec un autre identifiant.`
                return res.status(404).json({ message })
            }
            // If author is found, return the author details along with a success message
            const message = `L'auteur dont l'id vaut ${author.id_author} a bien été récupéré`
            res.json(success(message, author))
        })
        .catch((error) => {
            // If there's an error in fetching data, return a 500 error
            const message = `L'auteur n'a pas pu être récupéré. Merci de réessayer dans quelques instants`;
            res.status(500).json({message, data: error})
        })
})


export { getAuthorRouter }