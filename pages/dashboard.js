

import { useRouter } from "next/navigation";
import {useAuth} from '../firebase/auth';
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppBar, Box, Button, Container, Stack, Toolbar, Typography } from '@mui/material';
import AppHeader from "../components/app.header";
import AppFooter from "../components/app.footer";
export default function dashboard() {
    const { authUser, isLoading } = useAuth();
  const router = useRouter();
    return ( 
   
    <div>
        <Head>
            <title>Dashboard</title>
        </Head>
        <div>
            <AppHeader/>
        </div>
        <main>
           
            <h1>Hello, Dashboard Page!</h1>
            <button type="button" onClick={() => router.push("/")}>
            back
        </button>
        </main>
        <div>
            <AppFooter/>
        </div>
    </div>
    
    )
  }