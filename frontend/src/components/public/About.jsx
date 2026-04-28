import { motion } from 'framer-motion';

const About = ({ settings }) => {
  return (
    <section id="about" className="py-24 bg-primary relative overflow-hidden">
      {/* Visual background accents */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-indigo/5 blur-3xl rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
             <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 border-l-8 border-indigo pl-6 leading-tight">
               {settings?.aboutTitle || 'From Village Vision to Digital Innovation'}
             </h2>
             <div className="space-y-6">
                <p className="text-muted text-lg leading-relaxed whitespace-pre-line">
                  {settings?.aboutDescription || 'GnanaStack Technologies is a one-person MERN stack software studio built with skill, consistency, and a strong vision.'}
                </p>
             </div>
             
             <div className="mt-10 flex items-center gap-4">
                <div className="w-16 h-1 bg-indigo rounded-full" />
                <span className="text-white font-bold uppercase tracking-widest text-sm italic">Built with integrity. Delivered with precision.</span>
             </div>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="flex-1 w-full"
          >
             <div className="glass-card p-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4">
                  <div className="w-20 h-20 bg-indigo/10 rounded-full blur-xl group-hover:bg-indigo/20 transition-all" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-6">Our Core Philsophy</h3>
                <ul className="space-y-4">
                   {[
                     "Quality over Quantity",
                     "Scale with Purpose",
                     "Security by Design",
                     "Community Growth"
                   ].map(item => (
                     <li key={item} className="flex items-center gap-3 text-muted">
                        <div className="w-2 h-2 rounded-full bg-indigo" />
                        {item}
                     </li>
                   ))}
                </ul>

                <div className="mt-12 p-6 rounded-xl bg-white/5 border border-white/5">
                   <p className="text-sm italic text-muted">
                     "Rooted in tradition, driven by the future. GnanaStack is where local vision meets global standards."
                   </p>
                </div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
