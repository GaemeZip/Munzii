const connection = require('../config/db');

const  join = async function (username, password){
    const createQuery = 'INSERT INTO users (u_id, username, password, theme_id, font_id, start_day_id) VALUES(NULL,?,?,1,1,1)';
    let params = [username, password];

    const userInfo = await connection.query(createQuery, params);
    
    return userInfo
}


module.exports ={
    join
}