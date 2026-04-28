import { motion } from 'framer-motion';
import { processSteps } from '../../data/siteData';

const Process = () => {
  return (
    <section id="process" className="py-24 bg-[#070b1d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">How We Work</h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            A streamlined process from concept to deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-indigo/30 to-transparent z-0" />

          {processSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary border border-white/10 flex items-center justify-center text-2xl font-bold text-indigo mb-6 group-hover:border-indigo transition-all">
                {index + 1}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-muted text-sm leading-relaxed max-w-[250px] mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
