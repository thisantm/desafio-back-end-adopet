const database = require('../../models');

describe('Testing model Shelters', () => {
  const objectShelter = {
    id: 1,
    name: 'adopet',
    email: 'adopet@adopet.com',
    password: 'adopet',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const objectShelterFail = {
    id: 1,
    name: '',
    email: 'adopet@adopet.com',
    password: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it('Must instance a new Shelter', async () => {
    const shelter = await database.Shelter.build(objectShelter);

    expect(shelter).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        email: expect.any(String),
        password: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }),
    );
  });

  test('Default object must pass the validation', async () => {
    const shelter = await database.Shelter.build(objectShelter);
    await expect(await shelter.validate()).resolves;
  });

  test('Fail object must not pass the validation', async () => {
    const shelterFail = await database.Shelter.build(objectShelterFail);
    // this is weird it should have await like the others however it does not work with await
    // if I put the await it throws the error however it does not catch it failing the test
    // maybe I am misunderstanding something
    await expect(shelterFail.validate()).rejects.toThrow();
  });
});
