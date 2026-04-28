import { motion } from 'framer-motion';
import { techStack } from '../../data/siteData';

const TechStack = () => {
  return (
    <section className="py-20 bg-[#0a0f2b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-indigo mb-4">Our Technology Stack</h3>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Modern Tools for High-Performance Solutions</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {techStack.map((tech, index) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="px-6 py-3 rounded-full bg-white/5 border border-white/5 text-muted font-medium hover:text-white hover:border-indigo/50 transition-all cursor-default"
            >
              {tech}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
