import React from 'react';

const checkout = {
  width: '100vw',
  height: '100vh',
  display: 'grid',
  placeItems: 'center',
};

const CheckOut = () => {
  return (
    <section style={checkout}>
      <h2>You can use any payment for this page ( Stripe, Paypal and so on)</h2>
    </section>
  );
};

export default CheckOut;
