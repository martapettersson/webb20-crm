import React, { useContext, useEffect } from "react";
import CustomerListItem from "../components/CustomerListItem";
import { UserContext } from "../context/UserContext";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function CustomerListPage() {
	const {
		customerList,
		getCustomerList,
		getUser,
		loginAlert,
		setLoginAlert,
	} = useContext(UserContext);
	useEffect(() => {
		if (!customerList) {
			getCustomerList();
			getUser();
			console.log("2 anrop");
		} else if (loginAlert === "login") {
			setLoginAlert("");
		}
	}, []);
	return (
		<div>
			<NavBar />
			<h3>Customers</h3>
			{customerList ? (
				<div>
					<ul className="list-group">
						{customerList.map((item) => {
							return <CustomerListItem key={item.id} customerData={item} />;
						})}
					</ul>
					<Footer />
				</div>
			) : (
				<p>Loading data...</p>
			)}
		</div>
	);
}
