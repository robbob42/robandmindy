export default [
  {
    id: 1,
    name: 'Mining++',
    activityId: 1,
    itemsCost: [{
      itemId: 1,
      itemAmount: 10,
    }],
    costMultiplyer: 2,
    improves: 'actionTime',
    improvesBy: .9
  },
  {
    id: 2,
    name: 'Chopping++',
    activityId: 2,
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
    improves: 'actionTime',
    improvesBy: .9
  },
  {
    id: 3,
    name: 'Fishing++',
    activityId: 3,
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
    improves: 'actionTime',
    improvesBy: .9
  },
  {
    id: 4,
    name: 'Mining x 2',
    activityId: 1,
    itemsCost: [
      {
        itemId: 902,
        itemAmount: 10
      }
    ],
    costMultiplyer: 2,
    improves: 'produceAmount',
    improvesBy: 2
  },
  {
    id: 5,
    name: 'Chopping x 2',
    activityId: 2,
    itemsCost: [
      {
        itemId: 902,
        itemAmount: 20
      }
    ],
    costMultiplyer: 2,
    improves: 'produceAmount',
    improvesBy: 2
  },
  {
    id: 6,
    name: 'Fishing x 2',
    activityId: 3,
    itemsCost: [
      {
        itemId: 902,
        itemAmount: 30
      }
    ],
    costMultiplyer: 2,
    improves: 'produceAmount',
    improvesBy: 2
  }
];
