import { useMutation, useQueryClient } from "@tanstack/react-query"
import { client } from "../lib/client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreateEventCategoryModel } from "@/components/create-event-category-modal"

export const DashboardEmptyState = () => {
  const queryClient = useQueryClient()

  const { mutate: insertQuickCategories, isPending } = useMutation({
    mutationFn: async () => {
      await client.category.insertQuickstartCategories.$post()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-event-categories"] })
    },
  })

  return (
    <Card className="flex flex-col items-center justify-center rounded-2xl flex-1 text-center p-6">
      <div className="flex justify-center w-full ">
        <img
          src="/brand-asset-wave.png"
          alt="No Categories"
          className="size-48 -mt-24"
        />
      </div>
      <h1>No Event Categories Yet</h1>
      <p className="text-sm/6 text-gray-600 max-w-pose mt-2 mb-8 ">
        Start Tracking events by creating your first Category.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <Button
          variant="outline"
          className="flex items-center space-x-2 w-full sm:w-auto"
          onClick={() => insertQuickCategories}
          disabled={isPending}
        >
          <span className="size-5">🪨</span>
          <span>{isPending ? "creating..." : "QuickStart"}</span>
        </Button>

            <CreateEventCategoryModel>
                <Button className="flex items-center spacea-x-2 w-full sm:w-auto">
                    <span className="size-5"> Add Category</span>
                </Button>
            </CreateEventCategoryModel>
      </div>
    </Card>
  )
}
