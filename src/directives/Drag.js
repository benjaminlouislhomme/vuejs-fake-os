const Drag = {
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

      const position = {
        x: (el.offsetLeft - positions.movementX) / window.innerWidth * 100,
        y: (el.offsetTop - positions.movementY) / window.innerHeight * 100
      }

      const type = (() => {
        if (el.classList.contains('icon'))
          return 'icon'

        if (el.classList.contains('window'))
          return 'window'
      })()

      binding.instance.element.position[type] = position
    }

    const closeDragElement = () => {
      document.onmouseup = null
      document.onmousemove = null
    }

    const handleEl = handle == null ? el : el.querySelectorAll(handle)[0]
    handleEl.addEventListener('mousedown', dragMouseDown)

  }
}

export default Drag