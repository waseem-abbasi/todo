import pool from './db.js'

async function createuser(body) {

    console.log("body", body)
    try {
        const result = await pool.query(
            `INSERT INTO public.users (name,email,password) VALUES ($1, $2,$3)
        RETURNING *`,
            [
                body.name,
                body.email,
                body.password
            ]
        );
        console.log("results", result)
        if (result.rows.length > 0) {
            return { id: result.rows[0].id, ...result.rows[0] }
        }
    } catch (err) { console.log("error", err) }

    return null;
}
//find by email
async function findByEmail(email,password) {
  try {
    console.log("email---",email)
    console.log("password---",password)
    const result = await pool.query(
    `SELECT * FROM public.users WHERE email = $1 AND password = $2`,
  [email, password]
    );
    console.log("result-----",result);
    if (result.rows.length > 0) {
      return result.rows[0]; 
    }
    return null; 
  } catch (err) {
    console.error("Database error in findByEmailAndPassword:", err.message);
    throw err;
  }
}
export default {createuser,findByEmail}