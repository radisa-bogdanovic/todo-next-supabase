"use client";

import { useEffect, useState } from "react";
import ListComponent from "./ListComponent";

export type Task = {
	id: number;
	title: string;
	completed: boolean;
	completedTime: null | Date;
};

export default function TodoComponent() {
	const [taskovi, dodajTaskove] = useState<Task[]>([]);
	const [zavrseniTaskovi, dodajZavrseneTaskove] = useState<Task[]>([]);
	const [title, setTitle] = useState<string>("");

	useEffect(() => {
		fetchTodos();
	}, []);

	const addTask = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!title) return;

		await fetch("/api/addTodo", {
			method: "POST",
			body: JSON.stringify({ title }),
			headers: {
				"Content-Type": "application/json",
			},
		});
		setTitle("");
		fetchTodos();
	};

	async function fetchTodos() {
		const response = await fetch("/api/getTodo");
		const todos = await response.json();
		const activeTodos = todos.filter((todo: Task) => !todo.completedTime);
		const notActiveTasks = todos.filter((todo: Task) => todo.completedTime);
		dodajTaskove(activeTodos);
		dodajZavrseneTaskove(notActiveTasks);
	}

	async function updateTask(todo: Task) {
		await fetch(`/api/updateTodo`, {
			method: "PATCH",
			body: JSON.stringify({ completed: !todo.completed, id: todo.id }),
			headers: {
				"Content-Type": "application/json",
			},
		});
		fetchTodos();
	}

	async function deleteTask(id: number) {
		await fetch(`/api/deleteTodo`, {
			method: "DELETE",
			body: JSON.stringify({ id }),
			headers: {
				"Content-Type": "application/json",
			},
		});
		fetchTodos();
	}

	return (
		<div className="p-6 max-w-lg mx-auto">
			<h1 className="text-3xl mb-4"> Tvoji Taskovi</h1>

			<form onSubmit={addTask} className="flex gap-2 mb-4">
				<input
					type="text"
					className="border p-2 flex-1"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Dodaj naslov taska"
				/>

				<button className="bg-blue-500 text-white px-4">Dodaj</button>
			</form>

			<ListComponent
				deleteTask={deleteTask}
				list={taskovi}
				updateTask={updateTask}
				zavrseniTaskovi={false}
			/>

			<ListComponent
				deleteTask={deleteTask}
				list={zavrseniTaskovi}
				updateTask={updateTask}
				zavrseniTaskovi={true}
			/>
		</div>
	);
}
