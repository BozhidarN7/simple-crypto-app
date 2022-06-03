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
    reducers: {},
});

export default cryptocurenciesSlice.reducer;
