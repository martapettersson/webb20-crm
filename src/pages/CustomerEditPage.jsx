import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function CustomerEditPage(props) {
	const customerId = props.match.params.id;
	const [formData, setFormData] = useState({});
	const history = useHistory();

	const getCustomerItem = () => {
		const url = `https://frebi.willandskill.eu/api/v1/customers/${customerId}/`;
		const token = localStorage.getItem("MARTA_WEBB20");
		fetch(url, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((data) => setFormData(data));
	};

	useEffect(() => {
		getCustomerItem();
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
			.then(() => history.push(`/home/${customerId}/`));
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
