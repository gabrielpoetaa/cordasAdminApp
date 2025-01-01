import React, { forwardRef, ComponentProps } from "react";

interface InputControlProps extends ComponentProps<"input"> {}

export const InputControl = forwardRef<HTMLInputElement, InputControlProps>(
  (props, ref) => (
    <input ref={ref} className="border-0 w-full rounded h-8 px-3" {...props} />
  )
);
InputControl.displayName = "InputControl";

interface InputPrefixProps extends ComponentProps<"div"> {}

export function InputPrefix(props: InputPrefixProps) {
  return <div {...props} />;
}

interface InputRootProps extends ComponentProps<"div"> {}

export function InputRoot(props: InputRootProps) {
  return (
    <div
      className="mx-1 flex w-full items-center gap-2 rounded-lg border border-zinc-300 px-3 py-2 shadow-sm"
      {...props}
    />
  );
}
