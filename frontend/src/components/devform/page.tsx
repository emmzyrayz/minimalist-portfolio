"use client";

import React, {useState} from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  techStack: string;
  programmingLanguages: string[]; // Changed to array
  codingIDEs: string[]; // Changed to array
  contactPreference: "email" | "social";
  socialMediaLink: string;
  projectInterest: string;
  ideas: string;
}

const DeveloperSignupForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    techStack: "",
    programmingLanguages: [], // Initialize as empty array
    codingIDEs: [], // Initialize as empty array
    contactPreference: "email",
    socialMediaLink: "",
    projectInterest: "",
    ideas: "",
  });

  const techStacks = [
    "Web UI/UX Designer",
    "Mobile UI/UX Designer",
    "Frontend Developer",
    "Backend Developer",
    "Mobile Developer",
    "SEO Developer",
    "Data Analyst",
    "Web3 Developer",
  ];

  const programmingLanguages = [
    "JavaScript",
    "Python",
    "Java",
    "C#",
    "Ruby",
    "Go",
    "PHP",
    "Swift",
  ];

  const codingIDEs = [
    "Visual Studio Code",
    "IntelliJ IDEA",
    "Eclipse",
    "PyCharm",
    "Sublime Text",
    "Atom",
    "NetBeans",
    "Xcode",
  ];

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "language" | "ide"
  ) => {
    const {value, checked} = e.target;
    if (type === "language") {
      setFormData((prev) => ({
        ...prev,
        programmingLanguages: checked
          ? [...prev.programmingLanguages, value]
          : prev.programmingLanguages.filter((lang) => lang !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        codingIDEs: checked
          ? [...prev.codingIDEs, value]
          : prev.codingIDEs.filter((ide) => ide !== value),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/register-developer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Registration successful! We will contact you soon.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          techStack: "",
          programmingLanguages: [], // Initialize as empty array
          codingIDEs: [], // Initialize as empty array
          contactPreference: "email",
          socialMediaLink: "",
          projectInterest: "",
          ideas: "",
        });
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      alert("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">
          Developer Registration Form
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Personal Information
          </h3>
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[--black] focus:border-[--black]"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[--black] focus:border-[--black]"
              value={formData.email}
              onChange={(e) =>
                setFormData({...formData, email: e.target.value})
              }
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[--black] focus:border-[--black]"
              value={formData.phone}
              onChange={(e) =>
                setFormData({...formData, phone: e.target.value})
              }
              required
            />
          </div>
        </div>

        {/* Technical Skills */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Technical Skills
          </h3>
          <div className="space-y-2">
            <label
              htmlFor="techStack"
              className="block text-sm font-medium text-gray-700"
            >
              Tech Stack
            </label>
            <select
              id="techStack"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[--black] focus:border-[--black]"
              value={formData.techStack}
              onChange={(e) =>
                setFormData({...formData, techStack: e.target.value})
              }
              required
            >
              <option value="">Select your tech stack</option>
              {techStacks.map((stack) => (
                <option key={stack} value={stack}>
                  {stack}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="programmingLanguage"
              className="block text-sm font-medium text-gray-700"
            >
              Preferred Programming Language
            </label>
            <div className="space-y-2">
              {programmingLanguages.map((language) => (
                <div key={language} className="flex items-center">
                  <input
                    type="checkbox"
                    id={language}
                    value={language}
                    checked={formData.programmingLanguages.includes(language)}
                    onChange={(e) => handleCheckboxChange(e, "language")}
                    className="h-4 w-4 text-[--black] focus:ring-[--black] border-gray-300"
                  />
                  <label
                    htmlFor={language}
                    className="ml-2 text-sm text-gray-700"
                  >
                    {language}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="codingIDE"
              className="block text-sm font-medium text-gray-700"
            >
              Coding IDE
            </label>
            <div className="space-y-2">
              {codingIDEs.map((ide) => (
                <div key={ide} className="flex items-center">
                  <input
                    type="checkbox"
                    id={ide}
                    value={ide}
                    checked={formData.codingIDEs.includes(ide)}
                    onChange={(e) => handleCheckboxChange(e, "ide")}
                    className="h-4 w-4 text-[--black] focus:ring-[--black] border-gray-300"
                  />
                  <label htmlFor={ide} className="ml-2 text-sm text-gray-700">
                    {ide}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Preference */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Contact Preference
          </h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="email-option"
                  name="contactPreference"
                  value="email"
                  checked={formData.contactPreference === "email"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contactPreference: "email" as "email" | "social",
                    })
                  }
                  className="h-4 w-4 text-[--black] focus:ring-[--black] border-gray-300"
                />
                <label
                  htmlFor="email-option"
                  className="ml-2 text-sm text-gray-700"
                >
                  Email
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="social-option"
                  name="contactPreference"
                  value="social"
                  checked={formData.contactPreference === "social"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contactPreference: "social" as "email" | "social",
                    })
                  }
                  className="h-4 w-4 text-[--black] focus:ring-[--black] border-gray-300"
                />
                <label
                  htmlFor="social-option"
                  className="ml-2 text-sm text-gray-700"
                >
                  Social Media
                </label>
              </div>
            </div>
          </div>

          {formData.contactPreference === "social" && (
            <div className="space-y-2">
              <label
                htmlFor="socialMediaLink"
                className="block text-sm font-medium text-gray-700"
              >
                Social Media Profile Link
              </label>
              <input
                id="socialMediaLink"
                type="url"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[--black] focus:border-[--black]"
                value={formData.socialMediaLink}
                onChange={(e) =>
                  setFormData({...formData, socialMediaLink: e.target.value})
                }
                required={formData.contactPreference === "social"}
              />
            </div>
          )}
        </div>

        {/* Project Interest */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Project Interest
          </h3>
          <div className="space-y-2">
            <label
              htmlFor="projectInterest"
              className="block text-sm font-medium text-gray-700"
            >
              Why do you want to join this project?
            </label>
            <textarea
              id="projectInterest"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[--black] focus:border-[--black] h-24"
              value={formData.projectInterest}
              onChange={(e) =>
                setFormData({...formData, projectInterest: e.target.value})
              }
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="ideas"
              className="block text-sm font-medium text-gray-700"
            >
              Your ideas for project growth and participation
            </label>
            <textarea
              id="ideas"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[--black] focus:border-[--black] h-24"
              value={formData.ideas}
              onChange={(e) =>
                setFormData({...formData, ideas: e.target.value})
              }
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[--black] text-white py-2 px-4 rounded-md hover:bg-[--white] hover:text-[--black] focus:text-[--black] border focus:outline-none focus:border-[--black] focus:ring-2 focus:ring-[--black] focus:ring-offset-2 transition-colors duration-200"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default DeveloperSignupForm;