const NextAuth = require("next-auth");
const CredentialsProvider = require("next-auth/providers/credentials");
const prisma = require("../../../../../lib/db");
const bcrypt = require("bcrypt");
const GoogleProvider = require("next-auth/providers/google");

const authOp = {
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      id: "credentials",
      credentials: {
        username: { label: "Email", type: "email", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;

        const user = await prisma.user.findUnique({
          where: {
            email
          }
        });
        const passOk = user && bcrypt.compareSync(password, user.password);
        if (passOk) {
          return user;
        }
        return null;
      }
    })
  ]
};

const handler = async (req, res) => {
  await NextAuth(req, res, authOp);
};

module.exports = { 
  GET: handler, 
  POST: handler 
};
