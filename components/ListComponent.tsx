import { Task } from "./TodoComponent";

interface ListComponentProps {
	list: Task[];
	updateTask: (task: Task) => void;
	deleteTask: (id: number) => void;
	zavrseniTaskovi: boolean;
}

export default function ListComponent({
	list,
	deleteTask,
	updateTask,
	zavrseniTaskovi,
}: ListComponentProps) {
	return (
		<>
			<hr />
			<h2 className="text-2xl my-4">
				{zavrseniTaskovi ? "Zavrseni taskovi" : "Aktivni taskovi:"}
			</h2>

			{list.length ? (
				<ul>
					{list.map((task: Task) => {
						return (
							<li key={task.id} className="justify-between items-center py-2">
								<div className="flex items-center gap-5 mb-4">
									<div className="flex items-center gap-2 border py-2 px-4">
										<h4 className="text-xl "> {task.title}</h4>
										{zavrseniTaskovi ? (
											<h4 className="text-xl ">
												{" | " + task?.completedTime?.toString()}
											</h4>
										) : null}
										<input
											type="checkbox"
											checked={task.completed}
											onChange={() => updateTask(task)}
										/>
									</div>

									<button
										onClick={() => deleteTask(task.id)}
										className="text-red-500 border p-2"
									>
										Obrisi Task
									</button>
								</div>
							</li>
						);
					})}
				</ul>
			) : (
				<h5 className=" my-4">
					{" "}
					Nemate {zavrseniTaskovi ? "zavrsenih" : "aktivnih"} taskova!{" "}
				</h5>
			)}
		</>
	);
}
