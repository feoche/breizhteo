const data = {
  WEATHER: [
    {codes: ["J_W1_0-N_3", "J_W2_3", "N_W1_0-N_3", "N_W2_3"], emoji: "☁"},      // Cloud
    {codes: ["J_W1_1-N", "J_W1_1-N_0", "J_W1_1-N_1", "J_W1_1-N_2", "J_W1_1-N_3", "J_W1_1-N_4", "J_W1_1-N_5", "J_W1_1-N_6", "J_W1_1-N_7", "J_W1_1-N_8", "J_W1_1-N_9", "J_W1_2-N", "J_W1_2-N_0", "J_W1_2-N_1", "J_W1_2-N_2", "J_W1_2-N_3", "J_W1_2-N_4", "J_W1_2-N_5", "J_W1_2-N_6", "J_W1_2-N_7", "J_W1_2-N_8", "J_W1_2-N_9", "J_W1_33-N", "J_W1_33-N_0", "J_W1_33-N_1", "J_W1_33-N_2", "J_W1_33-N_3", "J_W1_33-N_4", "J_W1_33-N_5", "J_W1_33-N_6", "J_W1_33-N_7", "J_W1_33-N_8", "J_W1_33-N_9", "N_W1_1-N", "N_W1_1-N_0", "N_W1_1-N_1", "N_W1_1-N_2", "N_W1_1-N_3", "N_W1_1-N_4", "N_W1_1-N_5", "N_W1_1-N_6", "N_W1_1-N_7", "N_W1_1-N_8", "N_W1_1-N_9", "N_W1_2-N", "N_W1_2-N_0", "N_W1_2-N_1", "N_W1_2-N_2", "N_W1_2-N_3", "N_W1_2-N_4", "N_W1_2-N_5", "N_W1_2-N_6", "N_W1_2-N_7", "N_W1_2-N_8", "N_W1_2-N_9", "N_W1_33-N", "N_W1_33-N_0", "N_W1_33-N_1", "N_W1_33-N_2", "N_W1_33-N_3", "N_W1_33-N_4", "N_W1_33-N_5", "N_W1_33-N_6", "N_W1_33-N_7", "N_W1_33-N_8", "N_W1_33-N_9", ], emoji: "🌫"},     // Fog
    {
      codes: ["J_W1_24-N", "J_W1_24-N_0", "J_W1_24-N_1", "J_W1_24-N_2", "J_W1_24-N_3", "J_W1_24-N_4", "J_W1_24-N_5", "J_W1_24-N_6", "J_W1_24-N_7", "J_W1_24-N_8", "J_W1_24-N_9", "J_W1_26-N", "J_W1_26-N_0", "J_W1_26-N_1", "J_W1_26-N_2", "J_W1_26-N_3", "J_W1_26-N_4", "J_W1_26-N_5", "J_W1_26-N_6", "J_W1_26-N_7", "J_W1_26-N_8", "J_W1_26-N_9", "J_W1_31-N", "J_W1_31-N_0", "J_W1_31-N_1", "J_W1_31-N_2", "J_W1_31-N_3", "J_W1_31-N_4", "J_W1_31-N_5", "J_W1_31-N_6", "J_W1_31-N_7", "J_W1_31-N_8", "J_W1_31-N_9", "J_W2_18", "N_W1_24-N", "N_W1_24-N_0", "N_W1_24-N_1", "N_W1_24-N_2", "N_W1_24-N_3", "N_W1_24-N_4", "N_W1_24-N_5", "N_W1_24-N_6", "N_W1_24-N_7", "N_W1_24-N_8", "N_W1_24-N_9", "N_W1_26-N", "N_W1_26-N_0", "N_W1_26-N_1", "N_W1_26-N_2", "N_W1_26-N_3", "N_W1_26-N_4", "N_W1_26-N_5", "N_W1_26-N_6", "N_W1_26-N_7", "N_W1_26-N_8", "N_W1_26-N_9", "N_W1_31-N", "N_W1_31-N_0", "N_W1_31-N_1", "N_W1_31-N_2", "N_W1_31-N_3", "N_W1_31-N_4", "N_W1_31-N_5", "N_W1_31-N_6", "N_W1_31-N_7", "N_W1_31-N_8", "N_W1_31-N_9", "N_W2_18",],
      emoji: "🌩"
    },    // Lightning
    {codes: ["J_W1_32", "J_W2_16", "N_W1_32", "N_W2_16"], emoji: "⛈"},    // Lightning with rain
    {codes: ["J_W1_9-N_3", "J_W1_18-N_3", "J_W1_30-N_3", "N_W1_9-N_3", "N_W1_18-N_3", "N_W1_30-N_3"], emoji: "🌧"},     // Rain
    {codes: ["snow"], emoji: "🌨"},
    {codes: ["J_W1_0-N_0", "J_W1_0-N_7", "J_W2_1", "N_W1_0-N_0", "N_W1_0-N_7", "N_W2_1"], emoji: "☀"},      // Sun
    {codes: ["J_W1_0-N_5", "N_W1_0-N_5"], emoji: "🌤"},     // Sun with small cloud
    {
      codes: ["J_W1_0-N_1", "J_W1_0-N_2", "J_W1_0-N_4", "J_W1_0-N_6", "J_W2_2", "N_W1_0-N_1", "N_W1_0-N_2", "N_W1_0-N_4", "N_W1_0-N_6", "N_W2_2"],
      emoji: "🌥"
    },     // Sun with cloud
    {
      codes: ["J_W1_9-N", "J_W1_9-N_0", "J_W1_9-N_1", "J_W1_9-N_2", "J_W1_9-N_3", "J_W1_9-N_4", "J_W1_9-N_5", "J_W1_9-N_6", "J_W1_9-N_7", "J_W1_9-N_8", "J_W1_9-N_9", "J_W1_18-N", "J_W1_18-N_0", "J_W1_18-N_1", "J_W1_18-N_2", "J_W1_18-N_3", "J_W1_18-N_4", "J_W1_18-N_5", "J_W1_18-N_6", "J_W1_18-N_7", "J_W1_18-N_8", "J_W1_18-N_9", "J_W1_30-N", "J_W1_30-N_0", "J_W1_30-N_1", "J_W1_30-N_2", "J_W1_30-N_3", "J_W1_30-N_4", "J_W1_30-N_5", "J_W1_30-N_6", "J_W1_30-N_7", "J_W1_30-N_8", "J_W1_30-N_9", "J_W2_6", "J_W2_12", "N_W1_9-N", "N_W1_9-N_0", "N_W1_9-N_1", "N_W1_9-N_2", "N_W1_9-N_3", "N_W1_9-N_4", "N_W1_9-N_5", "N_W1_9-N_6", "N_W1_9-N_7", "N_W1_9-N_8", "N_W1_9-N_9", "N_W1_18-N", "N_W1_18-N_0", "N_W1_18-N_1", "N_W1_18-N_2", "N_W1_18-N_3", "N_W1_18-N_4", "N_W1_18-N_5", "N_W1_18-N_6", "N_W1_18-N_7", "N_W1_18-N_8", "N_W1_18-N_9", "N_W1_30-N", "N_W1_30-N_0", "N_W1_30-N_1", "N_W1_30-N_2", "N_W1_30-N_3", "N_W1_30-N_4", "N_W1_30-N_5", "N_W1_30-N_6", "N_W1_30-N_7", "N_W1_30-N_8", "N_W1_30-N_9", "N_W2_6", "N_W2_12"],
      emoji: "🌦"
    },    // Sun with cloud and rain
  ],
  HOURS: [
    {time: 0, label: "23h -> 2h"},
    {time: 3, label: "2h -> 5h"},
    {time: 6, label: "5h -> 8h"},
    {time: 9, label: "8h -> 11h"},
    {time: 12, label: "11h -> 14h"},
    {time: 15, label: "14h -> 17h"},
    {time: 18, label: "17h -> 20h"},
    {time: 21, label: "20h -> 23h"}
  ],
  MAP: `\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0###
######\xa0\xa0\xa0\xa0##
\xa0\xa0\xa0\xa0\xa0########
#########
\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0########
\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0#####
\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0###`,
  DATACITIES: [
    "saint-pol-de-leon", "lannion", "lannion",
    // 2nd row - 1st part
    "brest", "saint-pol-de-leon", "saint-hernin", "saint-hernin", "saint-brieuc", "saint-brieuc",
    // 2nd row - 2nd part
    "saint-malo", "saint-malo",
    // 3rd row
    "brest", "saint-hernin", "saint-hernin", "saint-brieuc", "saint-brieuc", "saint-malo", "rennes", "fougeres",
    // 4th row
    "ile-de-sein", "ile-de-sein", "quimper", "lorient", "pontivy", "pontivy", "taupont", "rennes", "fougeres",
    // 5th row
    "quimper", "quimper", "lorient", "lorient", "taupont", "rennes", "rennes", "saint-saturnin-du-limet",
    // 6th row
    "lorient", "vannes", "vannes", "rennes", "saint-saturnin-du-limet",
    // 7th row
    "vannes", "redon", "redon"
  ]
};

export {data};
