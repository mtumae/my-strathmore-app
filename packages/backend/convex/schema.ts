import { defineSchema, defineTable } from "convex/server";

import { v } from "convex/values";

export default defineSchema({
  todos: defineTable({
    text: v.string(),
    completed: v.boolean(),
  }),

  users: defineTable({
    clerkId: v.optional(v.string()),
    courses: v.optional(
      v.array(
        v.object({
          courseId: v.optional(v.string()),
          units: v.array(
            v.object({
              title: v.optional(v.string()),
              lecturer: v.optional(v.string()),
              examMarks:v.optional(v.number()),
              coursework: v.optional(
                v.array(
                  v.object({
                    title: v.string(),
                    grade: v.string(),
                  }),
                ),
              ),
            }),
          ),
        }),
      ),
    ),
    chats: v.optional(v.array(v.id("chats"))),
  }).index("by_clerkId", ["clerkId"]),

  //munies
  fees: defineTable({
    userId: v.string(),
    balance: v.number(),
    transactions: v.array(
      v.object({
        id: v.string(),
      }),
    ),
  }),

  transactions: defineTable({
    userId: v.string(),
    amount: v.number(),
    timestamp: v.string(),
  }),

  //General
  announcements: defineTable({
    title: v.string(),
    content: v.string(),
    date: v.string(),
  }).index("by_date", ["date"]),

  events: defineTable({
    title: v.string(),
    description: v.string(),
    date: v.string(),
  }),

  //aka groups, groupchats
  chats: defineTable({
    title: v.string(),
    imageUrl: v.optional(v.string()),
    description: v.string(),
    creationDate: v.string(),
  }).searchIndex("search_title", {
    searchField: "title",
    staged: false,
  }),

  messages: defineTable({
    chatId: v.string(),
    clerkId: v.optional(v.string()),
    author: v.string(),
    imageUrl: v.optional(v.id("_storage")),
    body: v.optional(v.string()),
    timestamp: v.string(),
    likes: v.optional(v.number()),
    dislikes: v.optional(v.number()),
  })
    .index("by_chat", ["chatId"])
    .index("by_chat_user", ["chatId", "author"])
    .index("by_chat_timestamp", ["chatId", "timestamp"])
    .index("by_chat_user_timestamp", ["chatId", "author", "timestamp"]),
});
