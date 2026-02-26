// timezones.js - TimeShift
// Author: Sheikh Abir Ali | sheikhabirali@gmail.com
// https://www.linkedin.com/in/sheikhabirali/

// timezones.js — TimeShift
// ALL entries use verified, real IANA timezone names.
// Cities sharing a timezone are listed together in the label so search finds them all.
// e.g. searching "sylhet" finds Asia/Dhaka because Sylhet is in the label.

const TIMEZONES = [

  // ─── UTC−12 ────────────────────────────────────────────────
  { iana: "Etc/GMT+12",              label: "International Date Line West",                          abbr: "UTC−12", offset: -12    },

  // ─── UTC−11 ────────────────────────────────────────────────
  { iana: "Pacific/Pago_Pago",       label: "Pago Pago · American Samoa · Midway Island",            abbr: "SST",    offset: -11    },
  { iana: "Pacific/Niue",            label: "Alofi · Niue",                                          abbr: "NUT",    offset: -11    },

  // ─── UTC−10 ────────────────────────────────────────────────
  { iana: "Pacific/Honolulu",        label: "Honolulu · Hawaii USA",                                 abbr: "HST",    offset: -10    },
  { iana: "America/Adak",            label: "Adak · Aleutian Islands Alaska USA",                    abbr: "HST",    offset: -10    },
  { iana: "Pacific/Tahiti",          label: "Papeete · Tahiti · French Polynesia",                   abbr: "TAHT",   offset: -10    },
  { iana: "Pacific/Rarotonga",       label: "Avarua · Cook Islands",                                 abbr: "CKT",    offset: -10    },

  // ─── UTC−9:30 ───────────────────────────────────────────────
  { iana: "Pacific/Marquesas",       label: "Marquesas Islands · French Polynesia",                  abbr: "MART",   offset: -9.5   },

  // ─── UTC−9 ─────────────────────────────────────────────────
  { iana: "America/Anchorage",       label: "Anchorage · Juneau · Nome · Fairbanks · Alaska USA",    abbr: "AKST",   offset: -9     },
  { iana: "Pacific/Gambier",         label: "Gambier Islands · French Polynesia",                    abbr: "GAMT",   offset: -9     },

  // ─── UTC−8 ─────────────────────────────────────────────────
  { iana: "America/Los_Angeles",     label: "Los Angeles · San Francisco · Seattle · Las Vegas · Portland · San Diego · Sacramento · California Oregon Washington Nevada USA",  abbr: "PST", offset: -8 },
  { iana: "America/Vancouver",       label: "Vancouver · Victoria · British Columbia Canada",         abbr: "PST",    offset: -8     },
  { iana: "America/Tijuana",         label: "Tijuana · Mexicali · Ensenada · Baja California Mexico", abbr: "PST",   offset: -8     },
  { iana: "Pacific/Pitcairn",        label: "Adamstown · Pitcairn Islands",                          abbr: "PST",    offset: -8     },

  // ─── UTC−7 ─────────────────────────────────────────────────
  { iana: "America/Denver",          label: "Denver · Salt Lake City · Albuquerque · Boise · Colorado Utah New Mexico Idaho USA",  abbr: "MST", offset: -7 },
  { iana: "America/Phoenix",         label: "Phoenix · Tucson · Mesa · Scottsdale · Arizona USA (no DST)", abbr: "MST", offset: -7 },
  { iana: "America/Edmonton",        label: "Edmonton · Calgary · Alberta · Saskatchewan Canada",     abbr: "MST",    offset: -7     },
  { iana: "America/Chihuahua",       label: "Chihuahua · Hermosillo · Mazatlán · Sonora Sinaloa Mexico", abbr: "MST", offset: -7   },
  { iana: "America/Whitehorse",      label: "Whitehorse · Dawson City · Yukon Canada",               abbr: "MST",    offset: -7     },

  // ─── UTC−6 ─────────────────────────────────────────────────
  { iana: "America/Chicago",         label: "Chicago · Dallas · Houston · New Orleans · Minneapolis · Kansas City · Milwaukee · Austin · Texas Illinois Minnesota Wisconsin USA", abbr: "CST", offset: -6 },
  { iana: "America/Winnipeg",        label: "Winnipeg · Regina · Manitoba Saskatchewan Canada",      abbr: "CST",    offset: -6     },
  { iana: "America/Mexico_City",     label: "Mexico City · Guadalajara · Monterrey · Puebla Mexico", abbr: "CST",    offset: -6     },
  { iana: "America/Guatemala",       label: "Guatemala City · Guatemala",                            abbr: "CST",    offset: -6     },
  { iana: "America/Tegucigalpa",     label: "Tegucigalpa · Honduras",                               abbr: "CST",    offset: -6     },
  { iana: "America/Managua",         label: "Managua · Nicaragua",                                  abbr: "CST",    offset: -6     },
  { iana: "America/El_Salvador",     label: "San Salvador · El Salvador",                           abbr: "CST",    offset: -6     },
  { iana: "America/Costa_Rica",      label: "San José · Costa Rica",                                abbr: "CST",    offset: -6     },
  { iana: "America/Belize",          label: "Belmopan · Belize City · Belize",                      abbr: "CST",    offset: -6     },
  { iana: "Pacific/Easter",          label: "Easter Island · Chile",                                abbr: "EAST",   offset: -6     },
  { iana: "Pacific/Galapagos",       label: "Galápagos Islands · Ecuador",                          abbr: "GALT",   offset: -6     },

  // ─── UTC−5 ─────────────────────────────────────────────────
  { iana: "America/New_York",        label: "New York · Miami · Atlanta · Boston · Philadelphia · Washington DC · Detroit · Charlotte · Columbus · Indianapolis · Nashville · Memphis · Tampa · Baltimore · Pittsburgh · Cleveland · Cincinnati · Buffalo · Virginia · North Carolina Eastern USA", abbr: "EST", offset: -5 },
  { iana: "America/Toronto",         label: "Toronto · Ottawa · Montreal · Quebec · Ontario Canada", abbr: "EST",    offset: -5     },
  { iana: "America/Havana",          label: "Havana · Santiago de Cuba · Cuba",                     abbr: "CST",    offset: -5     },
  { iana: "America/Nassau",          label: "Nassau · Bahamas",                                     abbr: "EST",    offset: -5     },
  { iana: "America/Jamaica",         label: "Kingston · Montego Bay · Jamaica",                     abbr: "EST",    offset: -5     },
  { iana: "America/Port-au-Prince",  label: "Port-au-Prince · Haiti",                               abbr: "EST",    offset: -5     },
  { iana: "America/Cayman",          label: "George Town · Cayman Islands",                         abbr: "EST",    offset: -5     },
  { iana: "America/Panama",          label: "Panama City · Panama",                                 abbr: "EST",    offset: -5     },
  { iana: "America/Bogota",          label: "Bogotá · Medellín · Cali · Barranquilla · Colombia",   abbr: "COT",    offset: -5     },
  { iana: "America/Lima",            label: "Lima · Arequipa · Trujillo · Peru",                    abbr: "PET",    offset: -5     },
  { iana: "America/Guayaquil",       label: "Quito · Guayaquil · Ecuador",                          abbr: "ECT",    offset: -5     },
  { iana: "America/Rio_Branco",      label: "Rio Branco · Acre Brazil",                             abbr: "AMT",    offset: -5     },
  { iana: "America/Eirunepe",        label: "Eirunepé · Amazonas Brazil",                           abbr: "AMT",    offset: -5     },

  // ─── UTC−4 ─────────────────────────────────────────────────
  { iana: "America/Halifax",         label: "Halifax · Moncton · Nova Scotia · New Brunswick Canada", abbr: "AST",  offset: -4     },
  { iana: "America/Puerto_Rico",     label: "San Juan · Puerto Rico USA",                           abbr: "AST",    offset: -4     },
  { iana: "America/Caracas",         label: "Caracas · Maracaibo · Valencia · Venezuela",           abbr: "VET",    offset: -4     },
  { iana: "America/Manaus",          label: "Manaus · Boa Vista · Porto Velho · Amazonas Roraima Rondônia Brazil", abbr: "AMT", offset: -4 },
  { iana: "America/Cuiaba",          label: "Cuiabá · Campo Grande · Mato Grosso Brazil",           abbr: "AMT",    offset: -4     },
  { iana: "America/La_Paz",          label: "La Paz · Cochabamba · Santa Cruz · Bolivia",           abbr: "BOT",    offset: -4     },
  { iana: "America/Barbados",        label: "Bridgetown · Barbados",                                abbr: "AST",    offset: -4     },
  { iana: "America/Port_of_Spain",   label: "Port of Spain · Trinidad and Tobago",                  abbr: "AST",    offset: -4     },
  { iana: "America/Guyana",          label: "Georgetown · Guyana",                                  abbr: "GYT",    offset: -4     },
  { iana: "America/Martinique",      label: "Fort-de-France · Martinique",                          abbr: "AST",    offset: -4     },
  { iana: "America/Guadeloupe",      label: "Pointe-à-Pitre · Guadeloupe",                          abbr: "AST",    offset: -4     },
  { iana: "America/Grenada",         label: "St. George's · Grenada",                               abbr: "AST",    offset: -4     },
  { iana: "America/Dominica",        label: "Roseau · Dominica",                                    abbr: "AST",    offset: -4     },
  { iana: "America/St_Lucia",        label: "Castries · Saint Lucia",                               abbr: "AST",    offset: -4     },
  { iana: "America/St_Vincent",      label: "Kingstown · Saint Vincent and the Grenadines",         abbr: "AST",    offset: -4     },
  { iana: "America/Antigua",         label: "St. John's · Antigua and Barbuda",                     abbr: "AST",    offset: -4     },
  { iana: "America/St_Kitts",        label: "Basseterre · Saint Kitts and Nevis",                   abbr: "AST",    offset: -4     },
  { iana: "America/Anguilla",        label: "The Valley · Anguilla",                                abbr: "AST",    offset: -4     },
  { iana: "America/Aruba",           label: "Oranjestad · Aruba",                                   abbr: "AST",    offset: -4     },
  { iana: "America/Curacao",         label: "Willemstad · Curaçao",                                 abbr: "AST",    offset: -4     },
  { iana: "Atlantic/Bermuda",        label: "Hamilton · Bermuda",                                   abbr: "AST",    offset: -4     },
  { iana: "America/Santo_Domingo",   label: "Santo Domingo · Santiago · Dominican Republic",        abbr: "AST",    offset: -4     },
  { iana: "America/Thule",           label: "Thule · Qaanaaq · Northwest Greenland",                abbr: "AST",    offset: -4     },

  // ─── UTC−3:30 ───────────────────────────────────────────────
  { iana: "America/St_Johns",        label: "St. John's · Newfoundland · Labrador Canada",          abbr: "NST",    offset: -3.5   },

  // ─── UTC−3 ─────────────────────────────────────────────────
  { iana: "America/Sao_Paulo",       label: "São Paulo · Rio de Janeiro · Belo Horizonte · Brasília · Curitiba · Fortaleza · Recife · Salvador · Belém · Maceió · Brazil", abbr: "BRT", offset: -3 },
  { iana: "America/Araguaina",       label: "Araguaína · Tocantins · Maranhão Brazil",              abbr: "BRT",    offset: -3     },
  { iana: "America/Argentina/Buenos_Aires", label: "Buenos Aires · Córdoba · Rosario · Mendoza · Tucumán · Salta · Argentina", abbr: "ART", offset: -3 },
  { iana: "America/Montevideo",      label: "Montevideo · Salto · Paysandú · Uruguay",              abbr: "UYT",    offset: -3     },
  { iana: "America/Asuncion",        label: "Asunción · Ciudad del Este · Paraguay",                abbr: "PYT",    offset: -3     },
  { iana: "America/Santiago",        label: "Santiago · Valparaíso · Concepción · Chile",           abbr: "CLT",    offset: -3     },
  { iana: "America/Cayenne",         label: "Cayenne · French Guiana",                              abbr: "GFT",    offset: -3     },
  { iana: "America/Paramaribo",      label: "Paramaribo · Suriname",                                abbr: "SRT",    offset: -3     },
  { iana: "America/Nuuk",            label: "Nuuk · Sisimiut · Greenland",                          abbr: "WGT",    offset: -3     },
  { iana: "Atlantic/Stanley",        label: "Stanley · Falkland Islands",                           abbr: "FKST",   offset: -3     },

  // ─── UTC−2 ─────────────────────────────────────────────────
  { iana: "Atlantic/South_Georgia",  label: "South Georgia Island",                                 abbr: "GST",    offset: -2     },
  { iana: "America/Noronha",         label: "Fernando de Noronha · Brazil",                         abbr: "FNT",    offset: -2     },

  // ─── UTC−1 ─────────────────────────────────────────────────
  { iana: "Atlantic/Azores",         label: "Ponta Delgada · Azores · Portugal",                    abbr: "AZOT",   offset: -1     },
  { iana: "Atlantic/Cape_Verde",     label: "Praia · Mindelo · Cape Verde",                         abbr: "CVT",    offset: -1     },

  // ─── UTC+0 ─────────────────────────────────────────────────
  { iana: "Europe/London",           label: "London · Birmingham · Manchester · United Kingdom",     abbr: "GMT",    offset: 0      },
  { iana: "Europe/Dublin",           label: "Dublin · Cork · Galway · Ireland",                     abbr: "GMT",    offset: 0      },
  { iana: "Europe/Lisbon",           label: "Lisbon · Porto · Faro · Portugal",                     abbr: "WET",    offset: 0      },
  { iana: "Atlantic/Reykjavik",      label: "Reykjavik · Iceland",                                  abbr: "GMT",    offset: 0      },
  { iana: "Atlantic/Canary",         label: "Las Palmas · Tenerife · Gran Canaria · Canary Islands Spain", abbr: "WET", offset: 0 },
  { iana: "Atlantic/Faroe",          label: "Tórshavn · Faroe Islands",                             abbr: "WET",    offset: 0      },
  { iana: "Africa/Casablanca",       label: "Casablanca · Rabat · Marrakech · Fez · Morocco",       abbr: "WET",    offset: 0      },
  { iana: "Africa/El_Aaiun",         label: "Laayoune · Western Sahara",                            abbr: "WET",    offset: 0      },
  { iana: "Africa/Abidjan",          label: "Abidjan · Yamoussoukro · Côte d'Ivoire Ivory Coast",   abbr: "GMT",    offset: 0      },
  { iana: "Africa/Accra",            label: "Accra · Kumasi · Ghana",                               abbr: "GMT",    offset: 0      },
  { iana: "Africa/Dakar",            label: "Dakar · Senegal",                                      abbr: "GMT",    offset: 0      },
  { iana: "Africa/Bamako",           label: "Bamako · Mali",                                        abbr: "GMT",    offset: 0      },
  { iana: "Africa/Conakry",          label: "Conakry · Guinea",                                     abbr: "GMT",    offset: 0      },
  { iana: "Africa/Freetown",         label: "Freetown · Sierra Leone",                              abbr: "GMT",    offset: 0      },
  { iana: "Africa/Monrovia",         label: "Monrovia · Liberia",                                   abbr: "GMT",    offset: 0      },
  { iana: "Africa/Bissau",           label: "Bissau · Guinea-Bissau",                               abbr: "GMT",    offset: 0      },
  { iana: "Africa/Lome",             label: "Lomé · Togo",                                          abbr: "GMT",    offset: 0      },
  { iana: "Africa/Nouakchott",       label: "Nouakchott · Mauritania",                              abbr: "GMT",    offset: 0      },
  { iana: "Africa/Ouagadougou",      label: "Ouagadougou · Burkina Faso",                           abbr: "GMT",    offset: 0      },
  { iana: "Africa/Banjul",           label: "Banjul · Gambia",                                      abbr: "GMT",    offset: 0      },
  { iana: "Africa/Sao_Tome",         label: "São Tomé · São Tomé and Príncipe",                     abbr: "GMT",    offset: 0      },
  { iana: "Etc/UTC",                 label: "UTC · Coordinated Universal Time",                     abbr: "UTC",    offset: 0      },

  // ─── UTC+1 ─────────────────────────────────────────────────
  { iana: "Europe/Paris",            label: "Paris · Lyon · Marseille · France",                    abbr: "CET",    offset: 1      },
  { iana: "Europe/Berlin",           label: "Berlin · Frankfurt · Hamburg · Munich · Cologne · Düsseldorf · Stuttgart · Germany", abbr: "CET", offset: 1 },
  { iana: "Europe/Amsterdam",        label: "Amsterdam · Rotterdam · The Hague · Netherlands",      abbr: "CET",    offset: 1      },
  { iana: "Europe/Brussels",         label: "Brussels · Antwerp · Ghent · Belgium",                 abbr: "CET",    offset: 1      },
  { iana: "Europe/Madrid",           label: "Madrid · Barcelona · Valencia · Seville · Bilbao · Spain", abbr: "CET", offset: 1    },
  { iana: "Europe/Rome",             label: "Rome · Milan · Naples · Turin · Florence · Venice · Italy", abbr: "CET", offset: 1   },
  { iana: "Europe/Zurich",           label: "Zurich · Geneva · Basel · Bern · Switzerland",         abbr: "CET",    offset: 1      },
  { iana: "Europe/Vienna",           label: "Vienna · Graz · Salzburg · Austria",                   abbr: "CET",    offset: 1      },
  { iana: "Europe/Stockholm",        label: "Stockholm · Gothenburg · Malmö · Sweden",              abbr: "CET",    offset: 1      },
  { iana: "Europe/Oslo",             label: "Oslo · Bergen · Trondheim · Norway",                   abbr: "CET",    offset: 1      },
  { iana: "Europe/Copenhagen",       label: "Copenhagen · Aarhus · Odense · Denmark",               abbr: "CET",    offset: 1      },
  { iana: "Europe/Warsaw",           label: "Warsaw · Kraków · Gdańsk · Wrocław · Poland",          abbr: "CET",    offset: 1      },
  { iana: "Europe/Prague",           label: "Prague · Brno · Ostrava · Czech Republic",             abbr: "CET",    offset: 1      },
  { iana: "Europe/Budapest",         label: "Budapest · Debrecen · Hungary",                        abbr: "CET",    offset: 1      },
  { iana: "Europe/Bratislava",       label: "Bratislava · Košice · Slovakia",                       abbr: "CET",    offset: 1      },
  { iana: "Europe/Ljubljana",        label: "Ljubljana · Maribor · Slovenia",                       abbr: "CET",    offset: 1      },
  { iana: "Europe/Zagreb",           label: "Zagreb · Split · Rijeka · Croatia",                    abbr: "CET",    offset: 1      },
  { iana: "Europe/Belgrade",         label: "Belgrade · Novi Sad · Serbia",                         abbr: "CET",    offset: 1      },
  { iana: "Europe/Sarajevo",         label: "Sarajevo · Banja Luka · Bosnia and Herzegovina",       abbr: "CET",    offset: 1      },
  { iana: "Europe/Skopje",           label: "Skopje · North Macedonia",                             abbr: "CET",    offset: 1      },
  { iana: "Europe/Tirane",           label: "Tirana · Durrës · Albania",                            abbr: "CET",    offset: 1      },
  { iana: "Europe/Podgorica",        label: "Podgorica · Montenegro",                               abbr: "CET",    offset: 1      },
  { iana: "Europe/Luxembourg",       label: "Luxembourg City · Luxembourg",                         abbr: "CET",    offset: 1      },
  { iana: "Europe/Monaco",           label: "Monaco",                                               abbr: "CET",    offset: 1      },
  { iana: "Europe/Malta",            label: "Valletta · Malta",                                     abbr: "CET",    offset: 1      },
  { iana: "Europe/Andorra",          label: "Andorra la Vella · Andorra",                           abbr: "CET",    offset: 1      },
  { iana: "Africa/Lagos",            label: "Lagos · Abuja · Kano · Ibadan · Nigeria",              abbr: "WAT",    offset: 1      },
  { iana: "Africa/Kinshasa",         label: "Kinshasa · Lubumbashi · DR Congo",                     abbr: "WAT",    offset: 1      },
  { iana: "Africa/Luanda",           label: "Luanda · Huambo · Angola",                             abbr: "WAT",    offset: 1      },
  { iana: "Africa/Brazzaville",      label: "Brazzaville · Pointe-Noire · Republic of Congo",       abbr: "WAT",    offset: 1      },
  { iana: "Africa/Douala",           label: "Douala · Yaoundé · Cameroon",                          abbr: "WAT",    offset: 1      },
  { iana: "Africa/Libreville",       label: "Libreville · Gabon",                                   abbr: "WAT",    offset: 1      },
  { iana: "Africa/Malabo",           label: "Malabo · Equatorial Guinea",                           abbr: "WAT",    offset: 1      },
  { iana: "Africa/Ndjamena",         label: "N'Djamena · Chad",                                     abbr: "WAT",    offset: 1      },
  { iana: "Africa/Niamey",           label: "Niamey · Niger",                                       abbr: "WAT",    offset: 1      },
  { iana: "Africa/Porto-Novo",       label: "Porto-Novo · Cotonou · Benin",                         abbr: "WAT",    offset: 1      },
  { iana: "Africa/Bangui",           label: "Bangui · Central African Republic",                    abbr: "WAT",    offset: 1      },
  { iana: "Africa/Tunis",            label: "Tunis · Sfax · Tunisia",                               abbr: "CET",    offset: 1      },
  { iana: "Africa/Algiers",          label: "Algiers · Oran · Constantine · Algeria",               abbr: "CET",    offset: 1      },
  { iana: "Arctic/Longyearbyen",     label: "Longyearbyen · Svalbard · Norway",                     abbr: "CET",    offset: 1      },

  // ─── UTC+2 ─────────────────────────────────────────────────
  { iana: "Europe/Athens",           label: "Athens · Thessaloniki · Piraeus · Greece",             abbr: "EET",    offset: 2      },
  { iana: "Europe/Helsinki",         label: "Helsinki · Tampere · Turku · Finland",                 abbr: "EET",    offset: 2      },
  { iana: "Europe/Riga",             label: "Riga · Daugavpils · Latvia",                           abbr: "EET",    offset: 2      },
  { iana: "Europe/Tallinn",          label: "Tallinn · Tartu · Estonia",                            abbr: "EET",    offset: 2      },
  { iana: "Europe/Vilnius",          label: "Vilnius · Kaunas · Klaipėda · Lithuania",              abbr: "EET",    offset: 2      },
  { iana: "Europe/Kyiv",             label: "Kyiv · Kharkiv · Odesa · Dnipro · Lviv · Ukraine",    abbr: "EET",    offset: 2      },
  { iana: "Europe/Bucharest",        label: "Bucharest · Cluj-Napoca · Timișoara · Romania",        abbr: "EET",    offset: 2      },
  { iana: "Europe/Sofia",            label: "Sofia · Plovdiv · Varna · Bulgaria",                   abbr: "EET",    offset: 2      },
  { iana: "Europe/Chisinau",         label: "Chișinău · Tiraspol · Moldova",                        abbr: "EET",    offset: 2      },
  { iana: "Europe/Nicosia",          label: "Nicosia · Limassol · Cyprus",                          abbr: "EET",    offset: 2      },
  { iana: "Europe/Kaliningrad",      label: "Kaliningrad · Russia",                                 abbr: "EET",    offset: 2      },
  { iana: "Asia/Jerusalem",          label: "Jerusalem · Tel Aviv · Haifa · Beer-Sheva · Israel",   abbr: "IST",    offset: 2      },
  { iana: "Asia/Beirut",             label: "Beirut · Tripoli · Sidon · Lebanon",                   abbr: "EET",    offset: 2      },
  { iana: "Asia/Gaza",               label: "Gaza City · Hebron · Palestine",                       abbr: "EET",    offset: 2      },
  { iana: "Africa/Cairo",            label: "Cairo · Alexandria · Giza · Luxor · Aswan · Egypt",   abbr: "EET",    offset: 2      },
  { iana: "Africa/Johannesburg",     label: "Johannesburg · Cape Town · Durban · Pretoria · Port Elizabeth · South Africa", abbr: "SAST", offset: 2 },
  { iana: "Africa/Harare",           label: "Harare · Bulawayo · Zimbabwe",                         abbr: "CAT",    offset: 2      },
  { iana: "Africa/Lusaka",           label: "Lusaka · Ndola · Kitwe · Zambia",                      abbr: "CAT",    offset: 2      },
  { iana: "Africa/Gaborone",         label: "Gaborone · Francistown · Botswana",                    abbr: "CAT",    offset: 2      },
  { iana: "Africa/Maputo",           label: "Maputo · Beira · Mozambique",                          abbr: "CAT",    offset: 2      },
  { iana: "Africa/Blantyre",         label: "Blantyre · Lilongwe · Malawi",                         abbr: "CAT",    offset: 2      },
  { iana: "Africa/Kigali",           label: "Kigali · Rwanda",                                      abbr: "CAT",    offset: 2      },
  { iana: "Africa/Bujumbura",        label: "Bujumbura · Gitega · Burundi",                         abbr: "CAT",    offset: 2      },
  { iana: "Africa/Khartoum",         label: "Khartoum · Omdurman · Sudan",                          abbr: "CAT",    offset: 2      },
  { iana: "Africa/Juba",             label: "Juba · South Sudan",                                   abbr: "CAT",    offset: 2      },
  { iana: "Africa/Tripoli",          label: "Tripoli · Benghazi · Libya",                           abbr: "EET",    offset: 2      },
  { iana: "Africa/Windhoek",         label: "Windhoek · Walvis Bay · Namibia",                      abbr: "CAT",    offset: 2      },
  { iana: "Africa/Mbabane",          label: "Mbabane · Manzini · Eswatini",                         abbr: "SAST",   offset: 2      },
  { iana: "Africa/Maseru",           label: "Maseru · Lesotho",                                     abbr: "SAST",   offset: 2      },

  // ─── UTC+3 ─────────────────────────────────────────────────
  { iana: "Europe/Moscow",           label: "Moscow · Saint Petersburg · Novosibirsk · Yekaterinburg · Nizhny Novgorod · Kazan · Volgograd · Russia", abbr: "MSK", offset: 3 },
  { iana: "Europe/Minsk",            label: "Minsk · Gomel · Grodno · Belarus",                     abbr: "FET",    offset: 3      },
  { iana: "Asia/Istanbul",           label: "Istanbul · Ankara · Izmir · Bursa · Adana · Turkey",   abbr: "TRT",    offset: 3      },
  { iana: "Asia/Riyadh",             label: "Riyadh · Jeddah · Mecca · Medina · Dammam · Saudi Arabia", abbr: "AST", offset: 3   },
  { iana: "Asia/Kuwait",             label: "Kuwait City · Kuwait",                                 abbr: "AST",    offset: 3      },
  { iana: "Asia/Qatar",              label: "Doha · Al Wakrah · Qatar",                             abbr: "AST",    offset: 3      },
  { iana: "Asia/Baghdad",            label: "Baghdad · Basra · Mosul · Erbil · Iraq",               abbr: "AST",    offset: 3      },
  { iana: "Asia/Amman",              label: "Amman · Zarqa · Irbid · Jordan",                       abbr: "EET",    offset: 3      },
  { iana: "Asia/Damascus",           label: "Damascus · Aleppo · Homs · Syria",                     abbr: "EET",    offset: 3      },
  { iana: "Asia/Aden",               label: "Aden · Sana'a · Taiz · Yemen",                         abbr: "AST",    offset: 3      },
  { iana: "Asia/Bahrain",            label: "Manama · Bahrain",                                     abbr: "AST",    offset: 3      },
  { iana: "Africa/Nairobi",          label: "Nairobi · Mombasa · Kisumu · Nakuru · Kenya",          abbr: "EAT",    offset: 3      },
  { iana: "Africa/Dar_es_Salaam",    label: "Dar es Salaam · Dodoma · Arusha · Zanzibar · Tanzania",abbr: "EAT",    offset: 3      },
  { iana: "Africa/Kampala",          label: "Kampala · Gulu · Mbarara · Uganda",                    abbr: "EAT",    offset: 3      },
  { iana: "Africa/Addis_Ababa",      label: "Addis Ababa · Dire Dawa · Mekelle · Ethiopia",         abbr: "EAT",    offset: 3      },
  { iana: "Africa/Mogadishu",        label: "Mogadishu · Hargeisa · Somalia",                       abbr: "EAT",    offset: 3      },
  { iana: "Africa/Djibouti",         label: "Djibouti City · Djibouti",                             abbr: "EAT",    offset: 3      },
  { iana: "Africa/Asmara",           label: "Asmara · Keren · Eritrea",                             abbr: "EAT",    offset: 3      },
  { iana: "Indian/Antananarivo",     label: "Antananarivo · Toamasina · Madagascar",                abbr: "EAT",    offset: 3      },
  { iana: "Indian/Mayotte",          label: "Mamoudzou · Mayotte",                                  abbr: "EAT",    offset: 3      },
  { iana: "Indian/Comoro",           label: "Moroni · Comoros",                                     abbr: "EAT",    offset: 3      },
  { iana: "Antarctica/Syowa",        label: "Syowa Station · Antarctica",                           abbr: "SYOT",   offset: 3      },

  // ─── UTC+3:30 ───────────────────────────────────────────────
  { iana: "Asia/Tehran",             label: "Tehran · Mashhad · Isfahan · Tabriz · Shiraz · Ahvaz · Iran", abbr: "IRST", offset: 3.5 },

  // ─── UTC+4 ─────────────────────────────────────────────────
  { iana: "Asia/Dubai",              label: "Dubai · Abu Dhabi · Sharjah · Ajman · UAE United Arab Emirates", abbr: "GST", offset: 4 },
  { iana: "Asia/Muscat",             label: "Muscat · Salalah · Sohar · Oman",                      abbr: "GST",    offset: 4      },
  { iana: "Asia/Tbilisi",            label: "Tbilisi · Kutaisi · Batumi · Georgia",                  abbr: "GET",    offset: 4      },
  { iana: "Asia/Yerevan",            label: "Yerevan · Gyumri · Vanadzor · Armenia",                 abbr: "AMT",    offset: 4      },
  { iana: "Asia/Baku",               label: "Baku · Ganja · Sumqayit · Azerbaijan",                  abbr: "AZT",    offset: 4      },
  { iana: "Europe/Samara",           label: "Samara · Saratov · Ulyanovsk · Astrakhan · Russia",     abbr: "SAMT",   offset: 4      },
  { iana: "Indian/Mauritius",        label: "Port Louis · Mauritius",                               abbr: "MUT",    offset: 4      },
  { iana: "Indian/Reunion",          label: "Saint-Denis · Réunion",                                abbr: "RET",    offset: 4      },
  { iana: "Indian/Mahe",             label: "Victoria · Seychelles",                                abbr: "SCT",    offset: 4      },

  // ─── UTC+4:30 ───────────────────────────────────────────────
  { iana: "Asia/Kabul",              label: "Kabul · Kandahar · Herat · Mazar-i-Sharif · Afghanistan", abbr: "AFT",  offset: 4.5    },

  // ─── UTC+5 ─────────────────────────────────────────────────
  { iana: "Asia/Karachi",            label: "Karachi · Lahore · Islamabad · Rawalpindi · Faisalabad · Multan · Peshawar · Quetta · Hyderabad · Pakistan", abbr: "PKT", offset: 5 },
  { iana: "Asia/Tashkent",           label: "Tashkent · Samarkand · Namangan · Andijan · Bukhara · Uzbekistan", abbr: "UZT", offset: 5 },
  { iana: "Asia/Dushanbe",           label: "Dushanbe · Khujand · Tajikistan",                      abbr: "TJT",    offset: 5      },
  { iana: "Asia/Ashgabat",           label: "Ashgabat · Mary · Turkmenabad · Turkmenistan",          abbr: "TMT",    offset: 5      },
  { iana: "Asia/Yekaterinburg",      label: "Yekaterinburg · Chelyabinsk · Ufa · Perm · Russia",    abbr: "YEKT",   offset: 5      },
  { iana: "Asia/Aqtau",              label: "Aktau · Aqtau · Kazakhstan",                           abbr: "AQTT",   offset: 5      },
  { iana: "Asia/Aqtobe",             label: "Aktobe · Aqtöbe · Kazakhstan",                         abbr: "AQTT",   offset: 5      },
  { iana: "Indian/Maldives",         label: "Malé · Maldives",                                      abbr: "MVT",    offset: 5      },
  { iana: "Indian/Kerguelen",        label: "Kerguelen Islands · France",                           abbr: "TFT",    offset: 5      },

  // ─── UTC+5:30 ───────────────────────────────────────────────
  { iana: "Asia/Kolkata",            label: "Mumbai · Delhi · Bangalore · Kolkata · Chennai · Hyderabad · Pune · Ahmedabad · Jaipur · Surat · Lucknow · Kanpur · Nagpur · Bhopal · Patna · Kochi · Thiruvananthapuram · Coimbatore · Indore · Visakhapatnam · Agra · Varanasi · Chandigarh · Amritsar · Mysore · Mangalore · Madurai · Guwahati · Bhubaneswar · Ranchi · Raipur · Goa · Shimla · Dehradun · IST India", abbr: "IST", offset: 5.5 },
  { iana: "Asia/Colombo",            label: "Colombo · Kandy · Galle · Sri Lanka · Ceylon",         abbr: "IST",    offset: 5.5    },

  // ─── UTC+5:45 ───────────────────────────────────────────────
  { iana: "Asia/Kathmandu",          label: "Kathmandu · Pokhara · Biratnagar · Lalitpur · Nepal",  abbr: "NPT",    offset: 5.75   },

  // ─── UTC+6 ─────────────────────────────────────────────────
  { iana: "Asia/Dhaka",              label: "Dhaka · Chittagong · Khulna · Rajshahi · Sylhet · Comilla · Mymensingh · Gazipur · Narayanganj · Bangladesh BDT", abbr: "BDT", offset: 6 },
  { iana: "Asia/Thimphu",            label: "Thimphu · Phuentsholing · Bhutan",                     abbr: "BTT",    offset: 6      },
  { iana: "Asia/Bishkek",            label: "Bishkek · Osh · Kyrgyzstan",                           abbr: "KGT",    offset: 6      },
  { iana: "Asia/Almaty",             label: "Almaty · Nur-Sultan · Astana · Shymkent · Karaganda · Kazakhstan", abbr: "ALMT", offset: 6 },
  { iana: "Asia/Urumqi",             label: "Ürümqi · Kashgar · Xinjiang · China",                  abbr: "XJT",    offset: 6      },
  { iana: "Asia/Omsk",               label: "Omsk · Russia",                                        abbr: "OMST",   offset: 6      },
  { iana: "Indian/Chagos",           label: "Diego Garcia · British Indian Ocean Territory BIOT",   abbr: "IOT",    offset: 6      },

  // ─── UTC+6:30 ───────────────────────────────────────────────
  { iana: "Asia/Yangon",             label: "Yangon · Mandalay · Naypyidaw · Mawlamyine · Myanmar Burma", abbr: "MMT", offset: 6.5 },
  { iana: "Indian/Cocos",            label: "West Island · Cocos Keeling Islands Australia",        abbr: "CCT",    offset: 6.5    },

  // ─── UTC+7 ─────────────────────────────────────────────────
  { iana: "Asia/Bangkok",            label: "Bangkok · Chiang Mai · Phuket · Pattaya · Thailand",   abbr: "ICT",    offset: 7      },
  { iana: "Asia/Ho_Chi_Minh",        label: "Ho Chi Minh City · Hanoi · Da Nang · Hai Phong · Vietnam", abbr: "ICT", offset: 7    },
  { iana: "Asia/Vientiane",          label: "Vientiane · Laos",                                     abbr: "ICT",    offset: 7      },
  { iana: "Asia/Phnom_Penh",         label: "Phnom Penh · Siem Reap · Sihanoukville · Cambodia",    abbr: "ICT",    offset: 7      },
  { iana: "Asia/Jakarta",            label: "Jakarta · Surabaya · Bandung · Medan · Semarang · Palembang · Java Sumatra Indonesia WIB", abbr: "WIB", offset: 7 },
  { iana: "Asia/Hovd",               label: "Hovd · Mongolia",                                      abbr: "HOVT",   offset: 7      },
  { iana: "Asia/Krasnoyarsk",        label: "Krasnoyarsk · Novosibirsk · Barnaul · Tomsk · Russia", abbr: "KRAT",   offset: 7      },
  { iana: "Indian/Christmas",        label: "Christmas Island · Australia",                         abbr: "CXT",    offset: 7      },

  // ─── UTC+8 ─────────────────────────────────────────────────
  { iana: "Asia/Shanghai",           label: "Shanghai · Beijing · Guangzhou · Shenzhen · Chengdu · Chongqing · Wuhan · Tianjin · Xi'an · Harbin · Nanjing · Hangzhou · China CST", abbr: "CST", offset: 8 },
  { iana: "Asia/Taipei",             label: "Taipei · Kaohsiung · Taichung · Taiwan",               abbr: "CST",    offset: 8      },
  { iana: "Asia/Hong_Kong",          label: "Hong Kong · Kowloon · HKT",                            abbr: "HKT",    offset: 8      },
  { iana: "Asia/Macau",              label: "Macau · Cotai",                                        abbr: "CST",    offset: 8      },
  { iana: "Asia/Singapore",          label: "Singapore · SGT",                                      abbr: "SGT",    offset: 8      },
  { iana: "Asia/Kuala_Lumpur",       label: "Kuala Lumpur · Johor Bahru · Penang · Ipoh · Kota Kinabalu · Kuching · Malaysia", abbr: "MYT", offset: 8 },
  { iana: "Asia/Manila",             label: "Manila · Cebu City · Davao · Quezon City · Philippines", abbr: "PHT",  offset: 8      },
  { iana: "Asia/Brunei",             label: "Bandar Seri Begawan · Brunei",                         abbr: "BNT",    offset: 8      },
  { iana: "Asia/Makassar",           label: "Makassar · Denpasar · Bali · Manado · Sulawesi · Indonesia WITA", abbr: "WITA", offset: 8 },
  { iana: "Asia/Ulaanbaatar",        label: "Ulaanbaatar · Erdenet · Mongolia",                     abbr: "ULAT",   offset: 8      },
  { iana: "Asia/Irkutsk",            label: "Irkutsk · Russia",                                     abbr: "IRKT",   offset: 8      },
  { iana: "Australia/Perth",         label: "Perth · Fremantle · Western Australia",                abbr: "AWST",   offset: 8      },

  // ─── UTC+8:45 ───────────────────────────────────────────────
  { iana: "Australia/Eucla",         label: "Eucla · Western Australia",                            abbr: "ACWST",  offset: 8.75   },

  // ─── UTC+9 ─────────────────────────────────────────────────
  { iana: "Asia/Tokyo",              label: "Tokyo · Osaka · Kyoto · Sapporo · Fukuoka · Nagoya · Hiroshima · Japan JST", abbr: "JST", offset: 9 },
  { iana: "Asia/Seoul",              label: "Seoul · Busan · Incheon · Daegu · Daejeon · South Korea KST", abbr: "KST", offset: 9  },
  { iana: "Asia/Pyongyang",          label: "Pyongyang · Hamhung · North Korea",                    abbr: "KST",    offset: 9      },
  { iana: "Asia/Dili",               label: "Dili · Timor-Leste East Timor",                        abbr: "TLT",    offset: 9      },
  { iana: "Asia/Jayapura",           label: "Jayapura · Papua · West Papua · Indonesia WIT",        abbr: "WIT",    offset: 9      },
  { iana: "Asia/Yakutsk",            label: "Yakutsk · Chita · Russia",                             abbr: "YAKT",   offset: 9      },
  { iana: "Pacific/Palau",           label: "Ngerulmud · Koror · Palau",                            abbr: "PWT",    offset: 9      },

  // ─── UTC+9:30 ───────────────────────────────────────────────
  { iana: "Australia/Darwin",        label: "Darwin · Alice Springs · Northern Territory Australia ACST", abbr: "ACST", offset: 9.5 },

  // ─── UTC+10 ────────────────────────────────────────────────
  { iana: "Australia/Brisbane",      label: "Brisbane · Townsville · Cairns · Gold Coast · Queensland Australia AEST", abbr: "AEST", offset: 10 },
  { iana: "Asia/Vladivostok",        label: "Vladivostok · Khabarovsk · Russia",                    abbr: "VLAT",   offset: 10     },
  { iana: "Pacific/Guam",            label: "Hagåtña · Guam · Saipan · Northern Mariana Islands USA", abbr: "ChST",  offset: 10    },
  { iana: "Pacific/Port_Moresby",    label: "Port Moresby · Lae · Papua New Guinea",                abbr: "PGT",    offset: 10     },
  { iana: "Pacific/Chuuk",           label: "Weno · Chuuk · Micronesia",                            abbr: "CHUT",   offset: 10     },

  // ─── UTC+10:30 ──────────────────────────────────────────────
  { iana: "Australia/Adelaide",      label: "Adelaide · South Australia ACDT",                      abbr: "ACDT",   offset: 10.5   },

  // ─── UTC+11 ────────────────────────────────────────────────
  { iana: "Australia/Sydney",        label: "Sydney · Melbourne · Canberra · Hobart · New South Wales Victoria ACT Tasmania Australia AEDT", abbr: "AEDT", offset: 11 },
  { iana: "Asia/Magadan",            label: "Magadan · Sakhalin · Yuzhno-Sakhalinsk · Russia",      abbr: "MAGT",   offset: 11     },
  { iana: "Pacific/Guadalcanal",     label: "Honiara · Solomon Islands",                            abbr: "SBT",    offset: 11     },
  { iana: "Pacific/Noumea",          label: "Nouméa · New Caledonia France",                        abbr: "NCT",    offset: 11     },
  { iana: "Pacific/Efate",           label: "Port Vila · Vanuatu",                                  abbr: "VUT",    offset: 11     },
  { iana: "Pacific/Pohnpei",         label: "Palikir · Pohnpei · Micronesia",                       abbr: "PONT",   offset: 11     },
  { iana: "Pacific/Bougainville",    label: "Arawa · Bougainville · Papua New Guinea",              abbr: "BST",    offset: 11     },
  { iana: "Australia/Lord_Howe",     label: "Lord Howe Island · Australia",                         abbr: "LHST",   offset: 10.5   },

  // ─── UTC+12 ────────────────────────────────────────────────
  { iana: "Pacific/Auckland",        label: "Auckland · Wellington · Christchurch · Hamilton · New Zealand NZDT", abbr: "NZDT", offset: 12 },
  { iana: "Pacific/Fiji",            label: "Suva · Nadi · Fiji",                                   abbr: "FJT",    offset: 12     },
  { iana: "Pacific/Tarawa",          label: "South Tarawa · Kiribati",                              abbr: "GILT",   offset: 12     },
  { iana: "Pacific/Nauru",           label: "Yaren · Nauru",                                        abbr: "NRT",    offset: 12     },
  { iana: "Pacific/Funafuti",        label: "Funafuti · Tuvalu",                                    abbr: "TVT",    offset: 12     },
  { iana: "Pacific/Majuro",          label: "Majuro · Marshall Islands",                            abbr: "MHT",    offset: 12     },
  { iana: "Pacific/Wallis",          label: "Mata-Utu · Wallis and Futuna France",                  abbr: "WFT",    offset: 12     },
  { iana: "Pacific/Wake",            label: "Wake Island · USA",                                    abbr: "WAKT",   offset: 12     },
  { iana: "Pacific/Norfolk",         label: "Kingston · Norfolk Island Australia",                  abbr: "NFT",    offset: 12     },
  { iana: "Asia/Kamchatka",          label: "Petropavlovsk-Kamchatsky · Anadyr · Kamchatka Russia", abbr: "PETT",   offset: 12     },

  // ─── UTC+12:45 ──────────────────────────────────────────────
  { iana: "Pacific/Chatham",         label: "Waitangi · Chatham Islands · New Zealand",             abbr: "CHADT",  offset: 12.75  },

  // ─── UTC+13 ────────────────────────────────────────────────
  { iana: "Pacific/Apia",            label: "Apia · Samoa",                                         abbr: "WST",    offset: 13     },
  { iana: "Pacific/Tongatapu",       label: "Nuku'alofa · Tonga",                                   abbr: "TOT",    offset: 13     },
  { iana: "Pacific/Fakaofo",         label: "Fakaofo · Tokelau",                                    abbr: "TKT",    offset: 13     },
  { iana: "Pacific/Kanton",          label: "Kanton Island · Phoenix Islands · Kiribati",           abbr: "PHOT",   offset: 13     },

  // ─── UTC+14 ────────────────────────────────────────────────
  { iana: "Pacific/Kiritimati",      label: "Christmas Island · Kiritimati · Kiribati",             abbr: "LINT",   offset: 14     },

];
