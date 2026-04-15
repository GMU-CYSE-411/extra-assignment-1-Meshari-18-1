(function setupFixationHelper() {
  const params = new URLSearchParams(window.location.search);
  const fixedSession = params.get("sid");

  if (fixedSession) {
    document.cookie = `sid=${fixedSession}; path=/`;
  }
})();

document.getElementById("login-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const payload = Object.fromEntries(formData.entries());

  try {
    const result = await api("/api/login", {
      method: "POST",
      body: JSON.stringify(payload)
    });

    writeJson("login-output", result);
  } catch (error) {
    writeJson("login-output", { error: error.message });
  }
});
