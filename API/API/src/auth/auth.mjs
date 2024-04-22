import jwt from "jsonwebtoken"; // Importing jwt for token verification
import { privateKey } from "./private_key.mjs"; // Importing private key for token verification

// Middleware function for authentication
const auth = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    // Checking if authorization header exists
    if (!authorizationHeader) {
        // If authorization header is missing, return 401 Unauthorized status
        const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`;
        return res.status(401).json({ message });
    } else {
        // Extracting token from authorization header
        const token = authorizationHeader.split(" ")[1];
        
        // Verifying the token with the private key
        jwt.verify(token, privateKey, (error, decodedToken) => {
            if (error) {
                // If token verification fails, return 401 Unauthorized status
                const message = `L'utilisateur n'est pas autorisé à accéder à cette ressource`;
                return res.status(401).json({ message });
            }
            // Extracting user ID from the decoded token
            const userId = decodedToken.userId;
            // Checking if the user ID in the request body matches the one in the token
            if (req.body.userId && req.body.userId !== userId) {
                // If user ID in the request body doesn't match the one in the token, return 401 Unauthorized status
                const message = `L'identifiant de l'utilisateur est invalide`;
                return res.status(401).json({ message });
            } else {
                // If everything is fine, proceed to the next middleware
                next();
            } 
        });
    }
}

export { auth }; // Exporting the auth middleware for use in other files
