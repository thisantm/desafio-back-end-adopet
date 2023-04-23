const database = require('../../models');

describe('Testing model Adoptions', () => {
  const objectAdoption = {
    id: 1,
    tutor_id: 1,
    pet_id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it('Must instance a new Adoption', () => {
    const adoption = database.Adoption.build(objectAdoption);

    expect(adoption).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        tutor_id: expect.any(Number),
        pet_id: expect.any(Number),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }),
    );
  });
});
