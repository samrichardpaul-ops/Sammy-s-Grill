fetch("https://formspree.io/f/mbdpljqo", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify({
    email: "test@example.com",
    subject: "Test test 123"
  })
}).then(async r => console.log(r.status, await r.json())).catch(console.error);
