import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Glows */}
      <div className="glow-circle w-[500px] h-[500px] bg-indigo -top-20 -left-20" />
      <div className="glow-circle w-[400px] h-[400px] bg-electric-blue top-1/2 -right-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo/10 border border-indigo/20 text-indigo text-xs font-bold uppercase tracking-wider mb-6">
            MERN Stack Software Studio
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            Building Powerful <span className="gradient-text">MERN Stack</span> Products for Modern Businesses
          </h1>
          <p className="text-muted text-lg md:text-xl max-w-lg mb-8 leading-relaxed">
            GnanaStack Technologies builds HRMS platforms, online test portals, digital invitation websites, and custom MERN stack applications for businesses, institutions, and startups.
          </p>
          <div className="italic text-indigo/80 font-medium mb-10 border-l-4 border-indigo pl-4 py-1">
            "From Village Vision to Digital Innovation"
          </div>
          <div className="flex flex-wrap gap-4">
            <button className="btn-primary">Explore Products</button>
            <button className="btn-outline">Start Your Project</button>
          </div>
        </motion.div>

        {/* Hero Visual */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden md:block"
        >
          <div className="glass-card p-4 aspect-[4/3] relative flex items-center justify-center border-white/10">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo/10 to-emerald/10 rounded-2xl" />
            
            {/* Mock Dashboard UI Elements */}
            <div className="w-full h-full p-4 flex flex-col gap-4">
               <div className="h-4 w-1/3 bg-white/10 rounded" />
               <div className="grid grid-cols-3 gap-2">
                 <div className="h-20 bg-indigo/20 rounded-lg flex items-center justify-center"><div className="w-8 h-8 rounded-full bg-indigo/40" /></div>
                 <div className="h-20 bg-electric-blue/20 rounded-lg flex items-center justify-center"><div className="w-8 h-8 rounded-full bg-electric-blue/40" /></div>
                 <div className="h-20 bg-emerald/20 rounded-lg flex items-center justify-center"><div className="w-8 h-8 rounded-full bg-emerald/40" /></div>
               </div>
               <div className="flex-1 bg-white/5 rounded-lg p-3">
                  <div className="flex flex-col gap-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="h-3 w-full bg-white/5 rounded flex items-center px-2">
                         <div className="h-1.5 w-1/4 bg-white/10 rounded" />
                      </div>
                    ))}
                  </div>
               </div>
            </div>

            {/* Floating Cards */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute -top-6 -right-6 px-4 py-2 glass-card border-indigo/30 shadow-xl"
            >
              <span className="text-sm font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo animate-pulse" /> HRMS
              </span>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute bottom-10 -left-10 px-4 py-2 glass-card border-emerald/30 shadow-xl"
            >
              <span className="text-sm font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" /> Test Portal
              </span>
            </motion.div>

            <div className="absolute top-1/2 -right-12 translate-y-[-50%] flex flex-col gap-3">
               {['React', 'Node.js', 'MongoDB'].map(tech => (
                 <div key={tech} className="px-3 py-1 bg-primary border border-white/10 rounded-md text-[10px] font-bold text-muted uppercase tracking-tighter">
                   {tech}
                 </div>
               ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
