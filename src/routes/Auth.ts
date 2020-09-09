import { Request, Response, Router } from 'express';
import request from 'request'
import querystring from 'querystring'
import IUser from '@entities/User'

import config from '../config/config'

const router = Router();

router.get('/login', async (req: Request, res: Response) => {
    res.redirect(
        'https://accounts.spotify.com/authorize?' +
          querystring.stringify({
            response_type: 'code',
            client_id: config.client_id,
            scope: 'user-read-private user-read-email',
            redirect_uri: config.redirect_uri,
          })
      );
});

router.get('/callback', async (req: Request, res: Response) => {
    const code = req.query.code || null;

  request.post(
    {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code,
        redirect_uri: config.redirect_uri,
        grant_type: 'authorization_code',
      },
      headers: {
        Authorization:
          'Basic ' +
          new Buffer(config.client_id + ':' + config.client_secret).toString('base64'),
      },
      json: true,
    },
    (error, response, body) => {
        const user = new IUser(body.access_token, body.refresh_token)

        res.cookie('user', user);
        res.redirect('/');
    }
  );
});



export default router;
