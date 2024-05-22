import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './AddEdit.css'; // Import Add.css
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for react-toastify

const initialState = {
    name: '',
    brand: '',
    price: ''
};

const AddEdit = () => {
    const [state, setState] = useState(initialState);
    const navigate = useNavigate();

    const {id} = useParams();

    useEffect(() => {
        if (id) {
            getSingleCar(id);
        }
    }, [id])

    const getSingleCar = async (id) => {
        const response = await axios.get(`http://localhost:5000/car/${id}`);
        if (response.status === 200) {
            const value = response.data[0] || "Car not found";
            if (value !== "Car not found" ) {
                setState(value);
            }
        } 
    }

    const addCar = async (data) => {
        try {
            const response = await axios.post('http://localhost:5000/car', data);
            if (response.status === 201) {
                toast.success("Car added successfully"); // Display success message from response
            }
        } catch (error) {
            toast.error("Car not added"); // Display error toast
        }
    };

    const updateCar = async (data, id) => {
        try {
            const response = await axios.put(`http://localhost:5000/car/${id}`, data);
            if (response.status === 200) {
                toast.success(response.data); // Display success toast
            }
        } catch (error) {
            toast.error(error.message); // Display error toast
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!state.name || !state.brand || !state.price) {
            toast.error('Please fill each input field'); // Display validation error toast
        } else {
            if (!id) {
                addCar(state);
            }
            else {
                updateCar(state, id);
            }
            setTimeout(() => navigate("/"), 500);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter name..."
                    onChange={handleInputChange}
                    value={state.name}
                />

                <label htmlFor="brand">Brand</label>
                <input
                    type="text"
                    id="brand"
                    name="brand"
                    placeholder="Enter brand..."
                    onChange={handleInputChange}
                    value={state.brand}
                />

                <label htmlFor="price">Price</label>
                <input
                    type="text"
                    id="price"
                    name="price"
                    placeholder="Enter price..."
                    onChange={handleInputChange}
                    value={state.price}
                />

                <input type="submit" value={id ? "Update" : "Add"} />
            </form>
        </div>
    );
};

export default AddEdit;