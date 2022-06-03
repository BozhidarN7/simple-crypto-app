import { createSlice } from '@reduxjs/toolkit';

export interface CryptocurenciesSliceInterface {
    cryptocurrencies: any;
}

const initialState: CryptocurenciesSliceInterface = {
    cryptocurrencies: [],
};

const cryptocurenciesSlice = createSlice({
    name: 'cryptocurrencies',
    initialState,
    reducers: {
        cryptocurrenciesAdded: (state, action) => {
            state.cryptocurrencies = Array.from(
                new Set([
                    ...state.cryptocurrencies.map((coin: any) =>
                        JSON.stringify(coin)
                    ),
                    ...action.payload.map((coin: any) => JSON.stringify(coin)),
                ])
            ).map((coin: any) => JSON.parse(coin));
        },
    },
});

export const { cryptocurrenciesAdded } = cryptocurenciesSlice.actions;

export default cryptocurenciesSlice.reducer;
