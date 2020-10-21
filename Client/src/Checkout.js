import React from 'react';
import Payment from './Payment'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe('pk_test_9cWSl1Mlu5mEFLGQajwgixZx00gIx5qQeQ');

function Checkout() {
  return (
   <div>

<Elements stripe={promise}>
        <Payment />
      </Elements>
  
    </div>
  );
}

export default Checkout;
