import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/apiConfig";

function AddContact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  
  const validateField = (name, value) => {
    const emailRegex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^\d{10}$/;

    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) {
          error = "Name is required";
        }
        break;
      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!emailRegex.test(value)) {
          error = "Invalid email format";
        }
        break;
      case "phone":
        if (!value.trim()) {
          error = "Phone is required";
        } else if (!phoneRegex.test(value)) {
          error = "Phone must be 10 digits";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleInputChange = (field, value) => {
    switch (field) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phone":
        setPhone(value);
        break;
      default:
        break;
    }

    
    validateField(field, value);
  };

  const handleAdd = () => {
    
    if (!name || !email || !phone) {
      alert("Please fix the errors before submitting!");
      return;
    }

    axios
      .post("/contacts", { name, email, phone, image })
      .then(() => {
        alert("Contact added successfully!");
        navigate("/");
      })
      .catch((err) => console.error("Error adding contact:", err));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="container mt-4">
      <h1>Add Contact</h1>

     
      <div className="mb-3">
        <label>Image</label>
        <input
          type="file"
          className="form-control"
          onChange={handleImageChange}
        />
        {image && (
          <img src={image} alt="Preview" width="100" className="mt-2" />
        )}
      </div>

      
      <div className="mb-3">
        <label>Name</label>
        <input
          type="text"
          name="name"
          className={`form-control ${errors.name ? "is-invalid" : ""}`}
          value={name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>

      
      <div className="mb-3">
        <label>Email</label>
        <input
          type="email"
          name="email"
          className={`form-control ${errors.email ? "is-invalid" : ""}`}
          value={email}
          onChange={(e) => handleInputChange("email", e.target.value)}
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>

      
      <div className="mb-3">
        <label>Phone</label>
        <input
          type="text"
          name="phone"
          className={`form-control ${errors.phone ? "is-invalid" : ""}`}
          value={phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
        />
        {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
      </div>

      
      <button
        className="btn btn-primary"
        onClick={handleAdd}
        disabled={Object.values(errors).some((error) => error)}
      >
        Add
      </button>
    </div>
  );
}

export default AddContact;
