import { FC, InputHTMLAttributes } from "react"
import { InputProps, SelectProps, TextAreaProps } from "./types"

const TextArea: FC<TextAreaProps> = ({ name, ...rest }) => {
  return <textarea id={name} className='form-control' name={name} {...rest} />
}

const Select: FC<SelectProps> = ({ name, options, ...rest }) => {
  return (
    <select id={name} className='form-select' name={name} {...rest}>
      <option value=''>--Seleccione--</option>
      {options &&
        options.map((op) => (
          <option key={op.id} value={op.id}>
            {op.label}
          </option>
        ))}
    </select>
  )
}

const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  name,
  ...rest
}) => {
  return (
    <input
      id={name}
      type='text'
      className='form-control'
      name={name}
      aria-describedby={`${name}Help`}
      {...rest}
    />
  )
}

const InputCustom: FC<InputProps> = ({
  label,
  required,
  as,
  ...propsInput
}) => {
  const { name } = propsInput

  const typeInput = () => {
    if (as === "textarea") return <TextArea {...propsInput} />
    if (as === "select") return <Select {...propsInput} />
    return <Input {...propsInput} />
  }

  return (
    <>
      {label && (
        <label htmlFor={name} className='form-label'>
          {label} {required && <span className='text-danger'>*</span>}
        </label>
      )}
      {typeInput()}
    </>
  )
}

export default InputCustom
