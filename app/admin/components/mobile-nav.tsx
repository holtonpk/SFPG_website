"use client";

import { motion, useCycle } from "framer-motion";
import Link from "next/link";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { Icons } from "@/app/admin/components/icons";
import { Button } from "@/app/admin/components/ui/button";
import { useParams, useSelectedLayoutSegment } from "next/navigation";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 100% 0)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(0px at 100% 0)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

export default function MobileNav() {
  const [isOpen, toggleOpen] = useCycle(true, false);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  const segment = useSelectedLayoutSegment();

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      className={` top-0 inset-0 z-[50] md:hidden w-fit `}
      ref={containerRef}
    >
      <motion.div
        className="absolute  inset-0 left-0 w-full bg-background overflow-hidden"
        variants={sidebar}
      />
      <motion.ul
        variants={variants}
        className="absolute grid w-full gap-3 px-10 py-16  overflow-hidden left-0"
      >
        <div className="grid gap-8">
          <MenuItem className="gap-4 flex-col flex">
            <Link
              href="/admin/dashboard"
              onClick={() => toggleOpen()}
              className={`flex w-full font-bold text-2xl transition-colors hover:text-primary ${
                segment === "dashboard" ? "text-primary" : ""
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/admin/website"
              className={`flex w-full font-bold text-2xl transition-colors hover:text-primary ${
                segment === "website" ? "text-primary" : ""
              }`}
            >
              Website
            </Link>
            {/* <Link
        href="/admin/analytics"
        className={`text-sm font-medium transition-colors hover:text-primary ${
          segment === "analytics" ? "text-default" : "text-muted-foreground"
        }`}
      >
        Analytics
      </Link> */}
            <Link
              href="/admin/site-data"
              className={`flex w-full  font-bold text-2xl transition-colors hover:text-primary ${
                segment === "site-data" ? "text-primary" : ""
              }`}
            >
              Site Data
            </Link>
            <Link
              href="/admin/settings"
              className={`flex w-full font-bold text-2xl transition-colors hover:text-primary ${
                segment === "settings" ? "text-primary" : ""
              }`}
            >
              Settings
            </Link>
          </MenuItem>
        </div>
      </motion.ul>

      <MenuToggle toggle={toggleOpen} isOpen={isOpen} />
    </motion.nav>
  );
}

const MenuToggle = ({ toggle, isOpen }: { toggle: any; isOpen: boolean }) => (
  <Button onClick={toggle} className="relative  aspect-square p-2  ">
    {isOpen ? (
      <Icons.close className="w-5 h-5 " />
    ) : (
      <Icons.menu className="w-5 h-5" />
    )}
  </Button>
);

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="2"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

const MenuItem = ({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) => {
  return (
    <motion.li variants={MenuItemVariants} className={className}>
      {children}
    </motion.li>
  );
};

const MenuItemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
      duration: 0.04,
    },
  },
};

const variants = {
  open: {
    transition: { staggerChildren: 0.04, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.02, staggerDirection: -1 },
  },
};

const useDimensions = (ref: any) => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    dimensions.current.width = ref.current.offsetWidth;
    dimensions.current.height = ref.current.offsetHeight;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return dimensions.current;
};
