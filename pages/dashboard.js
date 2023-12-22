

import { useRouter } from "next/navigation";
import {useAuth} from '../firebase/auth';
import Head from "next/head";
import AppHeader from "../components/app.header";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppBar, Box, Button, Container, Stack, Toolbar, Typography } from '@mui/material';

export default function dashboard() {
    console.log("this is dashboard")

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
    </div>
    
    )
  }