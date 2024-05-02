import jwt from "jsonwebtoken";
import { Service } from "typedi";
import AppError from "../error/AppError";

@Service()
export class TokenService {
  secretKey = "your_secret_key"; // This should be secure and possibly retrieved from environment variables

  createToken(user) {
    const payload = {
      id: user.id,
      roles: user.roles,
    };
    const options = {
      expiresIn: "24h", // Token expires in 24 hours
    };
    return jwt.sign(payload, this.secretKey, options);
  }

  verifyToken(token) {
    if (!token) {
      throw new AppError(401, "NO_TOKEN", "No token provided", "Verify Token");
    }
    const cleanedToken = token.replace("Bearer ", "");
    try {
      return jwt.verify(cleanedToken, this.secretKey);
    } catch (error) {
      throw new AppError(
        401,
        "INVALID_TOKEN",
        "Invalid or expired token",
        "Verify Token"
      );
    }
  }
}
