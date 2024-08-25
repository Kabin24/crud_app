import React, { useState, useEffect } from "react";
import axios from "axios";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";
import Pagination from "./components/Pagination";
import FilterSort from "./components/FilterSort";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    city: "",
    district: "",
    province: "",
    country: "Nepal",
    profilePicture: null,
  });
  const [countries, setCountries] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [filterCountry, setFilterCountry] = useState("All");
  const [filterProvince, setFilterProvince] = useState("All");
  const itemsPerPage = 5;

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        const countryNames = response.data.map(
          (country) => country.name.common
        );
        setCountries(countryNames);
      })
      .catch((error) => console.error("Error fetching countries:", error));

    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(savedUsers);
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePicture") {
      const file = files[0];
      if (file && file.type !== "image/png") {
        alert("Only PNG files are allowed.");
        return;
      }
      setFormData({
        ...formData,
        [name]: file,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingIndex !== null) {
      const updatedUsers = [...users];
      updatedUsers[editingIndex] = formData;
      setUsers(updatedUsers);
      setEditingIndex(null);
    } else {
      setUsers([...users, formData]);
    }

    setFormData({
      name: "",
      email: "",
      phone: "",
      dob: "",
      city: "",
      district: "",
      province: "",
      country: "Nepal",
      profilePicture: null,
    });
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setFormData(users[index]);
  };

  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (field) => {
    const direction =
      sortField === field && sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(direction);
  };

  const handleFilterCountry = (e) => {
    setFilterCountry(e.target.value);
  };

  const handleFilterProvince = (e) => {
    setFilterProvince(e.target.value);
  };

  const filteredAndSortedUsers = users
    .filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phone.includes(searchQuery);

      const matchesCountry =
        filterCountry === "All" || user.country === filterCountry;
      const matchesProvince =
        filterProvince === "All" || user.province === filterProvince;

      return matchesSearch && matchesCountry && matchesProvince;
    })
    .sort((a, b) => {
      if (!sortField) return 0;

      const fieldA = a[sortField].toLowerCase();
      const fieldB = b[sortField].toLowerCase();

      if (fieldA < fieldB) return sortDirection === "asc" ? -1 : 1;
      if (fieldA > fieldB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredAndSortedUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="App">
      <h1>User Registration</h1>
      <UserForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        countries={countries}
        editingIndex={editingIndex}
      />
      <h1>Filtering </h1>
      <FilterSort
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        handleFilterCountry={handleFilterCountry}
        handleFilterProvince={handleFilterProvince}
        countries={countries}
      />
      <h1>User List</h1>
      <UserTable
        paginatedUsers={paginatedUsers}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleSort={handleSort}
        sortField={sortField}
        sortDirection={sortDirection}
      />
      <Pagination
        currentPage={currentPage}
        totalItems={filteredAndSortedUsers.length}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default App;
