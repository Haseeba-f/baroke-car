import React, { useRef, useState } from 'react';

interface ServiceItem {
  id: string;
  title: string;
  icon: string;
}

interface ServiceCardProps {
  service: ServiceItem;
  onSelectService?: (serviceTitle: string) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelectService }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: -y * 8,
      y: x * 8
    });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${isHovered ? '8px' : '0px'})`,
        transition: isHovered ? 'transform 0.12s ease-out' : 'transform 0.5s ease-out'
      }}
      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl border border-neutral-200/80 flex flex-col justify-between group relative overflow-hidden will-change-transform h-full min-h-[160px]"
    >
      {/* Red accent line that draws in on hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-neutral-100 overflow-hidden">
        <div className="h-full w-0 group-hover:w-full bg-[#8a0011] transition-all duration-400 ease-out" />
      </div>

      {/* Icon + Service Name ONLY */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-neutral-100 text-[#8a0011] group-hover:bg-[#8a0011] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm shrink-0 group-hover:scale-105">
          <span className="material-symbols-outlined text-[26px]">
            {service.icon}
          </span>
        </div>

        <h3 className="font-headline text-xl sm:text-2xl uppercase tracking-tight text-[#1a1c1d] group-hover:text-[#8a0011] transition-colors leading-tight">
          {service.title}
        </h3>
      </div>

      {/* Small Book link */}
      <div className="mt-6 pt-3 border-t border-neutral-100 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onSelectService?.(service.title)}
          className="text-xs uppercase font-bold tracking-wider text-[#8a0011] hover:text-[#b3121f] inline-flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>Book</span>
          <span className="material-symbols-outlined text-[15px] transition-transform group-hover:translate-x-1">
            arrow_forward
          </span>
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
