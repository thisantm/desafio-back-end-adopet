const database = require('../../models');

describe('Testing model Pets', () => {
  const objectPet = {
    id: 1,
    shelter_id: 1,
    name: 'Spot',
    description: 'to be discovered',
    adopted: false,
    age: '2 anos',
    address: 'no address',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQktXg5_v8-L9AslphhrFvphE12SWkGl-_Jig&usqp=CAU',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const objectPetFail = {
    id: 1,
    shelter_id: 1,
    name: '1234567890',
    description: '',
    adopted: false,
    age: 'fsdsavos',
    address: '',
    image: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it('Must instance a new Pet', async () => {
    const pet = await database.Pet.build(objectPet);

    expect(pet).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        shelter_id: expect.any(Number),
        description: expect.any(String),
        adopted: expect.any(Boolean),
        age: expect.any(String),
        address: expect.any(String),
        image: expect.any(String),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }),
    );
  });

  test('Default object must pass the validation', async () => {
    const pet = await database.Pet.build(objectPet);
    await expect(await pet.validate()).resolves;
  });

  test('Fail object must not pass the validation', async () => {
    const petFail = await database.Pet.build(objectPetFail);
    // this is weird it should have await like the others however it does not work with await
    // if I put the await it throws the error however it does not catch it failing the test
    // maybe I am misunderstanding something
    await expect(petFail.validate()).rejects.toThrow();
  });
});
