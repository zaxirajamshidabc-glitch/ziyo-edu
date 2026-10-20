const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const DB_FILE = path.join(__dirname, 'db.json');

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const initialDB = {
  staff: [
    { id: 'dir_1', name: 'Zokirova Munisa', login: 'direktor', pass: 'dir2026', role: 'director', title: "O'quv Markazi Direktori", phone: '+998 90 100 00 01' },
    { id: 'adm_1', name: 'Xolmatova Dilnoza', login: 'admin', pass: 'adm2026', role: 'admin', title: 'Bosh Administrator', phone: '+998 90 100 00 02' },
    { id: 't_1', name: 'Ustoz Jamshid Nurboboyev', login: 'jamshid', pass: 'ustoz1', role: 'teacher', subject: 'Frontend & Web Dasturlash', phone: '+998 90 123 45 67' },
    { id: 't_2', name: 'Ustoz Sardor Alimov', login: 'sardor', pass: 'ustoz2', role: 'teacher', subject: 'IELTS & General English', phone: '+998 90 234 56 78' },
    { id: 't_3', name: 'Ustoz Malika Karimova', login: 'malika', pass: 'ustoz3', role: 'teacher', subject: 'Matematika & Mantiq', phone: '+998 90 345 67 89' },
    { id: 't_4', name: 'Ustoz Bobur Tursunov', login: 'bobur', pass: 'ustoz4', role: 'teacher', subject: 'Python Backend', phone: '+998 90 456 78 90' }
  ],
  students: [
    { id: 'st_1', name: 'Aliyev Sardor', login: 'oquvchi1', pass: 'st101', group: 'Frontend #14', xp: 1450, coins: 480, attendance: 'present', grade: 96, paid: true },
    { id: 'st_2', name: 'Karimova Mohira', login: 'oquvchi2', pass: 'st102', group: 'Frontend #14', xp: 1580, coins: 610, attendance: 'present', grade: 99, paid: true },
    { id: 'st_3', name: 'Tursunov Bekzod', login: 'oquvchi3', pass: 'st103', group: 'Frontend #14', xp: 1210, coins: 310, attendance: 'late', grade: 84, paid: false },
    { id: 'st_4', name: 'Rustamova Sevara', login: 'oquvchi4', pass: 'st104', group: 'IELTS #09', xp: 1390, coins: 420, attendance: 'present', grade: 93, paid: true },
    { id: 'st_5', name: 'Nematov Javohir', login: 'oquvchi5', pass: 'st105', group: 'Matematika #04', xp: 980, coins: 190, attendance: 'absent', grade: 72, paid: false },
    { id: 'st_6', name: 'Qodirova Zilola', login: 'oquvchi6', pass: 'st106', group: 'Frontend #14', xp: 1510, coins: 530, attendance: 'present', grade: 97, paid: true },
    { id: 'st_7', name: 'Abdullayev Diyor', login: 'oquvchi7', pass: 'st107', group: 'Python #07', xp: 1320, coins: 350, attendance: 'present', grade: 89, paid: true },
    { id: 'st_8', name: 'Yusupova Madina', login: 'oquvchi8', pass: 'st108', group: 'IELTS #09', xp: 1490, coins: 495, attendance: 'present', grade: 95, paid: true },
    { id: 'st_9', name: 'Hasanov Shohruh', login: 'oquvchi9', pass: 'st109', group: 'Python #07', xp: 1150, coins: 260, attendance: 'late', grade: 81, paid: true },
    { id: 'st_10', name: 'Oripova Rayhon', login: 'oquvchi10', pass: 'st110', group: 'Matematika #04', xp: 1410, coins: 440, attendance: 'present', grade: 92, paid: true },
    { id: 'st_11', name: 'Mahmudov Asadbek', login: 'oquvchi11', pass: 'st111', group: 'Frontend #14', xp: 1275, coins: 330, attendance: 'present', grade: 87, paid: false },
    { id: 'st_12', name: 'Salimova Gulnoza', login: 'oquvchi12', pass: 'st112', group: 'IELTS #09', xp: 1540, coins: 570, attendance: 'present', grade: 98, paid: true },
    { id: 'st_13', name: 'Normatov Otabek', login: 'oquvchi13', pass: 'st113', group: 'Python #07', xp: 1090, coins: 220, attendance: 'absent', grade: 76, paid: false },
    { id: 'st_14', name: 'Toirova Charos', login: 'oquvchi14', pass: 'st114', group: 'Matematika #04', xp: 1360, coins: 390, attendance: 'present', grade: 90, paid: true },
    { id: 'st_15', name: 'Xoliqov Sherzod', login: 'oquvchi15', pass: 'st115', group: 'Frontend #14', xp: 1230, coins: 295, attendance: 'present', grade: 85, paid: true },
    { id: 'st_16', name: 'Ergasheva Nigina', login: 'oquvchi16', pass: 'st116', group: 'IELTS #09', xp: 1470, coins: 460, attendance: 'present', grade: 94, paid: true },
    { id: 'st_17', name: 'Jorayev Ulugbek', login: 'oquvchi17', pass: 'st117', group: 'Python #07', xp: 1180, coins: 275, attendance: 'late', grade: 82, paid: true },
    { id: 'st_18', name: 'Komilova Dildora', login: 'oquvchi18', pass: 'st118', group: 'Matematika #04', xp: 1430, coins: 450, attendance: 'present', grade: 91, paid: true },
    { id: 'st_19', name: 'Shukurov Mirjalol', login: 'oquvchi19', pass: 'st119', group: 'Frontend #14', xp: 1310, coins: 365, attendance: 'present', grade: 88, paid: false },
    { id: 'st_20', name: 'Azimova Shahlo', login: 'oquvchi20', pass: 'st120', group: 'IELTS #09', xp: 1525, coins: 540, attendance: 'present', grade: 96, paid: true }
  ],
  tickets: [
    { id: 'tk_1', fromName: 'Aliyev Sardor', fromRole: "O'quvchi (Frontend #14)", target: 'Admin (Xolmatova Dilnoza)', question: "Assalomu alaykum, keyingi oy uchun kurs to'lovini Click orqali qilsam bo'ladimi?", answer: "Va alaykum assalom! Ha, albatta. Markazimizda Click, Payme va naqd pul orqali to'lov qabul qilinadi.", answeredBy: 'Admin Xolmatova Dilnoza', time: 'Bugun, 10:15' }
  ]
};

