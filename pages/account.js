"use client";

import AppHeader from "../components/app.header";
import AppFooter from "../components/app.footer";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../firebase/auth";
import styles from "../styles/global.module.css";
import StripeContainer from "../components/StripeContainer";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from "../components/PaymentForm";

const stripePromise = loadStripe('pk_live_51ODSQ5HGJ8Z2uMgtDzhSESuwyZxZ4uUCm0kmX92VqLSJmF4myUnQVA0UVLS64JoSPDZk7SaJF1VkPWPulzEsOyHJ00jdzu6B0K');

const Account = async () => {
    const router = useRouter();
    const { authUser, isLoading } = useAuth();
    const [login, setLogin] = useState(false);
    const [paying, setPaying] = useState(false);

    const [showItem, setShowItem] = useState(false);
    const fetchURL = 'https://grandmaly.net/event/payment'; // /api/paymentEndpoint

    const checkPayment = async () => {
        try {
            const response = await fetch(fetchURL, {
                method: 'POST',
                body: JSON.stringify({ htmlContent }),
            });

            // if (response.ok) {
            //     const docxBlob = await response.blob();
            //     const url = window.URL.createObjectURL(docxBlob);
            //     window.open(url, '_blank');
            // } else {
            //     // Handle error
            // }
        } catch (error) {
            console.error("Error converting or rendering DOCX:", error);
        }
    }

    // const options = {
    // passing the client secret obtained from the server
    //     clientSecret: '{{CLIENT_SECRET}}',
    // };

    // const options = {
    //     // passing the client secret obtained from the server
    //     clientSecret: `${resData.id}_secret_${resData.clientSecret}`,
    // };

    // stripe.handleCardPayment(
    //     client_secret
    // ).then(function (result) {
    //     if (result.error) {
    //         console.log('client secret is not valid');
    //     } else {
    //         console.log('do the actions further');
    //     }});

    return (
        // { clientSecret : (
        //     <Elements stripe={stripePromise} options={options}>
        //         <PaymentForm />
        //     </Elements>
        // )}
        // <></>

        <div>
            <header>
                <script async
                    src="https://js.stripe.com/v3/buy-button.js">
                </script>
                <AppHeader />
            </header>
            <main>
                <stripe-buy-button
                    buy-button-id="buy_btn_1OENLcHGJ8Z2uMgtlpin9EJa"
                    publishable-key="pk_test_51ODSQ5HGJ8Z2uMgt2tAjoNvjY5fYnDuVvfdyQAm9Sl5OVaZ9ZdPr82VKSZAULyPA0QW4ZqG7t9KXYLORZEuguhEe00PB6H5jPy"
                    onclick={checkPayment()}
                >
                </stripe-buy-button>
            </main>
            <footer>
                <AppFooter />
            </footer>
        </div>
    );
};

export default Account;