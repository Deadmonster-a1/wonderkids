import { asyncWrapper } from '../utils/asyncWrapper.js';
import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { upload } from '../middleware/upload.js';

// Schemas
import { loginSchema } from '../schemas/auth.schema.js';
import { createTeacherSchema, updateTeacherSchema } from '../schemas/teacher.schema.js';
import { createProgramSchema, updateProgramSchema } from '../schemas/program.schema.js';
import { createFeeSchema, updateFeeSchema } from '../schemas/fee.schema.js';
import { createTestimonialSchema, updateTestimonialSchema } from '../schemas/testimonial.schema.js';
import { createGallerySchema, updateGallerySchema } from '../schemas/gallery.schema.js';
import { createFaqSchema, updateFaqSchema } from '../schemas/faq.schema.js';
import { updateSettingsSchema } from '../schemas/setting.schema.js';

// Controllers
import { login, getMe } from '../controllers/auth.controller.js';
import { getAllTeachers, createTeacher, updateTeacher, deleteTeacher } from '../controllers/teacher.controller.js';
import { getAllPrograms, createProgram, updateProgram, deleteProgram } from '../controllers/program.controller.js';
import { getAllFees, createFee, updateFee, deleteFee } from '../controllers/fee.controller.js';
import { getAllTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../controllers/testimonial.controller.js';
import { getAllGallery, createGalleryItem, updateGalleryItem, deleteGalleryItem } from '../controllers/gallery.controller.js';
import { getAllFaqs, createFaq, updateFaq, deleteFaq } from '../controllers/faq.controller.js';
import { getContacts, updateContact } from '../controllers/contact.controller.js';
import { getInquiries, updateInquiry } from '../controllers/admission.controller.js';
import { getAllSettings, updateSettings } from '../controllers/setting.controller.js';
import { uploadImage } from '../controllers/upload.controller.js';

const router = Router();

// Auth (no middleware)
router.post('/login',validate(loginSchema), asyncWrapper(login));

// All routes below require auth
router.use(authMiddleware);

router.get('/me', asyncWrapper(getMe));

// Teachers
router.get('/teachers', asyncWrapper(getAllTeachers));
router.post('/teachers',validate(createTeacherSchema), asyncWrapper(createTeacher));
router.put('/teachers/:id',validate(updateTeacherSchema), asyncWrapper(updateTeacher));
router.delete('/teachers/:id', asyncWrapper(deleteTeacher));

// Programs
router.get('/programs', asyncWrapper(getAllPrograms));
router.post('/programs',validate(createProgramSchema), asyncWrapper(createProgram));
router.put('/programs/:id',validate(updateProgramSchema), asyncWrapper(updateProgram));
router.delete('/programs/:id', asyncWrapper(deleteProgram));

// Fee Tiers
router.get('/fees', asyncWrapper(getAllFees));
router.post('/fees',validate(createFeeSchema), asyncWrapper(createFee));
router.put('/fees/:id',validate(updateFeeSchema), asyncWrapper(updateFee));
router.delete('/fees/:id', asyncWrapper(deleteFee));

// Testimonials
router.get('/testimonials', asyncWrapper(getAllTestimonials));
router.post('/testimonials',validate(createTestimonialSchema), asyncWrapper(createTestimonial));
router.put('/testimonials/:id',validate(updateTestimonialSchema), asyncWrapper(updateTestimonial));
router.delete('/testimonials/:id', asyncWrapper(deleteTestimonial));

// Gallery
router.get('/gallery', asyncWrapper(getAllGallery));
router.post('/gallery',validate(createGallerySchema), asyncWrapper(createGalleryItem));
router.put('/gallery/:id',validate(updateGallerySchema), asyncWrapper(updateGalleryItem));
router.delete('/gallery/:id', asyncWrapper(deleteGalleryItem));

// FAQs
router.get('/faqs', asyncWrapper(getAllFaqs));
router.post('/faqs',validate(createFaqSchema), asyncWrapper(createFaq));
router.put('/faqs/:id',validate(updateFaqSchema), asyncWrapper(updateFaq));
router.delete('/faqs/:id', asyncWrapper(deleteFaq));

// Contact Submissions
router.get('/contacts', asyncWrapper(getContacts));
router.put('/contacts/:id', asyncWrapper(updateContact));

// Admission Inquiries
router.get('/admissions', asyncWrapper(getInquiries));
router.put('/admissions/:id', asyncWrapper(updateInquiry));

// Settings
router.get('/settings', asyncWrapper(getAllSettings));
router.put('/settings',validate(updateSettingsSchema), asyncWrapper(updateSettings));

// Upload
router.post('/upload',upload.single('image'), asyncWrapper(uploadImage));

export default router;
