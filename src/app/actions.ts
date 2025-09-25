"use server";

import * as z from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function submitContactForm(formData: unknown) {
  const parsed = contactFormSchema.safeParse(formData);

  if (parsed.success) {
    // In a real application, you would process the form data here,
    // e.g., send an email, save to a database, etc.
    console.log("Contact form submitted successfully:", parsed.data);
    
    // Simulate a successful API call
    return { success: true, message: "Form submitted successfully!" };
  } else {
    // Log the validation errors
    console.error("Contact form validation failed:", parsed.error.flatten().fieldErrors);
    
    // Return an error response
    return { 
      success: false, 
      message: "Invalid form data.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }
}
