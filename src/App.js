import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import CustomerCreatePage from "./pages/CustomerCreatePage";
import CustomerDetailPage from "./pages/CustomerDetailPage";
import CustomerEditPage from "./pages/CustomerEditPage";
import CustomerListPage from "./pages/CustomerListPage";
import LoginPage from "./pages/LoginPage";

export default function App() {
	const [customerList, setCustomerList] = useState([]);
	const [user, setUser] = useState({});
	const userContextValue = {
		customerList,
		setCustomerList,
		user,
		setUser,
	};
	return (
		<div className="container">
			<h1>CRM</h1>
			<UserContext.Provider value={userContextValue}>
				<Switch>
					<Route path="/home/create">
						<CustomerCreatePage />
					</Route>
					<Route path="/home/:id/edit" component={CustomerEditPage} />
					<Route path="/home/:id" component={CustomerDetailPage} />
					<Route path="/home">
						<CustomerListPage />
					</Route>
					<Route path="/">
						<LoginPage />
					</Route>
				</Switch>
			</UserContext.Provider>
		</div>
	);
}
