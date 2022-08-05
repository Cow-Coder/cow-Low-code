import { Swipe, SwipeItem } from 'vant'
import type { DefineComponent } from 'vue'

export const preview: DefineComponent = defineComponent({
  render() {
    const style = {
      color: '#fff',
      'font-size': '20px',
      'line-height': '150px',
      'text-align': 'center',
      'background-color': '#39a9ed',
      width: '328px',
    }
    return (
      <>
        <Swipe ref="swipeRef" style={style} autoplay={3000} indicator-color="white">
          <SwipeItem>1</SwipeItem>
          <SwipeItem>2</SwipeItem>
          <SwipeItem>3</SwipeItem>
          <SwipeItem>4</SwipeItem>
        </Swipe>
      </>
    )
  },
})
