import React from 'react';
import { BrowserRouter as Switch, Route, Link } from 'react-router-dom';
import FormTodo from './components/FormTodo';
import TodosList from './components/TodosList';
// import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
	return (
		<Switch>
			<Navbar />
			<div className="container">
				<br />
				<Route path="/" exact component={TodosList} />
				<Route path="/edit/:id" component={FormTodo} />
				<Route path="/create" component={FormTodo} />
			</div>
		</Switch>
	);
}
const Navbar = () => (
	<nav className="navbar navbar-expand-lg navbar-light bg-light">
		<div className="container">
			<Link to="/" className="navbar-brand">
				Todo App
			</Link>
			<div className="collpase navbar-collapse">
				<ul className="navbar-nav mr-auto">
					<li className="navbar-item">
						<Link to="/" className="nav-link">
							Todos List
						</Link>
					</li>
					<li className="navbar-item">
						<Link to="/create" className="nav-link">
							Create Todo
						</Link>
					</li>
				</ul>
			</div>
		</div>
	</nav>
);

export default App;
