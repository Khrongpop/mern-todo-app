import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default () => {
	const [todos, setTodos] = React.useState([{}]);

	React.useEffect(() => {
		fetchData();
	}, [todos]);

	async function fetchData() {
		const json = await axios.get('http://localhost:4000/todos/').then(res => res.data);
		setTodos(json);
	}

	const deleteTodo = id => {
		console.log(id);
		alert(id);
	};

	const todoList = () => {
		return todos.map((todo, index) => {
			return <Todo todo={todo} key={index} onDelete={deleteTodo} />;
		});
	};

	return (
		<div>
			<div>
				<h3>Todos List</h3>
				<table className="table table-striped" style={{ marginTop: 20 }}>
					<thead>
						<tr>
							<th>Description</th>
							<th>Responsible</th>
							<th>Priority</th>
							<th>Action</th>
						</tr>
					</thead>
					{todoList()}
					{/* todos.map((todo, index) => (
						<Todo todo={todo} key={index} onDelete={deleteTodo}  />
                    )) */}
				</table>
			</div>
		</div>
	);
};

const Todo = ({ todo, onDelete }) => (
	<tr>
		<td className={todo.completed ? 'completed' : ''}>{todo.description}</td>
		<td className={todo.completed ? 'completed' : ''}>{todo.responsible}</td>
		<td className={todo.completed ? 'completed' : ''}>{todo.priority}</td>
		<td>
			<Link to={'/edit/' + todo._id}>
				<button className=" btn btn-primary btn-sm">Edit</button>
			</Link>
			<button
				className="ml-2 btn btn-danger btn-sm"
				onClick={e => {
					onDelete(todo._id);
				}}
			>
				Delete
			</button>
		</td>
	</tr>
);
