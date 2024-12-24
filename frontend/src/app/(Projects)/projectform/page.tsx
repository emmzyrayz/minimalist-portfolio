// app/join/page.tsx
import DeveloperSignupForm from "@/components/devform/page";

export default function JoinPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Documentation section */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Join Our Development Team
          </h1>
          <p className="text-lg text-gray-600">
            Help us build the future of web development with reusable components
          </p>
        </div>

        {/* Form section */}
        <DeveloperSignupForm />
      </div>
    </main>
  );
}
