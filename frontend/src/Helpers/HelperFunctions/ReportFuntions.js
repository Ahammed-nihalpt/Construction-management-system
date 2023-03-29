import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import ExcelJS from "exceljs";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export function generateProjectPDF(project, payment) {
  const paymentTable = payment.map((value) => [
    `${new Date(value.date).getDate()}-${
      new Date(value.date).getMonth() + 1
    }-${new Date(value.date).getFullYear()}`,
    value.user_info[0].matched_user.name,
    value.amount,
    value.payment_for,
    value.status,
  ]);
  const documentDefinition = {
    content: [
      {
        text: `${
          project.project_name.charAt(0).toUpperCase() +
          project.project_name.slice(1)
        } Report`,
        style: "header_Main",
        alignment: "center",
      },
      {
        text: "Details:",
        style: "subheader",
      },
      {
        ul: [
          `Project name: ${project.project_name}`,
          `Duration: ${project.duration}`,
          `Location: ${project.location}`,
          `Tender amount: ${project.tender_amount}`,
          `Description: ${project.description}`,
        ],
      },
      {
        text: "Payments:",
        style: "subheader",
      },
      {
        style: "tableExample",
        table: {
          body: [
            ["Date", "From", "Amount", "Payment for", "status"],
            ...paymentTable,
          ],
        },
        alignment: "center",
      },
    ],
    styles: {
      header_Main: {
        fontSize: 18,
        bold: true,
        decoration: "underline",
        margin: [0, 0, 0, 10],
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5],
      },
      tableExample: {
        margin: [0, 5, 0, 15],
        widths: ["*"],
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: "black",
      },
    },
  };
  return pdfMake.createPdf(documentDefinition);
}

export function createExcelProjectFile(project, payments) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet1");

  worksheet.addRow(["Details"]);
  worksheet.addRow(["Project name", project.project_name]);
  worksheet.addRow(["Duration", project.duration]);
  worksheet.addRow(["Location", project.location]);
  worksheet.addRow(["Tender amount", project.tender_amount]);
  worksheet.addRow(["Description", project.description]);

  worksheet.addRow([]);
  worksheet.addRow(["payment"]);
  worksheet.addRow(["Date", "From", "Amount", "Payment for", "status"]);
  payments.map((value) => {
    return worksheet.addRow([
      `${new Date(value.date).getDate()}-${
        new Date(value.date).getMonth() + 1
      }-${new Date(value.date).getFullYear()}`,
      value.user_info[0].matched_user.name,
      value.amount,
      value.payment_for,
      value.status,
    ]);
  });

  // Save the workbook
  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

export function generateUsertPDF(users) {
  const userTable = users.map((value) => [
    value.users.name,
    value.users.contact,
    value.users.email,
    value.designation.designation,
  ]);
  const documentDefinition = {
    content: [
      {
        text: "User List",
        style: "header_Main",
        alignment: "center",
      },
      {
        text: "List:",
        style: "subheader",
      },
      {
        style: "tableExample",
        table: {
          body: [["Name", "Contact", "Email", "Designation"], ...userTable],
        },
        alignment: "center",
      },
    ],
    styles: {
      header_Main: {
        fontSize: 18,
        bold: true,
        decoration: "underline",
        margin: [0, 0, 0, 10],
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5],
      },
      tableExample: {
        margin: [0, 5, 0, 15],
        widths: ["*"],
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: "black",
      },
    },
  };
  return pdfMake.createPdf(documentDefinition);
}

export function createExcelUserFile(users) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet1");

  worksheet.addRow(["User List"]);

  worksheet.addRow([]);
  worksheet.addRow(["list"]);
  worksheet.addRow(["Name", "Contact", "Email", "Designation"]);
  users.map((value) =>
    worksheet.addRow([
      value.users.name,
      value.users.contact,
      value.users.email,
      value.designation.designation,
    ])
  );

  // Save the workbook
  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], { type: "application/octet-stream" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}
