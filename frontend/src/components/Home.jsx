import React from 'react'
import { useEffect } from 'react';
import { ethers } from "ethers";
import abi from "../utils/contract.json";


function Home() {

    const contractAddress = "0xca0478208b02F2683F5A4EAdbA21612A13532c6d";
    const contractABI = abi.abi;
    const { ethereum } = window;
    const [isConnected, setIsConnected] = React.useState(false);
    const [accounts, setAccounts] = React.useState([])
    const [formData, setFormData] = React.useState({ addressTo: "", amount: "", gif: "", message: "" })
    const [isLoading, setIsLoading] = React.useState(false);

    const createEthereumContract = () => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const hmsendContract = new ethers.Contract(contractAddress, contractABI, signer);

        return hmsendContract;
    };

    const sendTransaction = async () => {
        try {
            if (ethereum) {
                const { addressTo, amount, gif, message } = formData;
                const hmsendContract = createEthereumContract();
                const parsedAmount = ethers.utils.parseEther(amount);

                await ethereum.request({
                    method: "eth_sendTransaction",
                    params: [{
                        from: accounts[0],
                        to: addressTo,
                        gas: "0x5208",
                        value: parsedAmount._hex,
                    }],
                });
                const transactionHash = await hmsendContract.logPayment(addressTo, parsedAmount, message, gif);
                setIsLoading(true);
                console.log(`Loading - ${transactionHash.hash}`);
                await transactionHash.wait();
                console.log(`Success - ${transactionHash.hash}`);
                setIsLoading(false);
                window.location.reload();
            } else {
                console.log("No ethereum object");
            }
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    };

    async function connectToMetamask() {
        if (typeof window.ethereum !== 'undefined') {
            try {
                await ethereum.request({ method: "eth_requestAccounts" });
                setAccounts(await ethereum.request({ method: "eth_accounts" }));
                console.log(accounts);
                setIsConnected(true);
            } catch (e) {
                console.log(e);
            }

        }
    }

    async function checkIfWalletIsConnect() {
        if (accounts.length > 0) {
            setIsConnected(true);
        } else {
            setIsConnected(false);
        }

    }

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevState) => {
            return {
                ...prevState,
                [id]: value,
            };
        });
    };

    const handleSubmit = (e) => {
        const { addressTo, amount, gif, message } = formData;

        e.preventDefault();

        if (!addressTo || !amount || !gif || !message) return;

        sendTransaction();
    };


    useEffect(() => {
        checkIfWalletIsConnect();

    });


    return (
        <div className='Home-bg p-5'>
            <div className='container'>
                <div className='row align-items-center'>
                    <div className='col col-lg-6'>
                        <h1 className='display-1 text-light'>Send Cypto</h1>
                        <h1 className="display-6 text-light">Fast and Secure With Fun GIFs</h1>
                        {!isConnected ?
                            <button type="button" className="btn btn-dark btn-lg mt-2 mb-4" onClick={connectToMetamask}>Connect Wallet</button>
                            :
                            <button type="button" className="btn btn-primary btn-lg mt-2 mb-4">Wallet Connected</button>

                        }
                    </div>
                    <div className='col col-lg-6'>
                        <div className='bg-secondary m-5 p-5 rounded'>
                            <form>
                                <div className="mb-3">
                                    <input type="text" className="form-control" id="addressTo" placeholder='Address To' onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <input type="number" className="form-control" id="amount" placeholder='Amount ETH' onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" id="gif" placeholder='GIF Keyword' onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" id="message" placeholder='Message' onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <hr className='border border-dark border-4' />
                                </div>
                                <div className="d-grid gap-2">
                                    {!isConnected ?
                                        <button type="submit" className="btn btn-dark" disabled>Connect Wallet Before Submit</button>
                                        : !isLoading ?
                                            <button type="submit" className="btn btn-dark" onClick={handleSubmit}>Submit</button>
                                            :
                                            <button type="submit" className="btn btn-dark" >Loading...</button>
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home