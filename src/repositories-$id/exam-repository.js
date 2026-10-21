import db from '../configs-$id/db-config.js';

// [แก้ตาม SQL] ชื่อตาราง, PK และ business key ต้องตรง schema จริง
const TABLE_NAME = 'table-name';
const PRIMARY_KEY = 'primaryKey';
const BUSINESS_KEY = 'productLine';

export async function findAll(pagination = null) {
  if (!pagination) {
    const [rows] = await db.query(`SELECT * FROM ${TABLE_NAME}`);
    return rows;
  }

  const { limit, offset } = pagination;
  const [[{ totalItems }]] = await db.query(
    `SELECT COUNT(*) AS totalItems FROM ${TABLE_NAME}`,
  );
  const [rows] = await db.query(
    `SELECT * FROM ${TABLE_NAME} LIMIT ? OFFSET ?`,
    [limit, offset],
  );

  // totalItems ต้องเป็นยอดทั้งหมด ไม่ใช่จำนวนแถวในหน้าปัจจุบัน
  rows.totalItems = Number(totalItems);
  return rows;
}

export async function findOne(id) {
  const [rows] = await db.query(
    `SELECT * FROM ${TABLE_NAME} WHERE ${PRIMARY_KEY} = ?`,
    [id],
  );
  return rows[0] ?? null;
}

export async function create(data) {
  const [result] = await db.query(`INSERT INTO ${TABLE_NAME} SET ?`, [data]);
  // [แก้ถ้า PK ไม่ auto increment] เลือก key ที่ repo.findOne ใช้ค้นหา
  const id = data[PRIMARY_KEY] ?? data[BUSINESS_KEY] ?? result.insertId;
  return findOne(id);
}

export async function update(id, data) {
  if (!(await findOne(id))) return null;

  await db.query(
    `UPDATE ${TABLE_NAME} SET ? WHERE ${PRIMARY_KEY} = ?`,
    [data, id],
  );
  return findOne(id);
}

export async function remove(id) {
  if (!(await findOne(id))) return false;

  const [result] = await db.query(
    `DELETE FROM ${TABLE_NAME} WHERE ${PRIMARY_KEY} = ?`,
    [id],
  );
  return result.affectedRows > 0;
}
