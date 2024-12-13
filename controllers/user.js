  const { PrismaClient } = require("@prisma/client");
  const prisma = new PrismaClient();
  const cookie = require("cookie");

  // Render halaman login
  exports.renderLoginPage = (req, res) => {
    res.render("login");
  };

  // Fungsi login tanpa bcrypt
  exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
      // Mencari user berdasarkan username
      const user = await prisma.user.findUnique({
        where: { username },
      });

      // Jika user tidak ditemukan
      if (!user) {
        return res
          .status(401)
          .send(
            "<script>alert('Username atau password salah!'); window.location.href = '/login';</script>"
          );
      }

      // Cek apakah password sesuai
      if (user.password !== password) {
        return res
          .status(401)
          .send(
            "<script>alert('Username atau password salah!'); window.location.href = '/login';</script>"
          );
      }

      // Set cookie untuk menyimpan username
      res.cookie("username", user.username, { maxAge: 86400000, httpOnly: true }); // Cookie bertahan 1 hari

      // Redirect ke dashboard
      res.redirect("/dashboard");
    } catch (error) {
      console.error(error);
      res.status(500).send("Terjadi kesalahan server");
    }
  };

  exports.registerPost = async (req, res) => {
    const { name, username, email, password } = req.body;

    try {
      // Mencari user berdasarkan username
      const user = await prisma.user.findUnique({
        where: { username },
      });

      // Jika user tidak ditemukan
      if (user) {
        return res
          .status(401)
          .send(
            "<script>alert('Username sudah pernah digunakan!'); window.location.href = '/register';</script>"
          );
      }
      // buat akun baru
      await prisma.user.create({
        data: {
          name,
          username,
          email,
          password,
        },
      });

      // Set cookie untuk menyimpan username
      res.cookie("username", username, { maxAge: 86400000, httpOnly: true }); // Cookie bertahan 1 hari

      // Redirect ke dashboard
      res.redirect("/login");
    } catch (error) {
      console.error(error);
      res.status(500).send("Terjadi kesalahan server");
    }
  };

  // Fungsi dashboard (cek session login)
  exports.dashboard = (req, res) => {
    res.render("cms/dashboard");
  };

  // Fungsi logout
  exports.logout = (req, res) => {
    res.clearCookie("username"); // Menghapus cookie saat logout
    res.redirect("/login");
  };
