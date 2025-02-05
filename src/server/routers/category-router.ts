import { db } from "@/db"
import { router } from "../__internals/router"
import { privateProcedure } from "../procedures"
import { startOfMonth } from "date-fns"
import { z } from "zod"
import { CATEGORY_NAME_VALIDATOR } from "@/app/lib/validators/category-validator"
import { parseColor } from "@/utils"

export const categoryRouter = router({
  getEventCategories: privateProcedure.query(async ({ c, ctx }) => {
    const categories = await db.eventCategory.findMany({
      where: { userId: ctx.user.id },
      select: {
        id: true,
        name: true,
        emoji: true,
        color: true,
        updatedAt: true,
        createdAt: true,
      },
      orderBy: { updatedAt: "desc" },
    })

    const categoriesWithCounts = await Promise.all(
      categories.map(async (category) => {
        const now = new Date()
        const firstDayofMonth = startOfMonth(now)

        const [uniqueFieldCount, eventCount, lastPing] = await Promise.all([
          db.event
            .findMany({
              where: {
                EventCategory: { id: category.id },
                createdAt: { gte: firstDayofMonth },
              },
              select: { fields: true },
              distinct: ["fields"],
              //email
              //name
              //age
            })
            .then((events) => {
              const fieldNames = new Set<string>()
              events.forEach((event) => {
                Object.keys(event.fields as object).forEach((fieldName) => {
                  fieldNames.add(fieldName)
                })
              })

              return fieldNames.size
              //{key,"value"}
            }),
          db.event.count({
            where: {
              EventCategory: {
                id: category.id,
              },
              createdAt: { gte: firstDayofMonth },
            },
          }),
          db.event.findFirst({
            where: {
              EventCategory: {
                id: category.id,
              },
            },
            orderBy: { createdAt: "desc" },
            select: { createdAt: true },
          }),
        ])

        return {
          ...category,
          uniqueFieldCount,
          eventCount,
          lastPing: lastPing?.createdAt || null,
        }
      })
    )

    return c.superjson({ categories: categoriesWithCounts })
  }),
  createEventCategory: privateProcedure
    .input(
      z.object({
        name: CATEGORY_NAME_VALIDATOR,
        color: z
          .string()
          .min(1, "Color is required")
          .regex(/^#[0-9A-F]{6}$/i, "Invalid Color format."),
        emoji: z.string().emoji("Invalid emoji").optional(),
      })
    )
    .mutation(async ({ c, ctx, input }) => {
      const { user } = ctx
      const { color, name, emoji } = input
      //TODO: ADD PAID LOGIC

      const eventCategory = await db.eventCategory.create({
        data: {
          name: name.toLowerCase(),
          color: parseColor(color),
          emoji,
          userId: user.id,
        },
      })

      return c.json({ success: true })
    }),

    insertQuickstartCategories: privateProcedure.mutation(async ({ ctx, c }) => {
      const categories = await db.eventCategory.createMany({
        data: [
          { name: "Bug", emoji: "🐞", color: 0xff6b6b },
          { name: "Sale", emoji: "💸", color: 0xffeb3b },
          { name: "Question", emoji: "🤔", color: 0x6c5ce7 },
        ].map((category) => ({
          ...category,  // Spread the existing category data
          userId: ctx.user.id,  // Add userId property
        })),
      });
  
      return c.json({ success: true, count: categories.count });
  }),
  
})
