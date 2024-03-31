import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "../../../../../lib/db";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google"



export const authOp = {
  secret:process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      id:"credentials",
      credentials: {
        username: { label: "Email", type: "email", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const {email , password} = credentials
        
        const user = await prisma.user.findUnique({
          where: {
            email
          }
        });
        const passOk = user && bcrypt.compareSync( password,user.password)
        if(passOk){
          return user
        }
        return null
      }
    })
  ]
}
const handler = NextAuth(authOp)

export { handler as GET, handler as POST }