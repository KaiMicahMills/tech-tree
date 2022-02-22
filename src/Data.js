const Data = [
  {
    "title": "Guidance System",
    "type": "example-one",
    "highlight": "false",
    "relations": [
      ""
    ]
  },
  {
    "title": "Mass Drivers",
    "type": "example-one",
    "highlight": "false",
    "relations": [
      "Guidance System"
    ]
  },
  {
    "title": "Close-in Weapons",
    "type": "example-one",
    "highlight": "false",
    "relations": [
      "Mass Drivers"
    ]
  },
  {
    "title": "Heavy Drivers",
    "type": "example-one",
    "highlight": "false",
    "relations": [
      "Close-in Weapons"
    ]
  },
  {
    "title": "Railguns",
    "type": "example-one",
    "highlight": "false",
    "relations": [
      "Heavy Drivers"
    ]
  },
  {
    "title": "Heavy Missiles",
    "type": "example-one",
    "highlight": "false",
    "relations": [
      "Guidance System"
    ]
  },
  {
    "title": "Fusion Torpedo",
    "type": "example-two",
    "highlight": "false",
    "relations": [
      "Heavy Missiles"
    ]
  },
  {
    "title": "Fusion Warhead",
    "type": "example-three",
    "highlight": "false",
    "relations": [
      "Guidance System"
    ]
  },
  {
    "title": "AM Warhead",
    "type": "example-three",
    "highlight": "false",
    "relations": [
      "Fusion Warhead"
    ]
  },
  {
    "title": "Force Beams",
    "type": "example-one",
    "highlight": "true",
    "relations": [
      "Railguns"
    ]
  },
  {
    "title": "Antimatter Torpedo",
    "type": "example-two",
    "highlight": "true",
    "relations": [
      "Fusion Torpedo",
      "AM Warhead"
    ]
  },
  {
    "title": "EMP Warhead",
    "type": "example-three",
    "highlight": "false",
    "relations": [
      "Fusion Warhead"
    ]
  },
  {
    "title": "Leech Warhead",
    "type": "example-three",
    "highlight": "false",
    "relations": [
      "Fusion Warhead"
    ]
  },
  {
    "title": "Anti-Missiles",
    "type": "example-one",
    "highlight": "false",
    "relations": [
      "Guidance System"
    ]
  },
  {
    "title": "Retargeting System",
    "type": "example-one",
    "highlight": "false",
    "relations": [
      "Anti-Missiles"
    ]
  },
  {
    "title": "Star Drive",
    "type": "example-one",
    "highlight": "false",
    "relations": [
      "Retargeting System"
    ]
  },
  {
    "title": "Battle Shields",
    "type": "example-one",
    "highlight": "true",
    "relations": [
      "Star Drive",
      "Leech Warhead",
      "EMP Warhead"
    ]
  }
];

export default Data;