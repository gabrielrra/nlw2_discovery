const Database = require('./database/db');
const {
  subjects,
  weekdays,
  getSubject,
  convertHoursToMin,
} = require('./utils/format');

function pageLanding(req, res) {
  return res.render('index.html');
}

async function pageStudy(req, res) {
  const filters = req.query;
  const db = await Database;

  if (!filters.subject || !filters.weekday || !filters.time) {
    const proffysUnhandled = await db.all(`
      SELECT classes.*, proffys.*
      FROM proffys
      JOIN classes ON (classes.proffy_id = proffys.id);
      `);
    const proffys = proffysUnhandled.map((proffy) => ({
      ...proffy,
      subject: getSubject(proffy.subject),
    }));
    return res.render('study.html', { proffys, filters, subjects, weekdays });
  }

  const time = convertHoursToMin(filters.time);

  const query = `
    SELECT classes.*, proffys.*
    FROM proffys
    JOIN classes ON (classes.proffy_id = proffys.id)
    WHERE EXISTS (
      SELECT class_schedules.*
      FROM class_schedules
      WHERE class_schedules.class_id = classes.id
      AND class_schedules.weekday = ${filters.weekday}
      AND class_schedules.time_from <= ${time}
      AND class_schedules.time_to > ${time}
    )
    AND classes.subject = ${filters.subject}
  `;

  try {
    const proffysUnhandled = await db.all(query);
    const proffys = proffysUnhandled.map((proffy) => ({
      ...proffy,
      subject: getSubject(proffy.subject),
    }));
    return res.render('study.html', { proffys, filters, subjects, weekdays });
  } catch (error) {
    return res.render('study.html', { filters, subjects, weekdays });
  }
}
function pageGiveClasses(req, res) {
  return res.render('give-classes.html', { weekdays, subjects });
}

async function saveClasses(req, res) {
  const newProffy = req.body;
  const db = await Database;
  const {
    name,
    avatar,
    whatsapp,
    bio,
    subject,
    cost,
    weekday,
    time_from,
    time_to,
  } = newProffy;

  const createProffy = require('./database/createProffy');

  const proffy = { name, avatar, whatsapp, bio };

  const classObj = { subject, cost };

  const classSchedules = weekday.map((value, index) => ({
    weekday: value,
    time_from: convertHoursToMin(time_from[index]),
    time_to: convertHoursToMin(time_to[index]),
  }));

  await createProffy(db, { proffy, classObj, classSchedules });

  let successScreen = `/success?subject=${subject}&weekday=${weekday[0]}&time=${time_from[0]}`;

  return res.redirect(successScreen);
}

async function successWaitingScreen(req, res) {
  return res.render(`success.html`);
}
module.exports = {
  pageLanding,
  pageStudy,
  pageGiveClasses,
  saveClasses,
  successWaitingScreen,
};
