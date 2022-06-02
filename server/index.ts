import express, { Express, Request, Response } from 'express';
import fetch from 'node-fetch';
import 'dotenv/config';

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
    res.send('Express + Typescript server');
});

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}...`);
});

app.get('/cryptocurencies', async (req: Request, res: Response) => {
    const queryString = Object.entries(req.query)
        .map((el) => el.join('='))
        .join('&');

    try {
        const response = await fetch(
            `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest${
                queryString ? `?${queryString}` : ''
            }`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CMC_PRO_API_KEY': `42554179-d724-40df-849b-a679f89fc5f5`,
                    'Accept-Encoding': ' deflate, gzip',
                },
            }
        );
        const data = await response.json();

        return res.status(200).json(data);
    } catch (err) {
        console.log(err);
        return res.send('Did not manage to get data');
    }
});
