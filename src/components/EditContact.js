import React,{useEffect,useState} from "react";
import {useNavigate,useParams} from "react-router-dom";
import axios from "../api/apiConfig";

function EditContact(){
    const {id} = useParams();
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [image,setImage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/contacts/${id}`)
        .then((res) => {
            setName(res.data.name);
            setEmail(res.data.email);
            setPhone(res.data.phone);
            setImage(res.data.image);
        })
    },[id]);

    const handleSave = () => {
        axios.put(`/contacts/${id}`,{name,email,phone,image})
        .then(() => {
            alert("Contact updated successfully!");
            navigate("/");
        })
    };

    const handleImageChange = (e) => {
        const file = e.target.file[0];
        if (file){
            setImage(URL.createObjectURL(file));
        }
    };

    return(
        <div className="container mt-4">
            <h1>Edit Contact</h1>
            <div className="mb-3">
                <label>Image</label>
                <input type="file" className="form-control" onChange={handleImageChange}></input>
                {image && <img src={image} alt="Preview" width="100" className="mt-2"/>}
            </div>
            <div className="mb-3">
                <label>Name</label>
                <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}></input>
            </div>
            <div className="mb-3">
                <lable>Email</lable>
                <input type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label>Phone</label>
                <input
                type="text"
                className="form-control"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}></input>
            </div>
            <button className="btn btn-primary" onClick={handleSave}>Save</button>
        </div>
    );
}

export default EditContact;