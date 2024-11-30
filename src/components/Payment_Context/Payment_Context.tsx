"use client"
import React , {useEffect} from 'react'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from '../Payment/Payment';


const Payment_Context = () => {
const stripePromise = loadStripe("pk_test_51QPhZID0nPeKrajIBfOAuUPaKp9MJBeTS2C0nPyhP5Oxfpb5yPz6EoJzarzLtKA6earFtQJHsy0bfCasyQB1gC6i00B2paXz60");

useEffect(() => {
  stripePromise.then((e) => {
    console.log(e);
  }).catch((error) => {
    console.log(error)
    console.error("Stripe failed to load", error);
  });
}, []);

  return (
    <div>
        <Elements stripe={stripePromise}>
          <Payment />
        </Elements>
    </div>
  )
}

export default Payment_Context;