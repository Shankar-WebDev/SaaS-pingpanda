import { currentUser } from "@clerk/nextjs/server"
import { notFound } from "next/navigation"


interface PageProps {
    params: {
        name:string | string[] | undefined
    }
}

const Page  =async ({params}:PageProps) =>{
    if(typeof params.name ! === "string")notFound()
        const auth = await currentUser ()
    if(!auth) {
        return notFound()
    }
}

export default Page




// Category/ hello  World