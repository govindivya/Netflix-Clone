import { getSession, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
const Logout = () => {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  },[session,router]);
  return (
    <div className="login fixed top-0 left-0 p-5 w-screen min-w-full h-screen min-h-screen m-0 flex flex-col items-center justify-center">
      <div className="relative flex flex-col justify-center md:w-[40vw] items-center p-10 w-full h-auto">
        <Image
          src="/images/disnep.png"
          alt=""
          className="relative"
          width={100}
          height={100}
          objectFit="cover"
        />
        <p className="p-0 text-sm m-0">Do you really want to logout ?</p>
        <Image
          src="/images/cta-logo-two.png"
          alt=""
          className="relative"
          width={500}
          height={100}
          objectFit="contain"
        />
        <button
          className="relative py-2 px-8 rounded-sm border-2 border-white hover:bg-white hover:text-black transition duration-200"
          onClick={signOut}
        >
          LOG OUT
        </button>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}
export default Logout;
