import {setCookies } from "@/actions/user/cookiers";
import AuthPage from "./components/AuthPage";


export default function Auth() {


  return (
    <div>
      <AuthPage setCookies={setCookies}/>
    </div>
  );
}
