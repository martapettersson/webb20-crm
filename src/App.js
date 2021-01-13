import React from "react";
import { Switch, Route } from "react-router-dom";
import CustomerCreatePage from "./pages/CustomerCreatePage";
import CustomerListPage from "./pages/CustomerListPage";
import LoginPage from "./pages/LoginPage";

export default function App() {
	return (
		<div className="container">
			<h1>CRM</h1>
			<Switch>
				<Route path="/login">
					<LoginPage />
				</Route>
				<Route path="/home/create">
					<CustomerCreatePage />
				</Route>
				<Route path="/home">
					<CustomerListPage />
				</Route>
			</Switch>
		</div>
	);
}
