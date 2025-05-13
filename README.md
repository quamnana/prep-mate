# PrepMate

PrepMate is a Next.js-based application designed to help users prepare for job interviews. It provides mock interviews, real-time feedback, and tools to improve interview skills. The platform leverages AI to generate interview questions, analyze responses, and provide structured feedback.

## Tech Stack

PrepMate is built using the following technologies:

- **Frontend**: [Next.js](https://nextjs.org), [React](https://reactjs.org)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **State Management**: [React Hook Form](https://react-hook-form.com)
- **Backend**: [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
- **Database**: [Firestore](https://firebase.google.com/docs/firestore)
- **AI Integration**: [OpenAI GPT-4](https://openai.com), [Google AI SDK](https://ai.google/tools/), [Vapi - Voice AI agents for developers](https://vapi.ai/)
- **Utilities**: [Zod](https://zod.dev) for schema validation, [Day.js](https://day.js.org) for date manipulation
- **Icons**: [Lucide React](https://lucide.dev)
- **Animations**: [tw-animate-css](https://github.com/benface/tw-animate-css)

## Features

- **Mock Interviews**: Conduct mock interviews with AI-powered interviewers.
- **Real-Time Feedback**: Receive structured feedback on communication, technical knowledge, problem-solving, and more.
- **Customizable Questions**: Generate interview questions tailored to specific roles, levels, and tech stacks.
- **Tech Stack Visualization**: Display relevant tech stack icons for each interview.
- **User Dashboard**: View past interviews, feedback, and upcoming interview schedules.
- **Voice Integration**: AI interviewer interacts with users via voice for a realistic experience.

## Usage

### Mock Interview Generation

1. Navigate to the "Interview Generation" page.
2. Start the interview and interact with the AI interviewer.
3. Provide details such as role, level, tech stack, and question preferences to the AI interviewer.

### Viewing Feedback

1. After completing an interview, navigate to the feedback page.
2. View scores, strengths, areas for improvement, and a final assessment.

### Dashboard

1. Access the dashboard to view past interviews and upcoming schedules.
2. Retake interviews or review feedback for improvement.

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- Node.js (v16 or later)
- npm, yarn, pnpm, or bun (for package management)
- Firebase Admin SDK credentials (for database integration)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/prep-mate.git
   cd prep-mate
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:

   ```env
   NEXT_PUBLIC_VAPI_WORKFLOW_ID=your-vapi-workflow-id
   FIREBASE_PROJECT_ID=your-firebase-project-id
   FIREBASE_CLIENT_EMAIL=your-firebase-client-email
   FIREBASE_PRIVATE_KEY=your-firebase-private-key
   ```

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Project Structure

- **`/app`**: Contains the Next.js app directory with pages, layouts, and components.
- **`/components`**: Reusable React components such as `Agent`, `InterviewCard`, and `DisplayTechIcons`.
- **`/constants`**: Stores static data like mappings, schemas, and dummy data.
- **`/lib`**: Utility functions and API integrations (e.g., Firebase, AI SDKs).
- **`/types`**: TypeScript type definitions for the project.
- **`/firebase`**: Firebase client and admin configurations.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - An interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
