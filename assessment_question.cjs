const { assessmentToMap, writeMigration, parseText } = require('.');

async function migrate() {
    const map = await assessmentToMap();
    let h = " INSERT INTO assessment_question (question_id, assessment_id, sort_order, weight, created_at, updated_at) " 
     + "\n SELECT q.id, a.id AS aId, 0, 1.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP FROM "
     + "\n (( SELECT id, CASE ";
    let q = [];
    map.forEach((v, k) => {
        if (Array.isArray(v)) {
            v.forEach(item => {
                q.push(` WHEN UPPER(stem) = UPPER('${parseText(item)}') THEN '${k}' `)
            })
        }
    });
    let end = " END AS title FROM question\n) q JOIN assessment a ON UPPER(q.title) = UPPER(a.title))"
    writeMigration(h + q.join("\n") + end + ";\n", 'assessment_question_data');
}

migrate();
