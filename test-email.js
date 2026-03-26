const nodemailer = require('nodemailer');

async function test() {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'samrichardpaul@gmail.com',
      pass: 'pjxh fyov ukrj imsb' // using the password with spaces
    }
  });

  try {
    const info = await transporter.sendMail({
      from: '"Test" <samrichardpaul@gmail.com>',
      to: 'samrichardpaul@gmail.com',
      subject: 'Test Email',
      text: 'This is a test'
    });
    console.log('Success!', info.messageId);
  } catch (err) {
    console.error('Error:', err.message);
  }
}

test();
