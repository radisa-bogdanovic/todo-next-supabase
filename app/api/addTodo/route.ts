import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const { title } = await req.json();

	if (!title)
		return NextResponse.json({ error: "Title je obavezan!" }, { status: 400 });

	const { data, error } = await supabase.from("todo").insert([{ title }]);

	if (error) return NextResponse.json({ error }, { status: 500 });

	return NextResponse.json(data);
}
