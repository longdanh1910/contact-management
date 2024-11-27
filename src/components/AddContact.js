import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/apiConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddContact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Hàm kiểm tra từng trường dữ liệu khi nhập
  const validateField = (field, value) => {
    let error = "";
    if (field === "name" && !value.trim()) {
      error = "Name is required.";
    }
    if (field === "email") {
      if (!value.trim()) {
        error = "Email is required.";
      } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value)) {
        error = "Invalid email address.";
      }
    }
    if (field === "phone") {
      if (!value.trim()) {
        error = "Phone number is required.";
      } else if (!/^\d{10}$/.test(value)) { // Chỉ cho phép 10 chữ số
        error = "Phone number must be exactly 10 digits.";
      }
    }
    setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));
  };

  // Hàm kiểm tra toàn bộ form trước khi submit
  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required.";
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)) {
      newErrors.email = "Invalid email address.";
    }
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAdd = (e) => {
    e.preventDefault(); // Ngăn chặn reload trang
    if (!validateForm()) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    axios
      .post("/contacts", { name, email, phone, image })
      .then(() => {
        toast.success("Contact added successfully!");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error adding contact:", error);
        toast.error("Failed to add contact.");
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center" >Add Contact</h1>
      <form onSubmit={handleAdd}>
        <div className="mb-3">
          <label>Image</label>
          <input
            type="file"
            className="form-control"
            onChange={handleImageChange}
          />
          {image && <img src={image} alt="Preview" width="100" className="mt-2" />}
        </div>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              validateField("name", e.target.value);
            }}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateField("email", e.target.value);
            }}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>
        <div className="mb-3">
          <label>Phone</label>
          <input
            type="text"
            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              validateField("phone", e.target.value);
            }}
          />
          {errors.phone && (
            <div className="invalid-feedback">{errors.phone}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </div>
  );
}

export default AddContact;
