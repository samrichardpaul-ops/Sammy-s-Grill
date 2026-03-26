import { sendReservationEmail } from './src/lib/mail';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function main() {
  console.log("Starting test...");
  try {
    await sendReservationEmail("shreyass7677@gmail.com", {
      full_name: "Test User",
      reservation_date: "2026-04-10",
      reservation_time: "19:00",
      guests: 2,
      special_requests: "Window seat",
    });
    console.log("Test finished.");
  } catch (err) {
    console.error(err);
  }
}

main();
