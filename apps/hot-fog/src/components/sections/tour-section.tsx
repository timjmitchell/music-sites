import { MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const shows = [
  {
    date: "Jan 15",
    city: "Los Angeles, CA",
    venue: "The Roxy Theatre",
    status: "available",
  },
  {
    date: "Jan 22",
    city: "San Francisco, CA",
    venue: "The Fillmore",
    status: "available",
  },
  {
    date: "Feb 05",
    city: "Seattle, WA",
    venue: "Neumos",
    status: "low",
  },
  {
    date: "Feb 18",
    city: "Portland, OR",
    venue: "Crystal Ballroom",
    status: "soldout",
  },
];

export function TourSection() {
  return (
    <section id="tour" className="py-24 px-4 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary font-mono text-sm tracking-widest uppercase mb-2">
            On The Road
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Tour Dates</h2>
          <p className="text-muted-foreground">
            Catch us live on our Neon Dreams tour
          </p>
        </div>

        <div className="space-y-4">
          {shows.map((show) => (
            <Card
              key={`${show.date}-${show.city}`}
              className="bg-card/50 border-border/50 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:bg-card transition-colors"
            >
              <div className="flex items-center gap-2 text-primary font-mono font-bold min-w-[100px]">
                <Calendar className="w-4 h-4" />
                {show.date}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{show.city}</h4>
                <p className="text-muted-foreground text-sm flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {show.venue}
                </p>
              </div>
              <Button
                variant={show.status === "soldout" ? "secondary" : "default"}
                disabled={show.status === "soldout"}
                className={
                  show.status === "low" ? "bg-accent hover:bg-accent/90" : ""
                }
              >
                {show.status === "soldout"
                  ? "Sold Out"
                  : show.status === "low"
                    ? "Few Left"
                    : "Get Tickets"}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
