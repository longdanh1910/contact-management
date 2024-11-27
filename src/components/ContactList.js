import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/apiConfig";


function ContactList() {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/contacts").then((res) => setContacts(res.data));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`/contacts/${id}`).then(() => {
      setContacts(contacts.filter((contact) => contact.id !== id));
      alert("Contact deleted successfully!");
    });
  };

  return (
    <div className="container mt-4">
      <h1 style={{
        color: "#ff5733", // Màu chữ
        fontSize: "3rem", // Kích thước chữ
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Đổ bóng
        textAlign: "center", // Căn giữa
        fontFamily: "Arial, sans-serif", // Font chữ
        marginTop: "20px", // Khoảng cách phía trên
      }}>Contacts</h1>
      <button className="btn btn-primary mb-3" onClick={() => navigate("/add")}>
        Add Contact
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>
                <img src={contact.image} alt={contact.name}></img>
              </td>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => navigate(`/edit/${contact.id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(contact.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ContactList;
