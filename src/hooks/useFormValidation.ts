import { useState } from 'react'
import { hasErrors, validateFields, type FieldErrors, type FieldRules } from '../utils/validation'

// Shared form state + validation wiring used by every form on the site.
export function useFormValidation<T extends string>(initialValues: Record<T, string>, rules: FieldRules<T>) {
  const fields = Object.keys(initialValues) as T[]
  const emptyErrors = () => fields.reduce((acc, field) => ({ ...acc, [field]: undefined }), {} as FieldErrors<T>)
  const emptyTouched = () => fields.reduce((acc, field) => ({ ...acc, [field]: false }), {} as Record<T, boolean>)

  const [values, setValues] = useState<Record<T, string>>(initialValues)
  const [errors, setErrors] = useState<FieldErrors<T>>(emptyErrors)
  const [touched, setTouched] = useState<Record<T, boolean>>(emptyTouched)

  const handleChange = (field: T, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: rules[field](value) }))
    }
  }

  const handleBlur = (field: T) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    setErrors((prev) => ({ ...prev, [field]: rules[field](values[field] ?? '') }))
  }

  const validateAll = () => {
    const nextErrors = validateFields(values, rules)
    setErrors(nextErrors)
    setTouched(fields.reduce((acc, field) => ({ ...acc, [field]: true }), {} as Record<T, boolean>))
    return !hasErrors(nextErrors)
  }

  const reset = () => {
    setValues(initialValues)
    setErrors(emptyErrors())
    setTouched(emptyTouched())
  }

  return { values, errors, touched, handleChange, handleBlur, validateAll, reset }
}
