import { DiscordUser } from '~/types/discord';

declare global {
  namespace Express {
    export interface Request {
      user: DiscordUser | null;
    }
  }
}
