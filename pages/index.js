"use client";

import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AppHeader from "../components/app.header";
import { useRouter } from "next/navigation";

const Welcome = () => {
  const router = useRouter();

  return (
    <div>
      <AppHeader />
      this is welcome
      <Button> this is a button with react</Button>
      <button type="button" onClick={() => router.push("/dashboard")}>
        Dashboard
      </button>
    </div>
  );
};

export default Welcome;
