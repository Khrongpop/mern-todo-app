import React from 'react';
import axios from 'axios';

export default ({ match }) => {
	const [description, setDescription] = React.useState('');
	const [responsible, setResponsible] = React.useState('');
	const [priority, setPriority] = React.useState('Low');
	const [completed, setCompleted] = React.useState(false);
	const [isUpdate, setUpdate] = React.useState(false);
	const [loading, setLoading] = React.useState(true);

	const onChangeDescription = e => {
		setDescription(e.target.value);
	};

	const onChangeResponsible = e => {
		setResponsible(e.target.value);
	};

	const onChangePriority = e => {
		setPriority(e.target.value);
	};

	const onChangeCompleted = e => {
		setCompleted(e.target.value);
	};

	React.useEffect(() => {
		if (loading) if (match.path === '/edit/:id') fetchData();
	});

	async function fetchData() {
		const todo = await axios.get('http://localhost:4000/todos/' + match.params.id).then(res => res.data);
		setDescription(todo.description);
		setResponsible(todo.responsible);
		setPriority(todo.priority);
		setCompleted(todo.completed);
		setUpdate(true);
		setLoading(false);
	}

	const onSubmit = e => {
		e.preventDefault();

		const newTodo = {
			description: description,
			responsible: responsible,
			priority: priority,
			completed: completed,
		};

		if (!isUpdate) axios.post('http://localhost:4000/todos/add', newTodo).then(res => console.log(res.data));
		else
			axios
				.post('http://localhost:4000/todos/update/' + match.params.id, newTodo)
				.then(res => console.log(res.data));

		ClearData();
	};

	const ClearData = () => {
		setDescription('');
		setResponsible('');
		setPriority('Low');
		setCompleted(false);
		setUpdate(false);
	};

	return (
		<div style={{ marginTop: 10 }}>
			{!isUpdate ? <h3> Create New Todo</h3> : <h3> Update Todo</h3>}

			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label>Description: </label>
					<input type="text" className="form-control" value={description} onChange={onChangeDescription} />
				</div>
				<div className="form-group">
					<label>Responsible: </label>
					<input type="text" className="form-control" value={responsible} onChange={onChangeResponsible} />
				</div>
				<div className="form-group">
					<div className="form-check form-check-inline">
						<input
							className="form-check-input"
							type="radio"
							name="priorityOptions"
							id="priorityLow"
							value="Low"
							checked={priority === 'Low'}
							onChange={onChangePriority}
						/>
						<label className="form-check-label">Low</label>
					</div>
					<div className="form-check form-check-inline">
						<input
							className="form-check-input"
							type="radio"
							name="priorityOptions"
							id="priorityMedium"
							value="Medium"
							checked={priority === 'Medium'}
							onChange={onChangePriority}
						/>
						<label className="form-check-label">Medium</label>
					</div>
					<div className="form-check form-check-inline">
						<input
							className="form-check-input"
							type="radio"
							name="priorityOptions"
							id="priorityHigh"
							value="High"
							checked={priority === 'High'}
							onChange={onChangePriority}
						/>
						<label className="form-check-label">High</label>
					</div>
				</div>
				{isUpdate && (
					<div className="form-check">
						<input
							className="form-check-input"
							id="completedCheckbox"
							type="checkbox"
							name="completedCheckbox"
							onChange={onChangeCompleted}
							checked={completed}
							value={completed}
						/>
						<label className="form-check-label" htmlFor="completedCheckbox">
							Completed
						</label>
					</div>
				)}

				<div className="form-group">
					<input type="submit" value="Create Todo" className="btn btn-primary" />
				</div>
			</form>
		</div>
	);
};
