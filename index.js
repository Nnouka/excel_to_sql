const Excel = require('exceljs');
const path = require('path');
const fs = require('fs');

async function assessmentToMap() {
    // read all assessment
    // read from a file
    const workbook = new Excel.Workbook();
    await workbook.xlsx.readFile(path.resolve(__dirname, './data/assessment_questions.xlsx'));
    const worksheet = workbook.getWorksheet(1);
    // Iterate over all rows that have values in a worksheet
    const map = new Map();
    worksheet.eachRow(function(row, rowNumber) {
        try {
            map.set(row.getCell(1).value, JSON.parse(row.getCell(2).value))
        } catch(e) {}
    });
    return map;
}

async function writeMigration(data, fileName = "migrate") {
    const files = fs.readdirSync(path.resolve(__dirname, './migrations'));
    const migrations = [];
    for (const file of files) {
        if (file.startsWith("V") && file.includes("__")) {
            const val = Number(file.substring(1, file.indexOf("__")));
            if (!Number.isNaN(val)) migrations.push(val);
        }
    }
    const i = migrations.length > 0 ? migrations.sort()[migrations.length - 1] : 0;
    fs.writeFileSync(path.resolve(__dirname, './migrations', `V${i + 1}__${fileName}.sql`), data);
}

function parseText(text) {
    return text
        .replace(/\\/g, '\\\\')  // Escape backslashes
        .replace(/'/g, "''");    // Escape single quotes
}

module.exports = {
    assessmentToMap,
    writeMigration,
    parseText,
}