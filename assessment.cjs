const { assessmentToMap, writeMigration } = require('.');

async function migrateAssessment() {
    const map = await assessmentToMap();
    let h = " INSERT INTO assessment (title, description, created_at, updated_at, graded) VALUES ";
    let q = [];
    map.forEach((v, k) => {
        q.push(` ('${k}', 'Basic assessment for a ${k} position', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false ) `)
    });
    writeMigration(h + q.join(",\n") + ";\n", 'assessment_data');
}

migrateAssessment();
