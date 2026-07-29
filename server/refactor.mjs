import fs from 'fs';
import path from 'path';

const dir = './src/controllers';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

files.push('../middleware/auth.ts');

for (const file of files) {
  const p = path.join(dir, file);
  let c = fs.readFileSync(p, 'utf-8');
  c = c.replace(/import prisma from '\.\.\/config\/db\.js';\n/g, '');
  c = c.replace(/prisma\./g, "c.get('prisma').");
  fs.writeFileSync(p, c);
}
console.log('Refactor complete');
