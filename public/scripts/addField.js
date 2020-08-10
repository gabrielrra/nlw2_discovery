document.querySelector('#add-time').addEventListener('click', cloneAddTime);

function cloneAddTime({ target }) {
  const item = document.querySelector('.schedule-item').cloneNode(true);
  const inputs = item.querySelectorAll('input');
  inputs.forEach((e) => {
    e.value = '';
  });
  document.querySelector('#schedule-items').append(item);
}
