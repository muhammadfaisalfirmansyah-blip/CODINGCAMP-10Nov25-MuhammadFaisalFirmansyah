let listData = [];
let editIndex = null;

const inputName = document.getElementById("inputName");
const inputDate = document.getElementById("inputDate");
const btnAdd = document.getElementById("btnAdd");
const tableBody = document.getElementById("tableBody");
const filterSelect = document.getElementById("filterSelect");

btnAdd.addEventListener("click", () => {
  const name = inputName.value.trim();
  const date = inputDate.value;

  if (!name || !date) {
    alert("Isi semua kolom terlebih dahulu!");
    return;
  }

  if (editIndex !== null) {
    listData[editIndex] = { name, date };
    editIndex = null;
  } else {
    listData.push({ name, date });
  }

  inputName.value = "";
  inputDate.value = "";
  renderTable();
});

filterSelect.addEventListener("change", () => {
  renderTable();
});

function renderTable() {
  tableBody.innerHTML = "";

  const today = new Date();
  const selectedFilter = filterSelect.value;

  listData.forEach((item, index) => {
    const itemDate = new Date(item.date);
    let showItem = true;

    if (selectedFilter === "today") {
      showItem =
        itemDate.getDate() === today.getDate() &&
        itemDate.getMonth() === today.getMonth() &&
        itemDate.getFullYear() === today.getFullYear();
    } else if (selectedFilter === "upcoming") {
      showItem = itemDate > today;
    }

    if (showItem) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td>${formatDate(item.date)}</td>
        <td>
          <button class="btn btn-edit btn-sm me-1" onclick="editItem(${index})">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteItem(${index})">Hapus</button>
        </td>
      `;
      tableBody.appendChild(row);
    }
  });
}

function editItem(index) {
  inputName.value = listData[index].name;
  inputDate.value = listData[index].date;
  editIndex = index;
}

function deleteItem(index) {
  if (confirm("Yakin ingin menghapus list ini?")) {
    listData.splice(index, 1);
    renderTable();
  }
}

function resetList() {
  if (confirm("Yakin mau reset semua daftar tugas?")) {
    listData = [];
    editIndex = null;
    inputName.value = "";
    inputDate.value = "";
    renderTable();
    alert("Daftar tugas berhasil di-reset!");
  }
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}
