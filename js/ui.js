// Shared screen helpers used by every feature file.

// Shows one screen and hides the rest, then updates the header steps.
// screenName is the part after "screen-", e.g. showScreen('summary').
function showScreen(screenName) {
  const target = document.getElementById('screen-' + screenName);
  if (!target) {
    console.error('showScreen: no screen named "' + screenName + '"');
    return;
  }

  document.querySelectorAll('.screen').forEach(function (screen) {
    screen.classList.toggle('active', screen === target);
  });

  updateStepper(Number(target.dataset.step));
  window.scrollTo(0, 0);
}

// Marks earlier steps as done and highlights the current step.
function updateStepper(currentStep) {
  document.querySelectorAll('#stepper li').forEach(function (item) {
    const step = Number(item.dataset.step);
    item.classList.toggle('done', step < currentStep);
    item.classList.toggle('current', step === currentStep);
    // Screen readers announce which step is the current one
    if (step === currentStep) item.setAttribute('aria-current', 'step');
    else item.removeAttribute('aria-current');
  });
}

let toastTimer = null;

// Shows a short feedback message at the bottom of the screen.
// type: 'success' (default) or 'error'.
function showToast(message, type) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = 'toast show ' + (type === 'error' ? 'toast-error' : 'toast-success');

  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () {
    toast.classList.remove('show');
  }, 2500);
}
