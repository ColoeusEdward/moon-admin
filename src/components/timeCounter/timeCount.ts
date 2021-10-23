export default function useTimeCount() {
  
  const handleStart = () => {
    window.$socket?.emit('start')
  }
  const handleStop = () => {
    window.$socket?.emit('stop')
  }
  const handleReset = () => {
    window.$socket?.emit('reset')
  }
  return {
    handleStart
    , handleStop
    , handleReset
  }
}