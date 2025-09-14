import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
	const { id } = await req.json();

	if (!id)
		return NextResponse.json({ error: "Id je obavezan" }, { status: 400 });

	const { data, error } = await supabase.from("todo").delete().eq("id", id);

	if (error) return NextResponse.json({ error }, { status: 500 });

	return NextResponse.json({ success: true, deleted: data });
}
