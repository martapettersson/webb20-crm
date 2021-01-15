import React, { useState, useContext, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { UserContext } from "../context/UserContext";

export default function CustomerCreatePage() {
	const {
		customerList,
		setCustomerList,
		getCustomerList,
		getUser,
	} = useContext(UserContext);
	const [formData, setFormData] = useState({});
	const history = useHistory();

	useEffect(() => {
		if (customerList.length < 1) {
			getCustomerList();
			getUser();
		}
	}, []);

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
			.then((data) => {
				setCustomerList([...customerList, data]);
				history.push("/home");
			});
	};

	return (
		<div>
			<NavBar />
			{customerList ? (
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
					</form>
				</div>
			) : (
				<p>Loading data...</p>
			)}
		</div>
	);
}
