import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function CustomerEditPage(props) {
	const customerId = props.match.params.id;
	const [formData, setFormData] = useState({});
	const { customerList, setCustomerList } = useContext(UserContext);
	const customerItem = customerList.filter(
		(customer) => customer.id == customerId
	)[0];
	const history = useHistory();
	console.log(customerList);
	console.log(customerItem);

	useEffect(() => {
		setFormData(customerItem);
	}, []);

	const handleOnChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setFormData({ ...formData, [name]: value });
	};

	const handleOnSubmit = (e) => {
		e.preventDefault();

		const url = `https://frebi.willandskill.eu/api/v1/customers/${customerId}/`;
		const token = localStorage.getItem("MARTA_WEBB20");
		fetch(url, {
			method: "PUT",
			body: JSON.stringify(formData),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then(() => {
				const newCustomerList = customerList.filter(
					(customer) => customer.id != customerId
				);
				newCustomerList.push(formData);
				setCustomerList(newCustomerList);
				history.push(`/home/${customerId}/`);
			});
	};

	const renderInput = (name, label, type) => {
		return (
			<div>
				<label>{label}</label>
				<input
					type={type || "text"}
					name={name}
					onChange={handleOnChange}
					value={formData[name] || ""}
				/>
			</div>
		);
	};

	return (
		<div>
			<h1>Edit Customer</h1>
			<form onSubmit={handleOnSubmit}>
				{renderInput("name", "Customer Name")}
				{renderInput("email", "Customer Email", "email")}
				{renderInput("organisationNr", "Organisation Nr")}
				{renderInput("paymentTerm", "Payment Term", "number")}
				{renderInput("phoneNumber", "Phone Nr", "tel")}
				{renderInput("reference", "Reference")}
				{renderInput("vatNr", "VAT Nr")}
				{renderInput("website", "Website", "url")}
				<button className="btn btn-secondary" type="submit">
					Update Customer
				</button>
			</form>
		</div>
	);
}
