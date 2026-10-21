import db from '../configs-$id/db-config.js';

// ============================================================
// [แก้ส่วนนี้ตาม schema ของ table นี้; ทำ repository แยกอีกไฟล์สำหรับ table อื่น]
// ============================================================
const TABLE_NAME = 'table-name';
const PRIMARY_KEY = 'primaryKey';
const ENTITY_NAME = 'Entity';

// ============================================================
// SQL statements — แก้ query ทั้งหมดไว้รวมกันตรงส่วนนี้
// ============================================================
const COUNT_ALL_SQL = `
  SELECT COUNT(*) AS totalItems
  FROM ${TABLE_NAME}
`;

const FIND_ALL_SQL = `
  SELECT *
  FROM ${TABLE_NAME}
`;

const FIND_ALL_WITH_PAGE_SQL = `
  ${FIND_ALL_SQL}
  LIMIT ? OFFSET ?
`;

const FIND_ONE_SQL = `
  SELECT *
  FROM ${TABLE_NAME}
  WHERE ${PRIMARY_KEY} = ?
`;

const CREATE_SQL = `
  INSERT INTO ${TABLE_NAME}
  SET ?
`;

const UPDATE_SQL = `
  UPDATE ${TABLE_NAME}
  SET ?
  WHERE ${PRIMARY_KEY} = ?
`;

const REMOVE_SQL = `
  DELETE FROM ${TABLE_NAME}
  WHERE ${PRIMARY_KEY} = ?
`;

// ============================================================
// Repository methods — ชื่อ method คงตาม template เดิม
// ============================================================
async function countAll() {
  const [[{ totalItems }]] = await db.query(COUNT_ALL_SQL);
  return Number(totalItems);
}

export async function findAll(pagination = null) {
  if (!pagination) {
    const [rows] = await db.query(FIND_ALL_SQL);
    return rows;
  }

  const { limit, offset } = pagination;
  const [rows] = await db.query(FIND_ALL_WITH_PAGE_SQL, [limit, offset]);

  // เก็บจำนวนทั้งหมดไว้ให้ mapper/response สร้าง pagination metadata
  rows.totalItems = await countAll();
  return rows;
}

export async function findOne(id) {
  const [rows] = await db.query(FIND_ONE_SQL, [id]);
  return rows[0] ?? null;
}

export async function create(data) {
  const [result] = await db.query(CREATE_SQL, [data]);

  // ใช้ PK ที่ส่งมา ถ้าไม่มีให้ใช้ auto-increment insertId
  const id = data[PRIMARY_KEY] ?? result.insertId;
  return findOne(id);
}

export async function update(id, data) {
  const existing = await findOne(id);
  if (!existing) return null;

  await db.query(UPDATE_SQL, [data, id]);
  return findOne(id);
}

export async function remove(id) {
  const existing = await findOne(id);
  if (!existing) return false;

  const [result] = await db.query(REMOVE_SQL, [id]);
  return result.affectedRows > 0;
}

