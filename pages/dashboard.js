

import { useRouter } from "next/navigation";


export default function dashboard() {

  const router = useRouter();

    return ( 
    <div>
        <h1>Hello, Dashboard Page!</h1>
        <button type="button" onClick={() => router.push("/")}>
        back
      </button>
    </div>
    )
  }