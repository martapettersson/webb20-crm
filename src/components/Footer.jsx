import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

export default function Footer() {
	const { user } = useContext(UserContext);
	const logOut = () => {
		localStorage.clear();
	};
	return (
		<footer className="footer mt-auto py-3 bg-light d-flex justify-content-between">
			<span className="navbar-text ">
				<strong>User:</strong> {user.firstName} {user.lastName},{" "}
				<strong>Email:</strong> {user.email}
			</span>
			<span className="nav-item">
				<Link onClick={logOut} className="btn btn-secondary" to="/">
					Logout
				</Link>
			</span>
		</footer>
	);
}
