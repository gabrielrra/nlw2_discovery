module.exports = async function (db, { proffy, classObj, classSchedules }) {
  const createdProffy = await db.run(`
    INSERT INTO proffys(
      name,
      avatar,
      whatsapp,
      bio
    ) VALUES(
      "${proffy.name}",
      "${proffy.avatar}",
      "${proffy.whatsapp}",
      "${proffy.bio}"
    )
  `);
  const proffyId = createdProffy.lastID;

  const createdClass = await db.run(`
    INSERT INTO classes(
      proffy_id,
      subject,
      cost
    ) VALUES(
      "${proffyId}",
      "${classObj.subject}",
      "${classObj.cost}"
    )
  `);

  const classId = createdClass.lastID;

  const schedules = classSchedules.map((classSchedule) =>
    db.run(`
    INSERT INTO class_schedules(
      class_id,
      weekday,
      time_from,
      time_to
    ) VALUES(
      "${classId}",
      "${classSchedule.weekday}",
      "${classSchedule.time_from}",
      "${classSchedule.time_to}"
    )
  `)
  );

  await Promise.all(schedules);
};
