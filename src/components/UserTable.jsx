import React from "react";

function UserTable({
  paginatedUsers,
  handleEdit,
  handleDelete,
  handleSort,
  sortField,
  sortDirection,
}) {
  return (
    <table className="user-table">
      <thead>
        <tr>
          <th onClick={() => handleSort("name")}>
            Name {sortField === "name" && (sortDirection === "asc" ? "↑" : "↓")}
          </th>
          <th onClick={() => handleSort("email")}>
            Email {sortField === "email" && (sortDirection === "asc" ? "↑" : "↓")}
          </th>
          <th onClick={() => handleSort("phone")}>
            Phone {sortField === "phone" && (sortDirection === "asc" ? "↑" : "↓")}
          </th>
          <th>Date of Birth</th>
          <th>City</th>
          <th>District</th>
          <th>Province</th>
          <th>Country</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {paginatedUsers.map((user, index) => (
          <tr key={index}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.dob}</td>
            <td>{user.city}</td>
            <td>{user.district}</td>
            <td>{user.province}</td>
            <td>{user.country}</td>
            <td>
              <button className="edit" onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
