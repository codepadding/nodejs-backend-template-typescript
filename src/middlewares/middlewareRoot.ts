import { NextFunction, Request, Response } from 'express';
import moment from 'moment'
const middlewareRoot = (req: Request, res: Response, next: NextFunction) => {
    console.log(
        moment().format('MMMM Do YYYY, hh:mm A'),
        '\nMethod -> ',
        req.method,
        ' => ',
        'https://' + req.headers.host + req.url
    );
    //   console.log("host",req.headers.host);
    console.log('body -> ', req.body);
    console.log('query -> ', req.query);
    console.log('params -> ', req.params);
    next();
};

export default middlewareRoot