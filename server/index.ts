import express, { Express, Request, Response } from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import 'dotenv/config';

const app: Express = express();
const port = process.env.PORT;

app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send('Express + Typescript server');
});

app.get('/cryptocurrencies', async (req: Request, res: Response) => {
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

app.get(
    '/cryptocurrency/:id/market_chart/last_seven_days',
    async (req: Request, res: Response) => {
        const coinId = req.params.id;

        try {
            const response = await fetch(
                `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`
            );

            if (!response.ok) {
                throw new Error();
            }

            const data = await response.json();
            return res.status(200).json({
                success: true,
                count: data.prices.length,
                data: data.prices,
            });
        } catch (err) {
            console.log(err);
            res.status(400).send('Did not manage to get data!');
        }
    }
);

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}...`);
});
