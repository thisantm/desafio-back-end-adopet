const database = require('../../models');

expect.extend({
  toBeNullOrString(received) {
    if (received === null || typeof received === 'string') {
      return {
        message: () => `expected ${received} to be null or String`,
        pass: true,
      };
    }
    return {
      message: () => `expected ${received} to be null or String`,
      pass: false,
    };
  },
});

describe('Testing model Tutors', () => {
  const objectTutor = {
    id: 1,
    name: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ éãóòõâêîôûàèìòùñ \' ÉÃÓÒÕÂÊÎÔÛÀÈÌÒÙÑÇ',
    email: 'John@Doe.com',
    password: 'johndoe',
    telephone: null,
    city: null,
    aboutMe: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const objectTutorFull = {
    id: 1,
    name: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ éãóòõâêîôûàèìòùñ \' ÉÃÓÒÕÂÊÎÔÛÀÈÌÒÙÑÇ',
    email: 'John@Doe.com',
    password: 'johndoe',
    telephone: '4739283120921',
    city: 'nowhere',
    aboutMe: 'nothing',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const objectTutorFail = {
    id: 1,
    name: '1234567890',
    email: 'John',
    password: '',
    telephone: '47392831259483948375374985743975239802430dsadsacsa',
    city: 'nowhere',
    aboutMe: 'jwpjewqifpngepgrihegrpieghepoirwpqofnvnfepbhrerepfwjfipehjrbnfepfewpoirtewpterwopvefpbnrphtpe56843yjriopnb epobnreoh1-vnpvernvpierwhtiptu90-12543dvsojvjpjbfpbinfpfhjsdapvdsijfdphjfpsjfepwqipfenpiofenepfjwedrt9-436tu935jgreph5j4-y4jhg=vndsvpfgj943´-0y243-y4-3hefehjwf´qjfewójqewg´deq',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it('Must instance a new Tutor attributes', async () => {
    // const nameExpected = "^[a-zA-ZÀ-Ùà-ù'].+(?:[a-zA-ZÀ-Ùà-ù']+)+$";
    // const emailExpected = '^[^@s]+@[^@s.]+.[^@.s]+$';
    // const telephoneExpected = '^+(?:[0-9]●?){6,14}[0-9]$';
    const tutor = await database.Tutor.build(objectTutor);

    expect(tutor).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        email: expect.any(String),
        password: expect.any(String),
        telephone: expect.toBeNullOrString(tutor.telephone),
        city: expect.toBeNullOrString(tutor.city),
        aboutMe: expect.toBeNullOrString(tutor.aboutMe),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }),
    );
  });

  it('Must instance a new Tutor with all attributes', async () => {
    const tutorFull = await database.Tutor.build(objectTutorFull);

    expect(tutorFull).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        email: expect.any(String),
        password: expect.any(String),
        telephone: expect.toBeNullOrString(tutorFull.telephone),
        city: expect.toBeNullOrString(tutorFull.city),
        aboutMe: expect.toBeNullOrString(tutorFull.aboutMe),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }),
    );
  });

  test('Default object must pass the validation', async () => {
    const tutor = await database.Tutor.build(objectTutor);
    await expect(await tutor.validate()).resolves;
  });

  test('Full object must pass the validation', async () => {
    const tutorFull = await database.Tutor.build(objectTutorFull);
    await expect(await tutorFull.validate()).resolves;
  });

  test('Fail object must not pass the validation', async () => {
    const tutorFail = await database.Tutor.build(objectTutorFail);
    // this is weird it should have await like the others however it does not work with await
    // if I put the await it throws the error however it does not catch it failing the test
    // maybe I am misunderstanding something
    await expect(tutorFail.validate()).rejects.toThrow();
  });
});
