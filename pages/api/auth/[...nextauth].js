import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import {MongoDBAdapter} from "@next-auth/mongodb-adapter";
import clientPromise from "../../../services/mongodb";
import dbConnect from "../../../services/dbconnect";
import User from "../../../models/User"

export default NextAuth({
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
        async session(session, token) {
            await dbConnect();
            const result = await User.findOne({ email: session.user.email });
            if (result) {
                console.log("THIS IS RESULT", result);
                session.user = result;
            }
            return session;
        },
    },
})
