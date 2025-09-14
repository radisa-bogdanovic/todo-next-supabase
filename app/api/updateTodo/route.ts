import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
	const { completed, id } = await req.json();

	if (!id)
		return NextResponse.json({ error: "ID je obavezan!" }, { status: 400 });

	const { data, error } = await supabase
		.from("todo")
		.update({
			completed,
			completedTime: completed ? new Date().toISOString() : null,
		})
		.eq("id", id);

	if (error) return NextResponse.json({ error }, { status: 500 });

	return NextResponse.json(data);
}
