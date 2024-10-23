INSERT INTO position_assessment (position_id, assessment_id, title, created_at, updated_at)
SELECT 
    jb.id, 
    a.id, 
    CONCAT('Basic assessment for a ', jb.title, ' position'),
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
FROM 
    job_positoin jb
JOIN 
    assessment a 
    ON UPPER(jb.title) = UPPER(a.title);

INSERT INTO assessment_question (question_id, assessment_id, sort_order, "weight", created_at, updated_at)
select q.id, a.id as aId, 0, 1.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP  as stem FROM
     (( select id,
        CASE 
            when UPPER(stem) = UPPER('Rate your proficiency in interpreting 12-lead ECG results.') THEN 'Cardiac Nurse' 
        END as title from question
     ) q join assessment a on UPPER(q.title) = UPPER(a.title))