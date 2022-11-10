import { Schema, model } from "mongoose";

interface IContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactFormSchema = new Schema<IContactForm>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
  },
  message: {
    type: String,
    required: true,
  },
});

const ContactForm = model<IContactForm>("contact", ContactFormSchema);
export default ContactForm;
