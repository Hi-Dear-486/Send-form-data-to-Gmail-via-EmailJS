import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Zod schema for form validation
export const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  user_email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(5, {
    message: "Message must be at least 5 characters long.",
  }),
});

// Initialize useForm with schema and default values
export const ResolverForm = {
  resolver: zodResolver(FormSchema),
  defaultValues: {
    username: "",
    user_email: "",
    message: "",
  },
};
