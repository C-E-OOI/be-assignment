import { PrismaClient } from "@prisma/client";
import supertokens from "supertokens-node/lib/build/supertokens";
import Session from "supertokens-node/recipe/session";
import EmailPassword from "supertokens-node/recipe/emailpassword";

// Declare global object with prisma property
declare global {
  var prisma: PrismaClient | undefined;
}

export const prismaConnection = (): PrismaClient => {
  try {
    let prisma: PrismaClient;

    if (process.env.NODE_ENV != "production") {
      // Use global object if it exists, otherwise create and assign
      if (!global.prisma) {
        global.prisma = new PrismaClient();
      }
      prisma = global.prisma;
    } else {
      prisma = new PrismaClient();
    }

    return prisma;
  } catch (e) {
    console.error("Error Connecting to Prisma: ", e);
    throw e;
  }
};

export const superTokens = () => {
  supertokens.init({
    framework: "custom",
    supertokens: {
      // https://try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
      connectionURI: "https://try.supertokens.com",
      // apiKey: <API_KEY(if configured)>,
    },
    appInfo: {
      // learn more about this on https://supertokens.com/docs/session/appinfo
      appName: "be-assignment",
      apiDomain: "<YOUR_API_DOMAIN>",
      websiteDomain: "<YOUR_WEBSITE_DOMAIN>",
      apiBasePath: "/auth",
      websiteBasePath: "/auth",
    },
    recipeList: [
      EmailPassword.init(), // initializes signin / sign up features
      Session.init(), // initializes session features
    ],
  });
};
