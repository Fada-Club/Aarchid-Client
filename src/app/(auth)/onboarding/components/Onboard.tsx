"use client"

import { Authenticated } from '@/atom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputDisabled } from '@/components/ui/inputdisabled';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useSetRecoilState } from 'recoil';



const OnboardPage = ({setCookies}) => {


    const router = useRouter()
    if(sessionStorage.getItem("email")){
      router.push("/plants")
    }

    const setAuthenticated = useSetRecoilState(Authenticated);
    const email = sessionStorage.getItem("email");
    const [name, setName] = useState('');
    const [plantSpecies, setPlantSpecies] = useState<string[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [speciesInput, setSpeciesInput] = useState('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFile(event.target.files ? event.target.files[0] : null);
      };
      
    
      const handleAddPlantSpecies = () => {
        setPlantSpecies([...plantSpecies, speciesInput]);
        setSpeciesInput('');
      };
    
      const handleRemovePlantSpecies = (index: number) => {
        setPlantSpecies(plantSpecies.filter((_, i) => i !== index));
      };

      const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        try{
          event.preventDefault();
          console.log({
            email,
            name,
            plantSpecies,
            selectedFile
          });
          const data = {
            email,
            name,
            plantSpecies,
            selectedFile
          }
          const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`, data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          const token = res.data.token;
          const _id = res.data.newUser._id;
          setCookies("token",token);
          sessionStorage.setItem("id",_id );  
          router.push('plants');
          setAuthenticated(true);
        }
        catch(e){
          console.log(e);   
        }
        
      };
    
    
  return (
    <div className="bg-gray-200 w-screen h-screen">
      <div className="flex flex-row justify-center">
        <div className="flex flex-col justify-center min-h-screen">
          <div className="bg-white w-full h-11/12 rounded-md px-5 my-3 mx-auto">
              <h1 className="scroll-m-20 text-2xl font-bold tracking-tight flex flex-row justify-start my-5 mx-1">
                  Onboarding
              </h1>
              <div className="grid grid-cols-2 gap-4">
                <div className="font-semibold">
                  Email
                  <InputDisabled value={email} className="my-2"/>
                </div>
                <div className="font-semibold">
                  Name
                  <Input value={name} onChange={e => setName(e.target.value)} placeholder='John Doe' className="my-2"/>
                </div>
                <div className="font-semibold flex flex-col">
                  Image
                  <Input type="file" className='w-full my-2' onChange={handleFileChange} />
                </div>
                <div className="font-semibold flex flex-col">
                  <div>Plant Species</div>
                  <div className="flex flex-row">
                    <Input 
                      type="text" 
                      value={speciesInput} 
                      onChange={(e) => setSpeciesInput(e.target.value)} 
                      className='w-full my-2' 
                    />
                    <button onClick={handleAddPlantSpecies}>
                      <FaPlus />
                    </button>
                  </div>
                  <div className="flex flex-wrap">
                    {plantSpecies.map((species, index) => (
                      <div key={index} className="flex flex-row m-1 p-1 border rounded gap-2">
                        <div>{species}</div>
                        <button onClick={() => handleRemovePlantSpecies(index)}>x</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className='flex flex-row justify-center my-8'>
                <Button onClick={handleSubmit}>
                  Submit
                </Button>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnboardPage;
