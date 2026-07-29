async function test() {
  try {
    const res = await fetch('http://localhost:5173/api/admin/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@wonderkids.com', password: 'admin123' })
    });
    const text = await res.text();
    console.log("Status:", res.status);
    console.log("Response:", text.substring(0, 100));
  } catch(e) {
    console.error(e);
  }
}
test();
