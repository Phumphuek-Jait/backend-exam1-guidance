# Midterm Express ESM — exam kit และคู่มือเตรียมตัว

เอกสารประกาศที่ให้มาระบุขอบเขตและรูปแบบข้อสอบ: 6 ข้อ, โครง CRUD เป็น 1 Create, 3 Read, 1 Update, 1 Delete, คะแนนรวมที่ระบุ 110 และคิดเต็ม 100. ให้ยึดโจทย์จริงและ schema SQL ที่ได้รับเป็นสัญญาหลัก; คู่มือนี้ไม่ใช่เฉลยข้อสอบ


## โครงสร้างที่ template ใช้

```text
src/
  app.js
  configs-$id/db-config.js
  middlewares-$id/pagination-middleware.js
  repositories-$id/repository.js
  services-$id/service.js
  routes-$id/route.js
  mappers-$id/entity-dto-mapper.js
  mappers-$id/api-response.js
```

ไฟล์ตัวช่วย `exam-*` ที่เพิ่มไว้ในโฟลเดอร์เหล่านี้อิงโครงและ method names ของ template โดยตรง คัดลอกเนื้อหาไปทับไฟล์ starter ที่โจทย์ระบุ หรือเปลี่ยนชื่อไฟล์โดยเอา `exam-` ออกหลังตรวจ imports แล้ว


## 15 นาทีที่เปิดให้ดาวน์โหลดไฟล์ก่อนสอบ

ช่วงนี้ใช้เตรียมไฟล์ให้พร้อมเท่านั้น เพราะโจทย์จริงยังไม่ออก อย่าคาดเดา schema หรือเริ่มทำ endpoint จากโจทย์ที่ยังไม่เห็น

1. ดาวน์โหลดและเก็บ template, ประกาศ/เอกสารเรียน, SQL หรือไฟล์ประกอบที่อนุญาตให้ใช้ไว้ในเครื่อง.
2. เตรียมโฟลเดอร์สำรองไว้ในตำแหน่งหาเจอง่าย และตรวจว่าไฟล์เปิดได้ครบ.
3. ดาวน์โหลด dependencies ตาม `package-lock.json` และรัน `npm ci` ขณะที่ยังเปิดอินเทอร์เน็ตได้; ตรวจว่ามี `node_modules` และเก็บไว้ในเครื่องก่อนสอบ.
4. เก็บคู่มือ `exam-midterm-guide.md` และ helper `exam-*` ไว้ด้วย; ตรวจว่ามีครบทุกโฟลเดอร์.
5. เตรียม editor, terminal และคำสั่งรันเซิร์ฟเวอร์ที่ใช้; ตรวจว่า environment เปิด project และ dependencies ที่ติดตั้งไว้ได้.
6. เมื่อหมดช่วงดาวน์โหลดให้เตรียมทำข้อสอบ offline. ตอนเห็นโจทย์แล้วค่อยแทน ID, schema, fields, DTO และ status ตามข้อกำหนดจริง.


## วิธีทำทีละขั้นหลังได้รับโจทย์

1. **แตกโจทย์เป็นตาราง endpoint:** จด method, path, query params, request body, status และ response fields ของทั้ง 6 ข้อ. ทำเครื่องหมาย 1 Create, 3 Read, 1 Update, 1 Delete.
2. **อ่าน SQL ก่อนเขียน query:** ระบุ table, PK, auto increment หรือ business key, column names, data types, unique และ foreign keys.
3. **ตั้งค่า app:** แทน student ID และ resource path ใน `exam-app.js`; เพิ่ม identity endpoint หากโจทย์มี; ตรวจว่า router ถูก mount ที่ base path ถูกต้อง.
4. **ทำ Repository:** เติม table/PK/business key; เขียน `findOne` ก่อนเพื่อให้ CRUD อื่นใช้ได้; ต่อด้วย `findAll`, `create`, `update`, `remove`. ใช้ `?` สำหรับค่าข้อมูล.
5. **ทำ DTO mapper:** ใส่ allowlist ของ summary/detail fields ตาม response specification. map ชื่อ/ชนิดข้อมูลให้ตรง casing และไม่ปล่อย DB columns เกินที่โจทย์ขอ.
6. **ทำ Service:** เชื่อม repository กับ mapper; จัดการ not-found/duplicate ตามผล repo; เพิ่ม business rules เฉพาะที่โจทย์กำหนด.
7. **ทำ Routes ครบทุกข้อ:** แต่ละ route ส่ง path params, query และ body ให้ method ถูกตัว; ทำ Read ข้อที่ 3 ตามชนิดที่โจทย์ระบุ ไม่เดาว่าเป็น list/detail.
8. **ต่อ Pagination และ Error Handling:** ใช้ COUNT + LIMIT/OFFSET, คำนวณ metadata; mount not-found/error handler หลัง routes; ปรับ status/body ให้ตรงตัวอย่าง.
9. **ทดสอบทันทีทีละ endpoint:** เริ่มจาก GET, แล้ว POST → GET record ที่สร้าง → PUT → GET ตรวจค่าหลังแก้ → DELETE. ทดสอบเคส 404/duplicate/invalid input เมื่อมีเวลา.
10. **ตรวจส่งงาน:** server start ได้, routes ตอบได้, response keys/status ตรง, ไม่มี body ที่ 204, ส่ง project ที่ถูกต้องผ่าน LEB2.

