import { reactive, computed } from 'vue'


type Point = { x: number; y: number}
type Connection = {
  from: HTMLElement;
  to: HTMLElement;
  path: SVGPathElement;
  points: Point[];
}

const state = reactive<{
  wireColor: string;
  wireWeight: number;
  selected: HTMLElement | null;
  drawing: boolean;
  routePoints: Point[];
  connections: Connection[];
  history: SVGPathElement[];
  historyDeleted: SVGPathElement[];
  wires: HTMLElement | null;
}>({
  wireColor: '#000000',
  wireWeight: 6,
  selected: null,
  drawing: false,
  routePoints: [],
  connections: [],
  history: [],
  historyDeleted: [],
  wires: null,
})

const refWireColor = computed({
  get: () => state.wireColor,
  set: (val: string) => {
    if (state.wireColor) state.wireColor = val
  }
})

const refWireWeight = computed({
  get: () => state.wireWeight,
  set: (val: number) => {
    if (state.wireWeight) state.wireWeight = val
  }
})

function getPosition(element: HTMLElement) {
  const rect = element.getBoundingClientRect()
  return {
    x: rect.left + rect.width / 2 + window.scrollX,
    y: rect.top + rect.height / 2 + window.scrollY
  }
}

function drawWirePath(points: Point[]) {
  if (points.length < 2) return ""
  let d = `M${points[0].x},${points[0].y}`
  for (let i = 1; i < points.length; i++) {
    const p1 = points[i - 1]
    const p2 = points[i]
    const dx = (p2.x - p1.x) / 2
    d += ` C${p1.x + dx},${p1.y} ${p2.x - dx},${p2.y} ${p2.x},${p2.y}`
  }
  return d
}

function createWire(points: Point[], from: HTMLElement, to: HTMLElement) {
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path")

  path.setAttribute("d", drawWirePath(points))
  path.setAttribute("stroke", refWireColor.value)
  path.setAttribute("stroke-width", refWireWeight.value.toString())
  path.classList.add("wire")
  state.wires?.appendChild(path)
  state.connections.push({ from, to, path, points })
  state.history.push(path)
}

function drawLine(event: PointerEvent) {
  event.stopPropagation()
  const connector = event.target as HTMLElement
  const pos = getPosition(connector)

  if (!state.selected) {
    state.selected = connector
    state.drawing = true
    state.routePoints = [pos]
    // connector.style.background = "green"
  } else if (connector !== state.selected) {
    state.routePoints.push(pos)
    createWire(state.routePoints, state.selected, connector)
    // selected.style.background = "red"
    state.selected = null
    state.drawing = false
    state.routePoints = []
  } else {
    // selected.style.background = "red"
    state.selected = null
    state.drawing = false
    state.routePoints = []
  }
}

function Undo(event: KeyboardEvent) {
  if (event.ctrlKey && event.key === "z") {
    const last = state.history.pop()
    if (last) {
      state.historyDeleted.push(last.cloneNode(true) as SVGPathElement)
      last.remove()
    }
  }
}

function Redo(event: KeyboardEvent) {
  if (event.ctrlKey && event.key === "y") {
    const restored = state.historyDeleted.pop();
    if (restored) {
      state.wires?.appendChild(restored);
      state.history.push(restored);
    }
  }
}

document.addEventListener("keydown", Undo)
document.addEventListener("keydown", Redo)
    
function mapForWireDraw() {
  const connectors = document.querySelectorAll('.connector')
  const _devices = document.querySelectorAll('.dijuntor, .dijuntor-duplo, .dps,' +
      '.dijuntor-residencial, .dijuntor-residencial, .chave-transferencia, .rele-protetor')

    const quadro = document.querySelector(".quadro")
    state.wires = document.getElementById("connections")

    connectors.forEach(connector => {
      const el = connector as HTMLElement
      el.removeEventListener("click", drawLine)
      el.addEventListener("click", drawLine)
    })

    quadro?.addEventListener("click", (event) => {
      if (state.drawing && event instanceof MouseEvent) {
        const x = event.clientX + window.scrollX
        const y = event.clientY + window.scrollY
        state.routePoints.push({ x, y })
      }
    })
}

export { state, refWireWeight, refWireColor, mapForWireDraw }
