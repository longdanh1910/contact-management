import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/apiConfig";
import { toast } from "react-toastify";

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/contacts")
      .then((res) => setContacts(res.data))
      .catch((error) => toast.error("Error fetching contacts"));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`/contacts/${id}`)
      .then(() => {
        toast.success("Contact deleted successfully!");
        setContacts(contacts.filter((contact) => contact.id !== id));
      })
      .catch(() => toast.error("Failed to delete contact."));
  };

  return (
    <div className="container mt-4">
      <h1>Contact Management</h1>
      <button
        className="btn btn-primary mb-3"
        onClick={() => navigate("/add")}
        style={{backgroundColor: "green"}}
      >
        Add Contact
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => navigate(`/edit/${contact.id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
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
