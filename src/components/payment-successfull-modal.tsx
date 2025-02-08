"use client"


import { client } from "@/lib/client"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Modal } from "./ui/modal"
import { LoadingSpinner } from "./loading-spinner"
import { Button } from "./ui/button"


export const PaymentSucessModel = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const { data, isPending } = useQuery({
    queryKey: ["user-plan"],
    queryFn: async () => {
      const res = await client.payment.getUserPlan.$get()
      return await res.json()
    },
    refetchInterval: (query) => {
      return query.state.data?.plan === "PRO" ? false : 100
    },
  })

  const handleClose = () => {
    setIsOpen(false)
    router.push("/dashboard")
  }

  const isPaymentSucessfull = data?.plan === "PRO"

  return (
    <Modal
      showModal={isOpen}
      setShowModal={setIsOpen}
      onClose={handleClose}
      className="px-6 pt-6"
      preventDefaultClose={!isPaymentSucessfull}
    >
      <div className="flex flex-col items-center">
        {isPending || !isPaymentSucessfull ? (
          <div className="flex flex-col items-center justify-center h-64">
            <LoadingSpinner className="mb-4" />
            <p className="text-lg/7 font-medium text-gray-900">
              updgrading your Account...
            </p>
            <p className="text-gfray-600 text-sm/6 mt-2 text-center text-pretty">
              please wait while we process your upgrade. This may take a moment.
            </p>
          </div>
        ) : (
          <>
            <div className=" relative aspect-video border border-gray-200 w-full overflow-hidden rounded-lg bg-gray-50">
                <img src="/brand-asset-heart.png" alt="payment sucess" />
            </div>

            <div className="mt-6 flex flex-col items-center gap-1 text-center">
                <p className="text-lg/7 tracking-tight font-medium text-pretty">Upgrade Suceessfull ! 🎉</p>
                <p className="text-gray-600 text-sm/6 text-pretty"> Thank You For Upgrading top Pro and supporting PingPanda. Your account has been upgrade </p>
            </div>
            <div className="mt-8 w-full">
                <Button>

                </Button>
            </div>
          </>
        )}
      </div>
    </Modal> 
  )
}
