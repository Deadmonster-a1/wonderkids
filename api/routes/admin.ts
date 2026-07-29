import { Hono } from 'hono';
import { authMiddleware } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

// Schemas
import { loginSchema } from '../schemas/auth.schema.js';
import { createTeacherSchema, updateTeacherSchema } from '../schemas/teacher.schema.js';
import { createProgramSchema, updateProgramSchema } from '../schemas/program.schema.js';
import { createFeeSchema, updateFeeSchema } from '../schemas/fee.schema.js';
import { createTestimonialSchema, updateTestimonialSchema } from '../schemas/testimonial.schema.js';
import { createGallerySchema, updateGallerySchema } from '../schemas/gallery.schema.js';
import { createFaqSchema, updateFaqSchema } from '../schemas/faq.schema.js';
import { updateSettingsSchema } from '../schemas/setting.schema.js';
import { createAnnouncementSchema, updateAnnouncementSchema } from '../schemas/announcement.schema.js';

// Controllers
import { login, getMe } from '../controllers/auth.controller.js';
import { getAllTeachers, createTeacher, updateTeacher, deleteTeacher } from '../controllers/teacher.controller.js';
import { getAllPrograms, createProgram, updateProgram, deleteProgram } from '../controllers/program.controller.js';
import { getAllFees, createFee, updateFee, deleteFee } from '../controllers/fee.controller.js';
import { getAllTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../controllers/testimonial.controller.js';
import { getAllGallery, createGalleryItem, updateGalleryItem, deleteGalleryItem } from '../controllers/gallery.controller.js';
import { getAllFaqs, createFaq, updateFaq, deleteFaq } from '../controllers/faq.controller.js';
import { getContacts, updateContact, exportContacts } from '../controllers/contact.controller.js';
import { getInquiries, updateInquiry, exportInquiries } from '../controllers/admission.controller.js';
import { getAllSettings, updateSettings } from '../controllers/setting.controller.js';
import { getAllAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement } from '../controllers/announcement.controller.js';
import { uploadImage } from '../controllers/upload.controller.js';

const app = new Hono();

// Auth
app.post('/login', validate(loginSchema), login);

// All routes below require auth
app.use('/*', authMiddleware);

app.get('/me', getMe);

// Teachers
app.get('/teachers', getAllTeachers);
app.post('/teachers', validate(createTeacherSchema), createTeacher);
app.put('/teachers/:id', validate(updateTeacherSchema), updateTeacher);
app.delete('/teachers/:id', deleteTeacher);

// Programs
app.get('/programs', getAllPrograms);
app.post('/programs', validate(createProgramSchema), createProgram);
app.put('/programs/:id', validate(updateProgramSchema), updateProgram);
app.delete('/programs/:id', deleteProgram);

// Fee Tiers
app.get('/fees', getAllFees);
app.post('/fees', validate(createFeeSchema), createFee);
app.put('/fees/:id', validate(updateFeeSchema), updateFee);
app.delete('/fees/:id', deleteFee);

// Testimonials
app.get('/testimonials', getAllTestimonials);
app.post('/testimonials', validate(createTestimonialSchema), createTestimonial);
app.put('/testimonials/:id', validate(updateTestimonialSchema), updateTestimonial);
app.delete('/testimonials/:id', deleteTestimonial);

// Gallery
app.get('/gallery', getAllGallery);
app.post('/gallery', validate(createGallerySchema), createGalleryItem);
app.put('/gallery/:id', validate(updateGallerySchema), updateGalleryItem);
app.delete('/gallery/:id', deleteGalleryItem);

// FAQs
app.get('/faqs', getAllFaqs);
app.post('/faqs', validate(createFaqSchema), createFaq);
app.put('/faqs/:id', validate(updateFaqSchema), updateFaq);
app.delete('/faqs/:id', deleteFaq);

// Contact Submissions
app.get('/contacts', getContacts);
app.get('/contacts/export', exportContacts);
app.put('/contacts/:id', updateContact);

// Admission Inquiries
app.get('/admissions', getInquiries);
app.get('/admissions/export', exportInquiries);
app.put('/admissions/:id', updateInquiry);

// Settings
app.get('/settings', getAllSettings);
app.put('/settings', validate(updateSettingsSchema), updateSettings);

// Announcements
app.get('/announcements', getAllAnnouncements);
app.post('/announcements', validate(createAnnouncementSchema), createAnnouncement);
app.put('/announcements/:id', validate(updateAnnouncementSchema), updateAnnouncement);
app.delete('/announcements/:id', deleteAnnouncement);

// Upload
app.post('/upload', uploadImage);

export default app;
