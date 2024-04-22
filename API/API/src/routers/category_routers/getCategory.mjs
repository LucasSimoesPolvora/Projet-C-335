import express from "express"; // Importing express for router creation
import { Category } from "../../db/sequelize.mjs"; // Importing Category model from sequelize
import { success } from "../helper.mjs"; // Importing success helper function
import { auth } from "../../auth/auth.mjs"; // Importing auth middleware

const getCategoryRouter = express(); // Creating a new instance of express router

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     summary: Rechercher toutes les catégories.
 *     description: Rechercher toutes les catégories.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de la catégorie
 *         required: true
 *         schema:
 *           type: integer
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
 *                       example: La catégorie dont l'id vaut 1 a bien été récupérée
 *                     id_category:
 *                       type: integer
 *                       description: L'ID de la catégorie.
 *                       example: 1
 *                     catName:
 *                       type: string
 *                       description: Le nom de la catégorie.
 *                       example: horreur
 *       404:
 *         description: Aucune catégorie trouvé avec l'ID spécifié.
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
 * 
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
 *                       example:  La catégorie demandée n'existe pas. Merci de réessayer avec un autre identifiant.
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
 *                       example:  La catégorie n'a pas pu être récupérée. Merci de réessayer dans quelques instants
 */


// Endpoint for getting a specific category by ID
getCategoryRouter.get("/:id", (req, res) => {
    // Finding the category by its primary key (ID)
    Category.findByPk(req.params.id)
        .then((category) => {
            // If the category doesn't exist, return 404 error
            if(category === null){
                const message = `La catégorie demandée n'existe pas. Merci de réessayer avec un autre identifiant.`
                return res.status(404).json({ message })
            }
            // If the category exists, return success message along with the category data
            const message = `La catégorie dont l'id vaut ${category.id_category} a bien été récupérée`
            res.json(success(message, category))
        })
        .catch((error) => {
            // If an error occurs during the process, return a generic error message
            const message = `La catégorie n'a pas pu être récupérée. Merci de réessayer dans quelques instants`;
            res.status(500).json({message, data: error})
        })
})

export { getCategoryRouter } // Exporting the router for use in other files
