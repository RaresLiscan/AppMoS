//TODO: adaptare generator la datele din PHP
import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
import antet from '../img/antet.png';

const months = [
  "",
  "Ianuarie",
  "Februarie",
  "Martie",
  "Aprilie",
  "Mai",
  "Iunie",
  "Iulie",
  "August",
  "Septembrie",
  "Octombrie",
  "Noiembrie",
  "Decembrie"
];

// define a generatePDF function that accepts a tickets argument
const generatePDF = (activities, personalDevelopment, name, month) => {
  // initialize jsPDF
  const doc = new jsPDF();
  

  // define the columns we want and their titles
  const tableColumn = ["Nr. Crt", "Activitate", "Proiect", "Data", "Durata"];
  // define an empty array of rows
  const tableRows = [];

  // for each ticket pass all its data into an array
  let idx = 1;
  activities.forEach((activity, index) => {
    if (activity.name.length > 0 && activity.project.length > 0 && parseInt(activity.time) > 0) {
      const activityData = [
        index + 1,
        activity.name.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
        activity.project.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
        activity.date.substring(8, 10) + "/" + activity.date.substring(5, 7) + "/" + activity.date.substring(0, 4),
        (parseInt(activity.time/60)).toString() + "h " + (parseInt(activity.time%60)).toString() + "m",
      ];
      tableRows.push(activityData);
    }
  });

  // define the columns we want and their titles
  const tableColumnSelfDev = ["Nr. Crt", "Activitate", "Proiect", "Data", "Durata"];
  // define an empty array of rows
  const tableRowsSelfDev = [];

  // for each ticket pass all its data into an array
  idx = 1;
  personalDevelopment.forEach((activity, index) => {
    if (activity.name.length > 0 && activity.project.length > 0 && parseInt(activity.time) > 0) {
      const devData = [
        index + 1,
        activity.name.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
        activity.project.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
        activity.date.toString().substring(8, 10) + "/" + activity.date.substring(5, 7) + "/" + activity.date.substring(0, 4),
        (parseInt(activity.time/60)).toString() + "h " + (parseInt(activity.time%60)).toString() + "m", 
      ];
      tableRowsSelfDev.push(devData);
    }
  });


  doc.addImage(antet, "PNG", 17, 2, 178, 38);
  doc.text("Raport de activitate", 80, 45);
  doc.text("Nr. ______/_______", 80, 53);
  doc.setFontSize(12);
  // startY is basically margin-top
  if (tableRows.length > 0) {
    doc.text("Activitati aferente postului", 15, 68);
    doc.autoTable(tableColumn, tableRows, {
      startY: 70,
      styles: {
        overflow: "linebreak",
        columnWidth: 'wrap',
      },
      theme: 'plain',
      headStyles: {
        fillColor: "#000000",
        textColor: 'white',
        fontSize: 12
      },
      columnStyles: {
        text: {
          columnWidth: "wrap",
        },
        0: {
          columnWidth: 20
        },
        1: {
          columnWidth: 50
        },
        2: {
          columnWidth: 50
        },
        3: {
          columnWidth: 35
        },
        4: {
          columnWidth: 25
        },
      }
    });
  }

  let textY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 9 : 68;

  if (tableRowsSelfDev.length > 0) {
    doc.text("Implicare in dezvoltarea personala", 15, textY);
    doc.autoTable(tableColumnSelfDev, tableRowsSelfDev, {
      startY: textY + 2,
      theme: 'plain',
      headStyles: {
        fillColor: "#00000",
        textColor: 'white',
        fontSize: 12,
      },
      styles: {
        overflow: "linebreak",
        columnWidth: 'wrap',
      },
      columnStyles: {
        text: {
          columnWidth: "wrap",
        },
        0: {
          columnWidth: 20
        },
        1: {
          columnWidth: 50
        },
        2: {
          columnWidth: 50
        },
        3: {
          columnWidth: 35
        },
        4: {
          columnWidth: 25
        },
      } });
  }

  doc.setFontSize(10);
  textY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 78;
  let totalHours = 0;
  activities.map(activity => {
    if (activity.name.length > 0 && activity.project.length > 0 && parseInt(activity.time) > 0) {
      totalHours += parseInt(activity.time);
    }
  });
  personalDevelopment.map(activity => {
    if (activity.name.length > 0 && activity.project.length > 0 && parseInt(activity.time) > 0) {
      totalHours += parseInt(activity.time);
    }
  });

  doc.text(`Nume si prenume: ${name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`, 15, textY);
  doc.text("Semnatura: ", 150, textY);
  doc.text(`Total ore: ${Math.floor(totalHours/60)}h ${totalHours%60}m`, 15, textY + 4);
  textY += 8;
  doc.text("Data: ", 15, textY);


  
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left
  // doc.text("Closed tickets within the last one month.", 14, 15);
  // we define the name of our PDF file.
  doc.save(`Raport_${name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")}_${months[month]}.pdf`);
};

export default generatePDF;