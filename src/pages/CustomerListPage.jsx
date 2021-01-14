import React, { useState, useEffect } from "react";
import CustomerListItem from "../components/CustomerListItem";
import { Link } from "react-router-dom";

export default function CustomerListPage() {
	const [customerList, setCustomerList] = useState([]);
	const [user, setUser] = useState({});

	useEffect(() => {
		getCustomerList();
		getUser();
	}, []);

	//Get Customer List from the backend, since we have a verified token when we login
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

	// Retrieve data from the backend about the user
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

	return (
		<div>
			<h2>Home</h2>
			<div className="border">
				<p>
					{user.firstName} {user.lastName}
				</p>
				<p>{user.email}</p>
			</div>
			<h3>Customer List</h3>
			<ul>
				{customerList.map((item) => {
					return <CustomerListItem key={item.id} customerData={item} />;
				})}
			</ul>
			<Link className="btn btn-secondary" to="/home/create">
				Create New Customer
			</Link>
		</div>
	);
}
