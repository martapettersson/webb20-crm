import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import CustomerCreatePage from "./pages/CustomerCreatePage";
import CustomerDetailPage from "./pages/CustomerDetailPage";
import CustomerEditPage from "./pages/CustomerEditPage";
import CustomerListPage from "./pages/CustomerListPage";
import LoginPage from "./pages/LoginPage";

export default function App() {
	const [customerList, setCustomerList] = useState(null);
	const [user, setUser] = useState({});
	const [loginAlert, setLoginAlert] = useState("");
	const getCustomerList = () => {
		const url = "https://frebi.willandskill.eu/api/v1/customers/";
		const token = localStorage.getItem("MARTA_WEBB20");
		fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((data) => setCustomerList(data.results));
	};

	const getUser = () => {
		const url = "https://frebi.willandskill.eu/api/v1/me/";
		const token = localStorage.getItem("MARTA_WEBB20");
		fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((data) => setUser(data));
	};

	const userContextValue = {
		customerList,
		setCustomerList,
		user,
		setUser,
		getCustomerList,
		getUser,
		loginAlert,
		setLoginAlert,
	};

	return (
		<div className="container">
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
