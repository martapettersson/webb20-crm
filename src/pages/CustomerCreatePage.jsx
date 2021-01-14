import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";

export default function CustomerCreatePage() {
	const [formData, setFormData] = useState({});
	const history = useHistory();

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

	const handleOnChange = (e) => {
		const inputName = e.target.name;
		const inputValue = e.target.value;
		setFormData({ ...formData, [inputName]: inputValue });
	};

	//Create customer (formData), send to backend
	const handleOnSubmit = (e) => {
		e.preventDefault();
		const url = "https://frebi.willandskill.eu/api/v1/customers/";
		const token = localStorage.getItem("MARTA_WEBB20");
		fetch(url, {
			method: "POST",
			body: JSON.stringify(formData),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then(() => {
				history.push("/home");
			});
	};
	return (
		<div>
			<h2>Create Customer</h2>
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
					Create Customer
				</button>
				<Link className="btn btn-secondary" to="/home">
					Home
				</Link>
			</form>
		</div>
	);
}
