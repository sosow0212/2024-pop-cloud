import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export default cn;
