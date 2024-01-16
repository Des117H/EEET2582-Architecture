"use client";

import AppHeader from "../components/app.header";
import AppFooter from "../components/app.footer";

const Account = () => {
    return (
        <div>
            <header>
                <script async src="https://js.stripe.com/v3/buy-button.js" />
                <AppHeader />
                <link rel="icon" href="../logo/circle.png" sizes="32x32" type="image/png" />
            </header>
            <main>
                <stripe-buy-button
                    buy-button-id="buy_btn_1OENLcHGJ8Z2uMgtlpin9EJa"
                    publishable-key="pk_test_51ODSQ5HGJ8Z2uMgt2tAjoNvjY5fYnDuVvfdyQAm9Sl5OVaZ9ZdPr82VKSZAULyPA0QW4ZqG7t9KXYLORZEuguhEe00PB6H5jPy"
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