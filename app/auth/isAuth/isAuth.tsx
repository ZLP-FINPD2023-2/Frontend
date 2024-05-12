"use client";
import React, {useEffect} from "react";
import {redirect} from "next/navigation";
const getValue = (key: string) => {
  return typeof window !== "undefined" ?  JSON.stringify(localStorage.getItem(key)) : null;
};

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const token = getValue("token")
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
