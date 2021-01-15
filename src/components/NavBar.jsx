import React from "react";
import { Link } from "react-router-dom";
import { handshake } from "../deal.js";

export default function NavBar() {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/home">
					{handshake}
				</Link>
				<div
					className="collapse navbar-collapse d-flex align-items-center"
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
					</ul>
				</div>
			</div>
		</nav>
	);
}
