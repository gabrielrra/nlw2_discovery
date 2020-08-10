const Database = require('./db');
const createProffy = require('./createProffy');

Database.then(async (db) => {
  const proffy = {
    name: 'Leonardo Augustu',
    avatar:
      'https://image.freepik.com/fotos-gratis/perfil-de-cabeca-e-pescoco-de-girafa-close-up-e-retrato_107467-1601.jpg',
    whatsapp: '31982347087',
    bio:
      'Gosto de lamber picolés derretendo. Dar aulas de Matemática é minha segunda paixão. Se você não sabe o básico de matemática eu fico irritado',
  };

  const classObj = {
    subject: 'Matemática',
    cost: '13',
  };

  const classSchedules = [
    {
      weekday: 1,
      time_from: 780,
      time_to: 840,
    },
    {
      weekday: 3,
      time_from: 900,
      time_to: 960,
    },
  ];
  await createProffy(db, { proffy, classObj, classSchedules });
  //Consultar dados

  // const allProffys = await db.all('SELECT * FROM proffys');

  // const proffyWithClasses = await db.all(`
  //   SELECT classes.*, proffys.*
  //   FROM proffys
  //   JOIN classes ON (classes.proffy_id = proffys.id)
  //   WHERE classes.proffy_id = 1;
  // `);

  // const filtered = await db.all(`
  //   SELECT class_schedules.*
  //   FROM class_schedules
  //   WHERE class_schedules.class_id = "1"
  //   AND class_schedules.weekday = "0"
  //   AND class_schedules.time_from <= "800"
  //   AND class_schedules.time_to > "800"
  // `);
  // console.log(filtered);
});
