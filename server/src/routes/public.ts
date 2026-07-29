import { Hono } from 'hono';
import { validate } from '../middleware/validate.js';
import { contactSchema } from '../schemas/contact.schema.js';
import { admissionSchema } from '../schemas/admission.schema.js';
import { getTeachers } from '../controllers/teacher.controller.js';
import { getPrograms } from '../controllers/program.controller.js';
import { getFees } from '../controllers/fee.controller.js';
import { getTestimonials } from '../controllers/testimonial.controller.js';
import { getGallery } from '../controllers/gallery.controller.js';
import { getFaqs } from '../controllers/faq.controller.js';
import { getActiveAnnouncements } from '../controllers/announcement.controller.js';
import { getSettings } from '../controllers/setting.controller.js';
import { submitContact } from '../controllers/contact.controller.js';
import { submitInquiry } from '../controllers/admission.controller.js';
import { addSSEClient } from '../utils/sse.js';

const app = new Hono();

// READ endpoints (no auth)
app.get('/teachers', getTeachers);
app.get('/programs', getPrograms);
app.get('/fees', getFees);
app.get('/testimonials', getTestimonials);
app.get('/gallery', getGallery);
app.get('/faqs', getFaqs);
app.get('/settings', getSettings);

// Serve uploads from R2
app.get('/public/uploads/:filename', async (c: any) => {
  const filename = c.req.param('filename');
  const bucket = c.env.UPLOAD_BUCKET;
  if (!bucket) return c.json({ error: 'R2 not configured' }, 500);

  const object = await bucket.get(filename);
  if (!object) return c.json({ error: 'Not found' }, 404);

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('etag', object.httpEtag);
  
  return new Response(object.body, { headers });
});

// SSE Endpoint
app.get('/notifications/stream', (c) => {
  return addSSEClient(c);
});

// WRITE endpoints (validated, no auth)
app.post('/contact', validate(contactSchema), submitContact);
app.post('/admissions/inquire', validate(admissionSchema), submitInquiry);

// Announcements
app.get('/announcements', getActiveAnnouncements);

export default app;
