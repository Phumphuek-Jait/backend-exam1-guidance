// [ทำสำเนาเป็น app.js] เปลี่ยน ID/name ตามข้อมูลเฉพาะของผู้สอบ
import express from 'express';
import router from './routes-$id/exam-route.js';
import { queryParser } from './middlewares-$id/exam-pagination-middleware.js';
import { notFoundHandler, errorHandler } from './middlewares-$id/exam-error-handler.js';

const app = express();
const STUDENT_ID = 'REPLACE_WITH_STUDENT_ID';

app.use(express.json());
app.use(queryParser());

// [แก้ base path] ใช้ prefix ตามข้อกำหนดในโจทย์จริง; ถ้ามีหลาย resource ให้ import และ app.use router แยกแต่ละตัว
app.use(`/api/${STUDENT_ID}/REPLACE_WITH_RESOURCE`, router);

// Error handlers ต้องอยู่หลัง routes และก่อน app.listen
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

