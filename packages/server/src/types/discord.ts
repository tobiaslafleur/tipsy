export type DiscordOAuthTokenResponse = {
  token_type: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
};

export type DiscordOAuthMeResponse = {
  application: DiscordApplication;
  expires: string;
  scopes: string[];
  user: DiscordUser;
};

export type DiscordApplication = {
  id: string;
  name: string;
  icon: string | null;
  description: string;
  type: string | null;
  bot: DiscordBot;
  summary: string;
  bot_public: boolean;
  bot_require_code_grant: boolean;
  verify_key: string;
  flags: number;
  hook: boolean;
  is_monetized: boolean;
};

export type DiscordBot = {
  id: string;
  username: string;
  avatar: string | null;
  discriminator: string;
  public_flags: number;
  flags: number;
  bot: boolean;
  banner: string | null;
  accent_color: string | null;
  global_name: string | null;
  avatar_decoration_data: string | null;
  banner_color: string | null;
};

export type DiscordUser = {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  public_flags: number;
  flags: number;
  banner: string | null;
  accent_color: string | null;
  global_name: string;
  avatar_decoration_data: string | null;
  banner_color: string | null;
};
