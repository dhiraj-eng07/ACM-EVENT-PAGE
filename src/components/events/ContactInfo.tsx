import { motion } from "framer-motion";
import { MapPin, Mail, Phone, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const ContactInfo = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-16"
    >
      <Card className="p-8 md:p-12 bg-gradient-to-br from-card via-accent/30 to-card border-border shadow-2xl overflow-hidden relative">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-0" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary-glow/5 rounded-full blur-3xl -z-0" />

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mb-10"
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Get In Touch
            </h3>
            <p className="text-muted-foreground text-lg">
              Have questions? We're here to help!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Left Column - Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
                className="flex items-start gap-4 p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-primary-glow/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2 text-lg">Address</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Pimpri Chinchwad College of Engineering,<br />
                    Sector 26, Pradhikaran, Nigdi,<br />
                    Pune, Maharashtra 411044
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
                className="flex items-start gap-4 p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-primary-glow/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2 text-lg">Email</h4>
                  <a
                    href="mailto:acm@pccoer.in"
                    className="text-sm text-primary hover:text-primary-glow transition-colors duration-300 flex items-center gap-2 group"
                  >
                    acm@pccoer.in
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
                className="flex items-start gap-4 p-4 rounded-xl bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-primary-glow/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2 text-lg">Coordinator Contact</h4>
                  <a
                    href="tel:+919876543210"
                    className="text-sm text-primary hover:text-primary-glow transition-colors duration-300 flex items-center gap-2 group"
                  >
                    +91 98765 43210
                    <Phone className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Google Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="rounded-2xl overflow-hidden shadow-2xl h-80 md:h-auto border border-border/50"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.7764!2d73.7666!3d18.6510!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9c7c1d0e9ed%3A0x2b3f1b7e1c8e1c8e!2sPimpri%20Chinchwad%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="PCCOE Location"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 text-center"
          >
            <a
              href="https://forms.google.com/your-form-id"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="px-10 py-6 text-base shadow-lg hover:shadow-xl transition-all duration-300">
                <ExternalLink className="w-5 h-5 mr-2" />
                Register for Events
              </Button>
            </a>
            <p className="text-xs text-muted-foreground mt-4">
              Click to fill out our registration form
            </p>
          </motion.div>
        </div>
      </Card>
    </motion.section>
  );
};
