// Expend Item Class
class ExpendItem {
  constructor(id, date, title, cost, category) {
    this.id = id;
    this.date = date;
    this.title = title;
    this.cost = cost;
    this.category = category;
  }
}

// Income Item Class
class IncomeItem {
  constructor(id, date, title, cost) {
    this.id = id;
    this.date = date;
    this.title = title;
    this.cost = cost;
  }
}

// UI Class
class UI {
  constructor() {
    // Expend and Income table body
    this.expendItems = document.getElementById("expend-items");
    this.incomeItems = document.getElementById("income-items");
    // Expend inputs
    this.expendDateInput = document.getElementById("expend-date");
    this.expendTitleInput = document.getElementById("expend-title");
    this.expendCostInput = document.getElementById("expend-cost");
    this.expendCategoryInput = document.getElementById("food-category");
    // Income inputs
    this.incomeDateInput = document.getElementById("income-date");
    this.incomeTitleInput = document.getElementById("income-title");
    this.incomeCostInput = document.getElementById("income-cost");
    // Expend and Income submit button
    this.expendSubmitBtn = document.getElementById("expend-item-submit");
    this.incomeSubmitBtn = document.getElementById("income-item-submit");
    // Add Expend and Add Income modal
    this.expendModal = document.getElementById("add-expend-item-modal");
    this.incomeModal = document.getElementById("add-income-item-modal");
  }

  // Add Expend Item
  addExpendToList(expendItem) {
    // Create tr element
    const row = document.createElement("tr");

    // Insert cols
    row.innerHTML = `
        <td>${expendItem.date}</td>
        <td>${expendItem.title}</td>
        <td class="text-end">${parseInt(expendItem.cost).toLocaleString(
          "th-TH"
        )}</td>
        <td class="text-center">${expendItem.category}</td>
        <td class="text-center">
            <a href="#"
            class="edit"
            data-bs-toggle="modal"
            data-bs-target="#add-expend-item-modal"
            data-id="${expendItem.id}"><i class='bx bx-pencil'></i></a>
            <a href="#" class="delete" data-id="${
              expendItem.id
            }"><i class='bx bx-trash'></i></a>
        </td>
      `;

    // Write tr element on the top of expend table body
    this.expendItems.insertBefore(row, this.expendItems.childNodes[0]);
  }

  // Add Income Item
  addIncomeToList(incomeItem) {
    // Create tr element
    const row = document.createElement("tr");

    // Insert cols
    row.innerHTML = `
        <td>${incomeItem.date}</td>
        <td>${incomeItem.title}</td>
        <td class="text-end">${parseInt(incomeItem.cost).toLocaleString(
          "th-TH"
        )}</td>
        <td class="text-center">
            <a href="#"
            class="edit"
            data-bs-toggle="modal"
            data-bs-target="#add-income-item-modal"
            data-id="${incomeItem.id}"><i class='bx bx-pencil'></i></a>
            <a href="#" class="delete" data-id="${
              incomeItem.id
            }"><i class='bx bx-trash'></i></a>
        </td>
      `;

    // Write tr element on the top of income table body
    this.incomeItems.insertBefore(row, this.incomeItems.childNodes[0]);
  }

  // Delete item from list
  deleteItem(target) {
    if (target.classList.contains("delete")) {
      // Delete item from table body
      target.parentElement.parentElement.remove();
    }
  }

  // Clear expend form fields
  clearExpendFields() {
    // Set default date
    this.expendDateInput.value = new Date().toISOString().split("T")[0];
    this.expendTitleInput.value = "";
    this.expendCostInput.value = "";
    // Set to default checked
    this.expendCategoryInput.checked = true;
  }

  // Clear income form fields
  clearIncomeFields() {
    // Set default date
    this.incomeDateInput.value = new Date().toISOString().split("T")[0];
    this.incomeTitleInput.value = "";
    this.incomeCostInput.value = "";
  }

