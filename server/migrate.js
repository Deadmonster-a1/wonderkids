import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const controllersDir = path.join(__dirname, 'src/controllers');

const files = fs.readdirSync(controllersDir);

for (const file of files) {
  if (!file.endsWith('.ts')) continue;
  let content = fs.readFileSync(path.join(controllersDir, file), 'utf-8');

  content = content.replace(/import { Request, Response } from 'express';/g, "import { Context } from 'hono';");
  content = content.replace(/(_req|req): Request, res: Response\): Promise<void>/g, "c: Context)");
  
  // replace req.body with (await c.req.json())
  content = content.replace(/req\.body/g, "(await c.req.json())");
  
  // replace req.params with c.req.param()
  content = content.replace(/req\.params/g, "c.req.param()");
  
  // replace res.status(XYZ).json(...) with return c.json(..., XYZ)
  content = content.replace(/res\.status\((\d+)\)\.json\((.*?)\);/g, "return c.json($2, $1);");
  
  // replace res.json(...) with return c.json(...)
  content = content.replace(/res\.json\((.*?)\);/g, "return c.json($1);");
  
  // replace res.setHeader(...) with c.header(...)
  content = content.replace(/res\.setHeader\((.*?)\);/g, "c.header($1);");
  
  // replace res.send(...) with return c.body(...)
  content = content.replace(/res\.send\((.*?)\);/g, "return c.body($1);");
  
  // special case for upload controller
  if (file === 'upload.controller.ts') {
     content = content.replace(/req\.file/g, "c.get('file')"); // placeholder fix
  }
  
  fs.writeFileSync(path.join(controllersDir, file), content);
  console.log(`Migrated ${file}`);
}
