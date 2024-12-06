import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
<<<<<<< HEAD
import User from '@models/user'
import {connectToDB} from "@utils/database"

const handler = NextAuth({
  Providers: [
=======
import User from "@models/user";
import { connectToDB } from "@utils/database";

const handler = NextAuth({
  providers: [
>>>>>>> 21fce6d
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
<<<<<<< HEAD
  async sessions({ session }) {
    const sessionUser = await User.findOne({
      email:session.user.email
    })
    session.user.id = sessionUser._id.toString();
    return session;
  },

  async signIn({ profile }) {
    try {
      await connectToDB()
      //check if a user already exixts
      const userExists = await User.findOne({
        email:profile.email
      }) 
      //if nor create a new user 
      if(!userExists){
        await User.create({
          email:profile.email,
          username:profile.name.replace(" ","").toLowerCase(),
          image:profile.picture
        })
      }


      return true


    } catch (error) {
      console.log(error);
      return false
      
    }
=======
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session }) {
      try {
        const sessionUser = await User.findOne({
          email: session.user.email,
        });
        session.user.id = sessionUser?._id?.toString();
        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return session; // Return the session even if there's an error
      }
    },
    async signIn({ profile }) {
      try {
        await connectToDB();
        // Check if a user already exists
        const userExists = await User.findOne({
          email: profile.email,
        });
        // If not, create a new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
>>>>>>> 21fce6d
  },
});

export { handler as GET, handler as POST };