  // Change expend form to edit
  changeExpendForm(type, id) {
    if (type === "edit") {
      this.expendSubmitBtn.textContent = "Edit";

      this.expendSubmitBtn.className = "btn btn-warning";

      let dataAtt = document.createAttribute("data-id");

      dataAtt.value = id;

      this.expendSubmitBtn.setAttributeNode(dataAtt);
    } else {
      this.expendSubmitBtn.textContent = "Add";

      this.expendSubmitBtn.className = "btn btn-primary";

      let dataAtt = document.createAttribute("data-id");

      dataAtt.value = id;

      this.expendSubmitBtn.setAttributeNode(dataAtt);
    }
  }

  // Change income form to edit
  changeIncomeForm(type, id) {
    if (type === "edit") {
      this.incomeSubmitBtn.textContent = "Edit";

      this.incomeSubmitBtn.className = "btn btn-warning";

      let dataAtt = document.createAttribute("data-id");

      dataAtt.value = id;

      this.incomeSubmitBtn.setAttributeNode(dataAtt);
    } else {
      this.incomeSubmitBtn.textContent = "Add";

      this.incomeSubmitBtn.className = "btn btn-primary";

      let dataAtt = document.createAttribute("data-id");

      dataAtt.value = id;

      this.incomeSubmitBtn.setAttributeNode(dataAtt);
    }
  }

  // Fill data to expend form fields
  fillExpendForm(item) {
    // Change to edit form
    this.changeExpendForm("edit", item.id);

    // Set edit item value to expend form
    this.expendDateInput.value = item.date;
    this.expendTitleInput.value = item.title;
    this.expendCostInput.value = item.cost.split(",").join("");

    document.querySelectorAll('input[name="category"]').forEach((category) => {
      if (category.value === item.category) {
        category.checked = true;
      }
    });
  }

  // Fill data to income form fields
  fillIncomeForm(item) {
    // Change to edit form
    this.changeIncomeForm("edit", item.id);

    // Set edit item value to income form
    this.incomeDateInput.value = item.date;
    this.incomeTitleInput.value = item.title;
    this.incomeCostInput.value = item.cost.split(",").join("");
  }

  // Clear expend table
  clearExpendTable() {
    while (this.expendItems.firstChild) {
      this.expendItems.removeChild(this.expendItems.firstChild);
    }
  }

  // Clear income table
  clearIncomeTable() {
    while (this.incomeItems.firstChild) {
      this.incomeItems.removeChild(this.incomeItems.firstChild);
    }
  }

  // Close expend modal
  closeExpendModal() {
    const expendModal = bootstrap.Modal.getInstance(this.expendModal);

    expendModal.hide();
  }

  // Close income modal
  closeIncomeModal() {
    const incomeModal = bootstrap.Modal.getInstance(this.incomeModal);

    incomeModal.hide();
  }
}

// Local Storage Class
class Store {
  static getExpendItems() {
    let expendItems;

    if (localStorage.getItem("expendItems") === null) {
      expendItems = [];
    } else {
      expendItems = JSON.parse(localStorage.getItem("expendItems"));
    }

    return expendItems;
  }

  static getIncomeItems() {
    let incomeItems;

    if (localStorage.getItem("incomeItems") === null) {
      incomeItems = [];
    } else {
      incomeItems = JSON.parse(localStorage.getItem("incomeItems"));
    }

    return incomeItems;
  }

  static displayExpendItems() {
    // Get expend items from local storage
    const expendItems = Store.getExpendItems();

    // Filter expend items in month selected
    let expendItemsMonth = Store.filterMonth(expendItems);

    // Ascending sort expend items by date
    expendItemsMonth.sort(function (a, b) {
      return new Date(a.date) - new Date(b.date);
    });

    expendItemsMonth.forEach(function (expendItem) {
      const ui = new UI();

      // Add expend items to UI
      ui.addExpendToList(expendItem);
    });
  }

