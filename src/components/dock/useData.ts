import useGrid from "@/views/dash/useGrid"

export default function useData(emit) {
  const emitRecover = () => {
    emit('needRecover')
  }
  const list = [
    { fn: emitRecover, src: 'https://img.icons8.com/flat-round/100/000000/recurring-appointment.png',text:'复原' }
  ]

  return {
    list
  }
}