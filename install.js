let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  
  // Show install button
  const installBtn = document.createElement('button');
  installBtn.classList.add('install-button');
  installBtn.textContent = 'تثبيت التطبيق';
  document.body.appendChild(installBtn);
  
  installBtn.addEventListener('click', async () => {
    // Hide install button
    installBtn.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    // Clear the deferredPrompt
    deferredPrompt = null;
  });
});

// Track successful installations
window.addEventListener('appinstalled', (evt) => {
  console.log('Application was successfully installed');
});