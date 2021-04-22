// Webfont Loader
WebFont.load({
  google: {
    families: [
       'Lato'
    ]
  }
});



// Select elements from DOM
const currentYearEl = document.querySelector("#currentYear");
const lastUpdatedEl = document.querySelector("#lastUpdated span");

// Find current year
const now = new Date();
const currentYear = now.getFullYear();

// Update DOM element
currentYearEl.textContent = currentYear.toString();

// Find Last Update Time
const lastUpdate = new Date(document.lastModified);
const formattedlastUpdate = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "short",
  timeStyle: "medium",
}).format(lastUpdate);

// Update DOM element
lastUpdatedEl.textContent = formattedlastUpdate;
