"use client";

import { clsx } from "clsx";
import { ComponentProps, forwardRef, useId, useState } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

import { useToggle } from "@/hooks";

interface InputProps extends Omit<ComponentProps<"input">, "type"> {
  /** input의 placeholder 속성입니다. */
  placeholder?: string;
  /** input 의 타입입니다. text, email, password */
  type?: "text" | "email" | "password" | "number";
  /** 추가적인 className입니다. 너비와 높이 등을 설정할 수 있습니다. */
  className?: string;
  /** 에러 메시지입니다. */
  error?: string;
  /** 라벨 텍스트입니다. 옵셔널합니다. */
  label?: string;
  /** 라벨의 추가적인 className입니다. */
  labelClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      placeholder,
      type = "text",
      className,
      error,
      label,
      labelClassName,
      required = false,
      id,
      ...props
    },
    ref,
  ) => {
    const [inputType, setInputType] = useState(type);
    const { value: isVisible, handleToggle } = useToggle();
    const generatedId = useId();
    const inputId = id || `input-${generatedId}`;

    const handleClickVisible = () => {
      handleToggle();
      setInputType((prevType) =>
        prevType === "password" ? "text" : "password",
      );
    };

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className={clsx(
              "mb-5 block text-16-600  text-gray-700 ",
              labelClassName,
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            id={inputId}
            className={clsx(
              "w-full rounded-lg py-2 pl-8   pr-10 leading-tight text-gray-700",
              "border border-gray-300 bg-white focus:border-blue-500 focus:outline-none",
              "transition-all duration-200 ease-in-out",
              error
                ? "border-red-500 focus:border-red-500"
                : "focus:shadow-outline",
              props.disabled
                ? "cursor-not-allowed bg-gray-100 opacity-50"
                : "hover:border-gray-400",
              className,
            )}
            placeholder={placeholder}
            type={inputType}
            required={required}
            ref={ref}
            {...props}
          />
          {type === "password" && (
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 focus:outline-none"
              onClick={handleClickVisible}
              aria-label="Toggle password visibility"
              type="button"
            >
              {isVisible ? (
                <MdOutlineVisibility className="size-5" />
              ) : (
                <MdOutlineVisibilityOff className="size-5" />
              )}
            </button>
          )}
        </div>
        {error && <p className="text-sm mt-1 text-red-500">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
