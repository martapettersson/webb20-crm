import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function NavBar() {
	const logOut = () => {
		localStorage.clear();
	};
	const { user } = useContext(UserContext);

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/home">
					CRM
				</Link>
				<div
					className="collapse navbar-collapse d-flex justify-content-between"
					id="navbarText"
				>
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link className="nav-link" to="/home">
								Home
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/home/create">
								Create
							</Link>
						</li>
						<li className="nav-item">
							<Link onClick={logOut} className="nav-link" to="/">
								Logout
							</Link>
						</li>
					</ul>
					<span className="navbar-text ">
						User: {user.email}, {user.firstName} {user.lastName}
					</span>
				</div>
			</div>
		</nav>
	);
}
