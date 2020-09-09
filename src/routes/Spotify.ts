import { Request, Response, Router } from 'express';
import request from 'request'
import querystring from 'querystring'
import IUser from '@entities/User'

const router = Router();

router.get('/me', async (req: Request, res: Response) => {
    fetch('me', req, res)
});

function fetch(endpoint: string, req: Request, res: Response) {
  const user:IUser = req.cookies.user

    return new Promise((resolve, reject) => {
      request.get(
        {
          url: 'https://api.spotify.com/v1/' + endpoint,
          headers: { Authorization: 'Bearer ' + user.accessToken},
          json: true,
        },
        (error, response, body) => {
            if(error || body.error){
              reject(error)

            }else {
              res.json({body})
              resolve();
            }
        }
      );
    }).catch(error => {
      res.redirect('/api/auth/login')
    });
  }

export default router;
