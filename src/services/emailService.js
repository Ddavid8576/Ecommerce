const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendResetPasswordEmail = async (email, resetToken) => {
  const resetUrl = `http://localhost:3000/#reset-password?token=${resetToken}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Restablecer Contraseña',
    html: `
      <h1>Restablecer Contraseña</h1>
      <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
      <a href="${resetUrl}"><button>Restablecer Contraseña</button></a>
      <p>O copia este token y úsalo en el formulario de restablecimiento:</p>
      <p><strong>${resetToken}</strong></p>
      <p>Este enlace expira en 1 hora.</p>
    `,
  };
  await transporter.sendMail(mailOptions);
};

module.exports = { sendResetPasswordEmail };