  static displayIncomeItems() {
    // Get income items from local storage
    const incomeItems = Store.getIncomeItems();

    // Filter income items in month selected
    let incomeItemsMonth = Store.filterMonth(incomeItems);

    // Ascending sort income items by date
    incomeItemsMonth.sort(function (a, b) {
      return new Date(a.date) - new Date(b.date);
    });

    incomeItemsMonth.forEach(function (incomeItems) {
      const ui = new UI();

      // Add income items to UI
      ui.addIncomeToList(incomeItems);
    });
  }

  static addExpendItem(expendItem) {
    // Get expend items from local storage
    const expendItems = Store.getExpendItems();

    expendItems.push(expendItem);

    localStorage.setItem("expendItems", JSON.stringify(expendItems));
  }

  static addIncomeItem(incomeItem) {
    // Get income items from local storage
    const incomeItems = Store.getIncomeItems();

    incomeItems.push(incomeItem);

    localStorage.setItem("incomeItems", JSON.stringify(incomeItems));
  }

  static updateExpendItem(updatedItem) {
    // Get expend items from local storage
    const expendItems = Store.getExpendItems();

    expendItems.forEach(function (expendItem, index) {
      if (expendItem.id == updatedItem.id) {
        expendItems[index] = updatedItem;
      }
    });

    localStorage.setItem("expendItems", JSON.stringify(expendItems));
  }

  static updateIncomeItem(updatedItem) {
    // Get income items from local storage
    const incomeItems = Store.getIncomeItems();

    incomeItems.forEach(function (incomeItem, index) {
      if (incomeItem.id == updatedItem.id) {
        incomeItems[index] = updatedItem;
      }
    });

    localStorage.setItem("incomeItems", JSON.stringify(incomeItems));
  }

  static deleteExpendItem(id) {
    // Get expend items from local storage
    const expendItems = Store.getExpendItems();

    expendItems.forEach(function (expendItem, index) {
      if (expendItem.id == id) {
        expendItems.splice(index, 1);
      }
    });

    localStorage.setItem("expendItems", JSON.stringify(expendItems));
  }

  static deleteIncomeItem(id) {
    // Get income items from local storage
    const incomeItems = Store.getIncomeItems();

    incomeItems.forEach(function (incomeItem, index) {
      if (incomeItem.id == id) {
        incomeItems.splice(index, 1);
      }
    });

    localStorage.setItem("incomeItems", JSON.stringify(incomeItems));
  }

  // Filter items with month select value
  static filterMonth(items) {
    const month = document.getElementById("month-select").value;

    return items.filter((item) => item.date.split("-")[1] == month);
  }

  // Write JSON data to sheet (xlsx)
  static writeToSheet(expend, income) {
    const month = document.getElementById("month-select").value;

    const worksheetExpend = XLSX.utils.json_to_sheet(expend);

    const worksheetIncome = XLSX.utils.json_to_sheet(income);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheetExpend, `Expend-${month}`);

    XLSX.utils.book_append_sheet(workbook, worksheetIncome, `Income-${month}`);

    let workbookOut = XLSX.write(workbook, {
      bookType: "xlsx",
      bookSST: false,
      type: "array",
    });

    saveAs(
      new Blob([workbookOut], { type: "application/octet-stream" }),
      `Expend-Income-${month}.xlsx`
    );
  }

  static exportData() {
    // Get expend items from local storage
    const expendItems = Store.getExpendItems();

    // Filter expend items in month selected
    let expendItemsMonth = Store.filterMonth(expendItems);

    expendItemsMonth.sort(function (a, b) {
      return new Date(a.date) - new Date(b.date);
    });

    // Get income items from local storage
    const incomeItems = Store.getIncomeItems();

    // Filter income items in month selected
    let incomeItemsMonth = Store.filterMonth(incomeItems);

    incomeItemsMonth.sort(function (a, b) {
      return new Date(a.date) - new Date(b.date);
    });

    // Export json to sheet
    Store.writeToSheet(expendItemsMonth, incomeItemsMonth);
  }
}