## เปลี่ยนชื่อไฟล์แล้วต้องแก้ import ตรงไหน

แนวทางง่ายสุดคือคัดลอกไฟล์ `exam-*` ไปเป็นชื่อไฟล์จริง แล้วแก้ import ในไฟล์ที่เรียกมันตามตารางนี้ ชื่อไฟล์กับชื่อ method เป็นคนละเรื่อง: เปลี่ยนชื่อไฟล์ได้ แต่คง method names ตาม template ไว้

| เปลี่ยนชื่อไฟล์ | ต้องไปแก้ import ที่ |
|---|---|
| `src/exam-app.js` → `src/app.js` | จุดรัน server เช่น `node src/app.js`; import ภายใน app ต้องชี้ชื่อ route/middleware จริง |
| `routes-$id/exam-route.js` → `routes-$id/product-route.js` | `app.js` เปลี่ยน import และตรวจ `app.use(...)` ที่ mount router |
| `services-$id/exam-service.js` → `services-$id/product-service.js` | `product-route.js` เปลี่ยน import service |
| `repositories-$id/exam-repository.js` → `repositories-$id/product-repository.js` | `product-service.js` เปลี่ยน import repository |
| `mappers-$id/exam-entity-dto-mapper.js` → `mappers-$id/product-mapper.js` | `product-service.js` เปลี่ยน import mapper; ชื่อ class/default export ต้องตรงกัน |
| `mappers-$id/exam-api-response.js` → `mappers-$id/api-response.js` | ทุก route ที่ใช้ `apiResponse` เปลี่ยน import |
| `middlewares-$id/exam-pagination-middleware.js` → `middlewares-$id/pagination-middleware.js` | `app.js` เปลี่ยน import `queryParser` |
| `middlewares-$id/exam-error-handler.js` → `middlewares-$id/error-handler.js` | `app.js` เปลี่ยน imports `notFoundHandler/errorHandler`; `service.js` เปลี่ยน import `AppError` |
| `configs-$id/db-config.js` | ถ้าเปลี่ยนชื่อ ให้ทุก repository เปลี่ยน import; ปกติคงชื่อนี้ไว้แล้วเปลี่ยนแค่ database name |

**กฎตรวจเร็ว:** เปิดไฟล์ที่ถูก rename แล้วค้นคำว่า `from '../` หรือ `from './`; ทุก path ต้องชี้ไปยังไฟล์ที่มีอยู่จริง รวมถึงตัวสะกด `.js`. ถ้าเปลี่ยนชื่อโฟลเดอร์ `routes-$id`, `services-$id` ฯลฯ ด้วย ต้องแก้ path ของ import ทุกจุดที่อ้างถึงโฟลเดอร์นั้นด้วย; ปกติไม่จำเป็นต้องเปลี่ยนชื่อโฟลเดอร์ที่ผู้สอนให้มา.
## เมื่อได้โจทย์แล้ว ต้องแก้อะไรในไฟล์ไหน

ใช้รายการนี้ไล่แทน placeholder ตามโจทย์และ SQL จริง อย่าแก้ค่าตัวอย่างโดยเดา หากโจทย์กำหนด response/status ไว้ให้ยึดโจทย์ก่อนตัวอย่างใน helper

