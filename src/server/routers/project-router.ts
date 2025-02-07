import { privateProcedure } from "../procedures"
import { router } from "../__internals/router"
import { addMonths, startOfMonth } from "date-fns"
import { db } from "@/db"
import { FREE_QUOTA, PRO_QUOTA } from "@/config"

export const projectRouter = router({
  getUsage: privateProcedure.query(async ({ c, ctx }) => {
    const { user } = ctx

    const currentDate = startOfMonth(new Date())

    const quota = await db.quota.findFirst({
      where: {
        userId: user.id,
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
      },
    })

    const eventCount = quota?.count ?? 0

    const categoryCount = await db.eventCategory.count({
      where: {
        userId: user.id,
      },
    })

    const limits = user.plan === "PRO" ? PRO_QUOTA : FREE_QUOTA

    // Calculate the reset date as the start of next month
    const resetDate = startOfMonth(addMonths(currentDate, 1))

    return c.superjson({
      categoriesUsed: categoryCount,
      categoriesLimit: limits.maxEventCategories,
      eventsUsed: eventCount,
      eventsLimit: limits.maxEventsPerMonth,
      resetDate,
    })
  }),
})
