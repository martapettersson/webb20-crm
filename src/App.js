import React from "react";
import { Switch, Route } from "react-router-dom";
import CustomerCreatePage from "./pages/CustomerCreatePage";
import CustomerDetailPage from "./pages/CustomerDetailPage";
import CustomerEditPage from "./pages/CustomerEditPage";
import CustomerListPage from "./pages/CustomerListPage";
import LoginPage from "./pages/LoginPage";

export default function App() {
	return (
		<div className="container">
			<h1>CRM</h1>
			<Switch>
				<Route path="/home/create">
					<CustomerCreatePage />
				</Route>
				<Route path="/customers/:id/edit" component={CustomerEditPage} />
				<Route path="/home/:id" component={CustomerDetailPage} />
				<Route path="/home">
					<CustomerListPage />
				</Route>
				<Route path="/">
					<LoginPage />
				</Route>
			</Switch>
		</div>
	);
}