| ไฟล์ helper | จุดที่ต้องแก้ | ใช้ข้อมูลจาก |
|---|---|---|
| `src/exam-app.js` | `STUDENT_ID`; resource ใน `app.use(...)`; import route ให้ตรงชื่อไฟล์ที่จะใช้; เพิ่ม identity route ถ้าโจทย์มี; แก้ base path ตามที่ระบุ | student info และ endpoint prefix |
| `src/configs-$id/db-config.js` | คง `host: localhost`, `user: root`, `password: mysql@sit`; เปลี่ยนเฉพาะ database ตามโจทย์ และคงชื่อ export `db` | ค่าการเชื่อมต่อที่ผู้สอนให้ |
| `src/routes-$id/exam-route.js` | path/method ของแต่ละข้อ; param name; ชื่อ query; ส่ง `id` และ `req.body` ให้ service; DTO view; status code และ response envelope | รายการ endpoint, request/response และ status |
| `src/services-$id/exam-service.js` | business rules; วิธีจัดการ `null` จาก repo; เรียก mapper สำหรับ Read ที่ต้องแปลง DTO; อย่าเปลี่ยนชื่อ methods หลัก | เงื่อนไขการทำงานของโจทย์ |
| `src/repositories-$id/exam-repository.js` | `TABLE_NAME`, `PRIMARY_KEY`, `ENTITY_NAME` และ SQL constants ด้านบนไฟล์; columns/joins/filters; COUNT query ให้ใช้ filter เดียวกับ list | SQL schema และเงื่อนไขค้นหา |
| `src/mappers-$id/exam-entity-dto-mapper.js` | ทุก field ใน `toSummaryDTO` และ `toDetailDTO`; map ชื่อ DB → ชื่อ API; แปลงชนิดข้อมูลเมื่อจำเป็น | ตัวอย่าง JSON response/DTO |
| `src/mappers-$id/exam-api-response.js` | โครง success/error envelope, pagination key names, timestamp และ status behavior; 204 ต้องไม่มี body | รูปแบบ response ที่โจทย์หรือ grader ระบุ |
| `src/middlewares-$id/exam-pagination-middleware.js` | ชื่อ query keys, default page/limit, กรณีส่งไม่ครบหรือค่าผิด และรูปแบบ 400 หากโจทย์บังคับ; helper นี้ไม่มี min/max cap | ข้อกำหนด pagination |
| `src/middlewares-$id/exam-error-handler.js` | เพิ่ม MySQL error codes ที่เกี่ยวข้อง; ปรับ error code/message/JSON shape ให้ตรงโจทย์; ให้ 404/409/400 ตรงกรณี | exception/status และ response ตัวอย่าง |

### Placeholder ที่ค้นหาแล้วแทนได้ทันที

- `REPLACE_WITH_STUDENT_ID` → รหัสตามข้อสอบ.
- `REPLACE_WITH_RESOURCE` → resource segment เช่น `products` (ไม่ใส่ `/api/:id` ซ้ำ เพราะ app ประกอบ base path ให้แล้ว).
- `table-name` → ชื่อตารางจริง.
- `primaryKey` → ชื่อ primary key จริง โดยรักษาตัวพิมพ์เล็ก/ใหญ่ตาม schema.
- `PRIMARY_KEY` → ชื่อคอลัมน์ PK; ถ้า PK ไม่ใช่ auto increment ให้ส่ง PK ใน `data` เพื่อให้ `create()` ใช้ค้น record หลัง insert.
- `productCode`, `productName`, `productScale`, `MSRP`, `buyPrice` ใน mapper → field จริงและชื่อ DTO ตาม response specification.

ถ้าโจทย์มี Read 3 แบบ ให้สร้าง route สำหรับทั้งสามแบบตาม path จริง แล้วต่อแต่ละ route เข้ากับ service/repository ที่เหมาะสม เช่น list, detail, filter หรือ search; อย่าสมมติว่า Read ทั้งสามข้อเป็น list/detail แบบใดแบบหนึ่งก่อนเห็นโจทย์

### ถ้าโจทย์ใช้หลาย table/resource

helper `exam-repository.js` เป็นแม่แบบสำหรับ **หนึ่ง table ต่อหนึ่ง repository**; อย่าแก้ `TABLE_NAME` สลับไปมาระหว่างหลาย route เพราะจะทำให้ทุก service ชี้ table เดียวกัน

ให้แยกไฟล์ต่อ resource เช่น:

```text
routes-$id/product-route.js
services-$id/product-service.js
repositories-$id/product-repository.js
mappers-$id/product-mapper.js

routes-$id/brand-route.js
services-$id/brand-service.js
repositories-$id/brand-repository.js
mappers-$id/brand-mapper.js
```

แต่ละ route import service ของตัวเอง; แต่ละ service import repository/mapper ของ entity นั้น. ทำสำเนา `exam-repository.js` เป็น repository แยกต่อ table แล้วแก้ SQL constants ด้านบนของแต่ละไฟล์ให้ตรง table/PK ของตนเอง. `app.js` import router ทุก resource และ mount แต่ละ base path แยกกัน:

