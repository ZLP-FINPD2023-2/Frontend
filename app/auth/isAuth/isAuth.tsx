"use client";
import React, {useEffect} from "react";
import {redirect} from "next/navigation";


export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    useEffect(() => {
      const token = localStorage.getItem("token") || "";
      if (!token) {
        return redirect("/auth/login");
      }
    }, []);

    return <Component {...props} />;
  };
}
