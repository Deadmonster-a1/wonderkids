import { asyncWrapper } from '../utils/asyncWrapper.js';
import { Router } from 'express';
import { validate } from '../middleware/validate.js';
import { contactSchema } from '../schemas/contact.schema.js';
import { admissionSchema } from '../schemas/admission.schema.js';
import { getTeachers } from '../controllers/teacher.controller.js';
import { getPrograms } from '../controllers/program.controller.js';
import { getFees } from '../controllers/fee.controller.js';
import { getTestimonials } from '../controllers/testimonial.controller.js';
import { getGallery } from '../controllers/gallery.controller.js';
import { getFaqs } from '../controllers/faq.controller.js';
import { getSettings } from '../controllers/setting.controller.js';
import { submitContact } from '../controllers/contact.controller.js';
import { submitInquiry } from '../controllers/admission.controller.js';

const router = Router();

// READ endpoints (no auth)
router.get('/teachers', asyncWrapper(getTeachers));
router.get('/programs', asyncWrapper(getPrograms));
router.get('/fees', asyncWrapper(getFees));
router.get('/testimonials', asyncWrapper(getTestimonials));
router.get('/gallery', asyncWrapper(getGallery));
router.get('/faqs', asyncWrapper(getFaqs));
router.get('/settings', asyncWrapper(getSettings));

// WRITE endpoints (validated, no auth)
router.post('/contact',validate(contactSchema), asyncWrapper(submitContact));
router.post('/admissions/inquire',validate(admissionSchema), asyncWrapper(submitInquiry));

export default router;
