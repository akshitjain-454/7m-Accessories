import { useState } from 'react';
import { motion, MotionConfig, AnimatePresence } from 'framer-motion';

interface NavBarItem {
  id: string | number;
  title: string;
  url: string;
  dropdown?: boolean;
  items?: { id: string | number; title: string; url: string }[];
}

interface NavBarProps {
  list: NavBarItem[];
}

const NavBar: React.FC<NavBarProps> = ({ list }) => {
  const [hovered, setHovered] = useState<string | number | null>(null);

  return (
    <MotionConfig transition={{ duration: 0.3, ease: "easeInOut" }}>
      <nav className="relative">
        <ul className="flex items-center gap-2">
          {list?.map((item) => {
            return (
              <li 
                key={item.id} 
                className="relative"
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* INTERACTIVE HOVER BUTTON LOGIC */}
                <a
                  href={item.url}
                  className={`
                    relative flex items-center justify-center overflow-hidden rounded-full 
                    px-6 py-2 transition-all font-bold text-xs uppercase tracking-widest
                    border border-transparent
                    ${hovered === item.id ? 'text-white' : 'text-[#1F1F69]'}
                  `}
                >
                  {/* The Background Fill Circle */}
                  <motion.div
                    className="absolute z-0 bg-[#1F1F69] rounded-full"
                    initial={false}
                    animate={{
                      width: hovered === item.id ? "200%" : "0%",
                      height: hovered === item.id ? "300%" : "0%",
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />

                  {/* The Text - Needs z-10 to stay above the fill */}
                  <span className="relative z-10">{item.title}</span>
                </a>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {item.dropdown && hovered === item.id && (
                    <motion.div
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 10, opacity: 0 }}
                      className="absolute left-0 top-full pt-4 z-50"
                    >
                      <div className="flex w-64 flex-col rounded-xl bg-white border border-gray-100 shadow-2xl overflow-hidden p-2">
                        {item.items?.map((nav) => (
                          <a
                            key={`link-${nav.id}`}
                            href={nav.url}
                            className="w-full px-4 py-3 rounded-lg hover:bg-[#1F1F69] hover:text-white text-xs font-bold text-[#1F1F69] transition-all uppercase tracking-tight"
                          >
                            {nav.title}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </nav>
    </MotionConfig>
  );
};

export default NavBar;