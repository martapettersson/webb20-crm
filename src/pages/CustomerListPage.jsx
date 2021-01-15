import React, { useContext, useEffect } from "react";
import CustomerListItem from "../components/CustomerListItem";
import { UserContext } from "../context/UserContext";
import NavBar from "../components/NavBar";

export default function CustomerListPage() {
	const { customerList, getCustomerList, getUser } = useContext(UserContext);
	useEffect(() => {
		if (customerList.length < 1) {
			getCustomerList();
			getUser();
		}
	}, []);
	return (
		<div>
			<NavBar />
			<h3>Customers</h3>
			<ul>
				{customerList.map((item) => {
					return <CustomerListItem key={item.id} customerData={item} />;
				})}
			</ul>
		</div>
	);
}
