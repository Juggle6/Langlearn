import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "Enter username" },
        password: { label: "Password", type: "password", placeholder: "Enter password" },
      },

      async authorize(credentials, req) {
        const registeredUser = await prisma.User.findFirst({
          where: {
            AND: [
              {
                OR: [
                  {
                    username: {
                      equals: credentials.username
                    },
                  },
                  {
                    email: {
                      equals: credentials.username
                    },
                  },
                ]
              },
              {
                password: {
                  equals: credentials.password
                }
              }
            ]
          }
        })

        if (registeredUser) {
          return registeredUser;
        }
        return null;
      }
    })
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
        session.username = token.username;
      }

      return session;
    },
  },
  secret: "test",
  jwt: {
    secret: "test",
    encryption: true,
  }
})
