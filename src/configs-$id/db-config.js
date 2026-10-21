// Keep local MySQL credentials as configured for the exam environment.
import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'mysql@sit',
  // [เปลี่ยนตามโจทย์] ใส่ชื่อ database/schema ที่ข้อสอบกำหนด
  database: 'database-name',
});

export default db;
