import { httpHandler } from "@/server";

// Switch to Serverless instead of Edge
export const config = {
  runtime: "nodejs",
};

export { httpHandler as GET, httpHandler as POST };
