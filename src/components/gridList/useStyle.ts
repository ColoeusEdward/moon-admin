
export default function useStyle() {
  const listRowNameStyle = (line) => {
    let style = {
      color: ''
    }
    if (line.search('32G') != -1) {
      style.color = 'blue'
    }
    return style
  }
  return {
    listRowNameStyle
  }
}



