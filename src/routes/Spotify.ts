import { Request, Response, Router } from 'express';
import request from 'request'
import querystring from 'querystring'
import IUser from '@entities/User'

const router = Router();


router.get('/me', async (req: Request, res: Response) => {
    const user:IUser = req.cookies.user
    fetch('me', user).then(data => {
        res.json({data})
    })
});

function fetch(endpoint: string, user: IUser) {
    return new Promise((resolve, reject) => {
      request.get(
        {
          url: 'https://api.spotify.com/v1/' + endpoint,
          headers: { Authorization: 'Bearer ' + user.accessToken},
          json: true,
        },
        (error, response, body) => {
            if(error){
              reject(error)
            } else {
              resolve(body);
            }
        }
      );
    });
  }

export default router;
