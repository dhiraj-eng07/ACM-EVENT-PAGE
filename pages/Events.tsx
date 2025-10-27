import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TimelineFilter } from "@/components/events/TimelineFilter";
import { EventCard } from "@/components/events/EventCard";
import { StatsSection } from "@/components/events/StatsSection";
import { ContactInfo } from "@/components/events/ContactInfo";

interface Event {
  id: number;
  title: string;
  date: string;
  year: string;
  time: string;
  location: string;
  description: string;
  image: string;
  category: string;
  registrationLink?: string;
  eventDetailsLink?: string;
  attendees?: number;
  speakers?: number;
}

const upcomingEvents: Event[] = [
  {
    id: 1,
    title: "Tech Innovation Summit 2024",
    date: "Oct 15, 2024",
    year: "2024",
    time: "9:00 AM - 5:00 PM",
    location: "PCCOE Campus",
    description: "Join industry leaders as we explore the latest trends in technology innovation and digital transformation.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop",
    category: "conference",
    registrationLink: "https://forms.google.com/your-form-id",
  },
  {
    id: 2,
    title: "AI & Machine Learning Workshop",
    date: "Nov 5, 2024",
    year: "2024",
    time: "10:00 AM - 4:00 PM",
    location: "PCCOE Campus",
    description: "Hands-on workshop focusing on practical applications of AI and machine learning in real-world scenarios.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop",
    category: "workshop",
    registrationLink: "https://forms.google.com/your-form-id",
  },
  {
    id: 3,
    title: "Hackathon 2025",
    date: "Mar 10, 2025",
    year: "2025",
    time: "9:00 AM - 6:00 PM",
    location: "PCCOE Campus",
    description: "24-hour coding marathon where teams compete to build innovative solutions to real-world problems.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop",
    category: "competition",
    registrationLink: "https://forms.google.com/your-form-id",
  },
];

const pastEvents: Event[] = [
  {
    id: 1,
    title: "ICPC Guidance Session",
    date: "Sep 15, 2024",
    year: "2024",
    time: "3:00 PM - 5:00 PM",
    location: "College Campus",
    description: "An interactive session with an ICPC veteran sharing expert tips for competitive programming.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop",
    category: "workshop",
    eventDetailsLink: "/events/icpc-guidance-session",
    attendees: 120,
    speakers: 2,
  },
  {
    id: 2,
    title: "Teacher's Day Celebration",
    date: "Sep 5, 2024",
    year: "2024",
    time: "10:00 AM - 1:00 PM",
    location: "College Auditorium",
    description: "We celebrated our mentors with gratitude and joy on this special occasion.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop",
    category: "celebration",
    eventDetailsLink: "/events/teachers-day-celebration",
    attendees: 250,
    speakers: 5,
  },
  {
    id: 3,
    title: "Code Fiesta 2023",
    date: "Nov 20, 2023",
    year: "2023",
    time: "2:00 PM - 6:00 PM",
    location: "Computer Lab",
    description: "Participants dived into the world of coding with this fun-filled contest.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop",
    category: "contest",
    eventDetailsLink: "/events/code-fiesta-2023",
    attendees: 85,
    speakers: 3,
  },
  {
    id: 4,
    title: "Git GitHub Workshop",
    date: "Aug 10, 2023",
    year: "2023",
    time: "10:00 AM - 12:30 PM",
    location: "Tech Lab",
    description: "A hands-on workshop to master Git and GitHub for seamless collaboration.",
    image: "https://images.unsplash.com/photo-1618401479427-c8ef9465fbe1?w=800&auto=format&fit=crop",
    category: "workshop",
    eventDetailsLink: "/events/git-github-workshop",
    attendees: 95,
    speakers: 2,
  },
];

const Events = () => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [selectedYear, setSelectedYear] = useState<string>("all");

  const currentEvents = activeTab === "upcoming" ? upcomingEvents : pastEvents;
  const filteredEvents = selectedYear === "all" 
    ? currentEvents 
    : currentEvents.filter(event => event.year === selectedYear);

  const years = ["all", ...Array.from(new Set(currentEvents.map(e => e.year)))].sort((a, b) => {
    if (a === "all") return -1;
    if (b === "all") return 1;
    return b.localeCompare(a);
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent to-background">
      {/* Decorative Elements */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-primary-glow/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            {activeTab === "upcoming" ? "Upcoming Events" : "Past Events"}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover and participate in our exciting events, workshops, and competitions
          </p>
        </motion.header>

        {/* Stats Section */}
        <StatsSection />

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-4 mb-12"
        >
          <Button
            onClick={() => {
              setActiveTab("upcoming");
              setSelectedYear("all");
            }}
            variant={activeTab === "upcoming" ? "default" : "outline"}
            size="lg"
            className="px-8"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Upcoming Events
          </Button>
          <Button
            onClick={() => {
              setActiveTab("past");
              setSelectedYear("all");
            }}
            variant={activeTab === "past" ? "default" : "outline"}
            size="lg"
            className="px-8"
          >
            <Clock className="w-4 h-4 mr-2" />
            Past Events
          </Button>
        </motion.div>

        {/* Timeline Filter */}
        <TimelineFilter
          years={years}
          selectedYear={selectedYear}
          onYearSelect={setSelectedYear}
        />

        {/* Events Grid */}
        <motion.div
          key={activeTab + selectedYear}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                index={index}
                isPastEvent={activeTab === "past"}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-xl text-muted-foreground">
                No events found for the selected year.
              </p>
            </div>
          )}
        </motion.div>

        {/* Contact Information */}
        <ContactInfo />

        {/* Footer */}
        <footer className="text-center pt-12 border-t border-border mt-16">
          <p className="text-muted-foreground">
            © 2025 ACMxPCCOER. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Events;
