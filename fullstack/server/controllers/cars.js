import {v4 as uuid} from "uuid"
import express from "express";
const app = express();

let cars = [
    {
        "id": uuid(),
        "name": "Aston Martin Valhalla",
        "brand": "Aston Martin",
        "price": "800000"
    },
    {
        "id": uuid(),
        "name": "BMW 5 Series Touring",
        "brand": "BMW",
        "price": "42000"
    },
    {
        "id": uuid(),
        "name": "Porsche 911 GT 3",
        "brand": "Porsche",
        "price": "206000"
    },
    {
        "id": uuid(),
        "name": "Mercedes-Benz AMG GT",
        "brand": "Mercedes-Benz",
        "price": "221340"
    },
    {
        "id": uuid(),
        "name": "Dacia Shoe",
        "brand": "Dacia",
        "price": "200"
    }
];


export const getCar = (req, res) => {
    const singleCar = cars.find((car) => car.id === req.params.id);

    if (!singleCar) {
        return res.status(404).send("Car not found");
    }

    res.status(200).send(singleCar);
}

export const getCars = (req, res) => {
    const sortParam = req.query.name;
    let sortedCars = cars.slice(); 

    if (sortParam && sortParam.toUpperCase() === 'DESC') {
        sortedCars.sort((a, b) => b.name.localeCompare(a.name));
    } else {
        sortedCars.sort((a, b) => a.name.localeCompare(b.name));
    }

    res.status(200).send(sortedCars); 
}

export const createCar = (req, res) => {
    const car = req.body;

    // Create a new ID for the car
    const newCarId = uuid();
    const newCar = { id: newCarId, ...car };

    // Add the new car to the cars array
    cars.push(newCar);

    // Send the created car in the response body
    res.status(201).json(newCar);
}

export const updateCar = (req, res) => {
    const carIndex = cars.findIndex((car) => car.id === req.params.id);

    if (carIndex === -1) {
        return res.status(404).send("Car not found");
    }

    cars[carIndex] = {
        ...cars[carIndex],
        ...req.body
    };

    res.status(200).send("Car updated successfully");
}

export const deleteCar = (req, res) => {
    const index = cars.findIndex((car) => car.id === req.params.id);
    
    if (index === -1) {
        return res.status(404).send("Car not found");
    }
    
    cars.splice(index, 1);

    res.sendStatus(204);
}