// Show cards class
class DrawCard {
  // Counter Up Summary Number
  counterUp() {
    let cardDatas = []; // [expendDay, expendMonth, expendYear, incomeYear]

    // Get expend items from local storage
    const expendItems = Store.getExpendItems();

    // Sum expend cost in a days
    cardDatas.push(
      expendItems
        .filter((item) => {
          return item.date.split("-")[2] == new Date().getDate();
        })
        .reduce((sum, item) => {
          return sum + parseInt(item.cost);
        }, 0)
    );

    // Sum expend cost in month
    cardDatas.push(
      expendItems
        .filter((item) => {
          return item.date.split("-")[1] == new Date().getMonth() + 1;
        })
        .reduce((sum, item) => {
          return sum + parseInt(item.cost);
        }, 0)
    );

    // Sum expend cost in year
    cardDatas.push(
      expendItems
        .filter((item) => {
          return item.date.split("-")[0] == new Date().getFullYear();
        })
        .reduce((sum, item) => {
          return sum + parseInt(item.cost);
        }, 0)
    );

    // Get income items from local storage
    const incomeItems = Store.getIncomeItems();

    // Sum income cost in year
    cardDatas.push(
      incomeItems
        .filter((item) => {
          return item.date.split("-")[0] == new Date().getFullYear();
        })
        .reduce((sum, item) => {
          return sum + parseInt(item.cost);
        }, 0)
    );

    const counterTexts = document.querySelectorAll(".counter");
    if (cardDatas !== undefined && cardDatas.length !== 0) {
      counterTexts.forEach(function (textEle, index) {
        new CountUp(textEle, 0, cardDatas[index]).start();
      });
    }
  }
}

// Show chart class
class DrawChart {
  constructor() {
    this.chartDays = document.getElementById("chart-days-body");
    this.chartCategory = document.getElementById("chart-categories-body");
  }
  // Get days in month
  static daysInMonth() {
    const month = document.getElementById("month-select").value;

    const year = new Date().getFullYear();

    // Get last day in month
    const lastDayInMonth = new Date(year, Number(month), 0).getDate();

    // Set days in month to [1,2,3,...,last day]
    const daysInMonthArr = [...Array(lastDayInMonth).keys()].map((i) =>
      (i + 1).toString()
    );

    return daysInMonthArr.map((day) => {
      if (day.length !== 2) {
        return "0" + day;
      } else {
        return day;
      }
    });
  }

