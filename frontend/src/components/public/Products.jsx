import { motion } from 'framer-motion';
import { HiArrowRight, HiCheckCircle } from 'react-icons/hi';

const Products = ({ products, onSelectProduct }) => {
  return (
    <section id="products" className="py-24 bg-primary relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Our Products</h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Focused MERN stack products built for real business needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-8 group hover:border-indigo/50 transition-all duration-500"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                   <span className="text-indigo text-xs font-bold uppercase tracking-widest mb-2 block">{product.slug.replace('-', ' ')}</span>
                   <h3 className="text-2xl font-bold text-white">{product.title}</h3>
                </div>
                <button 
                  onClick={() => onSelectProduct(product.title)}
                  className="w-12 h-12 rounded-xl bg-indigo/10 flex items-center justify-center text-indigo group-hover:bg-indigo group-hover:text-white transition-all cursor-pointer"
                >
                  <HiArrowRight className="text-2xl" />
                </button>
              </div>
              
              <p className="text-muted mb-8 text-sm leading-relaxed">
                {product.shortDescription}
              </p>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {product.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2 text-white/80 text-xs">
                    <HiCheckCircle className="text-emerald shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => onSelectProduct(product.title)}
                className="w-full py-3 rounded-lg border border-white/10 hover:bg-white/5 text-sm font-semibold transition-all cursor-pointer"
              >
                Learn More
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
