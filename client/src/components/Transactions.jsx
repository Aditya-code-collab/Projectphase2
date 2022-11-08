import React, { useContext, useState, useEffect } from "react";

import { TransactionContext } from "../context/TransactionContext";

import useFetch from "../hooks/useFetch";
import dummyData from "../utils/dummyData";
import { shortenAddress } from "../utils/shortenAddress";
import logo from "../../images/car2.webp";
import axios from "axios";
import GooglePayButton from '@google-pay/button-react';


const TransactionsCard = ({ amount, challanid, challanstatus, description, location, noplate }) => {
  //const gifUrl = useFetch({ keyword });

  return (
    <div className="bg-[#181918] m-4 flex flex-1
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      min-w-full
      flex-col p-3 rounded-md hover:shadow-2xl"
    >
      <div className="flex flex-col items-center w-full mt-3">
        <div className="display-flex justify-start w-full mb-6 p-2">
          <p className="text-white text-base">Challan Id: {challanid}</p>
          <p className="text-white text-base">Amount: ₹{amount}</p>
          {!challanstatus && (
            <>
             
              <p className="text-white text-base">Challan Status: <p style={{color: 'red',display:'inline'}}>Due</p></p>
            </>
          )}
          {challanstatus && (
            <>
             
              <p className="text-white text-base">Challan Status: <p style={{color: 'green',display:'inline'}}>Paid</p></p>
            </>
          )}
          <br/>
          <p className="text-white text-base" style={{textTransform:"capitalize"}}>Location: {location}</p>
        
        </div>
        <img
          src={"https://images.unsplash.com/photo-1572401611152-cf63d874b019?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2FyJTIwcm9hZHxlbnwwfHwwfHw%3D&w=1000&q=80"}
          alt="nature"
          className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
        />
        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className="text-[#37c7da] font-bold">{noplate}, {description}</p>
          <GooglePayButton
        environment="TEST"
        paymentRequest={{
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: 'CARD',
              parameters: {
                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                allowedCardNetworks: ['MASTERCARD', 'VISA'],
              },
              tokenizationSpecification: {
                type: 'PAYMENT_GATEWAY',
                parameters: {
                  gateway: 'example',
                  gatewayMerchantId: 'exampleGatewayMerchantId',
                },
              },
            },
          ],
          merchantInfo: {
            merchantId: '12345678901234567890',
            merchantName: 'Demo Merchant',
          },
          transactionInfo: {
            totalPriceStatus: 'FINAL',
            totalPriceLabel: 'Total',
            totalPrice: '1',
            currencyCode: 'USD',
            countryCode: 'US',
          },
          shippingAddressRequired: true,
          callbackIntents: ['SHIPPING_ADDRESS', 'PAYMENT_AUTHORIZATION'],
        }}
        onLoadPaymentData={paymentRequest => {
          console.log('Success', paymentRequest);
        }}
        onPaymentAuthorized={paymentData => {
            console.log('Payment Authorised Success', paymentData)
            return { transactionState: 'SUCCESS'}
          }
        }
        onPaymentDataChanged={paymentData => {
            console.log('On Payment Data Changed', paymentData)
            return { }
          }
        }
        existingPaymentMethodRequired='false'
        buttonColor='black'
        buttonType='Buy'
      />
        </div>
       
      </div>
    </div>
  );
};

const Transactions = () => {
  const { transactions, currentAccount } = useContext(TransactionContext);

  const [transactions1, setTransactions1] = useState([{ "NAME": "ASSS" }]);

  const getCustomersData = () => {
    console.log("called in transactions..............");
    axios
      .get("http://localhost:3001/findchallan")
      .then(data => setTransactions1(data.data))
      .catch(error => console.log(error));
  };



  useEffect(() => {

    getCustomersData();

  }, [])

  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {currentAccount ? (
          <h3 className="text-white text-3xl text-center my-2">
            Latest Transactions
          </h3>
        ) : (
          <h3 className="text-white text-3xl text-center my-2">
            Connect your account to see the latest transactions
          </h3>
        )}

        <div className="flex flex-wrap justify-center items-center mt-10">
          {transactions1.map((transaction, i) => (
            <>
              {console.log(transaction)}
              <TransactionsCard key={i} {...transaction} />
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
