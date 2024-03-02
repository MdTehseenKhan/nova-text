import { ChevronDownIcon } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { TextMenuItem } from './items'
import { cn } from '@/utils'

interface TextMenuDropdownProps {
  items: TextMenuItem[]
}

export const TextMenuDropdown: React.FC<TextMenuDropdownProps> = ({
  items,
}) => {
  const activeItem =
    (items.filter((item) => item.isActive())[0] as TextMenuItem) || items[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex gap-1 items-center rounded-sm text-sm p-2 cursor-pointer text-muted-foreground hover:bg-muted hover:text-foreground">
          {activeItem.icon ? (
            <activeItem.icon className="w-4 h-4 stroke-[2px]" />
          ) : (
            <span>{activeItem.name.split(' ')[0]}</span>
          )}
          <ChevronDownIcon className="h-3 w-3 stroke-[2px]" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-fit p-1 mt-1">
        {items.map((item, index) => (
          <DropdownMenuItem
            key={index}
            onSelect={() => item.setCommand()}
            className={cn(
              'text-muted-foreground cursor-pointer',
              item.isActive() && 'text-foreground'
            )}
          >
            <div className="flex items-center gap-2">
              {item.icon && <item.icon className="h-4 w-4" />}
              <span
                style={{
                  fontFamily: item?.font,
                }}
              >
                {item.name}
              </span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
