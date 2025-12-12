
import React, { useState, useEffect, useRef } from 'react';
import { 
  User, Bot, Bell, Palette, CreditCard, Camera, LogOut, 
  ChevronRight, Moon, Sun, Monitor, Check, Clock, Zap, 
  Shield, Mail, Smartphone, GraduationCap, Building2, Calendar, Brain,
  Save, CheckCircle2, AlertTriangle, UploadCloud, BookOpen
} from 'lucide-react';

interface SettingsProps {
  onBack: () => void;
  onLogout: () => void;
  currentTheme: boolean; // true = dark
  onToggleTheme: () => void;
  accentColor?: string;
  setAccentColor?: (color: string) => void;
  density?: 'compact' | 'comfortable';
  setDensity?: (density: 'compact' | 'comfortable') => void;
  initialTab?: 'profile' | 'ai' | 'notifications' | 'appearance' | 'billing';
}

// --- Types & Defaults ---

interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  college: string;
  degree: string;
  year: string;
  targetExam: string;
  avatar: string;
}

interface AIPrefs {
  persona: 'coach' | 'peer' | 'mentor';
  startTime: string;
  endTime: string;
  focusDuration: number;
  autoSchedule: boolean;
  autoCategorize: boolean;
  morningBriefing: boolean;
}

interface NotificationPrefs {
  exam: boolean;
  assignment: boolean;
  budget: boolean;
  spending: boolean;
  hackathon: boolean;
  internship: boolean;
  updates: boolean;
  security: boolean;
}

interface AppSettings {
  profile: UserProfile;
  ai: AIPrefs;
  notifications: NotificationPrefs;
}

const DEFAULT_SETTINGS: AppSettings = {
  profile: {
    fullName: 'Rahul Sharma',
    email: 'rahul@kalvi.ai',
    phone: '+91 98765 43210',
    college: 'NIT Agartala',
    degree: 'B.Tech CSE',
    year: '3rd Year',
    targetExam: 'JEE Main 2026',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul'
  },
  ai: {
    persona: 'coach',
    startTime: '08:00',
    endTime: '23:00',
    focusDuration: 45,
    autoSchedule: true,
    autoCategorize: true,
    morningBriefing: true
  },
  notifications: {
    exam: true,
    assignment: true,
    budget: true,
    spending: true,
    hackathon: true,
    internship: true,
    updates: true,
    security: false
  }
};

