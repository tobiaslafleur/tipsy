declare global {
  namespace Express {
    export interface Request {
      session: {
        session: string;
        user: string;
      } | null;
    }
  }
}
