import { useRouter } from "next/router"
const Company = ({}) => {
const router = useRouter();
const {name}=router.query;
  return (
    <div></div>
  )
}

export async function getServerSideProps(context) {
    
}
export default Company