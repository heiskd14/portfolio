import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema } from "@shared/schema";
import { useContactMutation } from "@/hooks/use-portfolio";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { motion } from "framer-motion";
import { Send, Mail, MapPin } from "lucide-react";

export function Contact() {
  const form = useForm({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const mutation = useContactMutation();

  const onSubmit = (data: any) => {
    mutation.mutate(data, {
      onSuccess: () => form.reset(),
    });
  };

  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <SectionHeading title="Get In Touch" subtitle="Have a project in mind? Let's talk." />

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold font-display">Contact Information</h3>
            <p className="text-muted-foreground text-lg">
              I'm currently available for freelance projects and open to new opportunities. 
              Feel free to reach out if you want to collaborate.
            </p>

            <div className="space-y-6 mt-8">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-4 rounded-xl">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-muted-foreground">hello@example.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-4 rounded-xl">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Location</h4>
                  <p className="text-muted-foreground">San Francisco, CA</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border/50 rounded-3xl p-8 shadow-xl"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" className="bg-background/50 h-12" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" className="bg-background/50 h-12" {...field} />
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
                        <Textarea 
                          placeholder="Tell me about your project..." 
                          className="min-h-[150px] bg-background/50 resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={mutation.isPending}
                  className="w-full h-12 text-base font-semibold"
                >
                  {mutation.isPending ? "Sending..." : "Send Message"}
                  <Send className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
