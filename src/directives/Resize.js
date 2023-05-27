const Resize = {
  beforeMount(el, binding, vnode) {

    const { handle } = binding.value ?? null

    var positions = {
      clientX: undefined,
      clientY: undefined,
      movementX: 0,
      movementY: 0
    }

    const dragMouseDown = (e) => {
      e.preventDefault()

      positions.clientX = e.clientX
      positions.clientY = e.clientY
      document.onmousemove = elementDrag
      document.onmouseup = closeDragElement
    }

    const elementDrag = (e) => {
      e.preventDefault()
      positions.movementX = positions.clientX - e.clientX
      positions.movementY = positions.clientY - e.clientY
      positions.clientX = e.clientX
      positions.clientY = e.clientY

      const elPos = binding.instance.element.position.window

      const size = {
        width: (positions.clientX / window.innerWidth * 100) - elPos.x,
        height: (positions.clientY / window.innerHeight * 100) - elPos.y,
      } 

      binding.instance.element.size = size
    }

    const closeDragElement = () => {
      document.onmouseup = null
      document.onmousemove = null
    }

    const handleEl = handle == null ? el : el.querySelectorAll(handle)[0]
    handleEl.addEventListener('mousedown', dragMouseDown)
  }
}

export default Resize