```js
import productRouter from './routes-$id/product-route.js';
import brandRouter from './routes-$id/brand-route.js';

app.use(`/api/${STUDENT_ID}/products`, productRouter);
app.use(`/api/${STUDENT_ID}/brands`, brandRouter);
```

ใช้ `db-config.js`, `queryParser`, `errorHandler`, `notFoundHandler` และ `apiResponse` ร่วมกันได้. ถ้าต้อง join ข้อมูล เช่น product พร้อม brand name ให้เพิ่ม JOIN ใน query ของ repository ที่ตอบ resource นั้น และให้ COUNT query นับ scope เดียวกัน; ถ้าโจทย์มี CRUD ของ brand ด้วย ก็ยังมี `brand-repository.js` แยกต่างหาก.
## ชื่อ methods ที่ควรรักษา

| Layer | ชื่อ method ตาม template |
|---|---|
| Route เรียก Service | `getAllObjects`, `getObject`, `createObject`, `updateObject`, `removeObject` |
| Service เรียก Repository | `findAll`, `findOne`, `create`, `update`, `remove` |
| DTO mapper | `map(entity, viewType)`, `maps(entities, viewType)` |
| Response mapper | `apiResponse(res, data, pagination, status)` |

`exam-service.js` เพิ่ม `viewType` และ `pagination` เป็น optional args ให้ flow เดิมรองรับ DTO/pagination โดยไม่เปลี่ยน method names.


## วิธีรันและทดสอบด้วย Postman ทีละขั้น

ใช้ไฟล์ `exam-postman-collection.json` ที่อยู่ในโฟลเดอร์ project เป็นชุดเริ่มต้น; ต้องแทนค่าตัวแปรและ fields ให้ตรงโจทย์จริงก่อนส่ง request

### 1. เตรียมฐานข้อมูลและเปิด API

1. เปิด MySQL service และ import SQL ที่โจทย์ให้ (ถ้ามี).
2. ใช้ค่า MySQL `localhost` / `root` / `mysql@sit` ใน `src/configs-$id/db-config.js`; เปลี่ยนเฉพาะชื่อ database ตามโจทย์ และตรวจ table/column/PK ให้ตรง repository.
3. ใช้ dependencies ที่ติดตั้งและเก็บไว้ก่อนสอบ; อย่ารอ `npm ci` จนอินเทอร์เน็ตถูกปิด.
4. จากโฟลเดอร์ project รัน `node src/exam-app.js` หรือ entry file ที่ใช้งานจริง หากเปลี่ยนชื่อ helper เป็นไฟล์ template เดิม.
5. คงหน้าต่าง terminal ไว้ดู error; เปิด Postman และตรวจว่า server พร้อมที่ `http://localhost:3000`.

### 2. Import collection และตั้งค่าตัวแปร

1. ใน Postman เลือก **Import** แล้วเลือก `exam-postman-collection.json`.
2. เปิด collection **Midterm Express Exam (Starter)** → **Variables**.
3. ตั้ง `baseUrl` เป็น `http://localhost:3000`, `studentId` ตามโจทย์, `resource` เป็น path segment เช่น `products`, และ `id` เป็น record ID ที่มีอยู่.
4. Save collection. Base path ใน requests คือ `/api/{{studentId}}/{{resource}}`; ถ้าโจทย์ใช้ path อื่น ให้แก้ request URL مطابقโจทย์.
5. Request bodies ในตัวอย่างเป็น placeholder; แก้ key/value ให้ตรง request DTO จริง.

### 3. ส่ง requests ตามลำดับ

- **Read 1 — List:** เปิด `01 - Read list (pagination)`, ตั้ง query `page=1`, `limit=10`, กด **Send**.
- **Read 2 — Detail:** เปิด `02 - Read detail`, ตรวจ `id` variable และกด **Send**.
- **Create:** เปิด `03 - Create`, แก้ JSON body ให้ครบ required fields แล้วกด **Send**. จด ID ที่ response ส่งกลับมาและอัปเดตตัวแปร `id`.
- **Read 3:** Duplicate request ที่ตรงกับชนิด endpoint จริง (เช่น filter/search/relation) แล้วเปลี่ยน URL/query ตามโจทย์; ประกาศยังไม่บอก Read ข้อที่ 3 คืออะไร.
- **Update:** เปิด `05 - Update`, ใช้ ID ที่ต้องการแก้และ body ตามโจทย์ แล้วกด **Send**.
- **Delete:** เปิด `06 - Delete` เป็นลำดับท้าย; 204 ควรไม่มี body.

### 4. ตรวจ response ใน Postman

หลังแต่ละ **Send**, ตรวจ tab **Status**, **Body** และ **Headers**:

