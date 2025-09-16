import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const { email, password } = await req.json();

	if (!email || !password) {
		return NextResponse.json(
			{
				error: "Email i lozinka su obavezni!",
			},
			{ status: 400 }
		);
	}

	const hashPassword = await bcrypt.hash(password, 12);

	const { data, error } = await supabase
		.from("users")
		.insert({ email, password_hash: hashPassword })
		.select()
		.single();

	if (error) {
		return NextResponse.json(
			{
				error: error,
			},
			{ status: 500 }
		);
	}

	return NextResponse.json({ user: data });
}
