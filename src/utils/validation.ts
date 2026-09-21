// Shared field validators and helpers used by every form on the site.

export type Validator = (value: string) => string | undefined
export type FieldRules<T extends string> = Record<T, Validator>
export type FieldErrors<T extends string> = Partial<Record<T, string>>

export const required =
  (message = 'This field is required'): Validator =>
  (value) =>
    value.trim() ? undefined : message

export const email =
  (message = 'Enter a valid email address'): Validator =>
  (value) => {
    const trimmed = value.trim()
    if (!trimmed) return undefined
    const atIndex = trimmed.indexOf('@')
    if (atIndex <= 0 || atIndex !== trimmed.lastIndexOf('@')) return message
    const domain = trimmed.slice(atIndex + 1)
    const dotIndex = domain.lastIndexOf('.')
    const isValidDomain = dotIndex > 0 && dotIndex < domain.length - 1
    const hasNoSpaces = !trimmed.includes(' ')
    return isValidDomain && hasNoSpaces ? undefined : message
  }

export const phone =
  (message = 'Enter a valid phone number'): Validator =>
  (value) => {
    if (!value.trim()) return undefined
    const pattern = /^[+]?[\d\s()-]{7,15}$/
    return pattern.test(value.trim()) ? undefined : message
  }

export const minLength =
  (min: number, message?: string): Validator =>
  (value) =>
    value.trim().length >= min ? undefined : (message ?? `Must be at least ${min} characters`)

export const notPast =
  (message = 'Please choose a date from today onward'): Validator =>
  (value) => {
    if (!value.trim()) return undefined
    const today = new Date().toISOString().split('T')[0]
    return value >= today ? undefined : message
  }

export function composeValidators(...validators: Validator[]): Validator {
  return (value) => {
    for (const validator of validators) {
      const error = validator(value)
      if (error) return error
    }
    return undefined
  }
}

export function validateFields<T extends string>(
  values: Record<T, string>,
  rules: FieldRules<T>,
): FieldErrors<T> {
  const errors: FieldErrors<T> = {}
  ;(Object.keys(rules) as T[]).forEach((field) => {
    const error = rules[field](values[field] ?? '')
    if (error) errors[field] = error
  })
  return errors
}

export function hasErrors<T extends string>(errors: FieldErrors<T>): boolean {
  return Object.values(errors).some(Boolean)
}
