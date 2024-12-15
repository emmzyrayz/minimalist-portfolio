'use client'
import {useEffect, useRef, useState} from "react";
import {
  LuHouse,
  LuMessageSquare,
  LuSettings,
  LuChartColumnIncreasing,
  LuUser,
  LuSend,
  LuPaperclip,
  LuX,
  LuMaximize2,
  LuMinimize2,
  LuUpload,
  LuPen,
  LuTrash,
} from "react-icons/lu";
import './admin.css';

// Types for different sections
type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubLink?: string;
  liveLink?: string;
};

type Skill = {
  id: string;
  name: string;
  proficiency: number;
  category?: string;
};

type Experience = {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  responsibilities: string[];
};

type Message = {
  id: string;
  sender: "admin" | "visitor" | string;
  content: string;
  timestamp: string;
  attachments?: string[];
  read: Boolean;
};

type Visitor = {
  id: string;
  name: string;
  timestamp: string;
};

// Draggable Chat Component
const ChatInterface: React.FC<{
  initialMessages: Message[];
  visitor?: Visitor; // Add optional visitor prop
  onSendMessage: (message: Message, visitorId?: string) => void;
}> = ({initialMessages, visitor, onSendMessage}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({
    x: window.innerWidth - 400,
    y: window.innerHeight - 600,
  });
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{x: number; y: number}>({x: 0, y: 0});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
  }, [messages]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && chatRef.current) {
      setPosition({
        x: e.clientX - dragRef.current.x,
        y: e.clientY - dragRef.current.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const sendMessage = () => {
    if (newMessage.trim() || attachments.length) {
      const newMsg: Message = {
        id: Date.now().toString(),
        sender: "admin",
        content: newMessage,
        timestamp: new Date().toISOString(),
        attachments: attachments.map((file) => file.name),
        read: false,
      };

      // Pass visitor ID if available
      onSendMessage(newMsg, visitor?.id);

      // Update local messages state
      setMessages([...messages, newMsg]);
      setNewMessage("");
      setAttachments([]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files));
    }
  };

  return (
    <div
      ref={chatRef}
      className="fixed z-50 bg-white text-black shadow-lg rounded-lg"
      style={{
        width: isExpanded ? "400px" : "300px",
        height: isExpanded ? "500px" : "100px",
        left: position.x,
        top: position.y,
      }}
    >
      {/* Chat Header */}
      <div
        className="bg-black text-white p-2 flex justify-between items-center cursor-move"
        onMouseDown={handleMouseDown}
      >
        <span>{visitor ? `Chat with ${visitor.name}` : "Portfolio Chat"}</span>
        <div className="flex items-center space-x-2">
          {isExpanded ? (
            <LuMinimize2
              onClick={() => setIsExpanded(false)}
              className="cursor-pointer"
            />
          ) : (
            <LuMaximize2
              onClick={() => setIsExpanded(true)}
              className="cursor-pointer"
            />
          )}
          <LuX
            onClick={() => {
              /* Close chat logic */
            }}
            className="cursor-pointer"
          />
        </div>
      </div>

      {/* Chat Body */}
      {isExpanded && (
        <div className="flex flex-col h-[calc(100%-100px)]">
          <div className="flex-grow overflow-y-auto p-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-2 p-2 rounded ${
                  msg.sender === "admin"
                    ? "bg-gray-200 self-end"
                    : "bg-black text-white self-start"
                }`}
              >
                <p>{msg.content}</p>
                {msg.attachments?.map((attachment) => (
                  <div key={attachment} className="text-sm text-gray-500">
                    📎 {attachment}
                  </div>
                ))}
                <small className="text-xs block text-right">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </small>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          {/* Message Input */}
          <div className="p-4 border-t flex items-center space-x-2">
            <input
              type="file"
              multiple
              className="hidden"
              id="file-upload"
              onChange={handleFileUpload}
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <LuPaperclip />
            </label>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow border p-2 rounded"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />
            <button
              onClick={sendMessage}
              className="bg-black text-white p-2 rounded"
            >
              <LuSend size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Upload Form Modal Component
const UploadModal: React.FC<{
  type: 'project' | 'skill' | 'experience';
  item?: Project | Skill | Experience;
  onClose: () => void;
  onSave: (item: Project | Skill | Experience) => void;
}> = ({ type, item, onClose, onSave }) => {
  const [formData, setFormData] = useState<Project | Skill | Experience | any>(
    item ||
      {
        project: {
          id: "",
          title: "",
          description: "",
          technologies: [""],
          githubLink: "",
          liveLink: "",
        },
        skill: {
          id: "",
          name: "",
          proficiency: 50,
          category: "",
        },
        experience: {
          id: "",
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          responsibilities: [""],
        },
      }[type]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (field: string, index: number, value: string) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = value;
    setFormData({ ...formData, [field]: updatedArray });
  };

  const addArrayItem = (field: string) => {
    setFormData({ 
      ...formData, 
      [field]: [...formData[field], ''] 
    });
  };

  const removeArrayItem = (field: string, index: number) => {
    const updatedArray = formData[field].filter((_: string, i: number) => i !== index);
    setFormData({ ...formData, [field]: updatedArray });
  };

  const handleSubmit = () => {
    // Generate ID if not existing
    const itemToSave = {
      ...formData,
      id: formData.id || Date.now().toString(),
    };

    onSave(itemToSave);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white text-black p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 capitalize">{type} Upload</h2>
        
        {type === 'project' && (
          <>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Project Title"
              className="w-full border p-2 rounded mb-2"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Project Description"
              className="w-full border p-2 rounded mb-2 h-24"
            />
            <div className="mb-2">
              <label>Technologies</label>
              {formData.technologies.map((tech: string, index: number) => (
                <div key={index} className="flex items-center mb-1">
                  <input
                    type="text"
                    value={tech}
                    onChange={(e) => handleArrayChange('technologies', index, e.target.value)}
                    className="flex-grow border p-2 rounded mr-2"
                  />
                  <button 
                    onClick={() => removeArrayItem('technologies', index)}
                    className="bg-black text-white p-2 rounded"
                  >
                    <LuTrash size={16} />
                  </button>
                </div>
              ))}
              <button 
                onClick={() => addArrayItem('technologies')}
                className="bg-black text-white p-2 rounded mt-2"
              >
                Add Technology
              </button>
            </div>
            <input
              type="text"
              name="githubLink"
              value={formData.githubLink}
              onChange={handleInputChange}
              placeholder="GitHub Link"
              className="w-full border p-2 rounded mb-2"
            />
            <input
              type="text"
              name="liveLink"
              value={formData.liveLink}
              onChange={handleInputChange}
              placeholder="Live Project Link"
              className="w-full border p-2 rounded mb-2"
            />
          </>
        )}

        {type === 'skill' && (
          <>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Skill Name"
              className="w-full border p-2 rounded mb-2"
            />
            <div className="mb-2">
              <label>Proficiency</label>
              <input
                type="range"
                name="proficiency"
                value={formData.proficiency}
                onChange={handleInputChange}
                min="0"
                max="100"
                className="w-full"
              />
              <span>{formData.proficiency}%</span>
            </div>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              placeholder="Skill Category (Optional)"
              className="w-full border p-2 rounded mb-2"
            />
          </>
        )}

        {type === 'experience' && (
          <>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              placeholder="Company Name"
              className="w-full border p-2 rounded mb-2"
            />
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              placeholder="Position"
              className="w-full border p-2 rounded mb-2"
            />
            <div className="flex space-x-2 mb-2">
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                placeholder="End Date (Optional)"
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="mb-2">
              <label>Responsibilities</label>
              {formData.responsibilities.map((resp: string, index: number) => (
                <div key={index} className="flex items-center mb-1">
                  <input
                    type="text"
                    value={resp}
                    onChange={(e) => handleArrayChange('responsibilities', index, e.target.value)}
                    className="flex-grow border p-2 rounded mr-2"
                  />
                  <button 
                    onClick={() => removeArrayItem('responsibilities', index)}
                    className="bg-black text-white p-2 rounded"
                  >
                    <LuTrash size={16} />
                  </button>
                </div>
              ))}
              <button 
                onClick={() => addArrayItem('responsibilities')}
                className="bg-black text-white p-2 rounded mt-2"
              >
                Add Responsibility
              </button>
            </div>
          </>
        )}

        <div className="flex justify-end space-x-2 mt-4">
          <button 
            onClick={onClose}
            className="border border-black text-black p-2 rounded"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            className="bg-black text-white p-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const PortfolioDashboard: React.FC = () => {
  // Active tab state
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "messages" | "settings"
  >("dashboard");

  const [selectedUploadType, setSelectedUploadType] = useState<
    "project" | "skill" | "experience" | null
  >(null);

  // Modify the state type to be more explicit
  const [selectedItem, setSelectedItem] = useState<{
    type: "project" | "skill" | "experience";
    item: Project | Skill | Experience;
  } | null>(null);

  const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null);

  // Update the methods to handle null and type correctly
  const handleUpload = (
    item: Project | Skill | Experience,
    type: "project" | "skill" | "experience"
  ) => {
    setSelectedUploadType(type);
    setSelectedItem({type, item});
  };

  const handleEdit = (
    item: Project | Skill | Experience,
    type: "project" | "skill" | "experience"
  ) => {
    setSelectedUploadType(type);
    setSelectedItem({type, item});
  };

  const handleSave = (item: Project | Skill | Experience) => {
    if (!item) return;
    switch (selectedItem?.type) {
      case "project":
        const projectIndex = projects.findIndex((p) => p.id === item.id);
        if (projectIndex !== -1) {
          const updatedProjects = [...projects];
          updatedProjects[projectIndex] = item as Project;
          setProjects(updatedProjects);
        } else {
          setProjects([...projects, item as Project]);
        }
        break;
      case "skill":
        const skillIndex = skills.findIndex((s) => s.id === item.id);
        if (skillIndex !== -1) {
          const updatedSkills = [...skills];
          updatedSkills[skillIndex] = item as Skill;
          setSkills(updatedSkills);
        } else {
          setSkills([...skills, item as Skill]);
        }
        break;
      case "experience":
        const expIndex = experiences.findIndex((e) => e.id === item.id);
        if (expIndex !== -1) {
          const updatedExperiences = [...experiences];
          updatedExperiences[expIndex] = item as Experience;
          setExperiences(updatedExperiences);
        } else {
          setExperiences([...experiences, item as Experience]);
        }
        break;
    }

    // Reset selected item
    setSelectedItem(null);
  };

  const handleDelete = (
    id: string,
    type: "project" | "skill" | "experience"
  ) => {
    switch (type) {
      case "project":
        setProjects(projects.filter((p) => p.id !== id));
        break;
      case "skill":
        setSkills(skills.filter((s) => s.id !== id));
        break;
      case "experience":
        setExperiences(experiences.filter((e) => e.id !== id));
        break;
    }
  };

  // Dummy data (you'll replace these with your actual data)
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      title: "Portfolio Dashboard",
      description: "Responsive admin dashboard for personal portfolio",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
      githubLink: "https://github.com/yourusername/portfolio-dashboard",
    },
  ]);

  const [skills, setSkills] = useState<Skill[]>([
    {id: "1", name: "TypeScript", proficiency: 90},
    {id: "2", name: "React", proficiency: 85},
  ]);

  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: "1",
      company: "Tech Innovations Inc",
      position: "Senior Frontend Developer",
      startDate: "2022-01-01",
      responsibilities: [
        "Developed responsive web applications",
        "Led frontend team",
      ],
    },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "John Doe",
      content: "Interested in discussing a project",
      timestamp: "2024-02-15T10:30:00Z",
      read: false,
    },
    {
      id: "2",
      sender: "Emmanuel dike",
      content: "Interested in discussing a project",
      timestamp: "2024-02-15T10:30:00Z",
      read: false,
    },
  ]);

  const [visitors, setVisitors] = useState<Visitor[]>([
    {
      id: "1",
      name: "Anonymous Visitor",
      timestamp: "2024-02-15T11:45:00Z",
    },
    {
      id: "2",
      name: "Debby Big head",
      timestamp: "2024-02-15T11:45:00Z",
    },
  ]);

  // Analytics data
  const analytics = {
    totalVisitors: visitors.length,
    resumeViews: 42,
    resumeDownloads: 15,
    unreadMessages: messages.filter((msg) => !msg.read).length,
    viewedProject: 6,
    mostViewedProject: "Panflix",
  };

  const [newSkill, setNewSkill] = useState<{
    name: string;
    proficiency: number;
  }>({name: "", proficiency: 0});

  const [newExperience, setNewExperience] = useState<Experience>({
    id: "",
    company: "",
    position: "",
    startDate: "",
    responsibilities: [],
  });

  const [newProject, setNewProject] = useState<Project>({
    id: "",
    title: "",
    description: "",
    technologies: [],
    githubLink: "",
    liveLink: "",
  });

  const [newMessage, setNewMessage] = useState<string>(" ");

  // Enhance message handling
  const handleSendMessage = (newMsg: Message, visitorId?: string) => {
    setMessages((prevMessages) => {
      // Check if message already exists
      const isDuplicate = prevMessages.some(
        (msg) =>
          msg.content === newMsg.content && msg.timestamp === newMsg.timestamp
      );

      if (!isDuplicate) {
        return [...prevMessages, newMsg];
      }
      return prevMessages;
    });

    // Optional: Additional logic for tracking conversations
    if (visitorId) {
      // You might want to update visitor interaction tracking
      console.log(`Message sent to visitor: ${visitorId}`);
    }
  };

  // Enhance save methods for different types
  const handleSaveProject = (project: Project) => {
    setProjects((prevProjects) => {
      // Update existing or add new project
      const existingIndex = prevProjects.findIndex((p) => p.id === project.id);
      if (existingIndex > -1) {
        const updatedProjects = [...prevProjects];
        updatedProjects[existingIndex] = project;
        return updatedProjects;
      }
      return [...prevProjects, project];
    });
    setSelectedUploadType(null);
  };

  const handleSaveSkill = (skill: Skill) => {
    setSkills((prevSkills) => {
      const existingIndex = prevSkills.findIndex((s) => s.id === skill.id);
      if (existingIndex > -1) {
        const updatedSkills = [...prevSkills];
        updatedSkills[existingIndex] = skill;
        return updatedSkills;
      }
      return [...prevSkills, skill];
    });
    setSelectedUploadType(null);
  };

  const handleSaveExperience = (experience: Experience) => {
    setExperiences((prevExperiences) => {
      const existingIndex = prevExperiences.findIndex(
        (e) => e.id === experience.id
      );
      if (existingIndex > -1) {
        const updatedExperiences = [...prevExperiences];
        updatedExperiences[existingIndex] = experience;
        return updatedExperiences;
      }
      return [...prevExperiences, experience];
    });
    setSelectedUploadType(null);
  };

  // const handleAddSkill = () => {
  //   if (newSkill.name && newSkill.proficiency > 0) {
  //     const skillToAdd: Skill = {
  //       id: (skills.length + 1).toString(),
  //       name: newSkill.name,
  //       proficiency: newSkill.proficiency,
  //     };
  //     setSkills([...skills, skillToAdd]);
  //     setNewSkill({name: "", proficiency: 0});
  //   }
  // };

  // const handleAddExperience = () => {
  //   if (
  //     newExperience.company &&
  //     newExperience.position &&
  //     newExperience.startDate
  //   ) {
  //     const experienceToAdd: Experience = {
  //       ...newExperience,
  //       id: (experiences.length + 1).toString(),
  //       responsibilities: newExperience.responsibilities,
  //     };
  //     setExperiences([...experiences, experienceToAdd]);
  //     setNewExperience({
  //       id: "",
  //       company: "",
  //       position: "",
  //       startDate: "",
  //       responsibilities: [],
  //     });
  //   }
  // };

  // const handleAddProject = () => {
  //   if (newProject.title && newProject.description) {
  //     const projectToAdd: Project = {
  //       ...newProject,
  //       id: (projects.length + 1).toString(),
  //     };
  //     setProjects([...projects, projectToAdd]);
  //     setNewProject({
  //       id: "",
  //       title: "",
  //       description: "",
  //       technologies: [],
  //       githubLink: "",
  //       liveLink: "",
  //     });
  //   }
  // };

  // Render different sections based on active tab
  const renderDashboard = () => (
    <div className="p-4 h-full w-full bg-white text-black">
      <h2 className="text-2xl font-bold mb-4">Dashboard Analytics</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="border p-4 rounded">
          <h3 className="font-semibold">Visitors</h3>
          <p>{analytics.totalVisitors}</p>
        </div>
        <div className="border p-4 rounded">
          <h3 className="font-semibold">Resume Views</h3>
          <p>{analytics.resumeViews}</p>
        </div>
        <div className="border p-4 rounded">
          <h3 className="font-semibold">Resume Downloads</h3>
          <p>{analytics.resumeDownloads}</p>
        </div>
        <div className="border p-4 rounded">
          <h3 className="font-semibold">Unread Messages</h3>
          <p>{analytics.unreadMessages}</p>
        </div>
        <div className="border p-4 rounded">
          <h3 className="font-semibold">Viewed Project</h3>
          <p>{analytics.viewedProject}</p>
        </div>
        <div className="border p-4 rounded">
          <h3 className="font-semibold">Most visited Project</h3>
          <p>{analytics.mostViewedProject}</p>
        </div>
      </div>
    </div>
  );

  const renderMessages = () => {
    // Filter messages for the selected visitor if one is selected
    const visitorMessages = selectedVisitor
      ? messages.filter((msg) => msg.sender === selectedVisitor.name)
      : messages;

    return (
      <div className="p-4 h-full w-full bg-white text-black relative">
        <h2 className="text-2xl font-bold mb-4">Messages</h2>
        <div className="flex">
          {/* Visitor List */}
          <div className="w-1/4 border-r pr-4">
            <h3 className="font-semibold mb-2">Visitors</h3>
            {visitors.map((visitor) => (
              <div
                key={visitor.id}
                className={`p-2 cursor-pointer ${
                  selectedVisitor?.id === visitor.id
                    ? "bg-black text-white"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => setSelectedVisitor(visitor)}
              >
                {visitor.name}
              </div>
            ))}
          </div>

          {/* Message List */}
          <div className="w-3/4 pl-4">
            {selectedVisitor ? (
              <ChatInterface
                initialMessages={visitorMessages}
                visitor={selectedVisitor}
                onSendMessage={(newMsg, visitorId) => {
                  handleSendMessage(newMsg);
                  // Additional logic for tracking conversation with specific visitor
                }}
              />
            ) : (
              <div className="text-gray-500">
                Select a visitor to start chatting
              </div>
            )}

            {/* If no visitor is selected, show message list */}
            {!selectedVisitor && (
              <div className="overflow-y-auto max-h-[70vh]">
                {messages.map((message) => (
                  <div key={message.id} className="border-b py-2">
                    <div className="flex justify-between">
                      <span className="font-semibold">{message.sender}</span>
                      <span className="text-sm">
                        {new Date(message.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p>{message.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderSettings = () => {
    return (
      <div className="p-4 h-full w-full bg-white text-black">
        <h2 className="text-2xl font-bold mb-4">Portfolio Settings</h2>

        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Projects</h3>
          <button
            onClick={() => {
              setSelectedUploadType("project");
              setSelectedItem(null); // Use null instead of undefined
            }}
            className="bg-green-500 text-white px-4 py-2 mb-4"
          >
            Add New Project
          </button>
          {projects.map((project) => (
            <div key={project.id} className="border p-4 rounded mb-2">
              <h4 className="font-bold">{project.title}</h4>
              <p>{project.description}</p>
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => {
                    setSelectedUploadType("project");
                    setSelectedItem({type: "project", item: project});
                  }}
                  className="bg-black text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    // Implement delete logic
                    setProjects((prev) =>
                      prev.filter((p) => p.id !== project.id)
                    );
                  }}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* Similar modifications for Skills and Experiences sections */}
        <section className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Skills</h3>
          <button
            onClick={() => {
              setSelectedUploadType("skill");
              setSelectedItem(null);
            }}
            className="bg-green-500 text-white px-4 py-2 mb-4"
          >
            Add New Skill
          </button>
          {skills.map((skill) => (
            <div key={skill.id} className="border p-4 rounded mb-2">
              <div className="flex justify-between">
                <span>{skill.name}</span>
                <span>{skill.proficiency}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div
                  className="bg-black h-2.5 rounded-full"
                  style={{width: `${skill.proficiency}%`}}
                ></div>
              </div>
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => {
                    setSelectedUploadType("skill");
                    setSelectedItem({type: "skill", item: skill});
                  }}
                  className="bg-black text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setSkills((prev) => prev.filter((s) => s.id !== skill.id));
                  }}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2">Experiences</h3>
          <button
            onClick={() => {
              setSelectedUploadType("experience");
              setSelectedItem(null);
            }}
            className="bg-green-500 text-white px-4 py-2 mb-4"
          >
            Add New Experience
          </button>
          {experiences.map((exp) => (
            <div key={exp.id} className="border p-4 rounded mb-2">
              <h4 className="font-bold">
                {exp.position} at {exp.company}
              </h4>
              <p>
                {exp.startDate} - {exp.endDate || "Present"}
              </p>
              <ul className="list-disc pl-5 mt-2">
                {exp.responsibilities.map((resp, index) => (
                  <li key={index}>{resp}</li>
                ))}
              </ul>
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => {
                    setSelectedUploadType("experience");
                    setSelectedItem({type: "experience", item: exp});
                  }}
                  className="bg-black text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setExperiences((prev) =>
                      prev.filter((e) => e.id !== exp.id)
                    );
                  }}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* Upload Modal */}
        {selectedUploadType && (
          <UploadModal
            type={selectedUploadType}
            item={selectedItem?.item} // Use optional chaining
            onClose={() => {
              setSelectedUploadType(null);
              setSelectedItem(null);
            }}
            onSave={(item) => {
              switch (selectedUploadType) {
                case "project":
                  handleSaveProject(item as Project);
                  break;
                case "skill":
                  handleSaveSkill(item as Skill);
                  break;
                case "experience":
                  handleSaveExperience(item as Experience);
                  break;
              }
              setSelectedUploadType(null);
              setSelectedItem(null);
            }}
          />
        )}
      </div>
    );
  };

  return (
    <div className="flex w-full min-h-[87vh] bg-black text-white">
      {/* Sidebar Navigation */}
      <div className="w-auto px-3  bg-black flex flex-col items-center py-4 space-y-4">
        <button
          className={`flex flex-row items-center justify-between w-full gap-2 p-3 rounded ${
            activeTab === "dashboard"
              ? "bg-white text-black"
              : "hover:bg-gray-800"
          }`}
          onClick={() => setActiveTab("dashboard")}
        >
          <LuHouse />
          <span>Dashboard</span>
        </button>
        <button
          className={`flex flex-row items-center justify-between w-full gap-2 p-3 rounded ${
            activeTab === "messages"
              ? "bg-white text-black"
              : "hover:bg-gray-800"
          }`}
          onClick={() => setActiveTab("messages")}
        >
          <LuMessageSquare />
          <span>Messages</span>
        </button>
        <button
          className={`flex flex-row items-center justify-between gap-2 w-full p-3 rounded ${
            activeTab === "settings"
              ? "bg-white text-black"
              : "hover:bg-gray-800"
          }`}
          onClick={() => setActiveTab("settings")}
        >
          <LuSettings />
          <span>Settings</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex w-full">
        {activeTab === "dashboard" && renderDashboard()}
        {activeTab === "messages" && renderMessages()}
        {activeTab === "settings" && renderSettings()}
      </div>
    </div>
  );
};

export default PortfolioDashboard;