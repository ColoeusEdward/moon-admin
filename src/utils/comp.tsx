import { NIcon, NTooltip } from "naive-ui"

const useToolTip = () => {
  const render = (content, tipText) => {
    return (
      <div>
        <NTooltip placement="bottom" trigger="hover" v-slots={{ trigger:()=>content }}>
          <span>{tipText}</span>
        </NTooltip>
      </div>
    )
  }

  return {
    render
  }
}

export {
  useToolTip
}