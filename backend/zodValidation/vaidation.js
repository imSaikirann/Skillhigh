const z = require('zod');

const departmentSchema = z.object({
  departmentName: z
    .string()
    .min(1, 'Department name is required')
    .max(15, 'Department name must not exceed 15 characters'),
  description: z.string().min(1, 'Description is required'),
});

const faqSchema = z.object({
  question: z
    .string()
    .min(1, { message: 'Question cannot be empty' })
    .regex(/\?$/, { message: 'Question must end with a question mark' }), 
  answer: z.string().min(1, { message: 'Answer cannot be empty' }),
});


const contactusSchema = z.object({
  name: z.string().min(1, 'Name is required'), 
  email: z.string().email('Invalid email address'), 
  phone: z.string().min(1, 'Phone number is required'), 
  message: z.string().min(1, 'Message is required'), 
});


module.exports = {
  departmentSchema,
  faqSchema,
  contactusSchema
};
