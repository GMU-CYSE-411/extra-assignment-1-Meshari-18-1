function getCsrfToken() {
  const tokenElement = document.querySelector('meta[name="csrf-token"]');
  return tokenElement ? tokenElement.content : "";
}
async function api(path, options = {}) {
  const response = await fetch(path, {
    headers: {
      "Content-Type": "application/json",
      "x-csrf-token": getCsrfToken(),
      ...(options.headers || {})
    },

    credentials: "same-origin",
    ...options
  });

  const isJson = (response.headers.get("content-type") || "").includes("application/json");
  const body = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message = typeof body === "object" && body && body.error ? body.error : response.statusText;
    throw new Error(message);
  }

  return body;
}

async function loadCurrentUser() {
  const data = await api("/api/me");
  return data.user;
}

function writeJson(elementId, value) {
  const target = document.getElementById(elementId);

  if (target) {
    target.textContent = JSON.stringify(value, null, 2);
  }
}
