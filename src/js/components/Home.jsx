import React, { useEffect, useState } from "react";

const baseUrl = 'https://playground.4geeks.com/todo';
const username = 'Valentina';

const Home = () => {

	const [taskInput, setTaskInput] = useState('');
	const [tasks, setTasks] = useState([]);

	async function createUser() {
		try {
			const response = await fetch(`${baseUrl}/users/${username}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify([])
			});

			return response;

		} catch (error) {
			console.log(error);
		}
	}


	async function getAllTasks() {
		try {
			const response = await fetch(`${baseUrl}/users/${username}`);

			if (response.status === 404) {
				await createUser();
				return;
			}

			if (response.ok) {
				const data = await response.json();
				setTasks(data.todos);
			}

		} catch (error) {
			console.log(error);
		}
	}


	async function addTask() {
		if (taskInput.trim() === '') return;

		const newTask = {
			label: taskInput,
			is_done: false
		}

		try {
			const response = await fetch(`${baseUrl}/todos/${username}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(newTask)
			});

			if (response.ok) {
				getAllTasks();
				setTaskInput('');
			}

		} catch (error) {
			console.log(error);
		}
	}


	async function deleteTask(idToDelete) {
		try {
			const response = await fetch(`${baseUrl}/todos/${idToDelete}`, {
				method: "DELETE"
			});

			if (response.ok) {
				getAllTasks();
			}

		} catch (error) {
			console.log(error);
		}
	}


	async function deleteUser() {
		try {
			const response = await fetch(`${baseUrl}/users/${username}`, {
				method: "DELETE"
			});

			if (response.ok) {
				await createUser(); // recrea el usuario vacío
				setTasks([]);       // limpia la lista de tareas
			}

		} catch (error) {
			console.log(error);
		}
	}


	useEffect(() => {
		getAllTasks()
	}, [])

	return (
		<div className="container">
			<div className="row d-flex justify-content-center">
				<div className="col-8 col-md-6 flex-column">
					<h1 className="text-center py-3">todos</h1>
					<div className="bg-light border shadow">
						<form onSubmit={(e) => { e.preventDefault(); addTask(); }}>
							<input
								className="form-control border-0"
								type="text"
								placeholder="What needs to be done?"
								value={taskInput}
								onChange={(e) => setTaskInput(e.target.value)}
							/>
						</form>
						<ul className="list-group">
							{
								tasks.map((item) => (
									<li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
										{item.label}
										<span onClick={() => deleteTask(item.id)}>
											<i className="fas fa-times"></i>
										</span>
									</li>
								))
							}
						</ul>
						<p className="text-body-tertiary px-3 py-2 m-0 border-top bg-light" >{`${tasks.length} tasks left`}</p>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col text-center">
					<button type="button" className="btn btn-outline-secondary mt-3" onClick={() => deleteUser()}>Delete all</button>
				</div>
			</div>
		</div>
	);
};

export default Home;