// App startup. Runs after all other scripts have loaded.
// Each feature file exposes an init function that will be called here
// once that feature is built (e.g. initSelection(), initPayment()).
document.addEventListener('DOMContentLoaded', function () {
  showScreen('selection');
});
