"use client"

import { FaGoogle } from "react-icons/fa";
import { signInWithPopup} from "firebase/auth";
import {googleProvider, auth} from "@/lib/firebase"
import axios from "axios";
import toast from "react-hot-toast";
import { useSetRecoilState } from "recoil";
import { Authenticated, User } from "@/atom";
import { useRouter } from "next/navigation";



const AuthPage = ({setCookies}) => {



  const router = useRouter();

  if(sessionStorage.getItem("email")){
    router.push('/plants')
  }
  const setAutenticated = useSetRecoilState(Authenticated);
  const setUser = useSetRecoilState(User);

  const sendUserData = async (data: UserData) => {

    console.log(data);
    
    try {
      const checkUser = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/getUserByEmailAuth/${data.email}`);
      console.log(checkUser);

      if(checkUser.data){
        const token = checkUser.data.token;
        const _id = checkUser.data.user._id;
        const email = checkUser.data.user.email;
        setCookies("token",token);
        sessionStorage.setItem("id",_id );  
        sessionStorage.setItem("email",email);   
        router.push('/plants')
        setAutenticated(true);
        setUser(checkUser.data);
        toast.success("Authentication Successful!")
      }
    } catch (error: unknown) {
      console.log(error);
      
      if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
        sessionStorage.setItem("email",data.email);
        router.push('/onboarding');
      } else {
        // Handle other errors here
        console.error(error);
        toast.error(`${error}`);
      }
    }
  }


    const signInWithGoogle = async () => {
        signInWithPopup(auth,googleProvider).then((result)=>{
          const email = result.user.email;
          if (email) {
            const data = {
              email: email
            }
            console.log(data);
            sendUserData(data)
          }
        }).catch((error) => {
          console.log(error);
        });
      }

  return (
    <div className="bg-gray-200 w-screen h-screen shadow-lg">
    <div className="flex flex-row justify-center">
      <div className="flex flex-col justify-center min-h-screen">
       <div className="bg-white w-64 h-48 rounded-md">
          <h1 className="scroll-m-20 text-3xl font-bold tracking-tight flex flex-row justify-center my-8">
              Aarchid
          </h1>
          <div onClick={signInWithGoogle} className="flex flex-row justify-center items-center gap-3 bg-black hover:bg-gray-800 text-white mx-6 py-2 rounded-md">
            <div>
              <FaGoogle/>
            </div>
            <div>
              Sign In With Google
            </div>
          </div>
        </div>          
      </div>
    </div>
  </div>
  )
}

export default AuthPage
