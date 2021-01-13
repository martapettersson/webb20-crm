import React, { useState, useEffect } from "react";
import CustomerListItem from "../components/CustomerListItem";

export default function CustomerListPage() {
	const [customerList, setCustomerList] = useState([]);

	useEffect(() => {
		getCustomerList();
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

	console.log(customerList);

	return (
		<div>
			<h2>Home</h2>
			<h3>Customer List</h3>
			<ul>
				{customerList.map((item) => {
					return <CustomerListItem key={item.id} customerData={item} />;
				})}
			</ul>
		</div>
	);
}
