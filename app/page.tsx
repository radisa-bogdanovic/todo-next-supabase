import TodoComponent from "@/components/TodoComponent";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {
	const session = await getServerSession(authOptions);

	console.log(session);

	if (!session) {
		redirect("/auth/login");
	}

	return <TodoComponent />;
}
