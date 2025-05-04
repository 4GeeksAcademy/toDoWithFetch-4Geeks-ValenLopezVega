import React, { useState } from "react";

const Home = () => {

	const [task, setTask] = useState('');
	const [tasks, setTasks] = useState([]);

	function addTask() {
		if (task.trim === '') return;
		setTasks([...tasks, task]);
		setTask('');
	}

	function deleteTask(indexToDelete){
		const updatedTasks = tasks.filter((_, index) => index != indexToDelete);
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
								value={task}
								onChange={(e) => {setTask(e.target.value)}}
							/>
						</form>
						<ul className="list-group">
							{
								tasks.map((item, index) => (
									<li key={index} className="list-group-item d-flex justify-content-between align-items-center">
										{item}
										<span onClick={() => deleteTask(index)}>
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