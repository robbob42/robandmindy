export default [
  {
    id: 1,
    name: 'Mining++',
    type: 'raw',
    improveeId: 1,
    itemsCost: [{
      itemId: 1,
      itemAmount: 10,
    }],
    costMultiplyer: 2,
    improvee: 'activity',
    improves: 'actionTime',
    improvesBy: .9
  },
  {
    id: 2,
    name: 'Chopping++',
    type: 'raw',
    improveeId: 2,
    itemsCost: [
      {
        itemId: 1,
        itemAmount: 20,
      },
      {
        itemId: 2,
        itemAmount: 10,
      }
    ],
    costMultiplyer: 2,
    improvee: 'activity',
    improves: 'actionTime',
    improvesBy: .9
  },
  {
    id: 3,
    name: 'Fishing++',
    type: 'raw',
    improveeId: 3,
    itemsCost: [
      {
        itemId: 1,
        itemAmount: 30,
      },
      {
        itemId: 2,
        itemAmount: 20,
      },
      {
        itemId: 3,
        itemAmount: 10,
      }
    ],
    costMultiplyer: 2,
    improvee: 'activity',
    improves: 'actionTime',
    improvesBy: .9
  },
  {
    id: 4,
    name: 'Mining x 2',
    type: 'raw',
    improveeId: 1,
    itemsCost: [
      {
        itemId: 902,
        itemAmount: 10
      }
    ],
    costMultiplyer: 2,
    improvee: 'activity',
    improves: 'produceAmount',
    improvesBy: 2
  },
  {
    id: 5,
    name: 'Chopping x 2',
    type: 'raw',
    improveeId: 2,
    itemsCost: [
      {
        itemId: 902,
        itemAmount: 20
      }
    ],
    costMultiplyer: 2,
    improvee: 'activity',
    improves: 'produceAmount',
    improvesBy: 2
  },
  {
    id: 6,
    name: 'Fishing x 2',
    type: 'raw',
    improveeId: 3,
    itemsCost: [
      {
        itemId: 902,
        itemAmount: 30
      }
    ],
    costMultiplyer: 2,
    improvee: 'activity',
    improves: 'produceAmount',
    improvesBy: 2
  },
  {
    id: 7,
    name: 'Rock Limit x 2',
    type: 'raw',
    improveeId: 1,
    itemsCost: [
      {
        itemId: 1,
        itemAmount: 10
      }
    ],
    costMultiplyer: 2,
    improvee: 'item',
    improves: 'limit',
    improvesBy: 2
  },
  {
    id: 8,
    name: 'Tree Limit x 2',
    type: 'raw',
    improveeId: 2,
    itemsCost: [
      {
        itemId: 2,
        itemAmount: 10
      }
    ],
    costMultiplyer: 2,
    improvee: 'item',
    improves: 'limit',
    improvesBy: 2
  },
  {
    id: 9,
    name: 'Fish Limit x 2',
    type: 'raw',
    improveeId: 3,
    itemsCost: [
      {
        itemId: 3,
        itemAmount: 10
      }
    ],
    costMultiplyer: 2,
    improvee: 'item',
    improves: 'limit',
    improvesBy: 2
  }
];
