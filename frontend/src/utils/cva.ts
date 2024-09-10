import { cva } from "class-variance-authority";

const button = cva(
  "cursor-pointer px-4 py-2 font-semibold text-white rounded-lg",
  {
    variants: {
      color: {
        primary: "bg-blue-500 hover:bg-blue-700",
        secondary: "bg-gray-500 hover:bg-gray-700",
      },
      size: {
        small: "text-sm",
        large: "text-lg",
      },
    },
    defaultVariants: {
      color: "primary",
      size: "small",
    },
  }
);


export { button };