  // Draw Bar Chart
  drawBarChart() {
    // Get expend items from local storage
    const expendItems = Store.getExpendItems();

    // Filter expend items in month selected
    const expendItemsMonth = Store.filterMonth(expendItems);

    // Set expend items to data for bar chart
    let dataBarChart = [];

    DrawChart.daysInMonth().forEach((day) => {
      // Sum cost in a days
      dataBarChart.push(
        expendItemsMonth
          .filter((item) => {
            return item.date.split("-")[2] == day;
          })
          .reduce((sum, item) => {
            return sum + parseInt(item.cost);
          }, 0)
      );
    });

    // Draw bar chart
    const chartDays = document.getElementById("chart-days");
    let ctx = chartDays.getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: DrawChart.daysInMonth(),
        datasets: [
          {
            label: "💸",
            data: dataBarChart,
            backgroundColor: "rgba(54, 162, 235, 1)",
          },
        ],
      },
      options: {
        defaultFontSize: 14,
        defaultFontFamily: "Mitr",
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                max: Math.max(...dataBarChart) + 100,
                stepSize: 100,
                display: false,
              },
              gridLines: {
                display: true,
                drawBorder: false,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
        },
        legend: {
          display: false,
        },
        animation: {
          duration: 2000,
        },
        maintainAspectRatio: false,
        tooltips: false,
        plugins: {
          labels: {
            render: "value",
          },
        },
      },
    });
  }

  // Draw Doughnut Chart
  drawDoughnutChart() {
    // Get expend items from local sotrage
    const categorys = ["🍔", "🍻", "🏠", "🛒", "🚗", "❓"];

    // Get expend items from local storage
    const expendItems = Store.getExpendItems();

    // Filter expend items in month selected
    const expendItemsMonth = Store.filterMonth(expendItems);

    // Set expend items to data for doughnut chart
    let dataDoughnutChart = [];

    categorys.forEach((category) => {
      // Sum cost in a category
      dataDoughnutChart.push(
        expendItemsMonth
          .filter((item) => {
            return item.category == category;
          })
          .reduce((sum, item) => {
            return sum + parseInt(item.cost);
          }, 0)
      );
    });

    // Draw doughnut chart
    const chartCategories = document.getElementById("chart-categories");
    let ctx = chartCategories.getContext("2d");
    new Chart(ctx, {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: dataDoughnutChart,
            backgroundColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
          },
        ],

        labels: categorys,
      },
      options: {
        defaultFontSize: 14,
        defaultFontFamily: "Mitr",
        legend: {
          labels: {
            fontSize: 16,
          },
        },
        animation: {
          duration: 2000,
        },
        maintainAspectRatio: false,
        plugins: {
          labels: { render: "percentage", fontColor: "white" },
        },
      },
    });
  }

  // Reset existing bar chart
  clearBarChart() {
    while (this.chartDays.firstChild) {
      this.chartDays.removeChild(this.chartDays.firstChild);
    }

    let canvas = document.createElement("canvas");
    canvas.id = "chart-days";
    canvas.height = 350;

    this.chartDays.appendChild(canvas);
  }

  // Reset existing doughnut chart
  clearDoughnutChart() {
    while (this.chartCategory.firstChild) {
      this.chartCategory.removeChild(this.chartCategory.firstChild);
    }

    let canvas = document.createElement("canvas");
    canvas.id = "chart-categories";
    canvas.width = 100;
    canvas.height = 350;

    this.chartCategory.appendChild(canvas);
  }
}

// DOM load event
document.addEventListener(
  "DOMContentLoader",
  (function () {
    // Set defalut date
    const date = new Date();
    const today = date.toISOString().split("T")[0];
    const month = date.toISOString().split("T")[0].split("-")[1];

    // Set date in expend modal to today
    document.getElementById("expend-date").value = today;

    // Set date in income modal to today
    document.getElementById("income-date").value = today;

    // Set month select to this month
    document.getElementById("month-select").value = month;

    // Instantiate DrawCard
    const card = new DrawCard();

    // Show cards value
    card.counterUp();

    // Instantiate DrawChart
    const chart = new DrawChart();
    // Show bar chart
    chart.drawBarChart();

    // Show doughnut chart
    chart.drawDoughnutChart();

    // Show expend items in expend table
    Store.displayExpendItems();

    // Show income items in income table
    Store.displayIncomeItems();
  })()
);

// Event listener for month selected change
document.getElementById("month-select").addEventListener("change", function () {
  // Instantiate UI
  const ui = new UI();

  // Instantiate DrawChart
  const chart = new DrawChart();

  // Reset existing bar chart
  chart.clearBarChart();

  // Draw bar chart
  chart.drawBarChart();

  // Reset existing doughnut chart
  chart.clearDoughnutChart();

  // Show doughnut chart
  chart.drawDoughnutChart();

  // Reset expend table
  ui.clearExpendTable();

  // Show expend items in expend table
  Store.displayExpendItems();

  // Reset income table
  ui.clearIncomeTable();

  // Show income items in income table
  Store.displayIncomeItems();
});

