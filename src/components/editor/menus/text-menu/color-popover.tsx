import { ColorChangeHandler, SketchPicker } from 'react-color'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Toggle } from '@/components/ui/toggle'
import { Button } from '@/components/ui/button'
import { TextMenuItem } from './items'
import { cn } from '@/utils'

interface ColorPopoverProps {
  items: TextMenuItem[]
}

export const ColorPopover: React.FC<ColorPopoverProps> = ({ items }) => {
  return items.map((item, index) => (
    <Popover key={index}>
      <PopoverTrigger asChild>
        {item.icon && (
          <Toggle
            size="sm"
            pressed={item.isActive()}
            className="text-muted-foreground hover:text-foreground"
          >
            <item.icon
              className={cn('h-4 w-4 stroke-[2px] transition', {
                'stroke-[3px] text-foreground': item.isActive(),
              })}
            />
          </Toggle>
        )}
      </PopoverTrigger>

      <PopoverContent side="top" className="p-1 w-auto space-x-1 my-1">
        <ColorPicker
          color={item.color && item.color()}
          onChange={(color) => item.setCommand(color)}
          onClear={() => item.unsetCommand && item.unsetCommand()}
        />
      </PopoverContent>
    </Popover>
  ))
}

export type ColorPickerProps = {
  color?: string
  onChange?: (color: string) => void
  onClear?: () => void
}

export const ColorPicker = ({
  color = '',
  onChange,
  onClear,
}: ColorPickerProps) => {
  const handleColorChange: ColorChangeHandler = (color) => {
    if (onChange) {
      onChange(color?.hex || '')
    }
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <SketchPicker
        styles={{
          default: {
            picker: {
              background: 'var(hsl(--background))',
              boxShadow: 'none',
              border: 'none',
            },
          },
        }}
        color={color}
        onChange={handleColorChange}
      />
      <Button size="sm" variant="outline" onClick={onClear} className="w-full">
        Reset
      </Button>
    </div>
  )
}
