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
  let idx = 1;
  activities.forEach((activity, index) => {
    const activityData = [
      index + 1,
      activity.name,
      activity.project,
      activity.date,
      (parseInt(activity.time/60)).toString() + "h " + (parseInt(activity.time%60)).toString() + "m",
    ];
    tableRows.push(activityData);
  });

  // define the columns we want and their titles
  const tableColumnSelfDev = ["Nr. Crt", "Activitate", "Proiect", "Data", "Durata"];
  // define an empty array of rows
  const tableRowsSelfDev = [];

  // for each ticket pass all its data into an array
  idx = 1;
  personalDevelopment.forEach((activity, index) => {
    const devData = [
      index + 1,
      activity.name,
      activity.project,
      activity.date,
      (parseInt(activity.time/60)).toString() + "h " + (parseInt(activity.time%60)).toString() + "m", 
    ];
    tableRowsSelfDev.push(devData);
  });


  doc.addImage(antet, "PNG", 17, 10, 175, 23);
  doc.text("Raport de activitate", 80, 45);
  doc.text("Nr. ______/_______", 80, 53);
  doc.setFontSize(12);
  // startY is basically margin-top
  if (tableRows.length > 0) {
    doc.text("Activitati aferente postului", 15, 68);
    doc.autoTable(tableColumn, tableRows, { startY: 70, theme: 'plain', headStyles: {
      fillColor: "#000000",
      textColor: 'white',
      fontSize: 12
    } });
  }

  let textY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 9 : 68;

  if (tableRowsSelfDev.length > 0) {
    doc.text("Implicare in dezvoltarea personala", 15, textY);
    doc.autoTable(tableColumnSelfDev, tableRowsSelfDev, {startY: textY + 2, theme: 'plain', headStyles: {
      fillColor: "#00000",
      textColor: 'white',
      fontSize: 12,
    } });
  }

  doc.setFontSize(10);
  textY = doc.lastAutoTable.finalY + 10;
  doc.text("Nume si prenume: ", 15, textY);
  textY += 3;
  doc.text("Data: ", 15, textY);
  doc.text("Semnatura: ", 162, textY);


  
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left
  // doc.text("Closed tickets within the last one month.", 14, 15);
  // we define the name of our PDF file.
  doc.save(`report_${dateStr}.pdf`);
};

export default generatePDF;