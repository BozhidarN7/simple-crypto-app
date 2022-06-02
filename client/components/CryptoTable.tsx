type Props = {
    children: React.ReactNode;
};

const CryptoTable = ({ children }: Props) => {
    return (
        <div className="w-10/12 grid justify-center items-center grid-flow-row-dense gap-y-2">
            <div className="grid grid-cols-crypto-table gap-x-5 py-4 px-2">
                <div className="place-self-end font-bold">#</div>
                <div className="place-self-start font-bold">Name</div>
                <div className="place-self-end font-bold">Price</div>
                <div className="place-self-end font-bold">24h %</div>
                <div className="place-self-end font-bold">7d %</div>
                <div className="place-self-end font-bold">Market Cap</div>
                <div className="place-self-end font-bold">Volume(24h)</div>
                <div className="place-self-end font-bold">
                    Circulating Supply
                </div>
                <div className="place-self-end font-bold">Lat 7 Days</div>
            </div>
            {children}
        </div>
    );
};

export default CryptoTable;
