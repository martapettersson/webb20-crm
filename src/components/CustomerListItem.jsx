import React from "react";
import { Link } from "react-router-dom";

export default function CustomerListItem({ customerData }) {
	return (
		<li>
			<Link to={`/home/${customerData.id}`}>{customerData.name}</Link>
		</li>
	);
}
