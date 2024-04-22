import express from "express"; // Importing express for router creation
import { Publisher } from "../../db/sequelize.mjs"; // Importing Publisher model from sequelize
import { success } from "../helper.mjs"; // Importing success helper function
import { auth } from "../../auth/auth.mjs"; // Importing auth middleware

const getPublisherRouter = express(); // Creating a new instance of express router

/**
 * @swagger
 * /api/publishers/{id}:
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
 *                     fk_user:
 *                       type: integer
 *                       description: La FK de l'user.
 *                       example: 1
 *                     fk_book:
 *                       type: string
 *                       description: La FK du livre.
 *                       example: 1
 *                     revDate:
 *                       type: string
 *                       description: Date de l'avis.
 *                       example: 22/11/2023
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

// Endpoint for getting a specific publisher by ID
getPublisherRouter.get("/:id", auth,(req, res) => {
    // Finding the publisher by its primary key (ID)
    Publisher.findByPk(req.params.id)
        .then((publisher) => {
            // If the publisher doesn't exist, return 404 error
            if(publisher === null){
                const message = `L'éditeur demandé n'existe pas. Merci de réessayer avec un autre identifiant.`
                return res.status(404).json({ message })
            }
            // If the publisher exists, return success message along with the publisher data
            const message = `L'éditeur dont l'id vaut ${publisher.id_publisher} a bien été récupéré`
            res.json(success(message, publisher))
        })
        .catch((error) => {
            // If an error occurs during the process, return a generic error message
            const message = `L'éditeur n'a pas pu être récupéré. Merci de réessayer dans quelques instants`;
            res.status(500).json({message, data: error})
        })
})

export { getPublisherRouter } // Exporting the router for use in other files
