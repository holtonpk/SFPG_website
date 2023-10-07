"use client";

import { motion, useCycle } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { Icons } from "@/app/(client)/components/icons";
import { marketingConfig } from "@/config/marketing";
import { siteConfig } from "@/config/site";
import { useCart } from "@/context/cart";
import { Button } from "@/app/(client)/components/ui/button";
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

const navItems = ["pricing", "changelog"];

export default function MobileNav() {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  const { showCartPreview, setShowCartPreview, cartTotalQuantity } = useCart();

  const toggleCart = () => {
    setShowCartPreview(!showCartPreview);
  };

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      className={` top-0 inset-0 z-50 w-full md:hidden ${
        isOpen ? "" : "pointer-events-none"
      }`}
      ref={containerRef}
    >
      <motion.div
        className="absolute inset-0 left-0 w-full bg-white"
        variants={sidebar}
      />
      <motion.ul
        variants={variants}
        className="absolute grid w-full gap-3 px-10 py-16 "
      >
        {marketingConfig.mainNav.map((item, i) => (
          <div key={i} className="grid gap-3">
            <MenuItem>
              <Link
                href={item.href}
                onClick={() => toggleOpen()}
                className="flex w-full font-semibold capitalize"
              >
                {item.title}
              </Link>
            </MenuItem>
            <MenuItem className="my-3 h-px w-full bg-gray-300" />
          </div>
        ))}
      </motion.ul>

      <div className="flex items-center justify-between px-4 relative z-20 pt-2">
        <Link href="/#" className="">
          <span className="text-2xl text-primary font-bold  flex items-center ">
            <div className="h-10 w-10 relative  -mr-2">
              <Icons.logo
                className="text-white h-full w-full "
                color="rgb(77 164 224)"
              />
            </div>
            <span className="ml-1 font-head text-theme-blue text-sm">
              {siteConfig.name}
            </span>
          </span>
        </Link>
        <div className="flex gap-4">
          <Button
            variant={"blueOutline"}
            onClick={toggleCart}
            className="rounded-full  relative z-20 flex items-center justify-center p-2 aspect-square"
            id="mobile-header-cart-button"
          >
            {cartTotalQuantity > 0 && (
              <span
                className="absolute pointer-events-none top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 font-bold p-1 text-sm flex items-center justify-center text-theme-blue bg-[#EDF6FB] rounded-full"
                id="mobile-header-cart-quantity"
              >
                {cartTotalQuantity}
              </span>
            )}
            <Icons.shoppingBag className="h-5 w-5 " id="header-cart-icon" />
          </Button>
          <MenuToggle toggle={toggleOpen} isOpen={isOpen} />
        </div>
      </div>
    </motion.nav>
  );
}

const MenuToggle = ({ toggle, isOpen }: { toggle: any; isOpen: boolean }) => (
  <Button
    variant={"blueOutline"}
    onClick={toggle}
    className="pointer-events-auto z-20 aspect-square p-2"
  >
    {isOpen ? (
      <Icons.close className="w-5 h-5" />
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
