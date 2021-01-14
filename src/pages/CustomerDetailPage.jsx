import React, { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function CustomerDetailPage(props) {
	const customerId = props.match.params.id;
	const { customerList } = useContext(UserContext);
	const customerItem = customerList.filter(
		(customer) => customer.id == customerId
	)[0];
	const history = useHistory();

	const deleteCustomer = () => {
		const url = `https://frebi.willandskill.eu/api/v1/customers/${customerId}/`;
		const token = localStorage.getItem("MARTA_WEBB20");
		fetch(url, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		}).then(() => history.push("/home"));
	};

	return (
		<div>
			{customerItem ? (
				<div>
					<h3>{customerItem.name}</h3>
					<table>
						<tbody>
							<tr>
								<td>Organisation Number</td>
								<td>{customerItem.organisationNr}</td>
							</tr>
							<tr>
								<td>Payment Term</td>
								<td>{customerItem.paymentTerm}</td>
							</tr>
							<tr>
								<td>Phone Number</td>
								<td>{customerItem.phoneNumber}</td>
							</tr>
							<tr>
								<td>Reference</td>
								<td>{customerItem.reference}</td>
							</tr>
							<tr>
								<td>VAT Number</td>
								<td>{customerItem.vatNr}</td>
							</tr>
							<tr>
								<td>Email</td>
								<td>
									<a href={`mailto:${customerItem.email}`}>
										{customerItem.email}
									</a>
								</td>
							</tr>
							<tr>
								<td>Website</td>
								<td>
									<a href={customerItem.website} target="_blank">
										{customerItem.website}
									</a>
								</td>
							</tr>
						</tbody>
					</table>
					<button className="btn btn-secondary" onClick={deleteCustomer}>
						Delete Customer
					</button>
					<Link className="btn btn-secondary" to={`/home/${customerId}/edit`}>
						Edit Customer
					</Link>
					<Link className="btn btn-secondary" to="/home">
						Home
					</Link>
				</div>
			) : (
				<span>Loading Data...</span>
			)}
		</div>
	);
}

// {
// 	{Object.entries(customerItem).filter((item) => {
// 		item[0] === "name" ||
// 			"phoneNumber" ||
// 			"organisationNr" ||
// 			"vatNr" ||
// 			"reference" ||
// 			"paymentTerm" ||
// 			"website" ||
// 			"email";
// 		return (
// 			<CustomerDetailItem
// 				key={item[0]}
// 				label={item[0]}
// 				value={item[1]}
// 			/>
// 		);
// 	})}
// }
