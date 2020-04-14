export default [
  {
    id: 1,
    name: 'Mining++',
    type: 'raw',
    level: 1,
    itemsCost: [{
      itemId: 1,
      itemAmount: 5,
    }],
    costMultiplyer: 1.5,
    improvee: 'activity',
    improveeId: 1,
    improves: 'actionTime',
    improvesBy: .9
  },
  {
    id: 2,
    name: 'Chopping++',
    type: 'raw',
    level: 1,
    itemsCost: [
      {
        itemId: 1,
        itemAmount: 10,
      },
      {
        itemId: 2,
        itemAmount: 5,
      }
    ],
    costMultiplyer: 1.5,
    improvee: 'activity',
    improveeId: 2,
    improves: 'actionTime',
    improvesBy: .9
  },
  {
    id: 3,
    name: 'Fishing++',
    type: 'raw',
    level: 1,
    itemsCost: [
      {
        itemId: 1,
        itemAmount: 15,
      },
      {
        itemId: 2,
        itemAmount: 10,
      },
      {
        itemId: 3,
        itemAmount: 5,
      }
    ],
    costMultiplyer: 1.5,
    improvee: 'activity',
    improveeId: 3,
    improves: 'actionTime',
    improvesBy: .9
  },
  {
    id: 4,
    name: 'Mining x 2',
    type: 'raw',
    level: 1,
    itemsCost: [
      {
        itemId: 902,
        itemAmount: 5
      }
    ],
    costMultiplyer: 1.5,
    improvee: 'activity',
    improveeId: 1,
    improves: 'produceAmount',
    improvesBy: 2
  },
  {
    id: 5,
    name: 'Chopping x 2',
    type: 'raw',
    level: 1,
    itemsCost: [
      {
        itemId: 902,
        itemAmount: 10
      }
    ],
    costMultiplyer: 1.5,
    improvee: 'activity',
    improveeId: 2,
    improves: 'produceAmount',
    improvesBy: 2
  },
  {
    id: 6,
    name: 'Fishing x 2',
    type: 'raw',
    level: 1,
    itemsCost: [
      {
        itemId: 902,
        itemAmount: 15
      }
    ],
    costMultiplyer: 1.5,
    improvee: 'activity',
    improveeId: 3,
    improves: 'produceAmount',
    improvesBy: 2
  },
  {
    id: 7,
    name: 'Rock Limit x 2',
    type: 'raw',
    level: 1,
    itemsCost: [
      {
        itemId: 1,
        itemAmount: 10
      }
    ],
    costMultiplyer: 2,
    improvee: 'item',
    improveeId: 1,
    improves: 'limit',
    improvesBy: 2
  },
  {
    id: 8,
    name: 'Tree Limit x 2',
    type: 'raw',
    level: 1,
    itemsCost: [
      {
        itemId: 2,
        itemAmount: 10
      }
    ],
    costMultiplyer: 2,
    improvee: 'item',
    improveeId: 2,
    improves: 'limit',
    improvesBy: 2
  },
  {
    id: 9,
    name: 'Fish Limit x 2',
    type: 'raw',
    level: 1,
    itemsCost: [
      {
        itemId: 3,
        itemAmount: 10
      }
    ],
    costMultiplyer: 2,
    improvee: 'item',
    improveeId: 3,
    improves: 'limit',
    improvesBy: 2
  }
];
