import { reactive, computed } from 'vue'
import Dijuntor from '../components/eletrics/Dijuntor.vue'
import DijuntorDuplo from '../components/eletrics/DijuntorDuplo.vue'
import DPS from '../components/eletrics/DPS.vue'
import Trilho from '../components/eletrics/Trilho.vue'
// import Quadro from '../components/eletrics/Quadro.vue'
import Divisor from '../components/eletrics/Divisor.vue'
import Barramento from '../components/eletrics/Barramento.vue'
import BarramentoCentral from '../components/eletrics/BarramentoCentral.vue'
import Conduite from '../components/eletrics/Conduite.vue'
import ChaveTransferencia from '../components/eletrics/ChaveTransferencia.vue'
import DijuntorResidencial from '../components/eletrics/DijuntorResidencial.vue'

type DragElementType = Element & { type: string; uuid: string; amper: string; label: string }
const state = reactive({
  componentOptions: [
    { name: 'Dijuntor', component: Dijuntor, type: 'Device', label: '', amper: '' },
    { name: 'Dijuntor Duplo', component: DijuntorDuplo, type: 'Device', label: '', amper: '' },
    { name: 'DPS', component: DPS, type: 'Device', amper: '' },
    { name: 'Trilho', component: Trilho, type: 'Tools' },
    // { name: 'Quadro', component: Quadro, type: 'Main' },
    { name: 'Divisor', component: Divisor, type: 'Tools' },
    { name: 'Barramento', component: Barramento, type: 'Device' },
    { name: 'Barramento Central', component: BarramentoCentral, type: "Tools" },
    { name: 'Conduíte', component: Conduite, type: "Tools" },
    { name: 'Chave de Transferência', component: ChaveTransferencia, type: 'Device' },
    { name: 'Dijuntor Residencial', component: DijuntorResidencial, type: 'Device', label: '', amper: '' },
  ],
  dragged: null as null | DragElementType,
  dropped: {} as {[key: string]: DragElementType[]}
})


const getComponents = computed(() => {
  return state.componentOptions
})

function onDragStart(item: DragElementType) {
  item.uuid = Math.random().toString(16).slice(2)
  item.label = ""
  item.amper = ""
  state.dragged = item
}

function onDrop(trilho="main", onlyTypes=['']) {
  if (state.dragged && onlyTypes.includes(state.dragged.type)) {
    if (!state.dropped[trilho]) state.dropped[trilho] = []
    state.dropped[trilho].push({ ...state.dragged })
  }
}

function onDropAt(trilho="main", index: number, onlyTypes=['']) {
  if (state.dragged && onlyTypes.includes(state.dragged.type)) {
    if (!state.dropped[trilho]) state.dropped[trilho] = []
    state.dropped[trilho].splice(index, 0, { ...state.dragged })
    state.dragged = null
  }
}

function updateDetail(trilho="main", item: DragElementType) {
  state.dropped[trilho].forEach((device) => {
    if (device.uuid === item.uuid) {
      device.amper = item.amper
      device.label = item.label
    }
  })
  state.dropped[trilho] = [...state.dropped[trilho]]
}

const getDeviceByUUID = (trilho = 'main', uuid: string) => {
  return computed(() => state.dropped[trilho]?.find(device => device.uuid === uuid))
}


const getToolByUUID = (origin="", uuid: string) => {
  return computed(() => state.dropped[origin]?.find(device => device.uuid === uuid))
}

const getDevices = (trilho = 'main') => {
  return computed(() => {
    if (!state.dropped[trilho]) state.dropped[trilho] = []
    return state.dropped[trilho]
  })
}

export { state, onDragStart, onDrop, onDropAt, updateDetail, getDeviceByUUID, getToolByUUID, getDevices, getComponents }
