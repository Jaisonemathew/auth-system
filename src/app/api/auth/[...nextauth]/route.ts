import NextAuth from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/mongoDB"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/lib/prisma"
import { compare, hash } from "bcryptjs"

const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null
    
        const existingUser = await prisma.user.findUnique({
          where: { email: credentials.email }
        })
    
        if (!existingUser) {
          const hashedPassword = await hash(credentials.password, 10)
          const newUser = await prisma.user.create({
            data: {
              email: credentials.email,
              password: hashedPassword
            }
          })
    
          return {
            id: newUser.id,
            email: newUser.email
          }
        }
    
        const isPasswordValid = await compare(
          credentials.password,
          existingUser.password || ''
        )
    
        if (!isPasswordValid) return null
    
        return {
          id: existingUser.id,
          email: existingUser.email
        }
      }
    })
  ],
  pages: {
    signIn: '/',
    signOut: '/'
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Redirect to /dashboard after sign-in
      if (url.startsWith(baseUrl)) {
        return `${baseUrl}/dashboard`;
      }
      // Allow relative URLs
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      }
      return baseUrl;
    },
  },
})

export { handler as GET, handler as POST }