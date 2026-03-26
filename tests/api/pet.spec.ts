import { test, expect } from '@playwright/test';

test.describe.serial('Petstore API Tests', () => {
  // Generate a unique pet ID for this test run
  const petId = Math.floor(Math.random() * 1_000_000);

  test('Add Pet', async ({ request }) => {
    const response = await request.post('https://petstore.swagger.io/v2/pet', {
      data: {
        id: petId,
        name: 'Doggie',
        status: 'available'
      }
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.id).toBe(petId);
    expect(body.name).toBe('Doggie');
    expect(body.status).toBe('available');
  });

  test('Get Pet', async ({ request }) => {
    const response = await request.get(`https://petstore.swagger.io/v2/pet/${petId}`);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.id).toBe(petId);
    expect(body.name).toBe('Doggie');
    expect(body.status).toBe('available');
  });

  test('Delete Pet', async ({ request }) => {
    const response = await request.delete(`https://petstore.swagger.io/v2/pet/${petId}`);

    expect(response.status()).toBe(200);

    // Optionally confirm it’s really deleted
    const getResponse = await request.get(`https://petstore.swagger.io/v2/pet/${petId}`);
    expect(getResponse.status()).toBe(404);
  });
});