function readDB() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(initialDB, null, 2));
  }
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

app.post('/api/login', (req, res) => {
  const { login, password } = req.body;
  const db = readDB();

  const staffUser = db.staff.find(u => u.login.toLowerCase() === String(login).toLowerCase() && u.pass === password);
  if (staffUser) {
    const { pass, ...safeUser } = staffUser;
    return res.json({ success: true, user: safeUser });
  }

  const studentUser = db.students.find(s => s.login.toLowerCase() === String(login).toLowerCase() && s.pass === password);
  if (studentUser) {
    const { pass, ...safeStudent } = studentUser;
    return res.json({ success: true, user: { ...safeStudent, role: 'student' } });
  }

  return res.status(401).json({ success: false, message: "Login yoki parol noto'g'ri!" });
});

app.get('/api/data', (req, res) => {
  const role = req.query.role || 'student';
  const db = readDB();
  const safeStaff = db.staff.map(({ pass, ...rest }) => rest);
  const safeStudents = db.students.map(s => {
    if (['director', 'admin', 'teacher'].includes(role)) return s;
    const { pass, login, ...publicStudent } = s;
    return publicStudent;
  });
  res.json({ staff: safeStaff, students: safeStudents, tickets: db.tickets });
});

app.put('/api/students/:id', (req, res) => {
  const { id } = req.params;
  const { attendance, grade } = req.body;
  const db = readDB();
  const student = db.students.find(s => s.id === id);
  if (!student) return res.status(404).json({ error: "O'quvchi topilmadi" });

  if (attendance) student.attendance = attendance;
  if (grade !== undefined) {
    const diff = Number(grade) - student.grade;
    student.grade = Math.min(100, Math.max(0, Number(grade)));
    student.xp = Math.max(0, student.xp + diff * 10);
    if (diff > 0) student.coins += diff * 3;
  }
  writeDB(db);
  res.json({ success: true, student });
});

app.post('/api/tickets', (req, res) => {
  const { fromName, fromRole, target, question } = req.body;
  const db = readDB();
  const ticket = { id: 'tk_' + Date.now(), fromName, fromRole, target, question, answer: '', answeredBy: '', time: 'Hozirgina' };
  db.tickets.unshift(ticket);
  writeDB(db);
  res.json({ success: true, ticket });
});

app.put('/api/tickets/:id/reply', (req, res) => {
  const { id } = req.params;
  const { answer, answeredBy } = req.body;
  const db = readDB();
  const ticket = db.tickets.find(t => t.id === id);
  if (!ticket) return res.status(404).json({ error: 'Topilmadi' });
  ticket.answer = answer;
  ticket.answeredBy = answeredBy;
  writeDB(db);
  res.json({ success: true, ticket });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log('Ziyo Edu Server running on port ' + PORT);
});
