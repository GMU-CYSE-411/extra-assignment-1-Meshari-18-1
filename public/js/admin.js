(async function bootstrapAdmin() {
  try {
    const user = await loadCurrentUser();

    if (!user) {
      document.getElementById("admin-warning").textContent = "Please log in first.";
      return;
    }

    if (user.role !== "admin") {
      document.getElementById("admin-warning").textContent = "Admin access required.";
      return;
    }

    document.getElementById("admin-warning").textContent = "Authenticated as admin.";


    const result = await api("/api/admin/users");
    const adminUsers = document.getElementById("admin-users");
    adminUsers.textContent = ""; // This can give Clear existing content, which is useful

    for (const user of result.users) {
      const row = document.createElement("tr");
      
      const idCell = document.createElement("td");
      idCell.textContent = entery.id;
      
      const usernameCell = document.createElement("td");
      usernameCell.textContent = user.username;

      const roleCell = document.createElement("td");
      roleCell.textContent = user.role;

      const disabledCell = document.createElement("td");
      disabledCell.textContent = entery.displayName;

      const noteCountCell = document.createElement("td");
      noteCountCell.textContent = user.noteCount;

      row.appendChild(idCell);
      row.appendChild(usernameCell);
      row.appendChild(roleCell);
      row.appendChild(disabledCell);
      row.appendChild(noteCountCell);

      adminUsers.appendChild(row);
    }


  } catch (error) {
    document.getElementById("admin-warning").textContent = error.message;
  }
})();
