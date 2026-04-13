// const pool = require("./db.js")
import pool from './db.js'
async function createtask(body) {

    console.log("body", body)
    try {
        const result = await pool.query(
            `INSERT INTO public.tasks (title,description) VALUES ($1, $2)
        RETURNING *`,
            [
                body.title,
                body.description,
            ]
        );
        console.log("results", result)
        if (result.rows.length > 0) {
            return { id: result.rows[0].id, ...result.rows[0] }
        }
    } catch (err) { console.log("error", err) }

    return null;
}

async function getAll() {
    try {
        const result = await pool.query("Select * from tasks")
        console.log("result------->", result)
        return result.rows;

    } catch (err) {
        throw err
    }

}

async function deleteTask(id) {
    console.log("id------>", id)
    try {
        const result = await pool.query(
            `DELETE FROM public.tasks 
     WHERE id = $1
     RETURNING *`,
            [id]
        );
        console.log("result_____>", result)
        return result.rows;
    } catch (err) {
        console.log(err)
    }
}
//update task
async function updateTask(id, body) {
        console.log("ide",id)
        console.log("body",body)
    try {
        const result = await pool.query(
            `UPDATE public.tasks 
            SET title = $1, description = $2
            WHERE id = $3
            RETURNING *`,
            [body.title, body.description, id]
        );

        console.log("result-->",result)
        if (result.rows.length > 0) {
            return result.rows[0];
        }
        return null
    } catch (err) {
        console.log(err)
     }
}
//multiple delete
const deleteMultipleTasks = async (ids) => {
    console.log("ids", ids);

    try {
        const result = await pool.query(
            `DELETE FROM public.tasks 
             WHERE id = ANY($1::uuid[])
             RETURNING *`,
            [ids]
        );

        return result.rows;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export default { createtask, getAll, deleteTask,updateTask,deleteMultipleTasks };