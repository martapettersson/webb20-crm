import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { ButtonEditStyled, ButtonStyled } from "../components/ButtonStyled";

export default function CustomerEditItem({ customerItem, customerId }) {
	const { validateForm, customerList, setCustomerList } = useContext(
		UserContext
	);
	const [formData, setFormData] = useState({});
	const history = useHistory();

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
		if (formData === customerItem) {
			history.push(`/home/${customerId}/`);
		} else if (validateForm(formData) === true) {
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
				.then((data) => {
					const newCustomerList = customerList.filter(
						(customer) => customer.id != customerId
					);
					newCustomerList.push(data);
					setCustomerList(newCustomerList);
					history.push(`/home/${customerId}/`);
				});
		} else {
			alert(
				"Payment Term must be a natural number and VAT Nr must start with SE and after that 10 digits"
			);
		}
	};

	const renderInput = (name, label, type) => {
		return (
			<div className="mb-3 form-group row">
				<label className="col-sm-2 col-form-label">{label}</label>
				<div className="col-sm-10">
					<input
						type={type || "text"}
						name={name}
						onChange={handleOnChange}
						value={formData[name] || ""}
						className="form-control "
					/>
				</div>
			</div>
		);
	};

	return (
		<div>
			<form onSubmit={handleOnSubmit}>
				{renderInput("name", "Customer Name")}
				{renderInput("organisationNr", "Organisation Nr")}
				{renderInput("paymentTerm", "Payment Term", "number")}
				{renderInput("phoneNumber", "Phone Nr", "tel")}
				{renderInput("reference", "Reference")}
				{renderInput("vatNr", "VAT Nr")}
				{renderInput("email", "Customer Email", "email")}
				{renderInput("website", "Website", "url")}
				<ButtonEditStyled type="submit">Update Customer</ButtonEditStyled>
				<Link to={`/home/${customerId}/`}>
					<ButtonStyled>Back</ButtonStyled>
				</Link>
			</form>
		</div>
	);
}
