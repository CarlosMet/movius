"use client";

import { motion } from "framer-motion";

type Props = {
  open: boolean;
  toggle: () => void;
};

export default function HamburgerButton({ open, toggle }: Props) {
  return (
    <button
      onClick={toggle}
      className="relative w-8 h-8 flex flex-col justify-center items-center md:hidden z-50"
    >
      <motion.span
        animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        className="w-6 h-[2px] bg-black block mb-1"
      />

      <motion.span
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        className="w-6 h-[2px] bg-black block mb-1"
      />

      <motion.span
        animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        className="w-6 h-[2px] bg-black block"
      />
    </button>
  );
}