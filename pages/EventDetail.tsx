import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Calendar, Clock, MapPin, Users, Award, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/events/AnimatedCounter";
import { PhotoGallery } from "@/components/events/PhotoGallery";

interface EventDetail {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  heroImage: string;
  summaryImage: string;
  attendees: number;
  speakers: number;
  website?: string;
  fullDescription: string;
  gallery: string[];
}

const eventDetails: Record<string, EventDetail> = {
  "icpc-guidance-session": {
    id: 1,
    title: "ICPC Guidance Session",
    date: "Sep 15, 2024",
    time: "3:00 PM - 5:00 PM",
    location: "College Campus",
    description: "An interactive session with an ICPC veteran sharing expert tips for competitive programming.",
    heroImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop",
    summaryImage: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop",
    attendees: 120,
    speakers: 2,
    website: "https://icpc.global",
    fullDescription: "This comprehensive guidance session brought together aspiring competitive programmers with ICPC veterans. Students learned advanced problem-solving techniques, effective time management strategies, and gained insights into the world of competitive programming. The session featured live coding demonstrations, Q&A segments, and personalized guidance for students at different skill levels.",
    gallery: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop",
    ],
  },
  "teachers-day-celebration": {
    id: 2,
    title: "Teacher's Day Celebration",
    date: "Sep 5, 2024",
    time: "10:00 AM - 1:00 PM",
    location: "College Auditorium",
    description: "We celebrated our mentors with gratitude and joy on this special occasion.",
    heroImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&auto=format&fit=crop",
    summaryImage: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop",
    attendees: 250,
    speakers: 5,
    fullDescription: "A heartfelt celebration honoring our dedicated teachers and mentors. The event featured student performances, heartwarming speeches, and special awards recognizing exceptional teaching contributions. It was a day filled with gratitude, appreciation, and memorable moments that strengthened the bond between students and teachers.",
    gallery: [
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop",
    ],
  },
  "code-fiesta-2023": {
    id: 3,
    title: "Code Fiesta 2023",
    date: "Nov 20, 2023",
    time: "2:00 PM - 6:00 PM",
    location: "Computer Lab",
    description: "Participants dived into the world of coding with this fun-filled contest.",
    heroImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop",
    summaryImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop",
    attendees: 85,
    speakers: 3,
    website: "https://codefiesta.acm.org",
    fullDescription: "An exciting coding competition that challenged participants with algorithmic problems, data structure challenges, and real-world scenarios. Students competed individually and in teams, showcasing their problem-solving abilities and coding prowess in a thrilling environment.",
    gallery: [
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop",
    ],
  },
  "git-github-workshop": {
    id: 4,
    title: "Git GitHub Workshop",
    date: "Aug 10, 2023",
    time: "10:00 AM - 12:30 PM",
    location: "Tech Lab",
    description: "A hands-on workshop to master Git and GitHub for seamless collaboration.",
    heroImage: "https://images.unsplash.com/photo-1618401479427-c8ef9465fbe1?w=1200&auto=format&fit=crop",
    summaryImage: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&auto=format&fit=crop",
    attendees: 95,
    speakers: 2,
    fullDescription: "A comprehensive hands-on workshop covering Git fundamentals, branching strategies, collaborative workflows, and best practices for using GitHub. Participants gained practical experience with version control, pull requests, and team collaboration tools essential for modern software development.",
    gallery: [
      "https://images.unsplash.com/photo-1618401479427-c8ef9465fbe1?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop",
    ],
  },
};

const EventDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [showLogo, setShowLogo] = useState(true);

  const event = slug ? eventDetails[slug] : null;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-accent">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Event Not Found</h1>
          <Link to="/">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Logo Animation */}
      <AnimatePresence>
        {showLogo && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-primary to-primary-glow"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1 }}
              className="text-center"
            >
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">
                ACM
              </h1>
              <div className="text-2xl md:text-4xl font-light text-white/90">
                × PCCOER
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-br from-background via-accent to-background">
        {/* Back Button */}
        <div className="container mx-auto px-4 py-8">
          <Link to="/">
            <Button variant="outline" size="lg">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Button>
          </Link>
        </div>

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative h-[60vh] overflow-hidden"
        >
          <div className="absolute inset-0">
            <img
              src={event.heroImage}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          </div>

          <div className="container mx-auto px-4 h-full flex items-end pb-16 relative z-10">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="max-w-4xl"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-4 text-foreground">
                {event.title}
              </h1>
              <div className="flex flex-wrap gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{event.location}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="container mx-auto px-4 py-16"
        >
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <AnimatedCounter
              icon={<Users className="w-12 h-12" />}
              value={event.attendees}
              label="Participants"
            />
            <AnimatedCounter
              icon={<Award className="w-12 h-12" />}
              value={event.speakers}
              label="Speakers"
            />
          </div>
        </motion.section>

        {/* Summary Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="container mx-auto px-4 py-16"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-foreground">
                Event Overview
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {event.fullDescription}
              </p>
              {event.website && (
                <a
                  href={event.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-6"
                >
                  <Button size="lg">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit Event Website
                  </Button>
                </a>
              )}
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src={event.summaryImage}
                alt="Event summary"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </motion.section>

        {/* Photo Gallery */}
        <PhotoGallery images={event.gallery} />

        {/* Footer */}
        <footer className="container mx-auto px-4 py-12 text-center border-t border-border">
          <p className="text-muted-foreground">
            © 2025 ACMxPCCOER. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
};

export default EventDetail;
