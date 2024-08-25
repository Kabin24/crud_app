import React from "react";

function FilterSort({
  searchQuery,
  handleSearch,
  handleFilterCountry,
  handleFilterProvince,
  countries,
}) {
  return (
    <div className="filter-sort">
      <input
        type="text"
        placeholder="Search By Name , Email ,Phone "
        value={searchQuery}
        onChange={handleSearch}
      />
      <select onChange={handleFilterCountry}>
        <option value="All">All Countries</option>
        {countries.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>
      <select onChange={handleFilterProvince}>
        <option value="All">All Provinces</option>
        <option value="Province 1">Province 1</option>
        <option value="Province 2">Province 2</option>
        <option value="Bagmati Province">Bagmati Province</option>
        <option value="Gandaki Province">Gandaki Province</option>
        <option value="Lumbini Province">Lumbini Province</option>
        <option value="Karnali Province">Karnali Province</option>
        <option value="Sudurpashchim Province">Sudurpashchim Province</option>
      </select>
    </div>
  );
}

export default FilterSort;
