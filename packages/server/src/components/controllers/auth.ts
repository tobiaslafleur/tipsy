import { Request, Response } from 'express';

import authService from '~/components/services/auth';

async function signIn(request: Request, response: Response) {
  try {
    const signInUri = String(process.env.DISCORD_SIGNIN_URI);

    return response.redirect(signInUri);
  } catch (error) {
    return response.status(500).send({ error });
  }
}

async function callback(request: Request, response: Response) {
  try {
    // TODO: return if no code exists
    const code = String(request.query.code);

    //TODO: Handle if this errors (prob with wrong code)
    const {
      user: { id, global_name, avatar },
    } = await authService.getDiscordUserByCode(code);

    const user = await authService.createUser({
      discord_id: id,
      name: global_name,
      avatar: avatar,
    });

    if (!user) {
      return response.status(500).send({ error: 'Error creating user' });
    }

    const expires = new Date();
    expires.setHours(24 * 7);

    const session = await authService.createSession({
      user_id: user.id,
      expires,
    });

    if (!session) {
      return response.status(500).send({ error: 'Error creating session' });
    }

    response.cookie('session', session.id, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return response.redirect(String(process.env.CLIENT_REDIRECT_URI));
  } catch (error) {
    return response.status(500).send({ error: 'Something went wrong' });
  }
}

async function me(request: Request, response: Response) {
  try {
    if (!request.session) {
      return response.status(403).send({ error: 'Unauthorized' });
    }

    const user = await authService.getUserById(request.session.user.id);

    return response
      .status(200)
      .send({ session: request.session.session, ...user });
  } catch (error) {
    return response.status(500).send({ error });
  }
}

async function signOut(request: Request, response: Response) {
  try {
    if (request.session) {
      await authService.deleteSession(request.session.session);
    }

    response.clearCookie('session');

    return response.sendStatus(204);
  } catch (error) {
    return response.status(500).send({ error });
  }
}

export default {
  signIn,
  callback,
  me,
  signOut,
};
