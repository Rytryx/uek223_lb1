function openTab(evt, tabName) {
  const tabcontent = document.getElementsByClassName('tabcontent');
  for (let i = 0; i < tabcontent.length; i += 1) {
    tabcontent[i].style.display = 'none';
  }

  const tablinks = document.getElementsByClassName('tablinks');
  for (let i = 0; i < tablinks.length; i += 1) {
    tablinks[i].classList.remove('active');
  }

  document.getElementById(tabName).style.display = 'block';
  evt.currentTarget.classList.add('active');
}

function handleTabClick(evt) {
  const tabName = this.textContent.trim();
  openTab(evt, tabName);
}

document.addEventListener('DOMContentLoaded', () => {
  const tablinks = document.getElementsByClassName('tablinks');

  for (let i = 0; i < tablinks.length; i += 1) {
    tablinks[i].addEventListener('click', handleTabClick);
  }

  // Trigger click on the first tablink by default
  if (tablinks.length > 0) {
    tablinks[0].click();
  }
});
