import {signIn} from 'next-auth/react'
import Image from "next/image"
const Login = () => {
  return (
    <div className='login fixed z-[20] top-0 left-0 p-5 w-screen min-w-full h-screen min-h-screen m-0 flex flex-col items-center justify-center'>
      <div className='relative flex flex-col justify-center md:w-[40vw] items-center p-10 w-full h-auto'>
         <Image src="/images/disnep.png" alt='' className="relative" width={100} height={100} objectFit="cover" />
         <p className="text-sm p-0 m-0">Here you can find your favourite movies in just second. You will
         feel that it is amazing platform to find any movie. Its is very nice.</p>
         <Image src="/images/cta-logo-two.png" alt='' className="relative" width={500} height={100} objectFit="contain" />
        <button className="relative py-2 px-8 rounded-sm border-2 border-white hover:bg-white hover:text-black transition duration-200" onClick={signIn}>LOGIN</button>
      </div>
    </div>
  )
}

export default Login