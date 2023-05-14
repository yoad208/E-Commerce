import {FC} from 'react';
import {PayPalButtons, PayPalScriptProvider} from "@paypal/react-paypal-js";

export const PaypalPayment: FC = () => (
    //TODO paypal functionality
    <PayPalScriptProvider options={{"client-id": "test"}}>
        <PayPalButtons style={{layout: 'horizontal'}}/>
    </PayPalScriptProvider>
);
