import { InputHTMLAttributes } from "react";

type OptionSelect = { id: string; label: String }

export type SelectProps = InputHTMLAttributes<HTMLSelectElement> & { options?: OptionSelect[] }

export type TextAreaProps = InputHTMLAttributes<HTMLTextAreaElement>

export type InputProps = InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
> & {
  label?: string
  as?: "textarea" | "select"
  options?: OptionSelect[]
}