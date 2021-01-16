import React, { useContext, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { UserContext } from "../context/UserContext";
import Footer from "../components/Footer";
import {
	ButtonStyled,
	ButtonEditStyled,
	ButtonDeleteStyled,
} from "../components/ButtonStyled";

export default function CustomerDetailPage(props) {
	const customerId = props.match.params.id;
	const {
		customerList,
		setCustomerList,
		getCustomerList,
		getUser,
	} = useContext(UserContext);
	const customerItem = customerList.filter(
		(customer) => customer.id == customerId
	)[0];
	const history = useHistory();

	useEffect(() => {
		if (!customerList) {
			getCustomerList();
			getUser();
		}
	}, []);

	const deleteCustomer = () => {
		const url = `https://frebi.willandskill.eu/api/v1/customers/${customerId}/`;
		const token = localStorage.getItem("MARTA_WEBB20");
		fetch(url, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		}).then(() => {
			const newCustomerList = customerList.filter(
				(customer) => customer.id != customerId
			);
			setCustomerList(newCustomerList);
			history.push("/home");
		});
	};

	return (
		<div>
			<NavBar />
			{customerItem ? (
				<div>
					<h3>{customerItem.name}</h3>
					<table className="table table-bordered">
						<tbody>
							<tr>
								<td className="table-secondary">Organisation Number</td>
								<td className="table-secondary">
									{customerItem.organisationNr}
								</td>
							</tr>
							<tr>
								<td className="table-secondary">Payment Term</td>
								<td className="table-secondary">{customerItem.paymentTerm}</td>
							</tr>
							<tr>
								<td className="table-secondary">Phone Number</td>
								<td className="table-secondary">{customerItem.phoneNumber}</td>
							</tr>
							<tr>
								<td className="table-secondary">Reference</td>
								<td className="table-secondary">{customerItem.reference}</td>
							</tr>
							<tr>
								<td className="table-secondary">VAT Number</td>
								<td className="table-secondary">{customerItem.vatNr}</td>
							</tr>
							<tr>
								<td className="table-secondary">Email</td>
								<td className="table-secondary">
									<a href={`mailto:${customerItem.email}`}>
										{customerItem.email}
									</a>
								</td>
							</tr>
							<tr>
								<td className="table-secondary">Website</td>
								<td className="table-secondary">
									<a href={customerItem.website} target="_blank">
										{customerItem.website}
									</a>
								</td>
							</tr>
						</tbody>
					</table>
					<ButtonDeleteStyled onClick={deleteCustomer}>
						Delete Customer
					</ButtonDeleteStyled>
					<ButtonEditStyled>
						<Link to={`/home/${customerId}/edit`}>Edit Customer</Link>
					</ButtonEditStyled>
					<ButtonStyled>
						<Link to="/home">Back to Home</Link>
					</ButtonStyled>

					<Footer />
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
