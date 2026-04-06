import fs from 'fs';
const urls = [
  "https://images.unsplash.com/photo-1593642632823-8f785ba67e45",
  "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e",
  "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c",
  "https://images.unsplash.com/photo-1505693314120-0d443867891c",
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
  "https://images.unsplash.com/photo-1550226891-ef816aed4a98",
  "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
  "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc",
  "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1",
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  "https://images.unsplash.com/photo-1540638349517-3bfceae21ad3",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
  "https://images.unsplash.com/photo-1594620302200-9a7620a27e7f",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9"
];

async function check() {
  for (const url of urls) {
    try {
      const r = await fetch(url + "?w=10");
      if (!r.ok) console.log("FAIL:", url, r.status);
      else console.log("OK:", url);
    } catch(e) {
      console.log("ERR:", url, e.message);
    }
  }
}
check();