// Event listener for add or update expend item
document
  .getElementById("expend-item-submit")
  .addEventListener("click", function (e) {
    // Instantiate UI
    const ui = new UI();

    // Instantiate DrawChart
    const chart = new DrawChart();

    // Instantiate DrawCard
    const card = new DrawCard();

    // Add new expend item
    if (e.target.dataset.id === "") {
      // Get form values
      const date = document.getElementById("expend-date").value;
      const title = document.getElementById("expend-title").value;
      const cost = document.getElementById("expend-cost").value;
      const category = document.querySelector('input[name="category"]:checked')
        .value;

      // Get time stamp for id
      const id = new Date().getTime();

      // Indtantiate Expend Item
      const expendItem = new ExpendItem(id, date, title, cost, category);

      // Validate
      if (title === "" || cost === "" || category === "") {
        // Error aleart
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please fill in all fields",
        });
      } else {
        // Add expend item to local storage
        Store.addExpendItem(expendItem);

        // Reset expend table
        ui.clearExpendTable();

        // Show expend items in expend table
        Store.displayExpendItems();

        // Show cards value
        card.counterUp();

        // Reset existing bar chart
        chart.clearBarChart();

        // Draw bar chart
        chart.drawBarChart();

        // Reset existing doughnut chart
        chart.clearDoughnutChart();

        // Show doughnut chart
        chart.drawDoughnutChart();

        // Complete aleart
        Swal.fire({
          icon: "success",
          title: "Your expend item has been saved",
          showConfirmButton: false,
          timer: 1500,
        });

        // Clear fields
        ui.clearExpendFields();

        // Close modal
        ui.closeExpendModal();
      }
    }
    // Update expend item
    else {
      // Get form values
      const date = document.getElementById("expend-date").value;
      const title = document.getElementById("expend-title").value;
      const cost = document.getElementById("expend-cost").value;
      const category = document.querySelector('input[name="category"]:checked')
        .value;

      // Get expend edit item id
      const id = parseInt(e.target.dataset.id);

      // Instantiate Expend Item
      const expendItem = new ExpendItem(id, date, title, cost, category);

      // Validate
      if (title === "" || cost === "" || category === "") {
        // Error aleart
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please fill in all fields",
        });
      } else {
        // Add updte expend item to local storage
        Store.updateExpendItem(expendItem);

        // Reset expend table
        ui.clearExpendTable();

        // Show expend items in expend table
        Store.displayExpendItems();

        // Show cards value
        card.counterUp();

        // Reset existing bar chart
        chart.clearBarChart();

        // Draw bar chart
        chart.drawBarChart();

        // Reset existing doughnut chart
        chart.clearDoughnutChart();

        // Show doughnut chart
        chart.drawDoughnutChart();

        // Clear fields
        ui.clearExpendFields();

        // Change modal state
        ui.changeExpendForm("add", "");

        // Close modal
        ui.closeExpendModal();

        // Complete aleart
        Swal.fire({
          icon: "success",
          title: "Your update expend item has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }

    e.preventDefault();
  });

// Event listener for add or update income item
document
  .getElementById("income-item-submit")
  .addEventListener("click", function (e) {
    // Instantiate UI
    const ui = new UI();

    // Instantiate DrawCard
    const card = new DrawCard();

    // Add new expend item
    if (e.target.dataset.id === "") {
      // Get form values
      const date = document.getElementById("income-date").value;
      const title = document.getElementById("income-title").value;
      const cost = document.getElementById("income-cost").value;

      // Get time stamp for id
      const id = new Date().getTime();

      // Indtantiate Income Item
      const incomeItem = new IncomeItem(id, date, title, cost);

      // Validate
      if (title === "" || cost === "") {
        // Error aleart
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please fill in all fields",
        });
      } else {
        // Add income item to local storage
        Store.addIncomeItem(incomeItem);

        // Reset income table
        ui.clearIncomeTable();

        // Show income items in income table
        Store.displayIncomeItems();

        // Show cards value
        card.counterUp();

        // Complete aleart
        Swal.fire({
          icon: "success",
          title: "Your income item has been saved",
          showConfirmButton: false,
          timer: 1500,
        });

        // Clear fields
        ui.clearIncomeFields();

        // Close modal
        ui.closeIncomeModal();
      }
    }
    // Update income item
    else {
      // Get form values
      const date = document.getElementById("income-date").value;
      const title = document.getElementById("income-title").value;
      const cost = document.getElementById("income-cost").value;

      // Get income edit item id
      const id = parseInt(e.target.dataset.id);

      // Instantiate income item
      const incomeItem = new IncomeItem(id, date, title, cost);

      // Validate
      if (title === "" || cost === "") {
        // Error aleart
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please fill in all fields",
        });
      } else {
        // Add updte income item to local storage
        Store.updateIncomeItem(incomeItem);

        // Reset income table
        ui.clearIncomeTable();

        // Show income items in income table
        Store.displayIncomeItems();

        // Show cards value
        card.counterUp();

        // Clear fields
        ui.clearIncomeFields();

        // Change modal state
        ui.changeIncomeForm("add", "");

        // Close modal
        ui.closeIncomeModal();

        // Complete aleart
        Swal.fire({
          icon: "success",
          title: "Your update income item has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }

    e.preventDefault();
  });

// Event listener for expend item delete
document.getElementById("expend-items").addEventListener("click", function (e) {
  // Instantiate UI
  const ui = new UI();

  // Instantiate DrawChart
  const chart = new DrawChart();

  // Instantiate DrawCard
  const card = new DrawCard();

  if (e.target.classList.contains("delete")) {
    // Confirm alert
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Delete expend item from list
        ui.deleteItem(e.target);

        // Delete expend item from local storage
        Store.deleteExpendItem(e.target.dataset.id);

        // Show cards value
        card.counterUp();

        // Reset existing bar chart
        chart.clearBarChart();

        // Draw bar chart
        chart.drawBarChart();

        // Reset existing doughnut chart
        chart.clearDoughnutChart();

        // Show doughnut chart
        chart.drawDoughnutChart();

        Swal.fire({
          icon: "success",
          title: "Deleted!, Your expend has been deleted.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }

  e.preventDefault();
});

// Event listener for income item delete
document.getElementById("income-items").addEventListener("click", function (e) {
  // Instantiate UI
  const ui = new UI();

  // Instantiate DrawCard
  const card = new DrawCard();

  if (e.target.classList.contains("delete")) {
    // Confirm alert
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Delete income item from list
        ui.deleteItem(e.target);

        // Delete income item from local storage
        Store.deleteIncomeItem(e.target.dataset.id);

        // Show cards value
        card.counterUp();

        Swal.fire({
          icon: "success",
          title: "Deleted!, Your income has been deleted.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }

  e.preventDefault();
});

// Event listener for expend item edit
document.getElementById("expend-items").addEventListener("click", function (e) {
  // Instantiate UI
  const ui = new UI();

  if (e.target.classList.contains("edit")) {
    const id = e.target.dataset.id;
    const date =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .previousElementSibling.previousElementSibling.textContent;
    const title =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .previousElementSibling.textContent;
    const cost =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent;
    const category = e.target.parentElement.previousElementSibling.textContent;

    const item = {
      id,
      date,
      title,
      cost,
      category,
    };

    ui.fillExpendForm(item);
  }
});

// Event listener for income item edit
document.getElementById("income-items").addEventListener("click", function (e) {
  // Instantiate UI
  const ui = new UI();

  if (e.target.classList.contains("edit")) {
    const id = e.target.dataset.id;
    const date =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .previousElementSibling.textContent;
    const title =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent;
    const cost = e.target.parentElement.previousElementSibling.textContent;

    const item = {
      id,
      date,
      title,
      cost,
    };

    ui.fillIncomeForm(item);
  }
});

// Event listener for expend modal cancel
document.getElementById("expend-item-cancel").addEventListener("click", function () {
  // Instantiate UI
  const ui = new UI();

  // Clear fields
  ui.clearExpendFields();

  // Change expend form state
  ui.changeExpendForm("add", "");
});

// Event listener for income modal cancel
document.getElementById("income-item-cancel").addEventListener("click", function () {
  // Instantiate UI
  const ui = new UI();

  // Clear fields
  ui.clearIncomeFields();

  // Change expend form state
  ui.changeIncomeForm("add", "");
});

// Event listener for export button
document.getElementById("export").addEventListener("click", function () {
  Store.exportData();
});
