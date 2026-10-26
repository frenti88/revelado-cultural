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
      ? "bg-[#29143B] text-[#FAF6FB] border-b border-[#3D2254]"
      : "bg-[#170B25] text-[#FAF6FB] border-b border-[#3D2254]";

  return (
    <section id={id} className={`w-full section-macro scroll-mt-20 ${bgClass}`}>
      <div className="layout-container">
        {/* Section Header: El titular (h2) lidera con jerarquía editorial de alto impacto */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 mb-8 lg:mb-12 border-b border-[#3D2254]">
          <div className="max-w-2xl">
            <h2 className="font-display font-black text-heading-fluid text-[#FAF6FB] tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-4 text-base sm:text-lg font-normal leading-relaxed text-[#D1C6DA]">
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
