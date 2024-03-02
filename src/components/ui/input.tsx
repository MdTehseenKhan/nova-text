import { InputHTMLAttributes, ReactNode, forwardRef } from 'react'
import { cn } from '@/utils'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leadingIcon: ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leadingIcon, ...props }, ref) => {
    return (
      <div
        className={cn(
          `
            flex 
            h-9 
            w-full 
            rounded-md 
            border 
            border-input 
            bg-transparent 
            px-3 
            py-1 
            text-sm 
            transition-colors 
            file:border-0 
            file:bg-transparent 
            file:text-sm 
            file:font-medium 
            placeholder:text-muted-foreground 
            focus-within:outline-none 
            focus-within:ring-0 
            focus-within:ring-ring 
            disabled:cursor-not-allowed 
            disabled:opacity-50
          `,
          className
        )}
      >
        {leadingIcon && (
          <div className="flex [&>*]:w-4 [&>*]:h-4 text-muted-foreground pointer-events-none items-center mr-1">
            {leadingIcon}
          </div>
        )}

        <input
          type={type}
          value={props.value}
          className="w-full bg-transparent text-inherit outline-none disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-muted-foreground"
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
