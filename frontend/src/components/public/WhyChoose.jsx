import { motion } from 'framer-motion';
import { whyChooseUs } from '../../data/siteData';
import { HiBadgeCheck } from 'react-icons/hi';

const WhyChoose = () => {
  return (
    <section className="py-24 bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Why Choose <br /><span className="gradient-text">GnanaStack Technologies?</span></h2>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
              {whyChooseUs.map((point, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <HiBadgeCheck className="text-indigo text-xl mt-1 shrink-0" />
                  <p className="text-muted text-sm font-medium leading-relaxed">{point}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="flex-1 relative">
            <div className="relative z-10 p-2 glass-card border-indigo/20">
               <div className="bg-navy rounded-xl p-8 aspect-square flex flex-col justify-center">
                  <div className="text-5xl font-extrabold text-white mb-2">100%</div>
                  <div className="text-indigo font-bold uppercase tracking-widest text-sm mb-6">MERN Stack Dedicated</div>
                  <p className="text-muted text-sm leading-relaxed">
                    We don't juggle multiple stacks. We master MERN (MongoDB, Express, React, Node.js) to deliver high-performance, scalable web applications that stand out.
                  </p>
                  <div className="mt-8 flex gap-2">
                    <div className="h-1 w-12 bg-indigo rounded-full" />
                    <div className="h-1 w-4 bg-muted/20 rounded-full" />
                    <div className="h-1 w-4 bg-muted/20 rounded-full" />
                  </div>
               </div>
            </div>
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo/5 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