- Status code และ JSON keys/casing ต้องตรงข้อกำหนด.
- DTO ต้องมี field ที่กำหนดและไม่มี field เกิน (โดยเฉพาะ summary DTO).
- List ต้องมีจำนวนรายการตาม `limit`; ตรวจ `total`, `page`, `limit`, `totalPages`, `hasNextPage`, `hasPrevPage`.
- ตรวจว่า POST/PUT เปลี่ยนข้อมูลจริงโดยส่ง GET ซ้ำ.
- DELETE 204 ต้องไม่มี response body.

### 5. ทดสอบกรณีผิดพลาดด้วย Duplicate request

คลิกขวา request แล้วเลือก **Duplicate**, ตั้ง URL/body สำหรับเคส แล้วกด **Send**:

- เปลี่ยน ID เป็นค่าที่ไม่มี เพื่อเช็ก 404.
- ส่ง JSON ที่ผิดรูปแบบ เพื่อเช็ก 400.
- ส่ง `page=0` หรือ `limit=abc` เพื่อทดสอบ validation (จะได้ 400 เมื่อ middleware ใช้ `invalid: 'error'`).
- ส่ง POST ซ้ำด้วย unique key เดิม เพื่อเช็ก 409 เมื่อ schema มี unique constraint.
- ทดลองลบ row ที่มี foreign key อ้างถึง หากโจทย์/ข้อมูลอนุญาต เพื่อเช็ก conflict.

ถ้าได้ 500 ให้ดู terminal ของ server แล้วตรวจ SQL/table/column, import path, body parsing และ method ที่ route เรียก จากนั้นส่ง request เดิมซ้ำ. Request ใน collection เป็นตัวช่วยเริ่มต้นเท่านั้น; ใช้ status และ response shape ตามโจทย์จริงเป็นหลัก.
## Pagination

- Template ใช้ query keys `page` และ `limit`; ส่งทั้งคู่เพื่อเปิด pagination.
- `offset = (page - 1) * limit`.
- `total` มาจาก `COUNT(*)` ของ scope เดียวกับ list; ถ้ามี filters ให้ COUNT และ SELECT ใช้ WHERE เดียวกัน.
- `totalPages = Math.ceil(total / limit)`; `hasNextPage = page * limit < total`; `hasPrevPage = page > 1`.
- ไม่มี min/max page size ใน exam middleware นี้: ค่า `limit` บวกจำนวนเต็มที่โจทย์ส่งมาถูกใช้ตามนั้น.
- page/limit ที่ไม่ถูกต้อง: เลือกตอบ 400 (`invalid: 'error'`) หรือ fallback (`invalid: 'default'`) ตามสัญญาข้อสอบ.


## DTO

แก้ `exam-entity-dto-mapper.js` ให้ชื่อและชนิด field ตรง response ตัวอย่างทุกตัว. Summary DTO ควรคืนเฉพาะ field ที่ระบุ; detail DTO แยก mapping สำหรับข้อมูลเต็ม. แปลง `snake_case` เป็น `camelCase` เฉพาะเมื่อโจทย์คาดหวังเช่นนั้น. อย่าคืน DB row ดิบโดยไม่ตรวจ field ที่ไม่ควรเปิดเผย.


## Exception / status ที่พบบ่อย

| กรณี | แนวทางทั่วไป |
|---|---|
| หา row ไม่พบ | 404 (`NOT_FOUND`) |
| unique ซ้ำ | 409 (`ER_DUP_ENTRY`) |
| FK อ้างอิงไม่มี | 400 |
| ลบ row ที่ถูกอ้างอิง | 409 |
| JSON เสีย / pagination ผิด | 400 |
| DB unavailable | 503 |
| unexpected server error | 500 และไม่ส่งรายละเอียดภายใน |
| ลบสำเร็จ | 204 ไม่มี body |

ตรวจสัญญา status/body ในข้อสอบจริงทุกครั้ง เพราะระบบตรวจอาจกำหนดรูปแบบเฉพาะ.


## เช็กลิสต์ก่อนส่ง

- ID/base path/identity fields ตรงโจทย์.
- route ต่อเข้ากับ service; service เรียก repo/mapping ถูก method.
- CRUD ส่ง id และ body ถูกตำแหน่ง; POST ใช้ status ตามที่กำหนด; DELETE 204 ไม่มี body.
- pagination นับ total ถูกต้อง; page size ไม่มีการ cap.
- summary/detail field names และ casing ตรงตัวอย่าง.
- error handler mount หลัง routes; query values ใช้ bind parameters; dynamic identifiers ต้อง whitelist.












