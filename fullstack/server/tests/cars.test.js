import request from 'supertest';
import app from '../index.js'; // Assuming your Express app is exported as 'app'

describe('GET /car/:id', () => {
  let carId;

  beforeAll(async () => {
    // Assume you have some mechanism to create a new car and get its ID
    const newCarResponse = await request(app)
      .post('/car')
      .send({
        name: 'Test Car',
        brand: 'Test Brand',
        price: '10000'
      });
    carId = newCarResponse.body.id;
  });

  it('responds with car details if car exists', async () => {
    const response = await request(app).get(`/car/${carId}`);

    console.log(response.body);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', carId);
    expect(response.body).toHaveProperty('name', 'Test Car');
    expect(response.body).toHaveProperty('brand', 'Test Brand');
    expect(response.body).toHaveProperty('price', '10000');
  });

  it('responds with 404 if car does not exist', async () => {
    const response = await request(app).get('/car/non-existent-id');
    expect(response.status).toBe(404);
  });
});

describe('POST /car', () => {
  it('creates a new car', async () => {
    const newCar = {
      name: 'Test Car',
      brand: 'Test Brand',
      price: '10000'
    };
    const response = await request(app)
      .post('/car')
      .send(newCar);
    expect(response.status).toBe(201);
    // Optionally, you can assert the response body to check if the car was created successfully
  });
});

describe('PUT /car/:id', () => {
  let carId;

  beforeAll(async () => {
    // Assume you have some mechanism to create a new car and get its ID
    const newCarResponse = await request(app)
      .post('/car')
      .send({
        name: 'Test Car',
        brand: 'Test Brand',
        price: '10000'
      });
    carId = newCarResponse.body.id;
  });

  it('updates an existing car', async () => {
    const updatedCar = {
      name: 'Updated Car Name',
      brand: 'Updated Brand',
      price: '20000'
    };
    const response = await request(app)
      .put(`/car/${carId}`)
      .send(updatedCar);
    expect(response.status).toBe(200);
    // Optionally, you can assert the response body to check if the car was updated successfully
  });

  it('responds with 404 if car does not exist', async () => {
    const response = await request(app)
      .put('/car/non-existent-id')
      .send({ name: 'Updated Name' });
    expect(response.status).toBe(404);
  });
});

describe('DELETE /car/:id', () => {
  let carId;

  beforeAll(async () => {
    // Assume you have some mechanism to create a new car and get its ID
    const newCarResponse = await request(app)
      .post('/car')
      .send({
        name: 'Test Car',
        brand: 'Test Brand',
        price: '10000'
      });
    carId = newCarResponse.body.id;
  });

  it('deletes an existing car', async () => {
    const response = await request(app).delete(`/car/${carId}`);
    expect(response.status).toBe(204);
  });

  it('responds with 404 if car does not exist', async () => {
    const response = await request(app).delete('/car/non-existent-id');
    expect(response.status).toBe(404);
  });
});