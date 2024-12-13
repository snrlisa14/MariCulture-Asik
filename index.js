const express = require("express");
const path = require("path");
const app = express();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const recommendationController = require("./controllers/recommendation");
const indicatorController = require("./controllers/indicator");
const dashboardKesehatanController = require("./controllers/dashboardKesehatan");
const dashboardAkuakulturController = require("./controllers/dashboardAkuakultur");
const dashboardRekomendasiController = require("./controllers/dashboardRekomendasi");
const identifikasiController = require("./controllers/identifikasi");
const pakanController = require("./controllers/pakan");
const userController = require("./controllers/user");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const fs = require("fs");
const session = require("express-session");
const flash = require("connect-flash");

// Pastikan direktori tempat gambar akan disimpan ada
const uploadDir = path.join(__dirname, "public", "img", "upload", "kesehatan");

const uploadDirAkuakultur = path.join(
  __dirname,
  "public",
  "img",
  "upload",
  "akuakultur"
);

// Direktori untuk menyimpan gambar rekomendasi
const uploadDirRecommendation = path.join(
  __dirname,
  "public",
  "img",
  "upload",
  "rekomendasi"
);

// Membuat direktori jika belum ada
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // recursive: true akan membuat folder dalam folder yang belum ada
}

// Membuat direktori jika belum ada
if (!fs.existsSync(uploadDirAkuakultur)) {
  fs.mkdirSync(uploadDirAkuakultur, { recursive: true });
}

// Membuat direktori jika belum ada
if (!fs.existsSync(uploadDirRecommendation)) {
  fs.mkdirSync(uploadDirRecommendation, { recursive: true });
}

const storageHealth = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Menyimpan file gambar di folder img/uploads/kesehatan
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Menggunakan timestamp agar nama file unik
  },
});
const storageAkuakultur = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirAkuakultur); // Menyimpan file gambar di folder img/uploads/kesehatan
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Menggunakan timestamp agar nama file unik
  },
});

// Konfigurasi multer untuk rekomendasi
const storageRecommendation = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirRecommendation);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadHealth = multer({ storage: storageHealth });
const uploadAkuakultur = multer({ storage: storageAkuakultur });
const uploadRekomendasi = multer({ storage: storageRecommendation });

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "your-secret-key", // Ganti dengan secret key yang aman
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

// Middleware untuk parsing request body dan cookie
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Middleware cookie-parser

// Middleware untuk cek login
const checkLogin = (req, res, next) => {
  const username = req.cookies.username; // Ambil username dari cookie
  if (!username) {
    return res.redirect("/login"); // Redirect ke login jika tidak ada username
  }
  next(); // Lanjutkan ke route berikutnya jika sudah login
};

// Routes
app.get("/", async (req, res) => {
  // const users = await prisma.health.findMany();
  // console.log(users + "tes");

  // res.render("index", { users });
  res.render("index");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/akuakultur", async (req, res) => {
  const akuakultur = await prisma.akuakultur.findMany();
  res.render("akuakultur", { akuakultur });
});

app.get("/indikator", async (req, res) => {
  const fish = await prisma.fish.findMany();
  res.render("indikator", { fish });
});
app.post("/indikator/check", indicatorController.getCheckEnvirontment);

app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.post("/register", userController.registerPost);

app.get("/kesehatan", async (req, res) => {
  const kesehatan = await prisma.health.findMany();
  res.render("kesehatan", { kesehatan });
});

app.get("/rekomendasi", recommendationController.getRecommendations);

