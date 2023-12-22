"use client";

import { Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AppHeader from "../components/app.header";
import AppFooter from "../components/app.footer";
import { useRouter } from "next/navigation";

const Welcome = () => {
  const router = useRouter();

  return (
    <div>
      <header>
        <AppHeader />
      </header>
      <main>
        <Container className="description">
          <div className="text-box">
            <h2>
              Text with love,
              <br />
              like your <span>Grandma</span>
            </h2>
            <p>
              Grandmaly is a Large Language Model AI system with the purpose of
              fixing languid errors of an English manuscript, such errors
              including grammatical mistakes, typos, word use, and punctuation.
              All you have to do is upload a doc or docx file and download the
              fixed word file!
              <br />
              <br />
              With an account, you will be provided with the option to subscribe
              and enjoy extended perks of Grandmaly. You will also be given a
              2-week trial period before deciding to subscribe.
            </p>
            <Button
              variant="primary"
              onClick={() => {
                router.push("/login");
              }}
            >
              Sign Up
            </Button>
          </div>
        </Container>
      </main>
      <footer>
        <AppFooter />
      </footer>
    </div>
  );
};

export default Welcome;
