//TODO: adaptare generator la datele din PHP
import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
import { format } from "date-fns";
import antet from '../img/src_img_antet.png';

// define a generatePDF function that accepts a tickets argument
const generatePDF = (activities, personalDevelopment) => {
  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = ["Nr. Crt", "Activitate", "Proiect", "Data", "Durata"];
  // define an empty array of rows
  const tableRows = [];

  // for each ticket pass all its data into an array
  activities.forEach((activity, index) => {
    const activityData = [
      index + 1,
      activity.title,
      activity.project,
      activity.date,
      activity.time,
    ];
    tableRows.push(activityData);
  });

  // define the columns we want and their titles
  const tableColumnSelfDev = ["Nr. Crt", "Activitate", "Proiect", "Data", "Durata"];
  // define an empty array of rows
  const tableRowsSelfDev = [];

  // for each ticket pass all its data into an array
  personalDevelopment.forEach((activity, index) => {
    const devData = [
      index + 1,
      activity.title,
      activity.project,
      activity.date,
      activity.time,
    ];
    tableRowsSelfDev.push(devData);
  });


  doc.addImage(antet, "PNG", 20, 10, 175, 23);
  doc.text("Raport de activitate", 80, 45);
  doc.text("Nr. ______/_______", 80, 53);
  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 65, theme: 'plain', headStyles: {
    fillColor: "#000000",
    textColor: 'white',
    fontSize: 12
  } });

  doc.autoTable(tableColumnSelfDev, tableRowsSelfDev, {theme: 'plain', headStyles: {
    fillColor: "#00000",
    textColor: 'white',
    fontSize: 12,
  } });
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left
  // doc.text("Closed tickets within the last one month.", 14, 15);
  // we define the name of our PDF file.
  doc.save(`report_${dateStr}.pdf`);
};

export default generatePDF;