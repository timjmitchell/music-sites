"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function EmailSignupSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      return;
    }

    setStatus("loading");

    // TODO: Connect to Resend API
    await new Promise((resolve) => setTimeout(resolve, 500));

    setStatus("success");
    setEmail("");
  };

  if (status === "success") {
    return (
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/10 rounded-lg transform translate-x-2 translate-y-2" />
            <div className="relative bg-card border border-border rounded-lg p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Thanks for signing up!
              </h2>
              <p className="text-muted-foreground">
                We&apos;ll keep you posted on new releases and tour dates.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          {/* Background offset */}
          <div className="absolute inset-0 bg-primary/10 rounded-lg transform translate-x-2 translate-y-2" />

          {/* Main card */}
          <div className="relative bg-card border border-border rounded-lg p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Stay in the Loop
            </h2>
            <p className="text-muted-foreground mb-6">
              Get exclusive updates, new releases, and tour announcements
              delivered straight to your inbox.
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                required
              />
              <Button type="submit" disabled={status === "loading"}>
                {status === "loading" ? "..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
