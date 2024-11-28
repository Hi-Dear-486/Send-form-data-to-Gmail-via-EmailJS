"use client";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ResolverForm } from "@/lib/validation";
import { FormSchema } from "@/lib/validation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
type FormData = z.infer<typeof FormSchema>;

const Home: React.FC = () => {
  // UseRef hook typed to HTMLFormElement
  const formRef = useRef<HTMLFormElement | null>(null);

  // Initialize useForm with schema and default values
  const form = useForm<FormData>({ ...ResolverForm });

  // Email sending function
  const sendEmail = (data: FormData) => {
    if (formRef.current) {
      emailjs
        .sendForm("service_7dvwulj", "template_3wt9yw1", formRef.current, {
          publicKey: "lQkkaPPPBEFkZWocS",
        })
        .then(
          () => {
            console.log("SUCCESS!");
            form.reset();
          },
          (error) => {
            console.log("FAILED...", error.text);
          }
        );
    }
  };

  // onSubmit function for form submission
  const onSubmit = (data: FormData) => {
    try {
      toast.success("Form submitted successfully!");
    } catch (error: any) {
      toast.error(error.message);
    }
    // Send email after form submission
    sendEmail(data);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Form {...form}>
        <form
          ref={formRef} // Attach the formRef to the form
          onSubmit={form.handleSubmit(onSubmit)} // Handle the form submit
          className="max-w-lg w-full p-6 bg-white rounded-lg shadow-lg"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="user_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea placeholder="Type your message here." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-4">
            <Button type="submit">Send message</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Home;
