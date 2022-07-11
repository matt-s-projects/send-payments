import React from 'react';
import { useMoralis } from "react-moralis";
import useFetch from "../utils/GetGif";


function History() {

    const [paymentCards, setPaymentCards] = React.useState();
    const { Moralis } = useMoralis();
    const [res, setRes] = React.useState();
    const [txCount, setTxCount] = React.useState();

    const PaymentCard = ({ gif, from, to, amount, message, date }) => {
        const gifUrl = useFetch({ gif });
        return (
            <div className="col">
                <div className="card bg-dark text-light">
                    <img src={gifUrl} className="card-img-top" alt={gif} />
                    <div className="card-body">
                        <h6 className="card-text text-start">From : {from}</h6>
                        <h6 className="card-text text-start"> To  : {to}</h6>
                        <h6 className="card-text text-start">Amount: {amount} ETH</h6>
                        <h6 className="card-text text-start">Message: {message}</h6>
                        <h6 className="card-text text-start">Date: {date}</h6>
                    </div>
                </div>
            </div>
        );

    }

    async function getTxData() {
        const Sent = Moralis.Object.extend("Sent");
        const query = new Moralis.Query(Sent);
        query.descending("block_number");
        setRes(await query.find());
        setTxCount(res.length)
    }

    function makeCards() {
        let paymentCardsTemp = res?.map((transaction) => {
            return (<PaymentCard
                gif={transaction.get("gif")}
                from={transaction.get("from")}
                to={transaction.get("to")}
                amount={Number(transaction.get("amount")) / (10 ** 18)}
                message={transaction.get("message")}
                date={Date(transaction.get("createdAt"))}
            />);
        });
        setPaymentCards(paymentCardsTemp);
    }

    React.useEffect(() => {
        getTxData();
    });

    React.useEffect(() => {
        makeCards();
    }, [txCount]);



    return (
        <div className='History-bg p-5'>
            <div className='container'>
                <h1 className='display-4 text-light border-bottom border-light border-2'>Recent Transactions</h1>
            </div>
            <div className='mt-5'>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {paymentCards}
                </div>
            </div>
        </div>
    )
}

export default History