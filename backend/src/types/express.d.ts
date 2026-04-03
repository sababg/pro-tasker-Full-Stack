import "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: mongoose.Types.ObjectId;
        email: string;
        username: string;
      };
    }
  }
}
