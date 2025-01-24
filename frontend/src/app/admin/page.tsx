'use client'
import {useEffect, useRef, useState} from "react";
import {
  LuHouse,
  LuMessageSquare,
  LuSettings,
  // LuChartColumnIncreasing,
  // LuUser,
  LuSend,
  LuPaperclip,
  LuX,
  LuMaximize2,
  LuMinimize2,
  // LuUpload,
  // LuPen,
  LuTrash,
} from "react-icons/lu";
import './admin.css';

// Types for different sections
// Define more precise interfaces with shared base properties
interface BaseItem {
  id: string;
}

interface Project extends BaseItem {
  title: string;
  description: string;
  technologies: string[];
  githubLink?: string;
  liveLink?: string;
};

interface Skill extends BaseItem {
  name: string;
  proficiency: number;
  category?: string;
};

interface Experience extends BaseItem {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  responsibilities: string[];
};

interface Message extends BaseItem {
  sender: "admin" | "visitor" | string;
  content: string;
  timestamp: string;
  attachments?: string[];
  read: boolean;
};

interface Visitor extends BaseItem {
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

  useEffect(() => {
    
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

// Union type for all possible items
type PortfolioItem = Project | Skill | Experience;


// Upload Form Modal Component
const UploadModal: React.FC<{
  type: "project" | "skill" | "experience";
  item?: PortfolioItem;
  onClose: () => void;
  onSave: (item: PortfolioItem) => void;
}> = ({type, item, onClose, onSave}) => {
  const [formData, setFormData] = useState<PortfolioItem>(() => {
    if (item) return item;

    switch (type) {
      case "project":
        return {
          id: "",
          title: "",
          description: "",
          technologies: [""],
          githubLink: "",
          liveLink: "",
        };
      case "skill":
        return {
          id: "",
          name: "",
          proficiency: 50,
          category: "",
        };
      case "experience":
        return {
          id: "",
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          responsibilities: [""],
        };
    }
  });

  // Modified state update functions to handle type safety
  // Type-safe input change handler
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {name, value} = e.target;

    setFormData((prevData) => {
      // Type-safe spread with type narrowing
      if (type === "project") {
        return {
          ...prevData,
          [name]: name === "technologies" ? [value] : value,
        } as Project;
      }

      if (type === "skill") {
        return {
          ...prevData,
          [name]: name === "proficiency" ? Number(value) : value,
        } as Skill;
      }

      if (type === "experience") {
        return {
          ...prevData,
          [name]: name === "responsibilities" ? [value] : value,
        } as Experience;
      }

      return prevData;
    });
  };

  // Type guard to narrow down the specific type
  // function isProject(item: BaseItem): item is Project {
  //   return (item as Project).title !== undefined;
  // }

  // function isSkill(item: BaseItem): item is Skill {
  //   return (item as Skill).name !== undefined;
  // }

  // function isExperience(item: BaseItem): item is Experience {
  //   return (item as Experience).company !== undefined;
  // }

  const handleArrayChange = (
    field: "technologies" | "responsibilities",
    index: number,
    value: string
  ) => {
    setFormData((prevData) => {
      if (type === "project" && field === "technologies") {
        const technologies = [...(prevData as Project).technologies];
        technologies[index] = value;
        return {...prevData, technologies} as Project;
      }

      if (type === "experience" && field === "responsibilities") {
        const responsibilities = [...(prevData as Experience).responsibilities];
        responsibilities[index] = value;
        return {...prevData, responsibilities} as Experience;
      }

      return prevData;
    });
  };

  const addArrayItem = (field: "technologies" | "responsibilities") => {
    setFormData((prevData) => {
      if (type === "project" && field === "technologies") {
        const technologies = [...(prevData as Project).technologies, ""];
        return {...prevData, technologies} as Project;
      }

      if (type === "experience" && field === "responsibilities") {
        const responsibilities = [
          ...(prevData as Experience).responsibilities,
          "",
        ];
        return {...prevData, responsibilities} as Experience;
      }

      return prevData;
    });
  };

  const removeArrayItem = (
    field: "technologies" | "responsibilities",
    index: number
  ) => {
    setFormData((prevData) => {
      if (type === "project" && field === "technologies") {
        const technologies = (prevData as Project).technologies.filter(
          (_, i) => i !== index
        );
        return {...prevData, technologies} as Project;
      }

      if (type === "experience" && field === "responsibilities") {
        const responsibilities = (
          prevData as Experience
        ).responsibilities.filter((_, i) => i !== index);
        return {...prevData, responsibilities} as Experience;
      }

      return prevData;
    });
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

        {type === "project" && (
          <>
            <input
              type="text"
              name="title"
              value={(formData as Project).title}
              onChange={handleInputChange}
              placeholder="Project Title"
              className="w-full border p-2 rounded mb-2"
            />
            <textarea
              name="description"
              value={(formData as Project).description}
              onChange={handleInputChange}
              placeholder="Project Description"
              className="w-full border p-2 rounded mb-2 h-24"
            />
            <div className="mb-2">
              <label>Technologies</label>
              {(formData as Project).technologies.map((tech: string, index: number) => (
                <div key={index} className="flex items-center mb-1">
                  <input
                    type="text"
                    value={tech}
                    onChange={(e) =>
                      handleArrayChange("technologies", index, e.target.value)
                    }
                    className="flex-grow border p-2 rounded mr-2"
                  />
                  <button
                    onClick={() => removeArrayItem("technologies", index)}
                    className="bg-black text-white p-2 rounded"
                  >
                    <LuTrash size={16} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addArrayItem("technologies")}
                className="bg-black text-white p-2 rounded mt-2"
              >
                Add Technology
              </button>
            </div>
            <input
              type="text"
              name="githubLink"
              value={(formData as Project).githubLink}
              onChange={handleInputChange}
              placeholder="GitHub Link"
              className="w-full border p-2 rounded mb-2"
            />
            <input
              type="text"
              name="liveLink"
              value={(formData as Project).liveLink}
              onChange={handleInputChange}
              placeholder="Live Project Link"
              className="w-full border p-2 rounded mb-2"
            />
          </>
        )}

        {type === "skill" && (
          <>
            <input
              type="text"
              name="name"
              value={(formData as Skill).name}
              onChange={handleInputChange}
              placeholder="Skill Name"
              className="w-full border p-2 rounded mb-2"
            />
            <div className="mb-2">
              <label>Proficiency</label>
              <input
                type="range"
                name="proficiency"
                value={(formData as Skill).proficiency}
                onChange={handleInputChange}
                min="0"
                max="100"
                className="w-full"
              />
              <span>{(formData as Skill).proficiency}%</span>
            </div>
            <input
              type="text"
              name="category"
              value={(formData as Skill).category}
              onChange={handleInputChange}
              placeholder="Skill Category (Optional)"
              className="w-full border p-2 rounded mb-2"
            />
          </>
        )}

        {type === "experience" && (
          <>
            <input
              type="text"
              name="company"
              value={(formData as Experience).company}
              onChange={handleInputChange}
              placeholder="Company Name"
              className="w-full border p-2 rounded mb-2"
            />
            <input
              type="text"
              name="position"
              value={(formData as Experience).position}
              onChange={handleInputChange}
              placeholder="Position"
              className="w-full border p-2 rounded mb-2"
            />
            <div className="flex space-x-2 mb-2">
              <input
                type="date"
                name="startDate"
                value={(formData as Experience).startDate}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="date"
                name="endDate"
                value={(formData as Experience).endDate}
                onChange={handleInputChange}
                placeholder="End Date (Optional)"
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="mb-2">
              <label>Responsibilities</label>
              {(formData as Experience).responsibilities.map((resp: string, index: number) => (
                <div key={index} className="flex items-center mb-1">
                  <input
                    type="text"
                    value={resp}
                    onChange={(e) =>
                      handleArrayChange(
                        "responsibilities",
                        index,
                        e.target.value
                      )
                    }
                    className="flex-grow border p-2 rounded mr-2"
                  />
                  <button
                    onClick={() => removeArrayItem("responsibilities", index)}
                    className="bg-black text-white p-2 rounded"
                  >
                    <LuTrash size={16} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addArrayItem("responsibilities")}
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

  const [visitors] = useState<Visitor[]>([
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

  // Message sending logic
  const handleSendMessage = (newMsg: Message, visitorId?: string) => {
    setMessages((prevMessages) => {
      const isDuplicate = prevMessages.some(
        (msg) =>
          msg.content === newMsg.content && msg.timestamp === newMsg.timestamp
      );

      return isDuplicate ? prevMessages : [...prevMessages, newMsg];
    });

    // if (visitorId) {
    //   console.log(`Message sent to visitor: ${visitorId}`);
    // }
  };

  const updateItem = <T extends {id: string}>(
    items: T[],
    newItem: T,
    setItems: React.Dispatch<React.SetStateAction<T[]>>
  ) => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.id === newItem.id
      );
      if (existingIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingIndex] = newItem;
        return updatedItems;
      }
      return [...prevItems, newItem];
    });
  };

  // Enhance save methods for different types
  const handleSaveProject = (project: Project) => {
    updateItem(projects, project, setProjects);
    setSelectedUploadType(null);
    setSelectedItem(null);
  };

  const handleSaveSkill = (skill: Skill) => {
    updateItem(skills, skill, setSkills);
    setSelectedUploadType(null);
    setSelectedItem(null);
  };

  const handleSaveExperience = (experience: Experience) => {
    updateItem(experiences, experience, setExperiences);
    setSelectedUploadType(null);
    setSelectedItem(null);
  };

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
                onSendMessage={(newMsg) => {
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