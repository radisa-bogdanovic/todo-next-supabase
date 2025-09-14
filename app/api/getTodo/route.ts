import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
	const { data, error } = await supabase.from("todo").select("*");

	if (error) return NextResponse.json({ error: error }, { status: 500 });
	return NextResponse.json(data);
}
