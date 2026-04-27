async function loadSettings() {
  const result = await api("/api/settings");
  const settings = result.settings;


  const form = document.getElementById("settings-form");
  form.elements.displayName.value = settings.displayName;
  form.elements.theme.value = settings.theme;
  form.elements.statusMessage.value = settings.statusMessage;
  form.elements.emailOptIn.checked = Boolean(settings.emailOptIn);
  
  
  const statusPreview = document.getElementById("status-preview");
  statusPreview.textContent = "";

  const nameParagraph = document.createElement("p");
  const strongName = document.createElement("strong");
  strongName.textContent = settings.displayName;
  nameParagraph.appendChild(strongName);

  const statusMessageParagraph = document.createElement("p");
  statusMessageParagraph.textContent = settings.statusMessage;

  statusPreview.appendChild(nameParagraph);
  statusPreview.appendChild(statusMessageParagraph);

  writeJson("settings-output", settings);
}

(async function bootstrapSettings() {
  try {
    const user = await loadCurrentUser();

    if (!user) {
      writeJson("settings-output", { error: "Please log in first." });
      return;
    }

    await loadSettings();
  } catch (error) {
    writeJson("settings-output", { error: error.message });
  }
})();


document.getElementById("settings-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const payload = {
    displayName: formData.get("displayName"),
    theme: formData.get("theme"),
    statusMessage: formData.get("statusMessage"),
    emailOptIn: formData.get("emailOptIn") === "on"
  };

  const result = await api("/api/settings", {
    method: "POST",
    body: JSON.stringify(payload)
  });

  writeJson("settings-output", result);
  await loadSettings();
});

document.getElementById("enable-email").addEventListener("click", async () => {
  const result = await api("/api/settings/toggle-email", {
    method: "POST",
    body: JSON.stringify({ enabled: true })
  });

  writeJson("settings-output", result);
});
document.getElementById("disable-email").addEventListener("click", async () => {
  const result = await api("/api/settings/toggle-email", {
    method: "POST",
    body: JSON.stringify({ enabled: false })
  });
  writeJson("settings-output", result);
});
