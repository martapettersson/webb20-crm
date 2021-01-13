import React from "react";
import { Switch, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

export default function App() {
	return (
		<div className="container">
			<h1>CRM</h1>
			<Switch>
				<Route path="/login">
					<LoginPage />
				</Route>
			</Switch>
		</div>
	);
}
