import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { FileText, Youtube, Link as LinkIcon, Github, Layout, CheckCircle2 } from 'lucide-react';

const ExamAndAcademic: React.FC = () => {
  const { elementRef: academicRef, isVisible: isAcademicVisible } = useIntersectionObserver();
  const { elementRef: examRef, isVisible: isExamVisible } = useIntersectionObserver();

  return (
    <>
      {/* SECTION 8: ACADEMIC ORGANIZATION */}
      <section className="py-24 bg-white" ref={academicRef}>
        <div className={`container mx-auto px-4 fade-in-section ${isAcademicVisible ? 'is-visible' : ''}`}>
           <div className="text-center max-w-3xl mx-auto mb-16">
             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">📚 Your Entire Study Life — Organized</h2>
             <p className="text-xl text-gray-500">Subjects → Units → Notes, Videos, Questions. All in one place.</p>
           </div>
           
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
             <div className="order-2 lg:order-1 relative">
                <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
                   {/* Fake Browser Header */}
                   <div className="bg-gray-100 px-4 py-3 border-b border-gray-200 flex space-x-2">
                     <div className="w-3 h-3 rounded-full bg-red-400"></div>
                     <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                     <div className="w-3 h-3 rounded-full bg-green-400"></div>
                   </div>
                   {/* Content */}
                   <div className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="font-bold text-xl">Physics / Electromagnetism</h4>
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Exam Readiness: 82%</span>
                      </div>
                      
                      {/* Tabs */}
                      <div className="flex space-x-6 border-b border-gray-100 mb-6 text-sm font-medium text-gray-500">
                        <span className="text-primary border-b-2 border-primary pb-2">All Resources</span>
                        <span className="pb-2">Notes</span>
                        <span className="pb-2">Videos</span>
                        <span className="pb-2">Questions</span>
                      </div>

                      {/* Resource List */}
                      <div className="space-y-4">
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                           <FileText className="text-red-500 mr-4" size={24} />
                           <div className="flex-1">
                             <div className="font-semibold text-gray-800">Class Lecture Notes.pdf</div>
                             <div className="text-xs text-gray-500">Uploaded yesterday • 2.4 MB</div>
                           </div>
                        </div>
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                           <Youtube className="text-red-600 mr-4" size={24} />
                           <div className="flex-1">
                             <div className="font-semibold text-gray-800">Maxwell's Equations Explained</div>
                             <div className="text-xs text-gray-500">YouTube • 14:20 mins</div>
                           </div>
                        </div>
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                           <Github className="text-gray-900 mr-4" size={24} />
                           <div className="flex-1">
                             <div className="font-semibold text-gray-800">Simulation-Code-Repo</div>
                             <div className="text-xs text-gray-500">GitHub Repository</div>
                           </div>
                        </div>
                         <div className="flex items-center p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                           <CheckCircle2 className="text-indigo-600 mr-4" size={24} />
                           <div className="flex-1">
                             <div className="font-semibold text-indigo-900">AI Predicted: 5 Important Questions</div>
                             <div className="text-xs text-indigo-600">High probability for Finals</div>
                           </div>
                        </div>
                      </div>
                   </div>
                </div>
             </div>

             <div className="order-1 lg:order-2 space-y-8">
               <div className="flex items-start">
                 <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mr-6">
                   <Layout size={24} />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-gray-900 mb-2">Subject-Wise Dashboard</h3>
                   <p className="text-gray-600">Stop digging through folders. Access all your notes, links, and PYQs organized by subject and unit.</p>
                 </div>
               </div>
               
               <div className="flex items-start">
                 <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600 mr-6">
                   <Youtube size={24} />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-gray-900 mb-2">Curated Video Library</h3>
                   <p className="text-gray-600">Save the exact timestamp of YouTube lectures. Organize them by topic for quick revision.</p>
                 </div>
               </div>

               <div className="flex items-start">
                 <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-700 mr-6">
                   <LinkIcon size={24} />
                 </div>
                 <div>
                   <h3 className="text-xl font-bold text-gray-900 mb-2">Web & GitHub Links</h3>
                   <p className="text-gray-600">Keep GeeksforGeeks articles, Wikipedia pages, and GitHub repos linked directly to your syllabus.</p>
                 </div>
               </div>

                <div className="pt-6">
                  <button className="px-8 py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg transition-colors shadow-lg shadow-primary/20">
                    Organize Your Studies
                  </button>
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* SECTION 9: EXAM PREPARATION */}
      <section className="py-24 bg-gray-900 text-white" id="exam-prep" ref={examRef}>
        <div className={`container mx-auto px-4 fade-in-section ${isExamVisible ? 'is-visible' : ''}`}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">📝 Every Exam. One Platform.</h2>
            <p className="text-xl text-gray-400">From School Boards to UPSC, Kalvi AI adapts its improvement engine to your goal.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-16 opacity-80">
             {["CBSE/ICSE", "JEE Main", "NEET", "UPSC", "CAT", "GATE", "Study Abroad"].map((exam) => (
               <div key={exam} className="bg-gray-800 border border-gray-700 rounded-lg p-3 text-center text-sm font-semibold hover:bg-gray-700 hover:text-white transition-colors cursor-default">
                 {exam}
               </div>
             ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-center">
             <div className="lg:w-1/2 space-y-6">
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 flex items-start">
                   <div className="mr-4 text-3xl">📉</div>
                   <div>
                     <h4 className="font-bold text-lg mb-1">Weak Area Detection</h4>
                     <p className="text-gray-400 text-sm">"You are scoring 40% in Thermodynamics. I've added 2 extra practice sessions this week."</p>
                   </div>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 flex items-start">
                   <div className="mr-4 text-3xl">📅</div>
                   <div>
                     <h4 className="font-bold text-lg mb-1">Personalized Plans</h4>
                     <p className="text-gray-400 text-sm">Dynamic schedule that changes based on your speed and exam date.</p>
                   </div>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 flex items-start">
                   <div className="mr-4 text-3xl">🔮</div>
                   <div>
                     <h4 className="font-bold text-lg mb-1">Score Prediction</h4>
                     <p className="text-gray-400 text-sm">AI predicts your likely rank/score based on current performance and suggests fixes.</p>
                   </div>
                </div>
                <div className="mt-8">
                  <button className="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors shadow-lg shadow-orange-600/20">
                    Start Your Exam Prep
                  </button>
                </div>
             </div>

             <div className="lg:w-1/2">
                <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-2xl relative">
                   <div className="absolute -top-5 -right-5 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-bounce">
                     +15 Marks Improved
                   </div>
                   <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <span className="text-gray-400 text-sm">Overall Progress</span>
                        <span className="text-2xl font-bold text-white">72%</span>
                      </div>
                      <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 w-[72%]"></div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-6">
                         <div className="bg-gray-900 p-4 rounded-lg">
                           <div className="text-xs text-gray-500 mb-1">Strong Subject</div>
                           <div className="text-green-400 font-bold">Mathematics</div>
                           <div className="h-1 bg-gray-700 mt-2 rounded-full"><div className="w-[90%] bg-green-500 h-full rounded-full"></div></div>
                         </div>
                         <div className="bg-gray-900 p-4 rounded-lg border border-red-500/30">
                           <div className="text-xs text-gray-500 mb-1">Needs Improvement</div>
                           <div className="text-red-400 font-bold">Physics</div>
                           <div className="h-1 bg-gray-700 mt-2 rounded-full"><div className="w-[45%] bg-red-500 h-full rounded-full"></div></div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ExamAndAcademic;