const Settings: React.FC<SettingsProps> = ({ 
  onBack, 
  onLogout, 
  currentTheme, 
  onToggleTheme, 
  accentColor = '#2563EB', 
  setAccentColor = (_: string) => {}, 
  density = 'comfortable', 
  setDensity = (_: any) => {},
  initialTab = 'profile'
}) => {
  // State
  const [activeTab, setActiveTab] = useState<'profile' | 'ai' | 'notifications' | 'appearance' | 'billing'>(initialTab);
  const [formData, setFormData] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- 1. Load Data ---
  useEffect(() => {
    const saved = localStorage.getItem('kalvi_settings');
    if (saved) {
      try {
        setFormData({ ...DEFAULT_SETTINGS, ...JSON.parse(saved) });
      } catch (e) {
        console.error("Failed to parse settings", e);
      }
    }
  }, []);

  // --- 2. Save Data ---
  const handleSave = () => {
    setIsSaving(true);
    // Simulate network delay for effect
    setTimeout(() => {
      localStorage.setItem('kalvi_settings', JSON.stringify(formData));
      setIsSaving(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 600);
  };

  // --- 3. Update Helpers ---
  const updateProfile = (field: keyof UserProfile, value: any) => {
    setFormData(prev => ({ ...prev, profile: { ...prev.profile, [field]: value } }));
  };

  const updateAI = (field: keyof AIPrefs, value: any) => {
    setFormData(prev => ({ ...prev, ai: { ...prev.ai, [field]: value } }));
  };

  const updateNotif = (field: keyof NotificationPrefs) => {
    setFormData(prev => ({ 
      ...prev, 
      notifications: { ...prev.notifications, [field]: !prev.notifications[field] } 
    }));
  };

  // --- 4. Avatar Upload ---
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File too large. Please select an image under 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfile('avatar', reader.result as string);
        // Auto save for avatar
        const newData = { ...formData, profile: { ...formData.profile, avatar: reader.result as string }};
        localStorage.setItem('kalvi_settings', JSON.stringify(newData));
      };
      reader.readAsDataURL(file);
    }
  };

  // --- Render Helpers ---
  const ToggleSwitch = ({ checked, onChange, label }: { checked: boolean, onChange: () => void, label?: string }) => (
    <div className="flex items-center justify-between py-3 cursor-pointer group" onClick={onChange}>
      {label && <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{label}</span>}
      <div className={`w-11 h-6 rounded-full relative transition-colors duration-200 ease-in-out ${checked ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}>
        <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow-sm transform transition-transform duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
      </div>
    </div>
  );

  const colors = [
    { id: 'blue', hex: '#2563EB' },
    { id: 'purple', hex: '#8B5CF6' },
    { id: 'orange', hex: '#F97316' },
    { id: 'green', hex: '#10B981' },
    { id: 'pink', hex: '#EC4899' },
    { id: 'red', hex: '#EF4444' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-6 right-6 z-[100] bg-green-500 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center animate-in slide-in-from-top-5 duration-300">
          <CheckCircle2 className="mr-2" size={20} />
          <span className="font-bold">Settings Saved Successfully!</span>
        </div>
      )}

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Header */}
        <header className="h-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 md:px-8 flex-shrink-0">
          <div className="flex items-center">
            <button onClick={onBack} className="mr-4 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
              <ChevronRight className="rotate-180" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
          </div>
          <div className="flex items-center gap-3">
             <button 
               onClick={handleSave}
               disabled={isSaving}
               className="flex items-center px-6 py-2.5 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl transition-all shadow-lg shadow-primary/20 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
             >
               {isSaving ? (
                 <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"/> Saving...</>
               ) : (
                 <><Save size={18} className="mr-2" /> Save Changes</>
               )}
             </button>
          </div>
        </header>

        <div className="flex-1 overflow-hidden">
          <div className="max-w-7xl mx-auto h-full flex flex-col md:flex-row p-4 md:p-8 gap-8">
            
            {/* Left Sidebar Navigation */}
            <aside className="w-full md:w-64 flex-shrink-0 space-y-1">
              {[
                { id: 'profile', label: 'My Profile', icon: User },
                { id: 'ai', label: 'AI Preferences', icon: Bot },
                { id: 'notifications', label: 'Notifications', icon: Bell },
                { id: 'appearance', label: 'Appearance', icon: Palette },
                { id: 'billing', label: 'Billing & Plan', icon: CreditCard },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-400 shadow-sm font-bold'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <tab.icon size={18} />
                  <span>{tab.label}</span>
                </button>
              ))}
              
              <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-800">
                <button 
                  onClick={onLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                >
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </button>
              </div>
            </aside>

            {/* Right Content Panel */}
            <main className="flex-1 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-y-auto no-scrollbar">
              <div className="p-6 md:p-10 max-w-4xl">
                
                {/* --- TAB 1: PROFILE --- */}
                {activeTab === 'profile' && (
                  <div className="space-y-8 animate-in fade-in duration-300">
                    {/* ... profile content ... */}
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Personal Information</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Manage your public profile and private details.</p>
                    </div>

                    {/* Avatar Section */}
                    <div className="flex items-center gap-8 p-6 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700">
                      <div className="relative group shrink-0">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 p-1 shadow-md">
                          <img src={formData.profile.avatar} alt="Avatar" className="w-full h-full rounded-full bg-white dark:bg-gray-800 object-cover" />
                        </div>
                        <button 
                          onClick={() => fileInputRef.current?.click()}
                          className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg hover:bg-primary-hover transition-colors ring-2 ring-white dark:ring-gray-900"
                        >
                          <Camera size={16} />
                        </button>
                        <input 
                          type="file" 
                          ref={fileInputRef} 
                          className="hidden" 
                          accept="image/*"
                          onChange={handleAvatarChange}
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-1">Profile Photo</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">Accepted file types: png, jpg. Max size: 5MB</p>
                        <div className="flex gap-3">
                          <button 
                            onClick={() => fileInputRef.current?.click()}
                            className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors shadow-sm"
                          >
                            Change Photo
                          </button>
                          <button 
                            onClick={() => updateProfile('avatar', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Default')}
                            className="text-sm text-red-500 hover:text-red-600 font-medium px-2"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Basic Info Form */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Full Name <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <User size={16} className="absolute left-3 top-3.5 text-gray-400" />
                          <input 
                            type="text" 
                            value={formData.profile.fullName}
                            onChange={(e) => updateProfile('fullName', e.target.value)}
                            className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl py-3 pl-10 pr-4 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" 
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email Address <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <Mail size={16} className="absolute left-3 top-3.5 text-gray-400" />
                          <input 
                            type="email" 
                            value={formData.profile.email}
                            onChange={(e) => updateProfile('email', e.target.value)}
                            className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl py-3 pl-10 pr-4 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" 
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Phone Number</label>
                        <div className="relative">
                          <Smartphone size={16} className="absolute left-3 top-3.5 text-gray-400" />
                          <input 
                            type="tel" 
                            value={formData.profile.phone}
                            onChange={(e) => updateProfile('phone', e.target.value)}
                            className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl py-3 pl-10 pr-4 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* --- TAB 2: AI PREFERENCES --- */}
                {activeTab === 'ai' && (
                  <div className="space-y-8 animate-in fade-in duration-300">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Customize Your AI Agent</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Control how Kalvi AI interacts with you and manages your schedule.</p>
                    </div>
                    {/* ... AI content ... */}
                  </div>
                )}

                {/* --- TAB 3: NOTIFICATIONS --- */}
                {activeTab === 'notifications' && (
                  <div className="space-y-8 animate-in fade-in duration-300">
                    <div className="flex justify-between items-end">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Alert Preferences</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Choose what you want to be notified about.</p>
                      </div>
                      <button className="text-xs font-bold text-primary hover:underline" onClick={() => setFormData(prev => ({...prev, notifications: Object.keys(prev.notifications).reduce((acc, key) => ({...acc, [key]: true}), {} as NotificationPrefs)}))}>Enable All</button>
                    </div>
                    {/* ... notification toggles ... */}
                  </div>
                )}

                {/* --- TAB 4: APPEARANCE --- */}
                {activeTab === 'appearance' && (
                  <div className="space-y-8 animate-in fade-in duration-300">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Look & Feel</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Customize the interface theme and colors.</p>
                    </div>

                    {/* Theme */}
                    <div>
                      <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-4 block">Theme</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        <button
                          onClick={() => { if (currentTheme) onToggleTheme(); }}
                          className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all hover:-translate-y-1 ${
                            !currentTheme 
                              ? 'border-primary bg-primary/5 text-primary ring-2 ring-primary/20' 
                              : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:border-gray-300 dark:hover:border-gray-600'
                          }`}
                        >
                          <Sun size={32} className="mb-3" />
                          <span className="font-bold text-sm">Light Mode</span>
                        </button>
                        <button
                          onClick={() => { if (!currentTheme) onToggleTheme(); }}
                          className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all hover:-translate-y-1 ${
                            currentTheme 
                              ? 'border-primary bg-primary/5 dark:bg-primary/10 text-primary ring-2 ring-primary/20' 
                              : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:border-gray-300 dark:hover:border-gray-600'
                          }`}
                        >
                          <Moon size={32} className="mb-3" />
                          <span className="font-bold text-sm">Dark Mode</span>
                        </button>
                        <button
                          className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-700 text-gray-400 cursor-not-allowed opacity-60"
                        >
                          <Monitor size={32} className="mb-3" />
                          <span className="font-bold text-sm">System</span>
                        </button>
                      </div>
                    </div>

                    {/* Accent Color */}
                    <div>
                      <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-4 block">Accent Color</label>
                      <div className="flex flex-wrap gap-4">
                        {colors.map((c) => (
                          <button
                            key={c.id}
                            onClick={() => setAccentColor && setAccentColor(c.hex)}
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-110 focus:outline-none ring-2 ring-offset-2 dark:ring-offset-gray-900 ${
                              accentColor === c.hex ? 'ring-gray-400 dark:ring-white scale-110' : 'ring-transparent'
                            }`}
                            style={{ backgroundColor: c.hex }}
                          >
                            {accentColor === c.hex && <Check size={20} className="text-white drop-shadow-md" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Density */}
                    <div>
                      <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-4 block">Density</label>
                      <div className="bg-gray-100 dark:bg-gray-900 p-1 rounded-xl inline-flex">
                        {['Compact', 'Comfortable'].map((d) => (
                          <button
                            key={d}
                            onClick={() => setDensity && setDensity(d.toLowerCase() as any)}
                            className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                              density === d.toLowerCase()
                                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                            }`}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* --- TAB 5: BILLING --- */}
                {activeTab === 'billing' && (
                  <div className="space-y-8 animate-in fade-in duration-300">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Billing & Plan</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Manage your subscription and payment methods.</p>
                    </div>
                    {/* ... billing content ... */}
                  </div>
                )}

              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
