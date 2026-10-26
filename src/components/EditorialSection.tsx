import React from "react";

interface EditorialSectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  variant?: "dark" | "secondary";
  action?: React.ReactNode;
  children: React.ReactNode;
}

export const EditorialSection: React.FC<EditorialSectionProps> = ({
  id,
  title,
  subtitle,
  variant = "dark",
  action,
  children,
}) => {
  const bgClass =
    variant === "secondary"
      ? "bg-[#211820] text-[#F5F0E7] border-b border-[#433840]"
      : "bg-[#161317] text-[#F5F0E7] border-b border-[#433840]";

  return (
    <section id={id} className={`w-full section-macro scroll-mt-20 ${bgClass}`}>
      <div className="layout-container">
        {/* Section Header: El titular (h2) lidera sin kicker superior; 16px hacia subtítulo y 32px/48px hacia el cuerpo */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 mb-8 lg:mb-12 border-b border-[#433840]/60">
          <div className="max-w-2xl">
            <h2 className="font-display font-bold text-heading-fluid text-[#F5F0E7]">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-4 text-base sm:text-lg font-normal leading-relaxed text-[#D8CDC8]">
                {subtitle}
              </p>
            )}
          </div>

          {action && <div className="shrink-0">{action}</div>}
        </div>

        {/* Section Body */}
        {children}
      </div>
    </section>
  );
};

export default EditorialSection;
