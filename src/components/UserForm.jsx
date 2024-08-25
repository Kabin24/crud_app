import React from "react";

function UserForm({ formData, handleInputChange, handleSubmit, countries }) {
  return (
    <form onSubmit={handleSubmit} className="user-form">
      <div>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Name *"
          required
        />
      </div>
      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email *"
          required
        />
      </div>
      <div>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="Phone Number *"
          required
        />
      </div>
      <div>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleInputChange}
          placeholder="Date of Birth"
        />
      </div>
      <div>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          placeholder="City"
        />
      </div>
      <div>
        <input
          type="text"
          name="district"
          value={formData.district}
          onChange={handleInputChange}
          placeholder="District"
        />
      </div>
      <div>
        <select
          name="province"
          value={formData.province}
          onChange={handleInputChange}
        >
          <option value="">Select Province</option>
          <option value="Province 1">Province 1</option>
          <option value="Province 2">Province 2</option>
          <option value="Bagmati Province">Bagmati Province</option>
          <option value="Gandaki Province">Gandaki Province</option>
          <option value="Lumbini Province">Lumbini Province</option>
          <option value="Karnali Province">Karnali Province</option>
          <option value="Sudurpashchim Province">Sudurpashchim Province</option>
        </select>
      </div>
      <div>
        <select
          name="country"
          value={formData.country}
          onChange={handleInputChange}
        >
          <option value="Nepal">Nepal</option>
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      <div>
        <input
          type="file"
          name="profilePicture"
          accept="image/png"
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default UserForm;
