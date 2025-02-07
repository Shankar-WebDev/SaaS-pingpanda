"use client"

import { SignIn } from "@clerk/nextjs"
import { useSearchParams } from "next/navigation"

const Page = () => {
  const searchParms = useSearchParams()
  const intent = searchParms.get("intent")

  return (
    <div className="w-full flex-1 flex items-center justify-center">
      <SignIn
        forceRedirectUrl={intent ? `/dashboard?intent = ${intent}` : "/"}
      />
    </div>
  )
}

export default Page
