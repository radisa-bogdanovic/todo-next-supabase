import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";
import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
	providers: [
		Credentials({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials.password) return null;

				const { data: user, error } = await supabase
					.from("users")
					.select("*")
					.eq("email", credentials.email)
					.single();

				if (error || !user) return null;

				const isValid = await bcrypt.compare(
					credentials.password,
					user.password_hash
				);

				if (!isValid) return null;

				return { id: user.id, email: user.email };
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
	pages: {
		signIn: "/auth/login",
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) token.user = user;
			return token;
		},

		async session({ session, token }) {
			session.user = token.user as any;
			return session;
		},
	},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
