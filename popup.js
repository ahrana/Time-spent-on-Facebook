document.addEventListener('DOMContentLoaded', () => {
  chrome.runtime.sendMessage({ action: "getFacebookTime" }, response => {
    let time = response.facebookTime || 0;
    let seconds = Math.floor((time / 1000) % 60);
    let minutes = Math.floor((time / (1000 * 60)) % 60);
    let hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    document.getElementById('time').textContent = 
      `${hours}h ${minutes}m ${seconds}s`;
  });
});
