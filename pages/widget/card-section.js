/**
 * Use the CSS tab above to style your Element's container.
 */

import { CardElement } from '@stripe/react-stripe-js';
import React from 'react';
import Box from '@material-ui/core/Box';
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};
function CardSection() {
  return (
    <Box>
      <CardElement options={CARD_ELEMENT_OPTIONS} className='StripeElement' />
    </Box>
  );
}
export default CardSection;
