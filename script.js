const addColumnButton = document.getElementById("addColumn");
const addRowButton = document.getElementById("addRow");
const columnNameInput = document.getElementById("columnName");
const table = document.getElementById("unique-table");

addColumnButton.addEventListener("click", function () {
    //the column name input value stored in coloumnName
  const columnName = columnNameInput.value;

  // if the column name is not empty take the input text and add column with delete column button
  if (columnName) {
    // on the top row Adding a new header cell to the table 
    const headerRow = table.rows[0];
    const newHeaderCell = headerRow.insertCell(-1);
    newHeaderCell.innerHTML =
      columnName +
      ' <button class="btn btn-sm   btn-outline-danger delete-col">X</button>';

    // Adding a new cell to each row
    for (let i = 1; i < table.rows.length; i++) {
      const newCell = table.rows[i].insertCell(-1);
      newCell.innerHTML = '<input type="text">';
    }

    // An event listener to the delete button in the new header cell
    const deleteButton = newHeaderCell.querySelector(".delete-col");
    deleteButton.addEventListener("click", function () {
      // Delete the column
      for (let j = 0; j < table.rows.length; j++) {
        table.rows[j].deleteCell(newHeaderCell.cellIndex);
      }
    });
  }
});

addRowButton.addEventListener("click", function () {
  // Adding a new row to the table
  const newRow = table.insertRow(-1);

  // Adding a new cell to the row
  const newCell = newRow.insertCell(-1);
  newCell.innerHTML =
    '<button class="save btn btn-success">Save</button><button class="delete btn btn-danger">Delete</button>';

  // Adding an input field to each cell in the new row
  for (let i = 1; i < table.rows[0].cells.length; i++) {
    const newCell = newRow.insertCell(-1);
    newCell.innerHTML = '<input type="text">';
  }

  // Adding event listeners to the save and delete buttons in the new row
  const saveButton = newRow.cells[0].querySelector(".save");
  const deleteButton = newRow.cells[0].querySelector(".delete");

  saveButton.addEventListener("click", function () {
    // Save the data in the input fields
    for (let i = 1; i < newRow.cells.length; i++) {
      const input = newRow.cells[i].querySelector("input");
      newRow.cells[i].innerHTML = input.value;
    }

    // Change the save button to an edit button
    saveButton.innerHTML = "Edit";
    saveButton.classList.remove("save");
    saveButton.classList.add("edit");

    // Adding an event listener to the edit button
    saveButton.addEventListener("click", function () {
      // Replace the cell contents with input fields
      for (let i = 1; i < newRow.cells.length; i++) {
        newRow.cells[i].innerHTML =
          '<input type="text" value="' + newRow.cells[i].textContent + '">';
      }

      // Change the edit button back to a save button
      saveButton.innerHTML = "Save";
      saveButton.classList.remove("edit");
      saveButton.classList.add("save");

      // Adding an event listener to the save button
      saveButton.addEventListener("click", function () {
        // Save the data in the input fields
        for (let i = 1; i < newRow.cells.length; i++) {
          const input = newRow.cells[i].querySelector("input");
          newRow.cells[i].innerHTML = input.value;
        }

        // Change the save button back to an edit button
        saveButton.innerHTML = "Edit";
        saveButton.classList.remove("save");
        saveButton.classList.add("edit");
      });
    });
  });

  deleteButton.addEventListener("click", function () {
    // Delete the row
    table.deleteRow(newRow.rowIndex);
  });
});

// Adding event listeners to the delete buttons in the header row
const headerRow = table.rows[0];
for (let i = 0; i < headerRow.cells.length; i++) {
  const deleteButton = headerRow.cells[i].querySelector(".delete");
  deleteButton.addEventListener("click", function () {
    // Delete the column
    for (let j = 0; j < table.rows.length; j++) {
      table.rows[j].deleteCell(i);
    }
  });
}
