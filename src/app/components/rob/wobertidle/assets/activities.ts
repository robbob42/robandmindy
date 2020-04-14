export default [
  {
    id: 1,
    name: 'Mining',
    type: 'raw',
    active: false,
    color: '#555555',
    produces: 'Rocks',
    producesId: 1,
    produceAmount: 1,
    actionTime: 1000,
    mcProficiency: 1,
    mcpTriggerAmount: 0,
    triggered: true,
    mcpDiscoverAmount: 0,
    discovered: true,
    visible: false
  },
  {
    id: 2,
    name: 'Chopping',
    type: 'raw',
    active: false,
    color: '#425f0b',
    produces: 'Trees',
    producesId: 2,
    produceAmount: 1,
    actionTime: 2000,
    mcProficiency: 5,
    mcpTriggerAmount: 5,
    triggered: false,
    mcpDiscoverAmount: 10,
    discovered: false,
    visible: false
  },
  {
    id: 3,
    name: 'Fishing',
    type: 'raw',
    active: false,
    color: '#84b0f1',
    produces: 'Fish',
    producesId: 3,
    produceAmount: 1,
    actionTime: 5000,
    mcProficiency: 15,
    mcpTriggerAmount: 35,
    triggered: false,
    mcpDiscoverAmount: 60,
    discovered: false,
    visible: false
  },
  {
    id: 4,
    name: 'Polish',
    type: 'refine',
    active: false,
    color: '#AA5555',
    produces: 'Gems',
    producesId: 4,
    produceAmount: 1,
    actionTime: 5000,
    mcProficiency: 30,
    mcpTriggerAmount: 10000,
    triggered: false,
    mcpDiscoverAmount: 10200,
    discovered: false,
    decrementId: 1,
    decrementAmount: 5,
    visible: false
  },
  {
    id: 5,
    name: 'Milling',
    type: 'refine',
    active: false,
    color: '#423821',
    produces: 'Boards',
    producesId: 5,
    produceAmount: 1,
    actionTime: 10000,
    mcProficiency: 60,
    mcpTriggerAmount: 10200,
    triggered: false,
    mcpDiscoverAmount: 12500,
    discovered: false,
    decrementId: 2,
    decrementAmount: 3,
    visible: false
  },
  {
    id: 6,
    name: 'Cooking',
    type: 'refine',
    active: false,
    color: '#be6868',
    produces: 'Cooked Fish',
    producesId: 6,
    produceAmount: 1,
    actionTime: 15000,
    mcProficiency: 100,
    mcpTriggerAmount: 12500,
    triggered: false,
    mcpDiscoverAmount: 13000,
    discovered: false,
    decrementId: 3,
    decrementAmount: 2,
    visible: false
  }
];
