"use client";

import dynamic from "next/dynamic";
import React, { useState, useRef, useEffect } from "react";
import 'react-quill/dist/quill.snow.css'


function documentEdit (){
    const [value, setValue] = useState("");
    const quillRef = useRef();
  
    useEffect(() => {
      console.log(quillRef.current);
    }, [quillRef]);

    return (
    <ReactQuill ref={quillRef} theme="snow" value={value} onChange={setValue} />
    );
}

export default documentEdit;