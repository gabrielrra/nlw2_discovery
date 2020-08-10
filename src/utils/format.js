const subjects = [
  'Artes',
  'Biologia',
  'Ciências',
  'Educação Física',
  'Física',
  'Geografia',
  'História',
  'Matemática',
  'Português',
  'Química',
];
const weekdays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];

function getSubject(subjectNumber) {
  return subjects[subjectNumber];
}

function convertHoursToMin(time) {
  const [hour, minutes] = time.split(':');
  return Number.parseInt(hour) * 60 + Number.parseInt(minutes);
}

module.exports = {
  subjects,
  weekdays,
  getSubject,
  convertHoursToMin,
};
