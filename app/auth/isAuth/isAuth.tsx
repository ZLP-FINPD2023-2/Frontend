"use client";
import React, {useEffect} from "react";
import {redirect} from "next/navigation";


export default function isAuth<P extends Record<string, unknown>>(Component: React.ComponentType<P>): React.FC<P> {
  return function IsAuth(props) {
    const token = localStorage.getItem("token");
    useEffect(() => {
      if (!token) {
        return redirect("/auth/login");
      }
    }, []);

    if (!token) {
      return null;
    }

    return <Component {...props} />;
  };
}
