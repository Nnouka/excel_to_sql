const { assessmentToMap, writeMigration, parseText } = require('.');

async function migrate() {
    const map = await assessmentToMap();
    let h = " INSERT INTO question (stem, question_type, created_at, updated_at) VALUES ";
    let q = [];
    map.forEach((v, k) => {
        if (Array.isArray(v)) {
            v.forEach(item => {
                q.push(` ('${parseText(item)}', 'rating', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP ) `)
            })
        }
    });
    writeMigration(h + q.join(",\n") + ";\n", 'question_data');
}

migrate();
