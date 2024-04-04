"use client";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
};
export const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  //for styling active nav component
  const isActive =
    (pathname === "/" && href === "/") || //This condition checks if both the current pathname and the href are "/" (the root page). It ensures that if both are the root page, the link is considered active.
    pathname === href || //if we are on same This condition checks if the current pathname matches the href exactly. It means the link is considered active if the current URL matches the href exactly.
    pathname?.startsWith(`${href}`); //if we are on parent path of specific page This condition checks if the current pathname starts with the href. It's used to handle cases where the link points to a parent path of the current page. The ?. operator is used to avoid errors if pathname is null or undefined.

  const onClick = () => {
    router.push(href);
  };
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600  hover:bg-slate-300/20 ",
        isActive &&
          "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20  hover:text-sky-700"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn("text-slate-500  ", isActive && "text-sky-700")}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-sky-700 h-full transition-all",
          isActive && "opacity-100"
        )}
      />
    </button>
  );
};
