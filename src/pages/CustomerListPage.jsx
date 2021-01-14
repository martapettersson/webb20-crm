import React, { useContext } from "react";
import CustomerListItem from "../components/CustomerListItem";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function CustomerListPage() {
	const { customerList, user } = useContext(UserContext);

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
