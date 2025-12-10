import React, { useState, useEffect } from 'react';

// --- ICONS (Inline SVGs to remove dependency on lucide-react) ---
const IconWrapper = ({ children, ...props }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    {children}
  </svg>
);

const LucideHome = (props) => <IconWrapper {...props}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></IconWrapper>;
const LucideBuilding = (props) => <IconWrapper {...props}><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M16 14h.01"/></IconWrapper>;
const LucideUsers = (props) => <IconWrapper {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></IconWrapper>;
const LucideUser = (props) => <IconWrapper {...props}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></IconWrapper>;
const LucideMail = (props) => <IconWrapper {...props}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></IconWrapper>;
const LucideTrash2 = (props) => <IconWrapper {...props}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></IconWrapper>;
const LucidePlus = (props) => <IconWrapper {...props}><path d="M5 12h14"/><path d="M12 5v14"/></IconWrapper>;
const LucideLogOut = (props) => <IconWrapper {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></IconWrapper>;
const LucideMenu = (props) => <IconWrapper {...props}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></IconWrapper>;
const LucideX = (props) => <IconWrapper {...props}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></IconWrapper>;
const LucideArrowRight = (props) => <IconWrapper {...props}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></IconWrapper>;
const LucideCheckCircle = (props) => <IconWrapper {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></IconWrapper>;
const LucideLock = (props) => <IconWrapper {...props}><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></IconWrapper>;
const LucideUserPlus = (props) => <IconWrapper {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" x2="20" y1="8" y2="14"/><line x1="23" x2="17" y1="11" y2="11"/></IconWrapper>;

// --- CONFIGURATION ---
const API_BASE = 'http://localhost:5000/api'; 

/* --- DEFAULT DATA (Fallback) --- */
const DEFAULT_PROJECTS = [
  {
    _id: 'p2',
    name: 'Urban Apartment',
    description: 'Compact living spaces designed for the city lifestyle.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: 'p3',
    name: 'Cozy Cottage',
    description: 'Traditional aesthetics meets modern comfort in the suburbs.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: 'p4',
    name: 'Skyline Penthouse',
    description: 'Luxury high-rise living with panoramic city views and premium amenities.',
    image: 'https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: 'p5',
    name: 'Eco-Friendly Haven',
    description: 'Sustainable architecture blending seamlessly with the natural environment.',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: 'p6',
    name: 'Industrial Loft',
    description: 'Converted warehouse space featuring exposed brick and open layouts.',
    image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

const DEFAULT_CLIENTS = [
  {
    _id: 'c1',
    name: 'Rowhan Smith',
    designation: 'CEO, Foreclosure',
    description: 'The team at UrbanSpace transformed our vision into reality. Exceptional service!',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
  },
  {
    _id: 'c2',
    name: 'Shipra Kayak',
    designation: 'Brand Designer',
    description: 'Professional, creative, and timely. I highly recommend their consultation services.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
  },
  {
    _id: 'c3',
    name: 'John Lepore',
    designation: 'CEO, Lepore Inc',
    description: 'Outstanding attention to detail. The project was delivered ahead of schedule.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
  },
  {
    _id: 'c4',
    name: 'Michael Brown',
    designation: 'Director, TechSpace',
    description: 'UrbanSpace provided invaluable insights that maximized our property value.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
  }
];

/* --- MAIN APP COMPONENT --- */
export default function App() {
  // 'view' now only handles 'landing' vs 'admin'. 
  // 'admin' view handles both Login and Dashboard based on 'user' state.
  const [view, setView] = useState('landing'); 
  const [user, setUser] = useState(null); // Stores logged-in user
  
  // State Management
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [users, setUsers] = useState([
    { _id: 'u1', name: 'System Admin', email: 'admin@urbanspace.com', role: 'Administrator', joined: new Date('2023-01-01').toISOString() }
  ]);

  // Fetch all data when app loads
  useEffect(() => {
    document.title = "UrbanSpace - Modern Real Estate";
    fetchAllData();
  }, []);

  // Helper to remove duplicates from DB response
  const removeDuplicates = (items, key) => {
    const seen = new Set();
    return items.filter(item => {
      const val = item[key];
      if (seen.has(val)) return false;
      seen.add(val);
      return true;
    });
  };

  const fetchAllData = () => {
    // 1. Fetch Projects (Merge DB + Default)
    fetch(`${API_BASE}/projects`)
      .then(res => res.json())
      .then(data => {
        const uniqueDB = removeDuplicates(data, 'name');
        const combined = [...uniqueDB];
        DEFAULT_PROJECTS.forEach(def => {
          if (!combined.some(dbItem => dbItem.name === def.name)) {
            combined.push(def);
          }
        });
        setProjects(combined);
      })
      .catch(() => setProjects(DEFAULT_PROJECTS));

    // 2. Fetch Clients
    fetch(`${API_BASE}/clients`)
      .then(res => res.json())
      .then(data => {
        const uniqueDB = removeDuplicates(data, 'name');
        const combined = [...uniqueDB];
        DEFAULT_CLIENTS.forEach(def => {
          if (!combined.some(dbItem => dbItem.name === def.name)) {
            combined.push(def);
          }
        });
        setClients(combined);
      })
      .catch(() => setClients(DEFAULT_CLIENTS));

    // 3. Fetch Inquiries (Silent fail allowed)
    fetch(`${API_BASE}/inquiries`)
      .then(res => res.json())
      .then(data => setInquiries(data))
      .catch(err => console.log("Backend offline: Inquiries not loaded"));

    // 4. Fetch Subscribers
    fetch(`${API_BASE}/subscribers`)
      .then(res => res.json())
      .then(data => setSubscribers(removeDuplicates(data, 'email')))
      .catch(err => console.log("Backend offline: Subscribers not loaded"));
  };

  /* --- HANDLERS (MODIFIED FOR RELIABILITY) --- */

  const addProject = async (projectData) => {
    const newProject = { ...projectData, _id: 'temp_' + Date.now() };
    setProjects(prev => [newProject, ...prev]);

    try {
      const res = await fetch(`${API_BASE}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData)
      });
      if (res.ok) {
        const savedProject = await res.json();
        setProjects(prev => prev.map(p => p._id === newProject._id ? savedProject : p));
      }
    } catch (err) {
      console.warn('Backend save failed, keeping local copy.');
    }
  };

  const deleteProject = async (id) => {
    if (!confirm('Delete this project?')) return;
    setProjects(prevProjects => prevProjects.filter(p => p._id !== id));
    try {
      if (!id.toString().startsWith('temp_')) {
         await fetch(`${API_BASE}/projects/${id}`, { method: 'DELETE' });
      }
    } catch (err) {
      console.warn('Backend delete failed (or offline). UI updated anyway.');
    }
  };

  const addClient = async (clientData) => {
    const newClient = { ...clientData, _id: 'temp_' + Date.now() };
    setClients(prev => [newClient, ...prev]);

    try {
      const res = await fetch(`${API_BASE}/clients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clientData)
      });
      if (res.ok) {
        const savedClient = await res.json();
        setClients(prev => prev.map(c => c._id === newClient._id ? savedClient : c));
      }
    } catch (err) {
      console.warn('Backend save failed, keeping local copy.');
    }
  };

  const deleteClient = async (id) => {
    if (!confirm('Delete this testimonial?')) return;
    setClients(prevClients => prevClients.filter(c => c._id !== id));
    try {
      if (!id.toString().startsWith('temp_')) {
        await fetch(`${API_BASE}/clients/${id}`, { method: 'DELETE' });
      }
    } catch (err) {
      console.warn('Backend delete failed (or offline). UI updated anyway.');
    }
  };

  const addInquiry = async (inquiryData) => {
    alert("Thank you! We'll be in touch soon.");
    setInquiries(prev => [{...inquiryData, _id: Date.now(), createdAt: new Date()}, ...prev]);
    try {
      await fetch(`${API_BASE}/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiryData)
      });
    } catch (err) {
      // Ignore
    }
  };

  const addSubscriber = async (email) => {
    if (subscribers.some(sub => sub.email === email)) {
      alert('This email is already subscribed!');
      return;
    }
    alert('Subscribed successfully!');
    setSubscribers(prev => [{email, _id: Date.now(), createdAt: new Date()}, ...prev]);
    try {
      await fetch(`${API_BASE}/subscribers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
    } catch (err) {
      // Ignore
    }
  };

  const registerUser = (userData) => {
    const newUser = { 
      _id: 'u' + Date.now(), 
      role: 'User', 
      joined: new Date().toISOString(),
      ...userData 
    };
    setUsers(prev => [...prev, newUser]);
    // Automatically log in the new user
    setUser(newUser);
  };

  // Auth Handlers
  const handleLogin = (userData) => {
    setUser(userData); // Set logged in user state
  };

  const handleLogout = () => {
    setUser(null); // Clear user, effectively showing AuthPage again
  };

  return (
    <div>
      <div className="font-sans text-gray-800 bg-white min-h-screen">
        {view === 'landing' && (
          <LandingPage 
            projects={projects}
            clients={clients}
            onAddInquiry={addInquiry}
            onAddSubscriber={addSubscriber}
            onAdminClick={() => setView('admin')} 
          />
        )}
        
        {/* Unified Admin View: Handles both Auth and Panel */}
        {view === 'admin' && (
          user ? (
            <AdminPanel 
              projects={projects}
              clients={clients}
              inquiries={inquiries}
              subscribers={subscribers}
              users={users}
              currentUser={user}
              onAddProject={addProject}
              onDeleteProject={deleteProject}
              onAddClient={addClient}
              onDeleteClient={deleteClient}
              onLogout={handleLogout} 
            />
          ) : (
            <AuthPage 
              onLogin={handleLogin} 
              onSignup={registerUser}
              onBack={() => setView('landing')} 
            />
          )
        )}
      </div>
    </div>
  );
}

/* --- LANDING PAGE --- */
function LandingPage({ projects, clients, onAddInquiry, onAddSubscriber, onAdminClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="relative">
      {/* Nav */}
      <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo: Text Only, No Icon */}
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('home')}>
              <span className="text-2xl font-bold text-slate-800 tracking-tight">Urban<span className="text-blue-600">Space</span></span>
            </div>
            
            <div className="hidden md:flex space-x-8 items-center">
              {['Home', 'About', 'Projects', 'Clients'].map((item) => (
                <button 
                  key={item} 
                  onClick={() => scrollTo(item.toLowerCase())}
                  className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                >
                  {item}
                </button>
              ))}
              
              <button 
                onClick={onAdminClick} 
                className="text-blue-600 border border-blue-600 px-5 py-2 rounded-full hover:bg-blue-50 transition font-medium text-sm flex items-center gap-2"
              >
                <LucideLock className="w-4 h-4" />
                Admin Panel
              </button>
            </div>

            <div className="md:hidden flex items-center gap-4">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 p-2">
                {isMenuOpen ? <LucideX className="w-6 h-6"/> : <LucideMenu className="w-6 h-6"/>}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t p-4 space-y-4 shadow-xl absolute w-full animate-fade-in">
            {['Home', 'About', 'Projects', 'Clients'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollTo(item.toLowerCase())} 
                className="block w-full text-left text-gray-700 font-medium py-2"
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
      <div id="home" className="pt-24 pb-12 relative bg-slate-50 min-h-screen flex items-center overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/50 rounded-bl-[100px] z-0 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-100 text-orange-600 rounded-full text-xs font-bold tracking-widest uppercase">
                <LucideCheckCircle className="w-3 h-3" /> Award Winning Agency
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-tight">
                Consultation,<br />
                <span className="text-blue-600">Design,</span> &<br />
                Marketing
              </h1>
              <p className="text-xl text-gray-500 max-w-lg leading-relaxed">
                We help you build your dream project with our expert team of architects, designers, and marketers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => scrollTo('about')}
                  className="bg-orange-500 text-white px-8 py-4 rounded-lg font-bold hover:bg-orange-600 transition shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2"
                >
                  Get Started <LucideArrowRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => scrollTo('projects')}
                  className="text-slate-600 bg-white border border-gray-200 px-8 py-4 rounded-lg font-bold hover:bg-gray-50 transition flex items-center justify-center"
                >
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
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center mb-16">
          <h2 className="text-blue-600 font-bold tracking-wide uppercase text-sm mb-2">Features</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900">Why Choose Us?</h3>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          {[
            { icon: '💼', title: 'Potential ROI', desc: 'Maximize your investment with our data-driven strategies.' },
            { icon: '🖊️', title: 'Design', desc: 'Innovative designs that blend functionality with aesthetics.' },
            { icon: '📈', title: 'Marketing', desc: 'Reach your target audience effectively with our campaigns.' }
          ].map((feature, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-white border border-gray-100 shadow-xl shadow-gray-200/50 hover:-translate-y-1 transition duration-300">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 mx-auto text-3xl">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3 text-center">{feature.title}</h4>
              <p className="text-gray-500 text-center leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-orange-200 rounded-full blur-3xl opacity-30"></div>
            <img 
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Team" 
              className="relative rounded-2xl shadow-2xl z-10 w-full"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl z-20 hidden md:block">
               <div className="flex items-center gap-4">
                 <div className="text-4xl font-bold text-blue-600">15+</div>
                 <div className="text-sm font-medium text-gray-600">Years of<br/>Experience</div>
               </div>
            </div>
          </div>
          <div>
            <h2 className="text-blue-600 font-bold tracking-wide uppercase text-sm mb-2">About Us</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Not Your Average Realtor</h3>
            <p className="text-gray-500 mb-6 text-lg">
              We are a team of passionate professionals dedicated to transforming the real estate landscape. 
              From initial consultation to final design and marketing, we handle it all with precision.
            </p>
            <ul className="space-y-4 mb-8">
              {['Certified Architects', 'Award Winning Design', 'Sustainable Practices'].map(item => (
                <li key={item} className="flex items-center gap-3 text-slate-700 font-medium">
                  <span className="text-green-500 font-bold">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center mb-16">
          <h2 className="text-blue-600 font-bold tracking-wide uppercase text-sm mb-2">Portfolio</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900">Our Projects</h3>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">Explore some of our recent work that showcases our commitment to quality and innovation.</p>
        </div>

        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project._id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100 flex flex-col h-full">
              <div className="relative h-64 overflow-hidden bg-gray-200">
                <img 
                  src={project.image || "https://via.placeholder.com/400x300"} 
                  alt={project.name} 
                  onError={(e) => {e.target.onerror = null; e.target.src = "https://via.placeholder.com/400x300?text=No+Image"}}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-6">
                   <span className="text-white font-medium">View Details</span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h4 className="text-xl font-bold text-slate-900 mb-2">{project.name}</h4>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">{project.description}</p>
                <button 
                  onClick={() => alert(`Details for ${project.name}:\n\n${project.description}\n\n(This is a demo action)`)}
                  className="w-full py-2 bg-slate-50 text-slate-600 font-semibold rounded hover:bg-slate-100 transition text-sm">
                  Read More
                </button>
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-12 bg-slate-50 rounded-lg">
              No projects found. Add one from the Admin Panel!
            </div>
          )}
        </div>
      </section>

      {/* Clients Section */}
      <section id="clients" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 text-center mb-16">
          <h2 className="text-blue-600 font-bold tracking-wide uppercase text-sm mb-2">Testimonials</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900">Happy Clients</h3>
        </div>

        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          {clients.map((client) => (
            <div key={client._id} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition">
              <div className="w-20 h-20 mx-auto mb-6 relative">
                 <img 
                  src={client.image || "https://via.placeholder.com/150"} 
                  alt={client.name} 
                  onError={(e) => {e.target.onerror = null; e.target.src = "https://via.placeholder.com/150"}}
                  className="w-full h-full object-cover rounded-full border-4 border-white shadow-md"
                />
                <div className="absolute bottom-0 right-0 bg-blue-500 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs">
                  ★
                </div>
              </div>
              <p className="text-gray-600 italic mb-6">"{client.description}"</p>
              <h4 className="font-bold text-slate-900">{client.name}</h4>
              <span className="text-blue-600 text-sm font-medium">{client.designation}</span>
            </div>
          ))}
          {clients.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-12">
              No client testimonials found.
            </div>
          )}
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

/* --- AUTH PAGE (Login / Signup) --- */
function AuthPage({ onLogin, onSignup, onBack }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      if (formData.password === 'admin123') { // Simple demo gate
        // Create a mock user object
        onLogin({ 
          name: 'Admin User', 
          email: formData.email || 'admin@urbanspace.com', 
          role: 'Administrator',
          joined: new Date().toISOString()
        });
      } else {
        alert('Incorrect Password. Hint: admin123');
      }
    } else {
      // Signup Logic
      onSignup({ 
        name: formData.name, 
        email: formData.email 
      });
      alert(`Account created for ${formData.name}! You are now logged in.`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md animate-fade-in-up transition-all duration-300">
        <div className="text-center mb-8">
          {/* Old Design: Blue box with Lock Icon */}
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 transition-transform hover:scale-105">
            {isLogin ? <LucideLock className="w-8 h-8"/> : <LucideUserPlus className="w-8 h-8"/>}
          </div>
          <h2 className="text-2xl font-bold text-slate-900">{isLogin ? 'Admin Portal' : 'Create Account'}</h2>
          <p className="text-gray-500">{isLogin ? 'Enter your credentials to continue' : 'Join us to get started'}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Signup Only: Name Field */}
          {!isLogin && (
            <div className="animate-fade-in">
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input 
                type="text" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                placeholder="John Doe" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required={!isLogin}
              />
            </div>
          )}

          {/* Email Field (Added for realism) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="you@example.com" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required={!isLogin} // Optional for admin login demo if you just want password
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="" 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
            {isLogin && <p className="text-xs text-gray-400 mt-2">Suggestion: Password is <strong>admin123</strong></p>}
          </div>

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/30">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center space-y-4">
          <p className="text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              type="button" 
              onClick={() => { setIsLogin(!isLogin); setFormData({name:'', email:'', password:''}); }}
              className="text-blue-600 font-bold hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
          <button type="button" onClick={onBack} className="text-gray-400 text-sm hover:text-gray-600 transition">
            ← Back to Website
          </button>
        </div>
      </div>
    </div>
  );
}

/* --- ADMIN PANEL --- */
function AdminPanel({ 
  projects, clients, inquiries, subscribers, users, currentUser,
  onAddProject, onDeleteProject, onAddClient, onDeleteClient, onLogout 
}) {
  const [activeTab, setActiveTab] = useState('projects');
  
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-slate-900 text-white flex flex-col flex-shrink-0">
        <div className="p-6 hidden md:block">
           {/* Logo: Text Only, No Icon */}
           <h2 className="text-2xl font-bold tracking-tight">Urban<span className="text-blue-500">Space</span></h2>
           {currentUser && <p className="text-xs text-gray-400 mt-2">Welcome, {currentUser.name}</p>}
        </div>
        
        {/* Mobile Header */}
        <div className="md:hidden p-4 flex justify-between items-center border-b border-slate-800">
             <span className="font-bold">Admin Panel</span>
             <button onClick={onLogout}><LucideLogOut/></button>
        </div>

        <nav className="flex-1 px-4 space-y-2 py-4 md:py-0 overflow-x-auto md:overflow-visible flex md:block gap-2 md:gap-0">
          <AdminTab icon={<LucideHome size={18}/>} label="Projects" id="projects" active={activeTab} set={setActiveTab} />
          <AdminTab icon={<LucideUsers size={18}/>} label="Clients" id="clients" active={activeTab} set={setActiveTab} />
          <AdminTab icon={<LucideMail size={18}/>} label="Inquiries" id="inquiries" active={activeTab} set={setActiveTab} />
          <AdminTab icon={<LucideMail size={18}/>} label="Subscribers" id="subscribers" active={activeTab} set={setActiveTab} />
          <AdminTab icon={<LucideUser size={18}/>} label="Users" id="users" active={activeTab} set={setActiveTab} />
        </nav>
        
        <div className="p-4 border-t border-slate-800 space-y-4 hidden md:block">
          <button onClick={onLogout} className="flex items-center gap-3 text-slate-400 hover:text-white transition w-full px-4 py-2">
            <LucideLogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-[calc(100vh-60px)] md:h-screen overflow-hidden">
        <div className="flex-1 overflow-auto p-4 md:p-8">
          <div className="flex justify-between items-center mb-6">
             <h1 className="text-2xl font-bold text-slate-800 capitalize">{activeTab} Management</h1>
          </div>
          
          {activeTab === 'projects' && <ProjectManager projects={projects} onAdd={onAddProject} onDelete={onDeleteProject} />}
          {activeTab === 'clients' && <ClientManager clients={clients} onAdd={onAddClient} onDelete={onDeleteClient} />}
          {activeTab === 'inquiries' && <InquiryViewer inquiries={inquiries} />}
          {activeTab === 'subscribers' && <SubscriberViewer subscribers={subscribers} />}
          {activeTab === 'users' && <UserViewer users={users} />}
        </div>
      </div>
    </div>
  );
}

function AdminTab({ icon, label, id, active, set }) {
  return (
    <button 
      onClick={() => set(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition whitespace-nowrap ${active === id ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
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
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><LucidePlus size={20}/> Add New Project</h3>
        <form onSubmit={handleAdd} className="grid md:grid-cols-2 gap-4">
          <input required placeholder="Project Name" className="w-full p-2 border rounded" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          <input required placeholder="Image URL (e.g., Unsplash link)" className="w-full p-2 border rounded" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
          <textarea required placeholder="Description" className="w-full p-2 border rounded md:col-span-2" rows="2" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 md:col-span-2 flex justify-center items-center gap-2">
            Add Project
          </button>
        </form>
      </div>

      {/* List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(p => (
          <div key={p._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group relative">
             <div className="h-40 bg-gray-100 relative">
               <img 
                 src={p.image} 
                 alt={p.name} 
                 className="w-full h-full object-cover" 
                 onError={(e) => {e.target.onerror = null; e.target.src = "https://via.placeholder.com/400x300?text=No+Image"}}
               />
             </div>
             <div className="p-4 pr-12">
               <h4 className="font-bold text-slate-900">{p.name}</h4>
               <p className="text-gray-500 text-sm mt-1 line-clamp-2">{p.description}</p>
             </div>
             <button 
               onClick={() => onDelete(p._id)} 
               className="absolute top-2 right-2 bg-white text-red-500 p-2 rounded-full shadow-md hover:bg-red-50 transition"
               title="Delete Project"
             >
               <LucideTrash2 size={16} />
             </button>
          </div>
        ))}
        {projects.length === 0 && (
            <div className="col-span-full text-center text-gray-400 italic">No projects added yet.</div>
        )}
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
      {/* Add Form */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><LucidePlus size={20}/> Add Client Testimonial</h3>
        <form onSubmit={handleAdd} className="grid md:grid-cols-2 gap-4">
          <input required placeholder="Client Name" className="w-full p-2 border rounded" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          <input required placeholder="Designation (e.g. CEO)" className="w-full p-2 border rounded" value={formData.designation} onChange={e => setFormData({...formData, designation: e.target.value})} />
          <input required placeholder="Photo URL" className="w-full p-2 border rounded md:col-span-2" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
          <textarea required placeholder="Testimonial" className="w-full p-2 border rounded md:col-span-2" rows="2" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 md:col-span-2 flex justify-center items-center gap-2">
            Add Client
          </button>
        </form>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {clients.map(c => (
          <div key={c._id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-start gap-4 relative group">
            <img 
              src={c.image} 
              className="w-12 h-12 rounded-full object-cover bg-gray-200 flex-shrink-0" 
              onError={(e) => {e.target.onerror = null; e.target.src = "https://via.placeholder.com/150"}}
            />
            <div className="flex-1">
              <h4 className="font-bold text-sm">{c.name}</h4>
              <p className="text-xs text-blue-600">{c.designation}</p>
              <p className="text-xs text-gray-500 mt-2 line-clamp-2">"{c.description}"</p>
            </div>
            <button 
              onClick={() => onDelete(c._id)}
              className="text-gray-400 hover:text-red-500 transition p-1"
            >
              <LucideTrash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function InquiryViewer({ inquiries }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden overflow-x-auto">
      <table className="w-full text-left text-sm min-w-[600px]">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-4 font-bold text-gray-600">Name</th>
            <th className="p-4 font-bold text-gray-600">Email</th>
            <th className="p-4 font-bold text-gray-600">Mobile</th>
            <th className="p-4 font-bold text-gray-600">City</th>
            <th className="p-4 font-bold text-gray-600">Date</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map(i => (
            <tr key={i._id} className="border-b hover:bg-gray-50">
              <td className="p-4 font-medium">{i.name}</td>
              <td className="p-4 text-blue-600">{i.email}</td>
              <td className="p-4 text-gray-500">{i.mobile}</td>
              <td className="p-4 text-gray-500">{i.city}</td>
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

function UserViewer({ users }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden overflow-x-auto">
      <table className="w-full text-left text-sm min-w-[600px]">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-4 font-bold text-gray-600">Name</th>
            <th className="p-4 font-bold text-gray-600">Email</th>
            <th className="p-4 font-bold text-gray-600">Role</th>
            <th className="p-4 font-bold text-gray-600">Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id} className="border-b hover:bg-gray-50">
              <td className="p-4 font-medium">{u.name}</td>
              <td className="p-4 text-blue-600">{u.email}</td>
              <td className="p-4">
                <span className={`px-2 py-1 rounded text-xs font-bold ${u.role === 'Administrator' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}`}>
                  {u.role}
                </span>
              </td>
              <td className="p-4 text-gray-400 text-xs">
                {u.joined ? new Date(u.joined).toLocaleDateString() : 'Unknown'}
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr><td colSpan="4" className="p-8 text-center text-gray-400">No users found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function SubscriberViewer({ subscribers }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 max-w-2xl">
      <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
         <span className="font-bold text-gray-700">Subscriber List</span>
         <span className="text-xs font-bold bg-blue-100 text-blue-600 px-2 py-1 rounded-full">{subscribers.length} Total</span>
      </div>
      <ul className="divide-y">
        {subscribers.map(s => (
          <li key={s._id} className="p-4 flex items-center justify-between hover:bg-gray-50">
            <span className="text-gray-700">{s.email}</span>
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
    <div className="bg-[#4d6b99] p-8 rounded-xl shadow-2xl w-full max-w-sm text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-bl-full pointer-events-none"></div>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold">Get a Free<br/>Consultation</h3>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          required 
          placeholder="Full Name" 
          className="w-full bg-[#5d7aa8] border border-transparent placeholder-gray-300 text-white p-3 rounded focus:outline-none focus:border-white transition"
          value={form.name} onChange={e => setForm({...form, name: e.target.value})}
        />
        <input 
          required 
          type="email" 
          placeholder="Enter Email Address" 
          className="w-full bg-[#5d7aa8] border border-transparent placeholder-gray-300 text-white p-3 rounded focus:outline-none focus:border-white transition"
          value={form.email} onChange={e => setForm({...form, email: e.target.value})}
        />
        <input 
          required 
          type="tel" 
          placeholder="Mobile Number" 
          className="w-full bg-[#5d7aa8] border border-transparent placeholder-gray-300 text-white p-3 rounded focus:outline-none focus:border-white transition"
          value={form.mobile} onChange={e => setForm({...form, mobile: e.target.value})}
        />
        <input 
          required 
          placeholder="Area, City" 
          className="w-full bg-[#5d7aa8] border border-transparent placeholder-gray-300 text-white p-3 rounded focus:outline-none focus:border-white transition"
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
    <div className="bg-blue-600 py-12">
      <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-white">
            <h3 className="text-2xl font-bold">Subscribe to our Newsletter</h3>
            <p className="text-blue-100">Get the latest updates and offers directly in your inbox.</p>
          </div>
          <form onSubmit={handleSub} className="flex w-full md:w-auto bg-white p-1 rounded-lg">
            <input 
              type="email" 
              placeholder="Enter Email Address" 
              className="flex-1 p-3 outline-none text-gray-700 min-w-[200px]"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <button className="bg-blue-600 text-white px-6 font-bold rounded hover:bg-blue-700 transition">
              Subscribe
            </button>
          </form>
      </div>
    </div>
  );
}

// Styles injection
const style = document.createElement('style');
style.textContent = `
  @keyframes fade-in-up {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .animate-fade-in-up {
    animation: fade-in-up 0.8s ease-out forwards;
  }
  .animate-fade-in {
    animation: fade-in 0.3s ease-out forwards;
  }
`;
document.head.appendChild(style);