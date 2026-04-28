import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Projects = ({ projects }) => {
  return (
    <section id="portfolio" className="py-24 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Project Samples</h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            A glimpse into the robust applications built at GnanaStack Technologies.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card group overflow-hidden border border-white/5 hover:border-indigo/50 transition-all duration-500"
            >
              <div className="aspect-video bg-[#0a0f2b] relative overflow-hidden">
                 {/* Project Image */}
                 {project.imageUrl ? (
                   <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                   />
                 ) : (
                   <div className="w-full h-full bg-gradient-to-br from-navy to-indigo/20 p-8 flex flex-col justify-end">
                      {/* Fallback if no image */}
                      <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                   </div>
                 )}
                 
                 {/* Overlay Gradient */}
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f2b] via-transparent to-transparent opacity-80" />
                 
                 <div className="absolute top-4 right-4 text-[10px] uppercase font-bold tracking-widest px-2 py-1 bg-indigo/80 text-white rounded shadow-lg backdrop-blur-md">Sample Output</div>
                 
                 <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">{project.title}</h3>
                    <div className="flex gap-2">
                       {project.techStack.map(t => (
                         <span key={t} className="text-[10px] font-bold text-white bg-indigo/40 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded uppercase">{t}</span>
                       ))}
                    </div>
                 </div>
              </div>
              
              <div className="p-8">
                <p className="text-muted text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
                <div className="flex justify-between items-center">
                   <Link to={`/projects/${project._id}`} className="text-indigo text-sm font-bold hover:text-white transition-all">View Details</Link>
                   <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full border-2 border-primary bg-indigo/40" />
                      <div className="w-8 h-8 rounded-full border-2 border-primary bg-electric-blue/40" />
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
