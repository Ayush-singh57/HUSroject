import React, { useState, useEffect } from 'react';

/* --- MOCK DATA (Initial State) --- */
const DEFAULT_PROJECTS = [
  {
    id: 'p1',
    name: 'Modern Villa',
    description: 'A stunning modern villa with sustainable design and open spaces.',
    image: 'https://images.unsplash.com/photo-1600596542815-2a429b08e619?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p2',
    name: 'Urban Apartment',
    description: 'Compact living spaces designed for the city lifestyle.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'p3',
    name: 'Cozy Cottage',
    description: 'Traditional aesthetics meets modern comfort in the suburbs.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

const DEFAULT_CLIENTS = [
  {
    id: 'c1',
    name: 'Rowhan Smith',
    designation: 'CEO, Foreclosure',
    description: 'The team at UrbanSpace transformed our vision into reality. Exceptional service!',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'c2',
    name: 'Shipra Kayak',
    designation: 'Brand Designer',
    description: 'Professional, creative, and timely. I highly recommend their consultation services.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'c3',
    name: 'John Lepore',
    designation: 'CEO, Lepore Inc',
    description: 'Outstanding attention to detail. The project was delivered ahead of schedule.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'c4',
    name: 'Marry Freeman',
    designation: 'Marketing Manager, Mixit',
    description: 'UrbanSpace helped us redefine our brand presence in the market.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'c5',
    name: 'Lucy',
    designation: 'Sales Rep, Alibaba',
    description: 'A dedicated team that truly cares about client success. Highly recommended!',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
  }
];

/* --- MAIN APP COMPONENT --- */
export default function App() {
  const [view, setView] = useState('landing'); // 'landing', 'login', 'admin'
  // Detect system preference initially, but allow manual toggle override
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  
  // Local State Management
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [clients, setClients] = useState(DEFAULT_CLIENTS);
  const [inquiries, setInquiries] = useState([]);
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    document.title = "UrbanSpace - Modern Real Estate";
  }, []);

  // CONNECTIVITY LOGIC: Sync state with HTML class for Tailwind
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      // Also set the color-scheme property to ensure scrollbars match
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
  }, [darkMode]);

  /* --- Handlers --- */
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const addProject = (project) => {
    const newProject = { ...project, id: Date.now().toString(), createdAt: new Date() };
    setProjects([newProject, ...projects]);
  };

  const deleteProject = (id) => {
    if (confirm('Delete this project?')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const addClient = (client) => {
    const newClient = { ...client, id: Date.now().toString(), createdAt: new Date() };
    setClients([newClient, ...clients]);
  };

  const deleteClient = (id) => {
    if (confirm('Delete this client testimonial?')) {
      setClients(clients.filter(c => c.id !== id));
    }
  };

  const addInquiry = (inquiry) => {
    const newInquiry = { ...inquiry, id: Date.now().toString(), createdAt: new Date() };
    setInquiries([newInquiry, ...inquiries]);
    alert("Thank you! We'll be in touch soon.");
  };

  const addSubscriber = (email) => {
    const newSub = { email, id: Date.now().toString(), createdAt: new Date() };
    setSubscribers([newSub, ...subscribers]);
    alert('Subscribed!');
  };

  const handleLoginSuccess = () => setView('admin');
  const handleLogout = () => setView('landing');

  return (
    <div>
      <div className="font-sans text-gray-800 bg-white dark:bg-slate-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
        {view === 'landing' && (
          <LandingPage 
            projects={projects}
            clients={clients}
            darkMode={darkMode}
            onToggleTheme={toggleDarkMode}
            onAddInquiry={addInquiry}
            onAddSubscriber={addSubscriber}
            onAdminClick={() => setView('login')} 
          />
        )}
        {view === 'login' && (
          <AdminLogin 
            onLogin={handleLoginSuccess} 
            onBack={() => setView('landing')} 
          />
        )}
        {view === 'admin' && (
          <AdminPanel 
            projects={projects}
            clients={clients}
            inquiries={inquiries}
            subscribers={subscribers}
            onAddProject={addProject}
            onDeleteProject={deleteProject}
            onAddClient={addClient}
            onDeleteClient={deleteClient}
            onLogout={handleLogout} 
          />
        )}
      </div>
    </div>
  );
}

/* --- LANDING PAGE --- */
function LandingPage({ projects, clients, darkMode, onToggleTheme, onAddInquiry, onAddSubscriber, onAdminClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="relative">
      {/* Nav */}
      <nav className="fixed w-full z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('home')}>
              <span className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">Urban<span className="text-blue-600">Space</span></span>
            </div>
            
            <div className="hidden md:flex space-x-8 items-center">
              {['Home', 'About', 'Projects', 'Clients'].map((item) => (
                <button 
                  key={item} 
                  onClick={() => scrollTo(item.toLowerCase())}
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                >
                  {item}
                </button>
              ))}
              
              <button 
                onClick={onToggleTheme} 
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-300 transition-colors text-lg"
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {darkMode ? '☀️' : '🌙'}
              </button>

              <button 
                onClick={onAdminClick} 
                className="text-blue-600 border border-blue-600 px-5 py-2 rounded-full hover:bg-blue-50 dark:hover:bg-slate-800 transition font-medium text-sm"
              >
                Admin Panel
              </button>
            </div>

            <div className="md:hidden flex items-center gap-4">
              <button onClick={onToggleTheme} className="text-xl">
                 {darkMode ? '☀️' : '🌙'}
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 dark:text-gray-300 p-2 text-2xl">
                {isMenuOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-t dark:border-slate-800 p-4 space-y-4 shadow-xl absolute w-full">
            {['Home', 'About', 'Projects', 'Clients'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollTo(item.toLowerCase())} 
                className="block w-full text-left text-gray-700 dark:text-gray-300 font-medium py-2"
              >
                {item}
              </button>
            ))}
            <button onClick={onAdminClick} className="block w-full text-left text-blue-600 font-medium py-2">
              Admin Panel
            </button>
          </div>
        )}
      </nav>

      {/* Hero */}
      <div id="home" className="pt-24 pb-12 relative bg-slate-50 dark:bg-slate-950 min-h-screen flex items-center overflow-hidden transition-colors duration-300">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/50 dark:bg-blue-900/10 rounded-bl-[100px] z-0 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <span className="inline-block px-4 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-xs font-bold tracking-widest uppercase">
                Award Winning Agency
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white leading-tight">
                Consultation,<br />
                <span className="text-blue-600">Design,</span> &<br />
                Marketing
              </h1>
              <p className="text-xl text-gray-500 dark:text-gray-400 max-w-lg leading-relaxed">
                We help you build your dream project with our expert team of architects, designers, and marketers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-orange-500 text-white px-8 py-4 rounded-lg font-bold hover:bg-orange-600 transition shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2">
                  Get Started <span>→</span>
                </button>
                <button className="text-slate-600 dark:text-slate-200 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 px-8 py-4 rounded-lg font-bold hover:bg-gray-50 dark:hover:bg-slate-700 transition flex items-center justify-center">
                  View Portfolio
                </button>
              </div>
            </div>
            
            <div className="relative flex justify-center lg:justify-end">
               <ContactForm onAdd={onAddInquiry} />
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <section id="about" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 text-center mb-16">
          <h2 className="text-blue-600 dark:text-blue-400 font-bold tracking-wide uppercase text-sm mb-2">Features</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Why Choose Us?</h3>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          {[
            { icon: '💼', title: 'Potential ROI', desc: 'Maximize your investment with our data-driven strategies.' },
            { icon: '🖊️', title: 'Design', desc: 'Innovative designs that blend functionality with aesthetics.' },
            { icon: '📈', title: 'Marketing', desc: 'Reach your target audience effectively with our campaigns.' }
          ].map((feature, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-xl shadow-gray-200/50 dark:shadow-slate-900/50 hover:-translate-y-1 transition duration-300">
              <div className="w-16 h-16 bg-blue-50 dark:bg-slate-700 rounded-2xl flex items-center justify-center mb-6 mx-auto text-3xl">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3 text-center">{feature.title}</h4>
              <p className="text-gray-500 dark:text-gray-400 text-center leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-orange-200 dark:bg-orange-900/20 rounded-full blur-3xl opacity-30"></div>
            <img 
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Team" 
              className="relative rounded-2xl shadow-2xl z-10"
            />
            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-xl z-20">
               <div className="flex items-center gap-4">
                 <div className="text-4xl font-bold text-blue-600">15+</div>
                 <div className="text-sm font-medium text-gray-600 dark:text-gray-300">Years of<br/>Experience</div>
               </div>
            </div>
          </div>
          <div>
            <h2 className="text-blue-600 dark:text-blue-400 font-bold tracking-wide uppercase text-sm mb-2">About Us</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">Not Your Average Realtor</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-lg">
              We are a team of passionate professionals dedicated to transforming the real estate landscape. 
              From initial consultation to final design and marketing, we handle it all with precision.
            </p>
            <ul className="space-y-4 mb-8">
              {['Certified Architects', 'Award Winning Design', 'Sustainable Practices'].map(item => (
                <li key={item} className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
                  <span className="text-green-500">✓</span> {item}
                </li>
              ))}
            </ul>
            <button className="text-blue-600 dark:text-blue-400 font-bold hover:text-blue-700 flex items-center gap-2">
              Read More About Us <span>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 text-center mb-16">
          <h2 className="text-blue-600 dark:text-blue-400 font-bold tracking-wide uppercase text-sm mb-2">Portfolio</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Our Projects</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-2xl mx-auto">Explore some of our recent work that showcases our commitment to quality and innovation.</p>
        </div>

        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100 dark:border-slate-700">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={project.image || "https://via.placeholder.com/400x300"} 
                  alt={project.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-6">
                   <span className="text-white font-medium">View Details</span>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{project.name}</h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                <button className="w-full py-2 bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold rounded hover:bg-slate-100 dark:hover:bg-slate-600 transition text-sm">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Clients Section */}
      <section id="clients" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 text-center mb-16">
          <h2 className="text-blue-600 dark:text-blue-400 font-bold tracking-wide uppercase text-sm mb-2">Testimonials</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Happy Clients</h3>
        </div>

        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          {clients.map((client) => (
            <div key={client.id} className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 text-center">
              <div className="w-20 h-20 mx-auto mb-6 relative">
                 <img 
                  src={client.image || "https://via.placeholder.com/150"} 
                  alt={client.name} 
                  className="w-full h-full object-cover rounded-full border-4 border-white shadow-md"
                />
                <div className="absolute bottom-0 right-0 bg-blue-500 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs">
                  ★
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic mb-6">"{client.description}"</p>
              <h4 className="font-bold text-slate-900 dark:text-white">{client.name}</h4>
              <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">{client.designation}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter onSubscribe={onAddSubscriber} />
      
      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 text-center">
        <p>&copy; 2025 UrbanSpace. All rights reserved.</p>
      </footer>
    </div>
  );
}

/* --- ADMIN LOGIN --- */
function AdminLogin({ onLogin, onBack }) {
  const [pass, setPass] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pass === 'admin123') { // Simple demo gate
      onLogin();
    } else {
      alert('Incorrect Password. Hint: admin123');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950 p-4 transition-colors duration-300">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 text-2xl">
            🔒
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Access</h2>
          <p className="text-gray-500 dark:text-gray-400">Enter your credentials to continue</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
            <input 
              type="password" 
              className="w-full p-3 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter password (admin123)"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition">
            Login
          </button>
          <button type="button" onClick={onBack} className="w-full text-gray-500 dark:text-gray-400 text-sm hover:text-gray-700">
            Back to Website
          </button>
        </form>
      </div>
    </div>
  );
}

/* --- ADMIN PANEL --- */
function AdminPanel({ 
  projects, clients, inquiries, subscribers, 
  onAddProject, onDeleteProject, onAddClient, onDeleteClient, onLogout 
}) {
  const [activeTab, setActiveTab] = useState('projects');
  
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex transition-colors duration-300">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white hidden md:flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold tracking-tight">Urban<span className="text-blue-500">Space</span></h2>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <AdminTab icon="💼" label="Projects" id="projects" active={activeTab} set={setActiveTab} />
          <AdminTab icon="👥" label="Clients" id="clients" active={activeTab} set={setActiveTab} />
          <AdminTab icon="💬" label="Inquiries" id="inquiries" active={activeTab} set={setActiveTab} />
          <AdminTab icon="✉️" label="Subscribers" id="subscribers" active={activeTab} set={setActiveTab} />
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button onClick={onLogout} className="flex items-center gap-3 text-slate-400 hover:text-white transition w-full px-4 py-2">
            <span>➜</span> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <div className="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center">
          <span className="font-bold">UrbanSpace Admin</span>
          <button onClick={onLogout}>➜</button>
        </div>
        
        {/* Tab Navigation Mobile */}
        <div className="md:hidden bg-white dark:bg-slate-900 border-b dark:border-slate-800 flex overflow-x-auto">
          {['projects', 'clients', 'inquiries', 'subscribers'].map(t => (
            <button 
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === t ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 dark:text-gray-400'}`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-auto p-8">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 capitalize">{activeTab} Management</h1>
          
          {activeTab === 'projects' && <ProjectManager projects={projects} onAdd={onAddProject} onDelete={onDeleteProject} />}
          {activeTab === 'clients' && <ClientManager clients={clients} onAdd={onAddClient} onDelete={onDeleteClient} />}
          {activeTab === 'inquiries' && <InquiryViewer inquiries={inquiries} />}
          {activeTab === 'subscribers' && <SubscriberViewer subscribers={subscribers} />}
        </div>
      </div>
    </div>
  );
}

function AdminTab({ icon, label, id, active, set }) {
  return (
    <button 
      onClick={() => set(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${active === id ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
    >
      <span>{icon}</span> <span className="font-medium">{label}</span>
    </button>
  );
}

/* --- MANAGERS --- */

function ProjectManager({ projects, onAdd, onDelete }) {
  const [formData, setFormData] = useState({ name: '', description: '', image: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ name: '', description: '', image: '' });
  };

  return (
    <div className="space-y-8">
      {/* Add Form */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
        <h3 className="font-bold text-lg mb-4 dark:text-white">Add New Project</h3>
        <form onSubmit={handleAdd} className="grid md:grid-cols-2 gap-4">
          <input required placeholder="Project Name" className="input-field dark:bg-slate-700 dark:border-slate-600 dark:text-white" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          <input required placeholder="Image URL (e.g., Unsplash link)" className="input-field dark:bg-slate-700 dark:border-slate-600 dark:text-white" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
          <textarea required placeholder="Description" className="input-field md:col-span-2 dark:bg-slate-700 dark:border-slate-600 dark:text-white" rows="2" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 md:col-span-2 flex justify-center items-center gap-2">
            <span>+</span> Add Project
          </button>
        </form>
      </div>

      {/* List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(p => (
          <div key={p.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden group">
             <div className="h-40 bg-gray-100 dark:bg-slate-700 relative">
               <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
               <button onClick={() => onDelete(p.id)} className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                 🗑
               </button>
             </div>
             <div className="p-4">
               <h4 className="font-bold text-slate-900 dark:text-white">{p.name}</h4>
               <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 line-clamp-2">{p.description}</p>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ClientManager({ clients, onAdd, onDelete }) {
  const [formData, setFormData] = useState({ name: '', designation: '', description: '', image: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ name: '', designation: '', description: '', image: '' });
  };

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
        <h3 className="font-bold text-lg mb-4 dark:text-white">Add Client Testimonial</h3>
        <form onSubmit={handleAdd} className="grid md:grid-cols-2 gap-4">
          <input required placeholder="Client Name" className="input-field dark:bg-slate-700 dark:border-slate-600 dark:text-white" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          <input required placeholder="Designation (e.g. CEO)" className="input-field dark:bg-slate-700 dark:border-slate-600 dark:text-white" value={formData.designation} onChange={e => setFormData({...formData, designation: e.target.value})} />
          <input required placeholder="Photo URL" className="input-field md:col-span-2 dark:bg-slate-700 dark:border-slate-600 dark:text-white" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
          <textarea required placeholder="Testimonial" className="input-field md:col-span-2 dark:bg-slate-700 dark:border-slate-600 dark:text-white" rows="2" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 md:col-span-2 flex justify-center items-center gap-2">
            <span>+</span> Add Client
          </button>
        </form>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {clients.map(c => (
          <div key={c.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 flex items-start gap-4 relative group">
            <img src={c.image} className="w-12 h-12 rounded-full object-cover bg-gray-200 dark:bg-slate-700 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-sm dark:text-white">{c.name}</h4>
              <p className="text-xs text-blue-600 dark:text-blue-400">{c.designation}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">"{c.description}"</p>
            </div>
            <button 
              onClick={() => onDelete(c.id)}
              className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100"
            >
              🗑
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function InquiryViewer({ inquiries }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden">
      <table className="w-full text-left text-sm dark:text-gray-300">
        <thead className="bg-gray-50 dark:bg-slate-700 border-b dark:border-slate-600">
          <tr>
            <th className="p-4 font-bold text-gray-600 dark:text-gray-200">Name</th>
            <th className="p-4 font-bold text-gray-600 dark:text-gray-200">Email</th>
            <th className="p-4 font-bold text-gray-600 dark:text-gray-200">Mobile</th>
            <th className="p-4 font-bold text-gray-600 dark:text-gray-200">City</th>
            <th className="p-4 font-bold text-gray-600 dark:text-gray-200">Date</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map(i => (
            <tr key={i.id} className="border-b dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-750">
              <td className="p-4 font-medium">{i.name}</td>
              <td className="p-4 text-blue-600 dark:text-blue-400">{i.email}</td>
              <td className="p-4 text-gray-500 dark:text-gray-400">{i.mobile}</td>
              <td className="p-4 text-gray-500 dark:text-gray-400">{i.city}</td>
              <td className="p-4 text-gray-400 text-xs">
                {i.createdAt ? new Date(i.createdAt).toLocaleDateString() : 'Just now'}
              </td>
            </tr>
          ))}
          {inquiries.length === 0 && (
            <tr><td colSpan="5" className="p-8 text-center text-gray-400">No inquiries yet.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function SubscriberViewer({ subscribers }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 max-w-2xl">
      <div className="p-4 border-b dark:border-slate-700 bg-gray-50 dark:bg-slate-700 flex justify-between items-center">
         <span className="font-bold text-gray-700 dark:text-gray-200">Subscriber List</span>
         <span className="text-xs font-bold bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200 px-2 py-1 rounded-full">{subscribers.length} Total</span>
      </div>
      <ul className="divide-y dark:divide-slate-700">
        {subscribers.map(s => (
          <li key={s.id} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-750">
            <span className="text-gray-700 dark:text-gray-300">{s.email}</span>
            <span className="text-xs text-gray-400">
               {s.createdAt ? new Date(s.createdAt).toLocaleDateString() : 'Just now'}
            </span>
          </li>
        ))}
         {subscribers.length === 0 && <li className="p-8 text-center text-gray-400">No subscribers found.</li>}
      </ul>
    </div>
  );
}

function ContactForm({ onAdd }) {
  const [form, setForm] = useState({ name: '', email: '', mobile: '', city: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
    setForm({ name: '', email: '', mobile: '', city: '' });
  };

  return (
    <div className="bg-[#4d6b99] dark:bg-slate-800 p-8 rounded-xl shadow-2xl w-full max-w-sm text-white relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-bl-full pointer-events-none"></div>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold">Get a Free<br/>Consultation</h3>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          required 
          placeholder="Full Name" 
          className="w-full bg-[#5d7aa8] dark:bg-slate-700 border border-transparent placeholder-gray-300 dark:placeholder-gray-400 text-white p-3 rounded focus:outline-none focus:border-white transition"
          value={form.name} onChange={e => setForm({...form, name: e.target.value})}
        />
        <input 
          required 
          type="email" 
          placeholder="Enter Email Address" 
          className="w-full bg-[#5d7aa8] dark:bg-slate-700 border border-transparent placeholder-gray-300 dark:placeholder-gray-400 text-white p-3 rounded focus:outline-none focus:border-white transition"
          value={form.email} onChange={e => setForm({...form, email: e.target.value})}
        />
        <input 
          required 
          type="tel" 
          placeholder="Mobile Number" 
          className="w-full bg-[#5d7aa8] dark:bg-slate-700 border border-transparent placeholder-gray-300 dark:placeholder-gray-400 text-white p-3 rounded focus:outline-none focus:border-white transition"
          value={form.mobile} onChange={e => setForm({...form, mobile: e.target.value})}
        />
        <input 
          required 
          placeholder="Area, City" 
          className="w-full bg-[#5d7aa8] dark:bg-slate-700 border border-transparent placeholder-gray-300 dark:placeholder-gray-400 text-white p-3 rounded focus:outline-none focus:border-white transition"
          value={form.city} onChange={e => setForm({...form, city: e.target.value})}
        />
        <button 
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded shadow-lg shadow-orange-500/30 transition transform active:scale-95"
        >
          Get Quick Quote
        </button>
      </form>
    </div>
  );
}

function Newsletter({ onSubscribe }) {
  const [email, setEmail] = useState('');
  
  const handleSub = (e) => {
    e.preventDefault();
    if (email) {
      onSubscribe(email);
      setEmail('');
    }
  };

  return (
    <div className="bg-blue-600 dark:bg-blue-900 py-12 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
         <div className="text-white">
           <h3 className="text-2xl font-bold">Subscribe to our Newsletter</h3>
           <p className="text-blue-100 dark:text-blue-200">Get the latest updates and offers directly in your inbox.</p>
         </div>
         <form onSubmit={handleSub} className="flex w-full md:w-auto bg-white dark:bg-slate-800 p-1 rounded-lg">
           <input 
             type="email" 
             placeholder="Enter Email Address" 
             className="flex-1 p-3 outline-none text-gray-700 dark:text-gray-200 dark:bg-slate-800 min-w-[200px]"
             value={email}
             onChange={e => setEmail(e.target.value)}
             required
           />
           <button className="bg-blue-600 dark:bg-blue-500 text-white px-6 font-bold rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition">
             Subscribe
           </button>
         </form>
      </div>
    </div>
  );
}

// Add custom style for inputs in admin
const style = document.createElement('style');
style.textContent = `
  .input-field {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    outline: none;
    transition: all 0.2s;
  }
  .input-field:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  @keyframes fade-in-up {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in-up {
    animation: fade-in-up 0.8s ease-out forwards;
  }
`;
document.head.appendChild(style);