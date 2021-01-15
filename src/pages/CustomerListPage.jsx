import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CustomerListItem from "../components/CustomerListItem";
import { UserContext } from "../context/UserContext";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function CustomerListPage() {
	const history = useHistory();
	const {
		customerList,
		getCustomerList,
		getUser,
		loginAlert,
		setLoginAlert,
	} = useContext(UserContext);
	useEffect(() => {
		if (customerList.length < 1 && loginAlert !== "login") {
			getCustomerList();
			getUser();
			console.log("2 anrop");
			setLoginAlert("");
		}
	}, []);
	return (
		<div>
			<NavBar />
			<h3>Customers</h3>
			<ul className="list-group">
				{customerList.map((item) => {
					return <CustomerListItem key={item.id} customerData={item} />;
				})}
			</ul>
			<Footer />
		</div>
	);
}
