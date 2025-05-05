import React, { useState } from "react";

const Home = () => {

	const [taskInput, setTaskInput] = useState('');
	const [tasks, setTasks] = useState([]);

	function addTask() {
		if (taskInput.trim() === '') return;

		const newTask = {
			label: taskInput,
			is_done: false
		}

		setTasks([...tasks, newTask]);

		setTaskInput('');
	}

	function deleteTask(idToDelete){
		const updatedTasks = tasks.filter((item) => item.id != idToDelete);
		setTasks(updatedTasks);
	}

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
								onChange={(e) => {setTaskInput(e.target.value)}}
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
		</div>
	);
};

export default Home;