"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [statusMsg, setStatusMsg] = useState<string>("");

	const router = useRouter();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!email || !password) {
			setStatusMsg("Email i passsword su obavezni!");
			return;
		}

		const res = await signIn("credentials", {
			redirect: false,
			email,
			password,
		});

		if (res?.error) {
			setStatusMsg(res.error);
		} else {
			router.push("/");
		}
	};

	return (
		<form
			onSubmit={handleLogin}
			className="flex flex-col gap-3 max-w-sm mx-auto p-6"
		>
			<h1 className="text-xl font-bold"> Login</h1>
			<input
				type="email"
				name="email"
				id="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder="Unesite email"
				className="border p-2 rounded"
			/>
			<input
				type="password"
				name="password"
				id="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="Unesite lozinku"
				className="border p-2 rounded"
			/>

			<button className="bg-blue-500 text-white p-2 rounded"> Uloguj se</button>
			<button
				type="button"
				className="bg-blue-500 text-white p-2 rounded"
				onClick={() => {
					router.push("/auth/signup");
				}}
			>
				{" "}
				Registruj se
			</button>
			{statusMsg && <p>{statusMsg}</p>}
		</form>
	);
}
