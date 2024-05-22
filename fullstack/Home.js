import React, { useState, useEffect, Fragment } from 'react';
import { Button, Table } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for react-toastify

function Home() {
    const [carList, setCarList] = useState([]);
    const [selectedCars, setSelectedCars] = useState([]);

    useEffect(() => {
        getCars();
    }, []);

    const getCars = async () => {
        //const response = await axios.get("http://localhost:5000/cars?name=DESC");
        const response = await axios.get("http://localhost:5000/cars");
        if (response.status === 200) {
            setCarList(response.data);
        }
    }

    const onDeleteCar = async (id) => {
        if (window.confirm("Are you sure you want to delete this car?")) {
            const response = await axios.delete(`http://localhost:5000/car/${id}`);
            if (response.status === 204) {
                toast.success("Car deleted");
                getCars();
            } else {
                toast.error("Couldn't delete car");
            }
        }
    }
    
    const handleCheckboxChange = (id) => {
        const index = selectedCars.indexOf(id);
        if (index === -1) {
            setSelectedCars([...selectedCars, id]);
        } else {
            setSelectedCars(selectedCars.filter(carId => carId !== id));
        }
    };  

    const handleExport = () => {
        // Filter out selected cars
        const selectedCarData = carList.filter(car => selectedCars.includes(car.id));
        // Convert selected car data to JSON
        const jsonData = JSON.stringify(selectedCarData, null, 2);
        // Create a Blob with JSON data
        const blob = new Blob([jsonData], { type: 'application/json' });
        // Create a temporary link element
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'selected_cars.json');
        // Trigger the download
        document.body.appendChild(link);
        link.click();
        // Clean up
        URL.revokeObjectURL(url);
        document.body.removeChild(link);

        toast.success("Selected cars exported successfully");
    };

    const handleMultipleDelete = async () => {
        try {
            // Iterate through selected cars
            for (const carId of selectedCars) {
                // Delete the car with the current carId
                await axios.delete(`http://localhost:5000/car/${carId}`);
            }
    
            // After deleting selected cars, fetch the updated car list
            getCars();
    
            // Clear the selected cars list
            setSelectedCars([]);
            
            // Show success message
            toast.success("Selected cars deleted successfully");
        } catch (error) {
            // Handle error
            console.error("Error deleting selected cars:", error);
            toast.error("Error deleting selected cars");
        }
    };

    return (
        <Fragment>
            <div style={{ margin: "10rem" }}>
                <Table striped hover size="sm">
                    <thead>
                        <tr>
                            <th style={{ fontSize: '18px', textAlign: 'center' }}>Name</th>
                            <th style={{ fontSize: '18px', textAlign: 'center' }}>Actions</th>
                            <th style={{ fontSize: '18px', textAlign: 'center' }}>Export/Delete</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                    <tr style={{ height: '5px' }}></tr>
                    {
                        carList.length > 0 ?
                            carList.map((item) => {
                                return (
                                    <tr style={{ textAlign: 'center', fontSize: '17px' }} key={item.id}>
                                        <td style={{ textAlign: 'center' }}>{item.name}</td>
                                        <td>
                                            <Link to={`/update/${item.id}`}>
                                                <Button className="btn btn-update" style={{backgroundColor: '#0077be', borderColor: '#0077be' }}>Update</Button>
                                            </Link>
                                            &nbsp;
                                            <Button className="btn btn-delete" onClick={() => onDeleteCar(item.id)}style={{backgroundColor: '#DC143C', borderColor: '#DC143C' }} >Delete</Button>
                                            &nbsp;
                                            <Link to={`/showDetails/${item.id}`}>
                                            <Button variant="info" style={{ backgroundColor: '#4169E1', color: 'white' }}>Show Details</Button>
                                            </Link>
                                        </td>
                                        <td style = {{textAlign: 'center'}}>
                                            <input
                                                type="checkbox"
                                                onChange={() => handleCheckboxChange(item.id)}
                                                checked={selectedCars.includes(item.id)}
                                                style={{ width: '17px', height: '30px', display: 'block', margin: 'auto' }}
                                            />
                                        </td>
                                    </tr>
                                )
                            })
                            :
                            null
                    }
                </tbody>
                </Table>
                <br />
                <div className='d-grid gap-2' style={{ marginBottom: '20px',  }}>
                    <Link to="/add" style={{ width: '50%', marginLeft: 'auto'}}>
                        <Button size="lg" style={{ width: '100%', backgroundColor: '#74B72E', borderColor: '#74B72E' }}>Add</Button>
                    </Link>
                    <Button onClick={handleExport} size="lg" style={{ marginLeft: 'auto', width: '50%', backgroundColor: '#6A5ACD', borderColor: '#6A5ACD' }}>Export</Button>
                    <Button onClick={handleMultipleDelete} size="lg" style={{ marginLeft: 'auto', width: '50%', backgroundColor: '#E9967A', borderColor: '#E9967A' }}>Multiple Delete</Button>
                </div>
            </div>
        </Fragment>
    )
}

export default Home ;
