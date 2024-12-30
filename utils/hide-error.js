
document.addEventListener('DOMContentLoaded', function() {
  const alerts = document.querySelectorAll('.alert');
  alerts.forEach(alert => {
    setTimeout(() => {
      alert.style.display = 'none'; // Скриване на елемента след 5 секунди
    }, 5000);
  });
});
