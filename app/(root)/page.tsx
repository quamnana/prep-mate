import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
import { dummyInterviews } from "@/constants";
import { getCurrentUser, isAuthenticated } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from "@/lib/actions/general.action";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
Image;

export default async function HomePage() {
  // const isUserAuthenticated = await isAuthenticated();
  // if (!isUserAuthenticated) redirect("/sign-in");

  const user = await getCurrentUser();

  // Parallel call requests
  const [userInterviews, latestInterviews] = await Promise.all([
    await getInterviewsByUserId(user?.id!),
    await getLatestInterviews({ userId: user?.id! }),
  ]);

  const hasPastInterviews = userInterviews?.length || 0 > 0;
  const hasUpcomingInterviews = latestInterviews?.length || 0 > 0;

  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Prep Smarter, Land Faster with PrepMate!</h2>
          <p className="text-lg">
            Feeling unprepared? Not anymore! PrepMate guides you through mock
            interviews, gives real-time feedback, and prepares you to ace any
            interview.
          </p>

          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start Prepping Now</Link>
          </Button>
        </div>

        <Image
          src="/robot.png"
          alt="prep-bot"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>

        <div className="interviews-section">
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard {...interview} key={interview?.id} />
            ))
          ) : (
            <p>You haven&apost;t taken any interviews yet</p>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Taken a Interview</h2>

        <div className="interviews-section">
          {hasUpcomingInterviews ? (
            latestInterviews?.map((interview) => (
              <InterviewCard {...interview} key={interview?.id} />
            ))
          ) : (
            <p>There are no interviews available</p>
          )}
        </div>
      </section>
    </>
  );
}
