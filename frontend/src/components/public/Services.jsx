import { motion } from 'framer-motion';
import { HiCode, HiDatabase, HiDesktopComputer, HiColorSwatch, HiLightningBolt, HiChip, HiCube, HiThumbUp } from 'react-icons/hi';

const icons = {
  HiCode: <HiCode />,
  HiDatabase: <HiDatabase />,
  HiDesktopComputer: <HiDesktopComputer />,
  HiColorSwatch: <HiColorSwatch />,
  HiLightningBolt: <HiLightningBolt />,
  HiChip: <HiChip />,
  HiCube: <HiCube />,
  HiThumbUp: <HiThumbUp />
};

const Services = ({ services }) => {
  return (
    <section id="services" className="pt-24 pb-28 md:pb-24 bg-[#070b1d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">What We Build</h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Comprehensive MERN stack solutions tailored for your business success.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all group min-h-[132px] flex flex-col justify-center"
            >
              <div className="w-12 h-12 rounded-lg bg-indigo/10 flex items-center justify-center text-2xl text-indigo mb-4 group-hover:bg-indigo group-hover:text-white transition-all">
                {icons[service.icon] || <HiCode />}
              </div>
              <h3 className="text-lg font-bold text-white leading-snug">{service.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
