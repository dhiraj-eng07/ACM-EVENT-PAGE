import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, Eye, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Event {
  id: number;
  title: string;
  date: string;
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

interface EventCardProps {
  event: Event;
  index: number;
  isPastEvent: boolean;
}

export const EventCard = ({ event, index, isPastEvent }: EventCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 h-full flex flex-col bg-card border-border">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            {event.date}
          </div>
          <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold border border-border capitalize">
            {event.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
            {event.title}
          </h3>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4 text-primary" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{event.location}</span>
            </div>
            {isPastEvent && event.attendees && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4 text-primary" />
                <span>{event.attendees} Attendees</span>
              </div>
            )}
          </div>

          <p className="text-sm text-muted-foreground mb-6 line-clamp-3 flex-1">
            {event.description}
          </p>

          {/* Button */}
          {isPastEvent ? (
            <Link to={event.eventDetailsLink || "#"} className="mt-auto">
              <Button className="w-full" variant="default">
                <Eye className="w-4 h-4 mr-2" />
                View Event Details
              </Button>
            </Link>
          ) : (
            <a
              href={event.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto"
            >
              <Button className="w-full" variant="default">
                <ExternalLink className="w-4 h-4 mr-2" />
                Register Now
              </Button>
            </a>
          )}
        </div>
      </Card>
    </motion.div>
  );
};
