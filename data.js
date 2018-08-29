const data = {
  URLS: [
    `http://www.meteofrance.com/mf3-rpc-portlet/rest/carte/france/REG_FRANCE/REGIN05?echeance=$time$00`,
    `http://www.meteofrance.com/mf3-rpc-portlet/rest/carte/plages/RIVAGE/MER002?echeance=$time$00`
  ],
  WEATHER: [
    { // Cloud
      codes: /\b[JN]_W[12]_(?:3|0-N_3)\b/gm,
      emojis: ["☁"]
    },
    { // Fog
      codes: /\b[JN]_W1_(?:1|2|33)-N(?:_[0-9])?\b/gm,
      emojis: ["🌫"]
    },
    { // Lightning
      codes: /\b[JN]_W(?:1_(?:24|26|31)-N(?:_[0-9])?|2_18)\b/gm,
      emojis: ["🌩"]
    },
    { // Lightning with rain
      codes: /\b[JN]_W[12]_(?:16|32)\b/gm,
      emojis: ["⛈"]
    },
    { // Rain
      codes: /\b[JN]_W1_(?:9|18|30)-N_3\b/gm,
      emojis: ["🌧"]
    },
    { // Snow
      codes: /\b[JN]_W[12]_(?:11|15|16|17|22)-N(?:_3)?\b/gm,
      emojis: ["❄️"]
    },
    { // Snow with clouds
      codes: /\b[JN]_W[12]_(?:(?:7|10|13|14|15|19|20)|(?:13|21)-N_3)\b/gm,
      emojis: ["🌨️"]
    },
    { // Sun
      codes: /\bJ_W[12]_(?:1|0-N_[07])\b/gm,
      emojis: ["☀"]
    },
    { // Sun - night
      codes: /\bN_W[12]_(?:1|0-N_[07])\b/gm,
      emojis: ["🌙"]
    },
    { // Sun with small cloud
      codes: /\b[JN]_W1_0-N_[125]\b/gm,
      emojis: ["🌤"]
    },
    { // Sun with cloud
      codes: /\b[JN]_W1_0-N_5\b/gm,
      emojis: ["🌥"]
    },
    { // Sun with cloud and rain
      codes: /\b[JN]_W(?:1_(?:9|18|30)-N(?:_[0-24-9])?|2_(?:6|12))\b/gm,
      emojis: ["🌦"]
    },
  ],
  WINDS: [{
    codes: ["V_S", "V_SSO", "V_SSE"],
    emojis: ["🔼", "⬆", "⏫", "🌪️"]
  }, {
    codes: ["V_SO"],
    emojis: ["↗"]
  }, {
    codes: ["V_O", "V_OSO", "V_ONO"],
    emojis: ["▶️", "➡", "⏩", "🌪️"]
  }, {
    codes: ["V_NO"],
    emojis: ["↘"]
  }, {
    codes: ["V_N", "V_NNO", "V_NNE"],
    emojis: ["🔽", "⬇", "⏬", "🌪️"]
  }, {
    codes: ["V_NE"],
    emojis: ["↙"]
  }, {
    codes: ["V_E", "V_ENE", "V_ESE"],
    emojis: ["◀", "⬅", "⏪", "🌪️"]
  }, {
    codes: ["V_SE"],
    emojis: ["↖"]
  }, {
    codes: ["V_V"],
    emojis: ["🔄"]
  }],
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
  MAP: `_www____
    w###ww_wwww
    _w####w####
    w##########
    __ww#######
    ______ww####
    ________www`,
  DATACITIES: [
    "saint-pol-de-leon", "lannion", "perros-guirec",
    // 2nd row - 1st part
    "brest", "saint-pol-de-leon", "saint-hernin", "saint-hernin", "saint-brieuc", "saint-brieuc",
    // 2nd row - 2nd part
    "erquy", "saint-malo", "saint-malo", "fougeres",
    // 3rd row
    "brest", "saint-hernin", "saint-hernin", "saint-brieuc", "saint-brieuc", "saint-malo", "rennes", "fougeres", "fougeres", "fougeres",
    // 4th row
    "plozevet", "plozevet", "quimper", "lorient", "pontivy", "pontivy", "taupont", "rennes", "rennes", "rennes", "fougeres",
    // 5th row
    "quimper", "quimper", "lorient", "lorient", "taupont", "rennes", "rennes", "rennes", "saint-saturnin-du-limet",
    // 6th row
    "lorient", "vannes", "vannes", "rennes", "saint-saturnin-du-limet", "saint-saturnin-du-limet",
    // 7th row
    "quiberon", "redon", "redon"
  ],
  SMALL_LETTERS: "⁰¹²³⁴⁵⁶⁷⁸⁹".split('')
};

export {data};
