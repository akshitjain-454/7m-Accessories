import { useState } from 'react';
import { motion, MotionConfig } from 'framer-motion';

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
  const [hovered, setHovered] = useState(null);

  return (
    <MotionConfig transition={{ bounce: 0, type: 'tween' }}>
      <nav className={'relative'}>
        <ul className={'flex items-center gap-2'}>
          {list?.map((item) => {
            return (
              <li key={item.id} className={'relative'}>
                <a
                  className={`
                    relative flex items-center justify-center rounded px-6 py-2 transition-all font-bold text-sm uppercase tracking-wide
                    hover:text-brand text-gray-800
                    ${hovered === item?.id ? 'text-brand' : ''}
                  `}
                  onMouseEnter={() => setHovered(item.id)}
                  onMouseLeave={() => setHovered(null)}
                  href={item?.url}
                >
                  {item?.title}
                </a>
                
                {/* Animated underline cursor */}
                {hovered === item?.id && !item?.dropdown && (
                  <motion.div
                    layout
                    layoutId={`cursor`}
                    className={'absolute h-0.5 w-full bg-brand bottom-0 left-0'}
                  />
                )}

                {/* Dropdown Menu */}
                {item?.dropdown && hovered === item?.id && (
                  <div
                    className='absolute left-0 top-full pt-4 z-50'
                    onMouseEnter={() => setHovered(item.id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <motion.div
                      layout
                      transition={{ bounce: 0 }}
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 10, opacity: 0 }}
                      style={{ borderRadius: '8px' }}
                      className='flex w-64 flex-col rounded-md bg-white border border-gray-100 shadow-xl overflow-hidden'
                      layoutId={'cursor'}
                    >
                      {item?.items?.map((nav) => {
                        return (
                          <motion.a
                            key={`link-${nav?.id}`}
                            href={`${nav?.url}`}
                            className={'w-full p-4 hover:bg-gray-50 text-sm font-semibold text-gray-700 hover:text-brand transition-colors'}
                          >
                            {nav?.title}
                          </motion.a>
                        );
                      })}
                    </motion.div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </MotionConfig>
  );
};

export default NavBar;