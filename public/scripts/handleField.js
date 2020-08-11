import { deleteSchedule } from './removeField';
document.querySelector('#add-time').addEventListener('click', cloneAddTime);

function cloneAddTime(event) {
  const scheduleItems = document.querySelectorAll('.schedule-item');
  const lastScheduleItem = scheduleItems[scheduleItems.length - 1];

  const newScheduleItem = lastScheduleItem.cloneNode(true);
  const newInputs = newScheduleItem.querySelectorAll('input');
  let ok = true;
  newInputs.forEach((e) => {
    if (e.value === '') {
      ok = false;
      return;
    }
    e.value = '';
  });

  if (!ok) {
    alert('Preencha os dois horários antes de criar um novo');
    return;
  }
  if (lastScheduleItem.querySelector('button')) {
    lastScheduleItem.querySelector('button').remove();
  }
  if (!newScheduleItem.querySelector('button')) {
    createNewButton(newScheduleItem);
  }
  const previousInputs = lastScheduleItem.querySelectorAll('input');
  previousInputs.forEach((input) => input.setAttribute('readonly', true));
  lastScheduleItem.querySelector('select').setAttribute('disabled', true);
  return document.querySelector('#schedule-items').append(newScheduleItem);
}

// function deleteSchedule(event) {
//   document.querySelector('#delete-button').parentElement.remove();
// }

function createNewButton(scheduleItem) {
  var newButton = document.createElement('button');
  newButton.setAttribute('type', 'button');
  newButton.setAttribute('id', 'delete-button');
  var newImg = document.createElement('img');
  newImg.setAttribute('src', '/images/icons/delete2.svg');
  newImg.setAttribute('alt', 'Delete');
  newButton.appendChild(newImg);

  newButton.addEventListener('click', deleteSchedule);

  scheduleItem.appendChild(newButton);

  //   <button type="button" id="delete-button">
  //   <img src="/images/icons/delete2.svg" alt="Delete" />
  // </button>
}
