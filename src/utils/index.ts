import { EmailMessageType } from "@/app/api/email/route";
import { PrismaClient } from "@prisma/client";
import every from "lodash/every";

export const isComplete = (object: EmailMessageType["data"]) => {
  console.log(object, "the object here");
  return every(
    object,
    (value) => value !== "" && value !== undefined && value !== null
  );
};

export const prisma = new PrismaClient();
