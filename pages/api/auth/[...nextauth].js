import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import {MongoDBAdapter} from "@next-auth/mongodb-adapter";
import clientPromise from "../../../services/mongodb";
import dbConnect from "../../../services/dbconnect";
import User from "../../../models/User"
import Driver from "../../../models/Driver";
import {XPS} from "../../../variables";

export const authOptions ={
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),

        // ...add more providers here
    ],
    adapter: MongoDBAdapter(clientPromise),

    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            // console.log(user.id);
            await dbConnect();
            try {
                const driver  = new Driver({user: user.id});
                driver.save();
                // const driver  = await Driver.save({user: user.id, xp: XPS.signin});
            } catch (e) {
                console.log(e);
            }

            // console.log(driver);
            return true
        },
        async session(session, token) {
            await dbConnect();
            const result = await User.findOne({ email: session.user.email });
            if (result) {
                session.user = result;
            }
            return session;
        },
    },
};

export default NextAuth(authOptions)
