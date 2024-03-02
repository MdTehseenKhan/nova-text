import { FC } from 'react'
import { MoreVerticalIcon } from 'lucide-react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Toggle } from '@/components/ui/toggle'

import { TextMenuItem } from './items'
import { cn } from '@/utils'

interface MoreOptionsPopoverProps {
  items: TextMenuItem[]
}

const MoreOptionsPopover: FC<MoreOptionsPopoverProps> = ({ items }) => {
  return (
    <Popover>
      <PopoverTrigger className="rounded-sm p-2 text-muted-foreground hover:bg-muted hover:text-foreground">
        <MoreVerticalIcon className="w-4 h-4 stroke-[2px] hover:text-foreground" />
      </PopoverTrigger>
      <PopoverContent side="top" className="p-1 w-auto space-x-1 my-1">
        {items.map(
          (item, index) =>
            item?.icon && (
              <Toggle
                key={index}
                size={'sm'}
                pressed={item.isActive()}
                onPressedChange={item.setCommand}
                className="text-muted-foreground hover:text-foreground"
              >
                <item.icon
                  className={cn('h-4 w-4 stroke-[2px] transition', {
                    'stroke-[3px] text-foreground': item.isActive(),
                  })}
                />
              </Toggle>
            )
        )}
      </PopoverContent>
    </Popover>
  )
}

export default MoreOptionsPopover
