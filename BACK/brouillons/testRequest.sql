

SELECT m.name, m.format, m.size, m.download, m.description, m.tag, u.pseudo, c.name, json_agg(comment(comment.content, comment.created_at)) AS comments, COUNT(mhl.model_id) AS nombre_de_like
FROM model m
         JOIN "user" u ON m.user_id = u.id
         LEFT JOIN model_has_category mhc ON m.id = mhc.model_id
         LEFT JOIN category c ON mhc.category_id = c.id
         LEFT JOIN comment ON m.id = comment.model_id
         LEFT JOIN model_has_like mhl ON m.id = mhl.model_id
WHERE m.id = 19
GROUP BY m.name, m.format, m.size, m.download, m.description, m.tag, u.pseudo, c.name;


