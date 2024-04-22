import express from "express"; // Importing express for router creation
import { Book, Wrote, Author } from "../../db/sequelize.mjs"; // Importing Book and Review models from sequelize
import { success } from "../helper.mjs"; // Importing success helper function
import { auth } from "../../auth/auth.mjs"; // Importing auth middleware

const getBooksByAuthor = express(); // Creating a new instance of express router

/**
 * @swagger
 * /api/authors/{id}/books:
 *   get:
 *     tags: [Book]
 *     security:
 *       - bearerAuth: []
 *     summary: Rechercher un livre par son auteur.
 *     description: Rechercher un livre par son auteur.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de l'auteur pour les livres à rechercher
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Récupérer un livre.
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
 *                       example: Voici tout les livres de l'auteur Sun" 
 *                     id_book:
 *                       type: integer
 *                       description: L'ID du livre.
 *                       example: 1
 *                     booTitle :
 *                       type: string
 *                       description: Le titre du livre.
 *                       example: L'art de la guerre 
 *                     booPageCount:
 *                       type: integer
 *                       description: Le nom de l'auteur.
 *                       example: 600
 *                     booExtract:
 *                       type: string
 *                       description: Un extrait du livre.
 *                       example: Il était une fois un informaticien qui vivait sous un bureau.
 *                     booSummary:
 *                       type: string
 *                       description: Un résumé du livre.
 *                       example: C'est l'histoire d'un informaticien.
 *                     booAvgRating:
 *                       type: float
 *                       description: La note moyenne du livre.
 *                       example: 4.5
 *                     booCoverImage:
 *                       type: string
 *                       description: Un lien pour l'image de couverture du livre.
 *                       example: https://th.bing.com/th/id/R.f999471f51eab473baa6fe5cf40a7f32?rik=CACwXQt6ldAzHQ&pid=ImgRaw&r=0
 *                     booPublishDate:
 *                       type: date
 *                       description: La date de publication du livre.
 *                       example: 11/11/2023
 *                     fk_user:
 *                       type: integer
 *                       description: id de l'user qui a publié.
 *                       example: 1
 *                     fk_publisher:
 *                       type: integer
 *                       description: id de l'éditeur qui a publié.
 *                       example: 1
 *                     fk_category:
 *                       type: integer
 *                       description: id de l'categorie à qui il appartient.
 *                       example: 1
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
 *                       example:  La liste des livres n'a pas pu être récupérée. Merci de réessayer dans quelques instants.
 */

// Route to get books by author ID

getBooksByAuthor.get("/:id/books", auth, async (req, res) => {
    try {
        // Find records in the "Wrote" table where the author ID matches
        const wrote = await Wrote.findAll({
            where: { fk_author: req.params.id  }
        });

        // If no record is found for the author ID, return a 404 error
        if (wrote.length === 0) {
            const message = "L'auteur demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
            return res.status(404).json({ message });
        }

        // Extract book IDs associated with the author
        const bookIds = wrote.map(entry => entry.fk_book);

        // Find all books associated with the author ID
        const books = await Book.findAll({
            where: { id_book: bookIds },
        });

        // Find the author record based on the author ID
        const author = await Author.findOne({
            where: { id_author: req.params.id }
        });

        // If books are found, return them along with a success message
        if(books.length > 0) {
            const message = `Voici tous les livres écrit/écrite ${author.autFirstName } ${author.autLastName }`;
            return res.json(success(message, books));
        }

        // If no books are found, return a message
        const message = `L'auteur "${author.autFirstName}" n'a pas encore écrit de livre.`;
        return res.json({ message });
    } catch (error) {
        // If there's an error in fetching data, return a 500 error
        const message = "La liste des livres n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
        return res.status(500).json({ message, error });
    }
});



export { getBooksByAuthor }; // Exporting the router for use in other files