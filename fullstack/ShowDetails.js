import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ShowDetails = () => {
  const { id } = useParams(); // Get the ID parameter from the URL
  const [car, setCar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/car/${id}`);
        setCar(response.data);
      } catch (error) {
        console.error('Error fetching car:', error);
      }
    };

    fetchCar();
  }, [id]);

  const handleGoBack = () => {
    navigate('/');
  }

  return (
   
    <div>
      {car ? (
        <div>
          <h2>Car Details</h2>
          <p>Name: {car.name}</p>
          <p>Brand: {car.brand}</p>
          <p>Price: {car.price}</p>
          <button onClick={handleGoBack}>Back to main</button> 
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ShowDetails;