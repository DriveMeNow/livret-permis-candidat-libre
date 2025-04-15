import jwt from 'jsonwebtoken';
import csrf from 'csurf';

export const csrfProtection = csrf({
    cookie: { httpOnly: true, secure: true, sameSite: 'Strict' }
});

export const verifyJWT = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "Accès refusé." });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ error: "Accès refusé." });
        req.user = decoded.email;
        next();
    });
};
