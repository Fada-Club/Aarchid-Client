import { setCookies } from "@/actions/user/cookiers";
import OnboardPage from "./components/Onboard";


export default function Onboarding() {
  return (
    <div>
      <OnboardPage setCookies={setCookies}/>
    </div>
  );
}
