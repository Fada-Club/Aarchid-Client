"use server"

import { cookies } from "next/headers";

export const setCookies = (name , value) => {
    cookies()?.set(name,value);
    console.log(cookies()?.get(name));
  }

  export const getCookies = (name) => {
  return cookies()?.get(name);
  }

  export const deleteCookies = (name) => {
    cookies().delete(name)
  }