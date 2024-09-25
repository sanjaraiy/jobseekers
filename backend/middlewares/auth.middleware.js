import jwt from 'jsonwebtoken';

const isAuthenticated = async (req, res, next) => {
    try {
        // Check if the token exists in cookies
        const token = req.cookies.token;
         
        
        
        // If no token is found, return 401 unauthorized
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated, token missing",
            });
        }

        // Verify the token with the secret key
        const decodedToken = await jwt.verify(token, process.env.SECRET_KEY);
        
      
        
        // If the token is invalid or expired
        if (!decodedToken) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token",
            });
        }

        // Attach the decoded user ID to the request object for later use
        req.id = decodedToken.userId;
        req.role = decodedToken.role;
        
       
        
        // Proceed to the next middleware or route handler
        next();

    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error, unable to authenticate",
        });
    }
};

const isAuthorization = (allowedRole) => {
    return async (req, res, next) => {
        try {
           
            // Access the user's role from the request object
            const authorizedRole = req.role; 

            // Check if the user's role is in the allowedRoles array
            if (!allowedRole.includes(authorizedRole)) {
                return res.status(403).json({
                    success: false,
                    message: "Access denied. You do not have permission to perform this action.",
                });
            }

            // If the user's role is authorized, allow the request to proceed
            next();
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Server error during authorization",
            });
        }
    };
};


export {
    isAuthenticated,
    isAuthorization,
};
