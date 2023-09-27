declare global {
  namespace Express {
    export interface Request {
      session: {
        session: string;
        user: {
          id: string;
          created_at: Date;
          updated_at: Date;
          name: string;
          discord_id: string;
          avatar: string | null;
          role: string;
        };
      } | null;
    }
  }
}
