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
      ? "bg-[#222222] text-[#F2EFE8] border-b border-[#2E2E2E]"
      : "bg-[#151515] text-[#F2EFE8] border-b border-[#2E2E2E]";

  return (
    <section id={id} className={`w-full section-macro scroll-mt-20 ${bgClass}`}>
      <div className="layout-container">
        {/* Section Header: El titular (h2) lidera con jerarquía editorial */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 mb-8 lg:mb-12 border-b border-[#2E2E2E]">
          <div className="max-w-2xl">
            <h2 className="font-display font-bold text-heading-fluid text-[#F2EFE8]">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-4 text-base sm:text-lg font-normal leading-relaxed text-[#A7A39D]">
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