app.get("/identifikasi", async (req, res) => {
  try {
    // Ambil semua gejala dari database
    const symptoms = await prisma.symptom.findMany();

    // Render halaman dengan gejala yang diambil
    res.render("identifikasi", {
      symptoms,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching symptoms.");
  }
});
// POST untuk memproses hasil identifikasi
app.post("/identifikasi", identifikasiController.identifikasiPost);

app.get("/pakan", async (req, res) => {
  const fish = await prisma.fish.findMany();
  res.render("pakan", { fish });
});
app.post("/pakan", pakanController.identifikasiPost);

// login
app.get("/login", userController.renderLoginPage);
app.post("/login", userController.login);
app.get("/logout", userController.logout);

// Halaman yang membutuhkan login untuk mengaksesnya
app.get("/dashboard", checkLogin, userController.dashboard);
// kesehatan
app.get(
  "/dashboard-kesehatan",
  checkLogin,
  dashboardKesehatanController.dashboardKesehatan
);
app.post(
  "/delete-kesehatan/:id",
  checkLogin,
  dashboardKesehatanController.deleteKesehatan
);
app.get(
  "/edit-kesehatan/:id",
  checkLogin,
  dashboardKesehatanController.editKesehatan
);

app.post(
  "/edit-kesehatan/:id",
  uploadHealth.single("image"),
  checkLogin,
  dashboardKesehatanController.editPostKesehatan
);

app.get("/add-kesehatan", checkLogin, (req, res) => {
  res.render("cms/kesehatan/add-kesehatan");
});
app.post(
  "/add-kesehatan",
  uploadHealth.single("image"),
  checkLogin,
  dashboardKesehatanController.addPostKesehatan
);

// akuakultur
app.get(
  "/dashboard-akuakultur",
  checkLogin,
  dashboardAkuakulturController.dashboardAkuakultur
);
app.post(
  "/delete-akuakultur/:id",
  checkLogin,
  dashboardAkuakulturController.deleteAkuakultur
);
app.get(
  "/edit-akuakultur/:id",
  checkLogin,
  dashboardAkuakulturController.editAkuakultur
);

app.post(
  "/edit-akuakultur/:id",
  uploadAkuakultur.single("image"),
  checkLogin,
  dashboardAkuakulturController.editPostAkuakultur
);

app.get("/add-akuakultur", checkLogin, (req, res) => {
  res.render("cms/akuakultur/add-akuakultur");
});
app.post(
  "/add-akuakultur",
  uploadAkuakultur.single("image"),
  checkLogin,
  dashboardAkuakulturController.addPostAkuakultur
);

// rekomendasi
app.get(
  "/dashboard-rekomendasi",
  checkLogin,
  dashboardRekomendasiController.dashboardRekomendasi
);
app.post(
  "/delete-rekomendasi/:id",
  checkLogin,
  dashboardRekomendasiController.deleteRekomendasi
);
app.get(
  "/edit-rekomendasi/:id",
  checkLogin,
  dashboardRekomendasiController.editRekomendasi
);

app.post(
  "/edit-rekomendasi/:id",
  uploadRekomendasi.single("image"),
  checkLogin,
  dashboardRekomendasiController.editPostRekomendasi
);

app.get("/add-rekomendasi", checkLogin, async (req, res) => {
  const categories = await prisma.categoryRecommend.findMany();
  res.render("cms/rekomendasi/add-rekomendasi", { categories });
});

app.post(
  "/add-rekomendasi",
  uploadRekomendasi.single("image"),
  checkLogin,
  dashboardRekomendasiController.addPostRekomendasi
);

// Route: Halaman Utama
app.get('/', (req, res) => {
  const query = `SELECT * FROM budidaya_nelayan ORDER BY tanggal DESC;`;
  db.query(query, (err, results) => {
      if (err) {
          console.error('Gagal mengambil data:', err);
          res.status(500).send('Gagal mengambil data.');
      } else {
          res.render('dashboard', { data: results });
      }
  });
});

// Route: Tambah Data
app.post('/add', (req, res) => {
  const { nama, jenis_budidaya, lokasi, tanggal } = req.body;
  const query = `
      INSERT INTO budidaya_nelayan (nama, jenis_budidaya, lokasi, tanggal) 
      VALUES (?, ?, ?, ?);
  `;
  db.query(query, [nama, jenis_budidaya, lokasi, tanggal], (err) => {
      if (err) {
          console.error('Gagal menambahkan data:', err);
          res.status(500).send('Gagal menambahkan data.');
      } else {
          res.redirect('/');
      }
  });
});

// Route: Hapus Data
app.post('/delete/:id', (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM budidaya_nelayan WHERE id = ?;`;
  db.query(query, [id], (err) => {
      if (err) {
          console.error('Gagal menghapus data:', err);
          res.status(500).send('Gagal menghapus data.');
      } else {
          res.redirect('/');
      }
  });
});

// Route: Edit Data (Form & Update)
app.get('/edit/:id', (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM budidaya_nelayan WHERE id = ?;`;
  db.query(query, [id], (err, results) => {
      if (err) {
          console.error('Gagal mengambil data:', err);
          res.status(500).send('Gagal mengambil data.');
      } else {
          res.render('edit', { item: results[0] });
      }
  });
});

app.post('/edit/:id', (req, res) => {
  const { id } = req.params;
  const { nama, jenis_budidaya, lokasi, tanggal } = req.body;
  const query = `
      UPDATE budidaya_nelayan 
      SET nama = ?, jenis_budidaya = ?, lokasi = ?, tanggal = ? 
      WHERE id = ?;
  `;
  db.query(query, [nama, jenis_budidaya, lokasi, tanggal, id], (err) => {
      if (err) {
          console.error('Gagal memperbarui data:', err);
          res.status(500).send('Gagal memperbarui data.');
      } else {
          res.redirect('/');
      }
  });
});

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
