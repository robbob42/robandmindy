import { Globals } from '../assets/globals';

export default [
  {
    id: 1,
    name: 'Finding++',
    type: 'speed',
    level: 1,
    itemsCost: [{
      itemId: 1,
      itemAmount: 2,
    }],
    costMultiplyer: 1.5,
    improvee: 'activity',
    improveeId: 1,
    improves: 'actionTime',
    improvesByMultiplyer: .9
  },
  {
    id: 12,
    name: 'Collecting++',
    type: 'speed',
    level: 1,
    itemsCost: [
      {
        itemId: 1,
        itemAmount: 3,
      },
      {
        itemId: 7,
        itemAmount: 2,
      }
    ],
    costMultiplyer: 1.5,
    improvee: 'activity',
    improveeId: 7,
    improves: 'actionTime',
    improvesByMultiplyer: .9
  },
  {
    id: 3,
    name: 'Fishing++',
    type: 'speed',
    level: 1,
    itemsCost: [
      {
        itemId: 1,
        itemAmount: 4,
      },
      {
        itemId: 7,
        itemAmount: 3,
      },
      {
        itemId: 3,
        itemAmount: 2,
      }
    ],
    costMultiplyer: 1.5,
    improvee: 'activity',
    improveeId: 3,
    improves: 'actionTime',
    improvesByMultiplyer: .9
  },
  {
    id: 2,
    name: 'Chopping++',
    type: 'speed',
    level: 1,
    itemsCost: [
      {
        itemId: 1,
        itemAmount: 5,
      },
      {
        itemId: 7,
        itemAmount: 4,
      },
      {
        itemId: 3,
        itemAmount: 3,
      },
      {
        itemId: 2,
        itemAmount: 2,
      }
    ],
    costMultiplyer: 1.5,
    improvee: 'activity',
    improveeId: 2,
    improves: 'actionTime',
    improvesByMultiplyer: .9
  },
  {
    id: 13,
    name: 'Harvesting++',
    type: 'speed',
    level: 1,
    itemsCost: [
      {
        itemId: 1,
        itemAmount: 6,
      },
      {
        itemId: 7,
        itemAmount: 5,
      },
      {
        itemId: 3,
        itemAmount: 4,
      },
      {
        itemId: 2,
        itemAmount: 3,
      },
      {
        itemId: 8,
        itemAmount: 2,
      }
    ],
    costMultiplyer: 1.5,
    improvee: 'activity',
    improveeId: 8,
    improves: 'actionTime',
    improvesByMultiplyer: .9
  },
  {
    id: 4,
    name: 'Mining x 2',
    type: 'production',
    level: 1,
    itemsCost: [
      {
        itemId: 902,
        itemAmount: 5
      }
    ],
    costMultiplyer: 1.6,
    improvee: 'activity',
    improveeId: 1,
    improves: 'produceAmount',
    improvesByMultiplyer: 2
  },
  {
    id: 14,
    name: 'Collecting x 2',
    type: 'production',
    level: 1,
    itemsCost: [
      {
        itemId: 902,
        itemAmount: 10
      }
    ],
    costMultiplyer: 1.7,
    improvee: 'activity',
    improveeId: 7,
    improves: 'produceAmount',
    improvesByMultiplyer: 2
  },
  {
    id: 6,
    name: 'Fishing x 2',
    type: 'production',
    level: 1,
    itemsCost: [
      {
        itemId: 902,
        itemAmount: 15
      }
    ],
    costMultiplyer: 1.8,
    improvee: 'activity',
    improveeId: 3,
    improves: 'produceAmount',
    improvesByMultiplyer: 2
  },
  {
    id: 5,
    name: 'Chopping x 2',
    type: 'production',
    level: 1,
    itemsCost: [
      {
        itemId: 902,
        itemAmount: 20
      }
    ],
    costMultiplyer: 1.9,
    improvee: 'activity',
    improveeId: 2,
    improves: 'produceAmount',
    improvesByMultiplyer: 2
  },
  {
    id: 15,
    name: 'Harvesting x 2',
    type: 'production',
    level: 1,
    itemsCost: [
      {
        itemId: 902,
        itemAmount: 25
      }
    ],
    costMultiplyer: 2,
    improvee: 'activity',
    improveeId: 8,
    improves: 'produceAmount',
    improvesByMultiplyer: 2
  },
  {
    id: 7,
    name: 'Rock Limit x 2',
    type: 'limit',
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
    improvesByMultiplyer: 2
  },
  {
    id: 10,
    name: 'Clay Limit x 2',
    type: 'limit',
    level: 1,
    itemsCost: [
      {
        itemId: 7,
        itemAmount: 10
      }
    ],
    costMultiplyer: 2,
    improvee: 'item',
    improveeId: 7,
    improves: 'limit',
    improvesByMultiplyer: 2
  },
  {
    id: 9,
    name: 'Fish Limit x 2',
    type: 'limit',
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
    improvesByMultiplyer: 2
  },
  {
    id: 8,
    name: 'Tree Limit x 2',
    type: 'limit',
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
    improvesByMultiplyer: 2
  },
  {
    id: 11,
    name: 'Grain Limit x 2',
    type: 'limit',
    level: 1,
    itemsCost: [
      {
        itemId: 8,
        itemAmount: 10
      }
    ],
    costMultiplyer: 2,
    improvee: 'item',
    improveeId: 8,
    improves: 'limit',
    improvesByMultiplyer: 2
  },
  {
    id: 16,
    name: 'Human + 1',
    type: 'humans',
    level: 1,
    itemsCost: [
      {
        itemId: Globals.itemIds.mcp,
        itemAmount: 20000
      }
    ],
    costMultiplyer: 2,
    improvee: 'item',
    improveeId: Globals.itemIds.human,
    improves: 'amount',
    improvesByMultiplyer: 0,
    improvesByAdder: 1
  }
];
