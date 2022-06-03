import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import cryptocurrenciesReducer from 'features/cryptocurrenciesSlice';

export const store = configureStore({
    reducer: {
        products: cryptocurrenciesReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
