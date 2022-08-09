import type { Draggable } from '@/components/base-ui/kzy-draggable/types'
import { DRAGGABLE_GROUP_NAME } from '@/constant'

export const config: Draggable = {
  draggableProp: {
    group: { name: DRAGGABLE_GROUP_NAME },
    itemKey: 'id',
    disabled: false,
  },
}
