import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
	const [customers, setCustomers] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredCustomers, setFilteredCustomers] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [sortOrder, setSortOrder] = useState("asc");
	const itemsPerPage = 20;

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const response = await axios.get("http://localhost:5000/api/customers");
			setCustomers(response.data);
			setFilteredCustomers(response.data); // Set filteredCustomers as well
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const handleSearchInputChange = event => {
		setSearchTerm(event.target.value);
	};

	const handleSearch = () => {
		if (searchTerm === "") {
			setFilteredCustomers(customers); // Set filteredCustomers to all customers
		} else {
			const filteredData = customers.filter(customer =>
				customer.customername.toLowerCase().includes(searchTerm.toLowerCase())
			);
			setFilteredCustomers(filteredData); // Set filteredCustomers to filtered data
		}
	};

	const handlePageChange = pageNumber => {
		setCurrentPage(pageNumber);
	};

	const handleSort = () => {
		const sortedData = [...filteredCustomers].sort((a, b) => {
			if (sortOrder === "asc") {
				return new Date(a.created_date) - new Date(b.created_date);
			} else {
				return new Date(b.created_date) - new Date(a.created_date);
			}
		});
		setFilteredCustomers(sortedData);
		setSortOrder(sortOrder === "asc" ? "desc" : "asc");
	};

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	let currentItems = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);

	return (
		<div className="container">
			<h1>Customer Data</h1>
			<input
				type="text"
				placeholder="Search by name "
				value={searchTerm}
				onChange={handleSearchInputChange}
			/>
			<button className="btn btn-primary mx-2" onClick={handleSearch}>
				Search
			</button>
			<button className="btn btn-primary mx-2" onClick={handleSort}>
				Sort by Date
			</button>
			<table>
				<thead>
					<tr>
						<th>s.no</th>
						<th>Name</th>
						<th>Age</th>
						<th>Moblie Number</th>
						<th>Created Date</th>
						<th>Created Time</th>
					</tr>
				</thead>
				<tbody>
					{currentItems.map(customer => (
						<tr key={customer.s_no}>
							{customer.s_no}
							<td>{customer.customername}</td>
							<td>{customer.age}</td>
							<td>{customer.phone}</td>
							<td>{customer.created_date.substring(0, 10)}</td>
							<td>{customer.created_time}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div>
				{filteredCustomers.length > itemsPerPage && (
					<ul className="pagination">
						{Array.from(
							{ length: Math.ceil(filteredCustomers.length / itemsPerPage) },
							(_, i) => (
								<li
									key={i}
									className={`page-item ${
										i + 1 === currentPage ? "active" : ""
									}`}
								>
									<button
										className="page-link"
										onClick={() => handlePageChange(i + 1)}
									>
										{i + 1}
									</button>
								</li>
							)
						)}
					</ul>
				)}
			</div>
		</div>
	);
}

export default App;
