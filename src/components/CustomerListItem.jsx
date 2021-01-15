import React from "react";
import { Link } from "react-router-dom";

export default function CustomerListItem({ customerData }) {
	return (
		<li className="list-group-item">
			<Link className="alert-link text-reset" to={`/home/${customerData.id}`}>
				{customerData.name}
			</Link>
		</li>
	);
}
