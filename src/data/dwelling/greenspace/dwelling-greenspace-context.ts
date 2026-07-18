/**
 * Population-weighted greenspace access for /dwelling.
 *
 * Generated from official ABS, VPA and PARKRES spatial sources.
 */
export const DWELLING_GREENSPACE_CONTEXT = {
  "dataset": "dwelling-greenspace-context",
  "methodologyVersion": "greenspace-access-v1",
  "retrievedAt": "2026-07-16",
  "usage": {
    "criterion": "greenspace",
    "scoreScale": "0-10",
    "formula": "0.50 * localOpenSpaceAccess + 0.30 * majorParkAccess + 0.20 * natureCorridorAccess",
    "combinedSuburbRule": "Combined application records pool all component SAL residential mesh-block sample points and their population weights before scoring. They are not averaged from component suburb scores."
  },
  "records": [
    {
      "id": "inner-abbotsford-2br",
      "displayName": "Abbotsford",
      "salSuburbs": [
        "Abbotsford"
      ],
      "salCodes": [
        "20002"
      ],
      "greenspace": 9.9773,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 10.0,
        "majorParkAccess": 9.942,
        "natureCorridorAccess": 9.9734
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 100.0,
        "representedPopulation": 8564,
        "sampledMeshBlocks": 71
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-15",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 64.0,
          "majorPark": 192.0,
          "natureCorridor": 143.0
        },
        "nearbyOpenSpaces": [
          {
            "name": "Yarra Bend Park - Yarra",
            "areaHa": 80.68
          },
          {
            "name": "Yarra River",
            "areaHa": 80.37
          },
          {
            "name": "Yarra Bend Park - Boroondara",
            "areaHa": 74.3
          },
          {
            "name": "Fitzroy Gardens",
            "areaHa": 26.28
          },
          {
            "name": "Yarra Park",
            "areaHa": 23.37
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "Yarra Bend Park",
            "areaHa": 236.79
          },
          {
            "name": "Yarra River",
            "areaHa": 80.37
          },
          {
            "name": "Yarra Bend Park - Boroondara",
            "areaHa": 74.3
          },
          {
            "name": "Yarra Bend Park - Yarra",
            "areaHa": 44.44
          },
          {
            "name": "Yarra River Frontage Park - Yarra",
            "areaHa": 6.16
          }
        ],
        "residentialPopulationCoveragePct": 94.2,
        "componentSpread": 0.1,
        "reviewFlags": []
      }
    },
    {
      "id": "albert-park-2br",
      "displayName": "Albert Park",
      "salSuburbs": [
        "Albert Park"
      ],
      "salCodes": [
        "20018"
      ],
      "greenspace": 9.6537,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 9.6666,
        "majorParkAccess": 9.6693,
        "natureCorridorAccess": 9.598
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 91.8,
        "representedPopulation": 5828,
        "sampledMeshBlocks": 76
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-15",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 210.0,
          "majorPark": 355.0,
          "natureCorridor": 386.0
        },
        "nearbyOpenSpaces": [
          {
            "name": "Albert Park",
            "areaHa": 120.81
          },
          {
            "name": "Albert Park Lake",
            "areaHa": 48.92
          },
          {
            "name": "St Kilda Pier and Breakwater",
            "areaHa": 48.3
          },
          {
            "name": "Fawkner Park",
            "areaHa": 41.19
          },
          {
            "name": "Royal Botanic Gardens - Melbourne",
            "areaHa": 37.17
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "Albert Park Lake",
            "areaHa": 48.92
          },
          {
            "name": "St Kilda Pier and Breakwater",
            "areaHa": 48.3
          },
          {
            "name": "Port Melb, Albert & Middle Parks F/shore",
            "areaHa": 15.83
          },
          {
            "name": "St Kilda Catani Gardens & Surrounding Foreshore",
            "areaHa": 14.06
          },
          {
            "name": "Station Pier",
            "areaHa": 10.08
          }
        ],
        "residentialPopulationCoveragePct": 100.0,
        "componentSpread": 0.1,
        "reviewFlags": []
      }
    },
    {
      "id": "armadale-2br",
      "displayName": "Armadale",
      "salSuburbs": [
        "Armadale"
      ],
      "salCodes": [
        "20066"
      ],
      "greenspace": 6.4139,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 9.2267,
        "majorParkAccess": 5.0282,
        "natureCorridorAccess": 1.4607
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 87.7,
        "representedPopulation": 9031,
        "sampledMeshBlocks": 122
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-15",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 203.0,
          "majorPark": 1441.0,
          "natureCorridor": 2183.0
        },
        "nearbyOpenSpaces": [
          {
            "name": "Caulfield Park (Recreation)",
            "areaHa": 18.73
          },
          {
            "name": "Kooyong Park",
            "areaHa": 12.29
          },
          {
            "name": "Caulfield Park (Parkland)",
            "areaHa": 7.24
          },
          {
            "name": "Alma Park",
            "areaHa": 4.0
          },
          {
            "name": "Orrong Romanis Park",
            "areaHa": 3.96
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "Gardiners Creek Frontage - Boroondara",
            "areaHa": 0.68
          },
          {
            "name": "Gardiners Creek Frontage - VicRoads - Stonnington",
            "areaHa": 0.62
          },
          {
            "name": "Gardiners Creek Frontage - Stonnington",
            "areaHa": 0.27
          }
        ],
        "residentialPopulationCoveragePct": 96.4,
        "componentSpread": 7.8,
        "reviewFlags": [
          "highComponentSpread"
        ]
      }
    },
    {
      "id": "ascot-vale-2br",
      "displayName": "Ascot Vale",
      "salSuburbs": [
        "Ascot Vale"
      ],
      "salCodes": [
        "20075"
      ],
      "greenspace": 8.7309,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 9.5499,
        "majorParkAccess": 8.0709,
        "natureCorridorAccess": 7.6735
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 90.7,
        "representedPopulation": 14770,
        "sampledMeshBlocks": 148
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-15",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 206.0,
          "majorPark": 725.0,
          "natureCorridor": 857.0
        },
        "nearbyOpenSpaces": [
          {
            "name": "Lower Maribyrnong Parklands - Maribyrnong",
            "areaHa": 33.02
          },
          {
            "name": "MARIBYRNONG RIVER",
            "areaHa": 26.4
          },
          {
            "name": "Fairbairn Park",
            "areaHa": 24.5
          },
          {
            "name": "Royal Park",
            "areaHa": 23.11
          },
          {
            "name": "Maribyrnong River",
            "areaHa": 18.93
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "Pipemakers, Burndap and Footscay Park Parklands (COM)",
            "areaHa": 44.1
          },
          {
            "name": "Lower Maribyrnong Parklands - Maribyrnong",
            "areaHa": 33.02
          },
          {
            "name": "MARIBYRNONG RIVER",
            "areaHa": 26.4
          },
          {
            "name": "Lower Maribyrnong Parklands",
            "areaHa": 20.98
          },
          {
            "name": "Maribyrnong River",
            "areaHa": 18.93
          }
        ],
        "residentialPopulationCoveragePct": 100.0,
        "componentSpread": 1.9,
        "reviewFlags": []
      }
    },
    {
      "id": "balaclava-2br",
      "displayName": "Balaclava",
      "salSuburbs": [
        "Balaclava"
      ],
      "salCodes": [
        "20105"
      ],
      "greenspace": 8.5109,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 10.0,
        "majorParkAccess": 8.2251,
        "natureCorridorAccess": 5.2171
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 98.8,
        "representedPopulation": 5252,
        "sampledMeshBlocks": 70
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-15",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 201.0,
          "majorPark": 752.0,
          "natureCorridor": 1339.0
        },
        "nearbyOpenSpaces": [
          {
            "name": "Alma Park",
            "areaHa": 9.15
          },
          {
            "name": "Elsternwick Park",
            "areaHa": 7.15
          },
          {
            "name": "St Kilda Botanical Gardens",
            "areaHa": 6.62
          },
          {
            "name": "St Kilda Marina & Surrounding Foreshore",
            "areaHa": 3.55
          },
          {
            "name": "Peanut Farm Reserve",
            "areaHa": 3.06
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "St Kilda Marina & Surrounding Foreshore",
            "areaHa": 3.55
          },
          {
            "name": "Elwood Canal Linear Reserve",
            "areaHa": 2.71
          },
          {
            "name": "Elwood Canal",
            "areaHa": 0.3
          }
        ],
        "residentialPopulationCoveragePct": 97.4,
        "componentSpread": 4.8,
        "reviewFlags": []
      }
    },
    {
      "id": "balwyn-2br",
      "displayName": "Balwyn",
      "salSuburbs": [
        "Balwyn"
      ],
      "salCodes": [
        "20123"
      ],
      "greenspace": 9.4966,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 10.0,
        "majorParkAccess": 8.9983,
        "natureCorridorAccess": 8.9855
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 96.9,
        "representedPopulation": 13441,
        "sampledMeshBlocks": 148
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-15",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 164.0,
          "majorPark": 477.0,
          "natureCorridor": 546.0
        },
        "nearbyOpenSpaces": [
          {
            "name": "Myrtle Park",
            "areaHa": 16.62
          },
          {
            "name": "Hays Paddock",
            "areaHa": 12.77
          },
          {
            "name": "Outer Circle Linear Park",
            "areaHa": 11.56
          },
          {
            "name": "Boroondara Sports and Aquatic Complex",
            "areaHa": 10.68
          },
          {
            "name": "Koonung Creek Reserve",
            "areaHa": 9.84
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "Outer Circle Linear Park",
            "areaHa": 11.56
          },
          {
            "name": "Koonung Creek Reserve",
            "areaHa": 9.84
          },
          {
            "name": "Beckett Park",
            "areaHa": 3.57
          },
          {
            "name": "Maranoa Gardens",
            "areaHa": 2.82
          },
          {
            "name": "Winfield Road Reserve",
            "areaHa": 2.78
          }
        ],
        "residentialPopulationCoveragePct": 100.0,
        "componentSpread": 1.0,
        "reviewFlags": []
      }
    },
    {
      "id": "balwyn-north-2br",
      "displayName": "Balwyn North",
      "salSuburbs": [
        "Balwyn North"
      ],
      "salCodes": [
        "20124"
      ],
      "greenspace": 9.0272,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 8.9364,
        "majorParkAccess": 9.6059,
        "natureCorridorAccess": 8.3863
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 84.9,
        "representedPopulation": 21193,
        "sampledMeshBlocks": 193
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-15",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 203.0,
          "majorPark": 330.0,
          "natureCorridor": 669.0
        },
        "nearbyOpenSpaces": [
          {
            "name": "Yarra Valley Parklands - Banyule",
            "areaHa": 72.75
          },
          {
            "name": "Yarra River",
            "areaHa": 53.42
          },
          {
            "name": "Koonung Creek Reserve",
            "areaHa": 41.94
          },
          {
            "name": "BULLEEN PARK",
            "areaHa": 35.07
          },
          {
            "name": "Yarra Valley Parklands - Manningham",
            "areaHa": 29.54
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "Yarra Valley Parklands",
            "areaHa": 99.58
          },
          {
            "name": "Yarra Valley Parklands - Banyule",
            "areaHa": 72.75
          },
          {
            "name": "Yarra River",
            "areaHa": 53.42
          },
          {
            "name": "Koonung Creek Reserve",
            "areaHa": 41.94
          },
          {
            "name": "Yarra Valley Parklands - Manningham",
            "areaHa": 29.54
          }
        ],
        "residentialPopulationCoveragePct": 99.5,
        "componentSpread": 1.2,
        "reviewFlags": []
      }
    },
    {
      "id": "bonbeach-2br",
      "displayName": "Bonbeach",
      "salSuburbs": [
        "Bonbeach"
      ],
      "salCodes": [
        "20278"
      ],
      "greenspace": 9.9764,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 10.0,
        "majorParkAccess": 9.9528,
        "natureCorridorAccess": 9.9528
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 100.0,
        "representedPopulation": 6500,
        "sampledMeshBlocks": 80
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-15",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 115.0,
          "majorPark": 189.0,
          "natureCorridor": 189.0
        },
        "nearbyOpenSpaces": [
          {
            "name": "Edithvale-Seaford, Centre Swamp, Chelsea (Drains)",
            "areaHa": 41.4
          },
          {
            "name": "Patterson River Frontage - Greater Dandenong",
            "areaHa": 27.83
          },
          {
            "name": "Chelsea Foreshore Reserve",
            "areaHa": 27.77
          },
          {
            "name": "Chelsea Bicentennial Park",
            "areaHa": 27.66
          },
          {
            "name": "Patterson River Frontage - Kingston",
            "areaHa": 14.78
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "Edithvale-Seaford, Centre Swamp, Chelsea (Drains)",
            "areaHa": 41.4
          },
          {
            "name": "Patterson River Frontage - Greater Dandenong",
            "areaHa": 27.83
          },
          {
            "name": "Chelsea Foreshore Reserve",
            "areaHa": 27.77
          },
          {
            "name": "Patterson River Frontage - Kingston",
            "areaHa": 14.78
          },
          {
            "name": "Bonbeach Sports Reserve",
            "areaHa": 11.92
          }
        ],
        "residentialPopulationCoveragePct": 94.8,
        "componentSpread": 0.0,
        "reviewFlags": []
      }
    },
    {
      "id": "box-hill-2br",
      "displayName": "Box Hill",
      "salSuburbs": [
        "Box Hill"
      ],
      "salCodes": [
        "20314"
      ],
      "greenspace": 9.6077,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 10.0,
        "majorParkAccess": 9.548,
        "natureCorridorAccess": 8.7163
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 97.9,
        "representedPopulation": 13579,
        "sampledMeshBlocks": 140
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-15",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 141.0,
          "majorPark": 390.0,
          "natureCorridor": 655.0
        },
        "nearbyOpenSpaces": [
          {
            "name": "Wattle Park",
            "areaHa": 38.46
          },
          {
            "name": "Surrey Park",
            "areaHa": 15.72
          },
          {
            "name": "RHL Sparks Reserve",
            "areaHa": 10.98
          },
          {
            "name": "Box Hill Gardens",
            "areaHa": 6.71
          },
          {
            "name": "Koonung Park",
            "areaHa": 6.69
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "Wattle Park",
            "areaHa": 93.48
          },
          {
            "name": "Blacks Walk",
            "areaHa": 6.63
          },
          {
            "name": "RHL Sparks Reserve",
            "areaHa": 6.06
          },
          {
            "name": "Kalang Park",
            "areaHa": 3.8
          },
          {
            "name": "Memorial Park",
            "areaHa": 3.55
          }
        ],
        "residentialPopulationCoveragePct": 94.6,
        "componentSpread": 1.3,
        "reviewFlags": []
      }
    },
    {
      "id": "upfield-corridor",
      "displayName": "Brunswick / Coburg",
      "salSuburbs": [
        "Brunswick",
        "Coburg"
      ],
      "salCodes": [
        "20361",
        "20596"
      ],
      "greenspace": 8.7255,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 9.3325,
        "majorParkAccess": 8.2062,
        "natureCorridorAccess": 7.987
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 88.7,
        "representedPopulation": 50038,
        "sampledMeshBlocks": 528
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-15",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 196.0,
          "majorPark": 700.0,
          "natureCorridor": 778.0
        },
        "nearbyOpenSpaces": [
          {
            "name": "Royal Park",
            "areaHa": 62.41
          },
          {
            "name": "Princes Park",
            "areaHa": 32.73
          },
          {
            "name": "Edgars Creek Parkland",
            "areaHa": 24.84
          },
          {
            "name": "Unnamed open space",
            "areaHa": 15.02
          },
          {
            "name": "Lake Reserve",
            "areaHa": 12.21
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "Edgars Creek Parkland",
            "areaHa": 24.84
          },
          {
            "name": "Lake Reserve",
            "areaHa": 12.21
          },
          {
            "name": "Unnamed open space",
            "areaHa": 8.17
          },
          {
            "name": "Royal Park Wetlands and Bushland",
            "areaHa": 7.67
          },
          {
            "name": "Cash Reserve",
            "areaHa": 6.82
          }
        ],
        "residentialPopulationCoveragePct": 97.2,
        "componentSpread": 1.3,
        "reviewFlags": []
      }
    },
    {
      "id": "burnley-2br",
      "displayName": "Burnley",
      "salSuburbs": [
        "Burnley"
      ],
      "salCodes": [
        "20418"
      ],
      "greenspace": 10.0,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 10.0,
        "majorParkAccess": 10.0,
        "natureCorridorAccess": 10.0
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 100.0,
        "representedPopulation": 782,
        "sampledMeshBlocks": 11
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-15",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 88.0,
          "majorPark": 213.0,
          "natureCorridor": 222.0
        },
        "nearbyOpenSpaces": [
          {
            "name": "Yarra River",
            "areaHa": 69.37
          },
          {
            "name": "Kevin Bartlett Reserve",
            "areaHa": 12.9
          },
          {
            "name": "Kooyong Park",
            "areaHa": 12.29
          },
          {
            "name": "Burnley Park",
            "areaHa": 8.53
          },
          {
            "name": "Yarra River Frontage - Yarra",
            "areaHa": 7.74
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "Yarra River",
            "areaHa": 69.37
          },
          {
            "name": "Yarra River Frontage - Yarra",
            "areaHa": 7.74
          },
          {
            "name": "Capital City Trail Linear Reserve (Main Yarra Trail)",
            "areaHa": 4.94
          },
          {
            "name": "Yarra River Frontage Park - Yarra",
            "areaHa": 4.43
          },
          {
            "name": "Pridmore Park",
            "areaHa": 3.04
          }
        ],
        "residentialPopulationCoveragePct": 98.5,
        "componentSpread": 0.0,
        "reviewFlags": []
      }
    },
    {
      "id": "inner-se-apartment-corridor",
      "displayName": "Carnegie / Oakleigh",
      "salSuburbs": [
        "Carnegie",
        "Murrumbeena",
        "Oakleigh"
      ],
      "salCodes": [
        "20498",
        "21849",
        "22000"
      ],
      "greenspace": 7.9774,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 8.332,
        "majorParkAccess": 8.5293,
        "natureCorridorAccess": 6.263
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 79.2,
        "representedPopulation": 36079,
        "sampledMeshBlocks": 400
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-15",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 242.0,
          "majorPark": 529.0,
          "natureCorridor": 1106.0
        },
        "nearbyOpenSpaces": [
          {
            "name": "Duncan MacKinnon Reserve",
            "areaHa": 8.61
          },
          {
            "name": "Packer Park",
            "areaHa": 7.88
          },
          {
            "name": "Scotchmans Creek Linear Reserve",
            "areaHa": 7.26
          },
          {
            "name": "Retarding Basins, Huntingdale Road",
            "areaHa": 6.88
          },
          {
            "name": "Bailey Reserve",
            "areaHa": 6.81
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "Scotchmans Creek Linear Reserve",
            "areaHa": 7.26
          },
          {
            "name": "Retarding Basins, Huntingdale Road",
            "areaHa": 6.88
          },
          {
            "name": "1m1 Monash Freeway, Chadstone",
            "areaHa": 4.25
          },
          {
            "name": "Outer Circle Linear Park",
            "areaHa": 3.34
          },
          {
            "name": "586-612 Huntingdale Road, Mount Waverley",
            "areaHa": 2.19
          }
        ],
        "residentialPopulationCoveragePct": 99.2,
        "componentSpread": 2.3,
        "reviewFlags": []
      }
    },
    {
      "id": "chelsea-2br",
      "displayName": "Chelsea",
      "salSuburbs": [
        "Chelsea"
      ],
      "salCodes": [
        "20537"
      ],
      "greenspace": 9.5369,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 9.3778,
        "majorParkAccess": 9.8049,
        "natureCorridorAccess": 9.5327
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 89.1,
        "representedPopulation": 8331,
        "sampledMeshBlocks": 109
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-15",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 177.0,
          "majorPark": 333.0,
          "natureCorridor": 432.0
        },
        "nearbyOpenSpaces": [
          {
            "name": "Edithvale - Seaford Wetlands (MWC drains)",
            "areaHa": 102.95
          },
          {
            "name": "Edithvale-Seaford, Centre Swamp, Chelsea (Drains)",
            "areaHa": 41.4
          },
          {
            "name": "Chelsea Foreshore Reserve",
            "areaHa": 27.77
          },
          {
            "name": "Chelsea Bicentennial Park",
            "areaHa": 27.66
          },
          {
            "name": "Bonbeach Sports Reserve",
            "areaHa": 11.92
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "Edithvale - Seaford Wetlands (MWC drains)",
            "areaHa": 102.95
          },
          {
            "name": "Edithvale-Seaford, Centre Swamp, Chelsea (Drains)",
            "areaHa": 41.4
          },
          {
            "name": "Chelsea Foreshore Reserve",
            "areaHa": 27.77
          },
          {
            "name": "Bonbeach Sports Reserve",
            "areaHa": 11.92
          },
          {
            "name": "Edithvale- Seaford wetlands CL easement, Chelsea Heights",
            "areaHa": 9.23
          }
        ],
        "residentialPopulationCoveragePct": 99.8,
        "componentSpread": 0.4,
        "reviewFlags": []
      }
    },
    {
      "id": "clifton-hill-2br",
      "displayName": "Clifton Hill",
      "salSuburbs": [
        "Clifton Hill"
      ],
      "salCodes": [
        "20574"
      ],
      "greenspace": 9.9123,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 10,
        "majorParkAccess": 10,
        "natureCorridorAccess": 9.5614
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 100,
        "representedPopulation": 6532,
        "sampledMeshBlocks": 74
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-16",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 154,
          "majorPark": 183,
          "natureCorridor": 312
        },
        "nearbyOpenSpaces": [
          {
            "name": "Yarra Bend Park - Boroondara",
            "areaHa": 86.53
          },
          {
            "name": "Yarra Bend Park - Yarra",
            "areaHa": 82.02
          },
          {
            "name": "Yarra River",
            "areaHa": 80.32
          },
          {
            "name": "Edinburgh Gardens",
            "areaHa": 10.66
          },
          {
            "name": "Hall Reserve Park",
            "areaHa": 9.98
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "Yarra Bend Park",
            "areaHa": 249.91
          },
          {
            "name": "Yarra Bend Park - Boroondara",
            "areaHa": 86.53
          },
          {
            "name": "Yarra River",
            "areaHa": 80.32
          },
          {
            "name": "Yarra Bend Park - Yarra",
            "areaHa": 45.78
          },
          {
            "name": "Coulson and Knotts Parkland",
            "areaHa": 3.75
          }
        ],
        "residentialPopulationCoveragePct": 98.9,
        "componentSpread": 0.4,
        "reviewFlags": []
      }
    },
    {
      "id": "inner-collingwood-2br",
      "displayName": "Collingwood",
      "salSuburbs": [
        "Collingwood"
      ],
      "salCodes": [
        "20616"
      ],
      "greenspace": 8.8669,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 9.6972,
        "majorParkAccess": 8.4764,
        "natureCorridorAccess": 7.3769
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 92.1,
        "representedPopulation": 8354,
        "sampledMeshBlocks": 81
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-15",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 248.0,
          "majorPark": 668.0,
          "natureCorridor": 948.0
        },
        "nearbyOpenSpaces": [
          {
            "name": "Yarra River",
            "areaHa": 79.31
          },
          {
            "name": "Yarra Bend Park - Yarra",
            "areaHa": 56.33
          },
          {
            "name": "Yarra Bend Park - Boroondara",
            "areaHa": 31.4
          },
          {
            "name": "Fitzroy Gardens",
            "areaHa": 26.28
          },
          {
            "name": "Yarra Park",
            "areaHa": 25.46
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "Yarra Bend Park",
            "areaHa": 191.95
          },
          {
            "name": "Yarra River",
            "areaHa": 79.31
          },
          {
            "name": "Yarra Bend Park - Boroondara",
            "areaHa": 31.4
          },
          {
            "name": "Yarra Bend Park - Yarra",
            "areaHa": 25.97
          },
          {
            "name": "Coulson and Knotts Parkland",
            "areaHa": 3.75
          }
        ],
        "residentialPopulationCoveragePct": 91.0,
        "componentSpread": 2.3,
        "reviewFlags": []
      }
    },
    {
      "id": "craigieburn-townhouse",
      "displayName": "Craigieburn",
      "salSuburbs": [
        "Craigieburn"
      ],
      "salCodes": [
        "20661"
      ],
      "greenspace": 9.4502,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 9.5945,
        "majorParkAccess": 9.1799,
        "natureCorridorAccess": 9.4949
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 91.1,
        "representedPopulation": 64946,
        "sampledMeshBlocks": 510
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-15",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 115.0,
          "majorPark": 394.0,
          "natureCorridor": 294.0
        },
        "nearbyOpenSpaces": [
          {
            "name": "Craigieburn Grassland",
            "areaHa": 343.78
          },
          {
            "name": "Unnamed open space",
            "areaHa": 146.33
          },
          {
            "name": "Mount Ridley Grasslands",
            "areaHa": 142.54
          },
          {
            "name": "Malcolm Creek Linear Park",
            "areaHa": 56.9
          },
          {
            "name": "Greenvale Reservoir Park",
            "areaHa": 13.69
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "galgi ngarrk (Craigieburn Grassland Nature Conservation Reserve)",
            "areaHa": 344.02
          },
          {
            "name": "Craigieburn Grassland",
            "areaHa": 343.78
          },
          {
            "name": "Mount Ridley Grasslands",
            "areaHa": 142.54
          },
          {
            "name": "Mount Ridley Nature Conservation Reserve",
            "areaHa": 132.29
          },
          {
            "name": "marram baba Merri Creek Regional Parklands (Melbourne Water)",
            "areaHa": 96.12
          }
        ],
        "residentialPopulationCoveragePct": 99.6,
        "componentSpread": 0.4,
        "reviewFlags": []
      }
    },
    {
      "id": "cremorne-2br",
      "displayName": "Cremorne",
      "salSuburbs": [
        "Cremorne"
      ],
      "salCodes": [
        "20670"
      ],
      "greenspace": 9.8213,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 10.0,
        "majorParkAccess": 9.6805,
        "natureCorridorAccess": 9.5857
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 100.0,
        "representedPopulation": 1540,
        "sampledMeshBlocks": 17
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-15",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 124.0,
          "majorPark": 144.0,
          "natureCorridor": 252.0
        },
        "nearbyOpenSpaces": [
          {
            "name": "Fawkner Park",
            "areaHa": 41.19
          },
          {
            "name": "Royal Botanic Gardens - Melbourne",
            "areaHa": 37.96
          },
          {
            "name": "Yarra Park",
            "areaHa": 27.74
          },
          {
            "name": "Fitzroy Gardens",
            "areaHa": 26.28
          },
          {
            "name": "Yarra River",
            "areaHa": 16.11
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "Yarra River",
            "areaHa": 16.11
          },
          {
            "name": "Yarra River Frontage - Yarra",
            "areaHa": 7.74
          },
          {
            "name": "Yarra River Reserve",
            "areaHa": 2.21
          },
          {
            "name": "Yarra River Frontage - Stonnington",
            "areaHa": 1.59
          },
          {
            "name": "Stapely Parade Reserve",
            "areaHa": 0.64
          }
        ],
        "residentialPopulationCoveragePct": 71.4,
        "componentSpread": 0.4,
        "reviewFlags": [
          "lowResidentialPopulationCoverage"
        ]
      }
    },
    {
      "id": "doncaster-villa",
      "displayName": "Doncaster",
      "salSuburbs": [
        "Doncaster"
      ],
      "salCodes": [
        "20771"
      ],
      "greenspace": 9.6298,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 10,
        "majorParkAccess": 9.3989,
        "natureCorridorAccess": 9.0508
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 100,
        "representedPopulation": 24567,
        "sampledMeshBlocks": 228
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-16",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 132,
          "majorPark": 368,
          "natureCorridor": 499
        },
        "nearbyOpenSpaces": [
          {
            "name": "RUFFEY LAKE PARK",
            "areaHa": 65.47
          },
          {
            "name": "Koonung Creek Reserve",
            "areaHa": 40.98
          },
          {
            "name": "KOONUNG CREEK LINEAR PARK",
            "areaHa": 21.72
          },
          {
            "name": "RIESCHIECKS RESERVE",
            "areaHa": 12.64
          },
          {
            "name": "Elgar Park",
            "areaHa": 10.32
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "RUFFEY LAKE PARK",
            "areaHa": 65.47
          },
          {
            "name": "Koonung Creek Reserve",
            "areaHa": 40.98
          },
          {
            "name": "KOONUNG CREEK LINEAR PARK",
            "areaHa": 21.72
          },
          {
            "name": "Retarding Basins, Wetherby Road (Doncaster)",
            "areaHa": 8.97
          },
          {
            "name": "Eram Park",
            "areaHa": 7.85
          }
        ],
        "residentialPopulationCoveragePct": 98.2,
        "componentSpread": 0.9,
        "reviewFlags": []
      }
    },
    {
      "id": "donnybrook-house-land",
      "displayName": "Donnybrook",
      "salSuburbs": [
        "Donnybrook"
      ],
      "salCodes": [
        "20773"
      ],
      "greenspace": 3.9739,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 2.7858,
        "majorParkAccess": 5.1589,
        "natureCorridorAccess": 5.1666
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 26.5,
        "representedPopulation": 2082,
        "sampledMeshBlocks": 21
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-15",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 1367.0,
          "majorPark": 1369.0,
          "natureCorridor": 1367.0
        },
        "nearbyOpenSpaces": [
          {
            "name": "Unnamed open space",
            "areaHa": 14.47
          },
          {
            "name": "John Laffen Memorial Reserve",
            "areaHa": 6.38
          },
          {
            "name": "Donnybrook Reserve",
            "areaHa": 3.92
          },
          {
            "name": "Merri Creek Frontage - Hume",
            "areaHa": 2.42
          },
          {
            "name": "Kalkallo Creek Frontage",
            "areaHa": 1.22
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "marram baba Merri Creek Regional Parklands (Melbourne Water)",
            "areaHa": 57.17
          },
          {
            "name": "Unnamed open space",
            "areaHa": 14.47
          },
          {
            "name": "Merri Creek Frontage - Hume",
            "areaHa": 2.42
          },
          {
            "name": "Kalkallo Creek Frontage",
            "areaHa": 1.22
          }
        ],
        "residentialPopulationCoveragePct": 99.1,
        "componentSpread": 2.4,
        "reviewFlags": []
      }
    },
    {
      "id": "elwood-2br",
      "displayName": "Elwood",
      "salSuburbs": [
        "Elwood"
      ],
      "salCodes": [
        "20867"
      ],
      "greenspace": 9.8636,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 10.0,
        "majorParkAccess": 9.7773,
        "natureCorridorAccess": 9.6518
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 98.9,
        "representedPopulation": 15086,
        "sampledMeshBlocks": 213
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-15",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 138.0,
          "majorPark": 282.0,
          "natureCorridor": 280.0
        },
        "nearbyOpenSpaces": [
          {
            "name": "Elsternwick Park",
            "areaHa": 22.81
          },
          {
            "name": "St Kilda Marina & Surrounding Foreshore",
            "areaHa": 16.28
          },
          {
            "name": "Elwood Park",
            "areaHa": 14.4
          },
          {
            "name": "Brighton Foreshore Reserve",
            "areaHa": 9.74
          },
          {
            "name": "Elwood Foreshore Reserve",
            "areaHa": 9.59
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "St Kilda Marina & Surrounding Foreshore",
            "areaHa": 16.28
          },
          {
            "name": "Brighton Foreshore Reserve",
            "areaHa": 9.74
          },
          {
            "name": "Elwood Foreshore Reserve",
            "areaHa": 9.59
          },
          {
            "name": "Elwood Canal Linear Reserve",
            "areaHa": 2.71
          },
          {
            "name": "Elwood Canal",
            "areaHa": 0.3
          }
        ],
        "residentialPopulationCoveragePct": 99.6,
        "componentSpread": 0.3,
        "reviewFlags": []
      }
    },
    {
      "id": "footscray-station-2br",
      "displayName": "Footscray",
      "salSuburbs": [
        "Footscray"
      ],
      "salCodes": [
        "20935"
      ],
      "greenspace": 9.3249,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 9.4341,
        "majorParkAccess": 9.6641,
        "natureCorridorAccess": 8.5429
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 89.6,
        "representedPopulation": 16018,
        "sampledMeshBlocks": 189
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-15",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 202.0,
          "majorPark": 342.0,
          "natureCorridor": 568.0
        },
        "nearbyOpenSpaces": [
          {
            "name": "Maribyrnong River",
            "areaHa": 56.35
          },
          {
            "name": "Lower Maribyrnong Parklands - Maribyrnong",
            "areaHa": 33.02
          },
          {
            "name": "MARIBYRNONG RIVER",
            "areaHa": 26.4
          },
          {
            "name": "Fairbairn Park",
            "areaHa": 24.25
          },
          {
            "name": "Yarra River",
            "areaHa": 17.92
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "Maribyrnong River",
            "areaHa": 56.35
          },
          {
            "name": "Pipemakers, Burndap and Footscay Park Parklands (COM)",
            "areaHa": 44.1
          },
          {
            "name": "Lower Maribyrnong Parklands - Maribyrnong",
            "areaHa": 33.02
          },
          {
            "name": "MARIBYRNONG RIVER",
            "areaHa": 26.4
          },
          {
            "name": "Lower Maribyrnong Parklands",
            "areaHa": 20.98
          }
        ],
        "residentialPopulationCoveragePct": 93.5,
        "componentSpread": 1.1,
        "reviewFlags": []
      }
    },
    {
      "id": "glen-waverley-2br",
      "displayName": "Glen Waverley",
      "salSuburbs": [
        "Glen Waverley"
      ],
      "salCodes": [
        "21013"
      ],
      "greenspace": 9.3397,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 10.0,
        "majorParkAccess": 8.1961,
        "natureCorridorAccess": 9.4042
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 98.7,
        "representedPopulation": 41498,
        "sampledMeshBlocks": 383
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-15",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 143.0,
          "majorPark": 717.0,
          "natureCorridor": 398.0
        },
        "nearbyOpenSpaces": [
          {
            "name": "Dandenong Valley Parklands - Knox",
            "areaHa": 335.38
          },
          {
            "name": "Dandenong Valley Parklands - Monash",
            "areaHa": 195.69
          },
          {
            "name": "Lookout Trail Park",
            "areaHa": 22.99
          },
          {
            "name": "East Burwood Reserve",
            "areaHa": 17.15
          },
          {
            "name": "Central Reserve",
            "areaHa": 16.51
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "Dandenong Valley Parklands",
            "areaHa": 552.09
          },
          {
            "name": "Dandenong Valley Parklands - Knox",
            "areaHa": 334.97
          },
          {
            "name": "Dandenong Valley Parklands - Monash",
            "areaHa": 195.69
          },
          {
            "name": "Lookout Trail Park",
            "areaHa": 22.99
          },
          {
            "name": "Valley Creek",
            "areaHa": 15.2
          }
        ],
        "residentialPopulationCoveragePct": 97.3,
        "componentSpread": 1.8,
        "reviewFlags": []
      }
    },
    {
      "id": "hawthorn-2br",
      "displayName": "Hawthorn",
      "salSuburbs": [
        "Hawthorn"
      ],
      "salCodes": [
        "21152"
      ],
      "greenspace": 9.1065,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 9.8927,
        "majorParkAccess": 7.8277,
        "natureCorridorAccess": 9.0594
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 94.0,
        "representedPopulation": 21232,
        "sampledMeshBlocks": 281
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-15",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 149.0,
          "majorPark": 716.0,
          "natureCorridor": 478.0
        },
        "nearbyOpenSpaces": [
          {
            "name": "Yarra River",
            "areaHa": 93.87
          },
          {
            "name": "Yarra Bend Park - Boroondara",
            "areaHa": 42.99
          },
          {
            "name": "Kevin Bartlett Reserve",
            "areaHa": 12.9
          },
          {
            "name": "Kooyong Park",
            "areaHa": 12.29
          },
          {
            "name": "Burnley Park",
            "areaHa": 8.53
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "Yarra Bend Park",
            "areaHa": 198.46
          },
          {
            "name": "Yarra River",
            "areaHa": 93.87
          },
          {
            "name": "Yarra Bend Park - Boroondara",
            "areaHa": 42.99
          },
          {
            "name": "Capital City Trail Linear Reserve (Main Yarra Trail)",
            "areaHa": 4.94
          },
          {
            "name": "Yarra River Frontage Park - Yarra",
            "areaHa": 4.84
          }
        ],
        "residentialPopulationCoveragePct": 95.1,
        "componentSpread": 2.1,
        "reviewFlags": []
      }
    },
    {
      "id": "ivanhoe-house",
      "displayName": "Ivanhoe",
      "salSuburbs": [
        "Ivanhoe"
      ],
      "salCodes": [
        "21246"
      ],
      "greenspace": 9.3787,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 10.0,
        "majorParkAccess": 8.8894,
        "natureCorridorAccess": 8.5596
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 96.3,
        "representedPopulation": 13216,
        "sampledMeshBlocks": 150
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-18",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 134,
          "majorPark": 523,
          "natureCorridor": 564
        },
        "nearbyOpenSpaces": [
          {
            "name": "Yarra River",
            "areaHa": 78.61
          },
          {
            "name": "Yarra Valley Parklands - Banyule",
            "areaHa": 72.75
          },
          {
            "name": "Wilson Reserve",
            "areaHa": 25.28
          },
          {
            "name": "Darebin Parklands",
            "areaHa": 19.97
          },
          {
            "name": "Burke Road Billabong Reserve, Kew East",
            "areaHa": 9.68
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "Yarra River",
            "areaHa": 78.61
          },
          {
            "name": "Yarra Valley Parklands - Banyule",
            "areaHa": 72.75
          },
          {
            "name": "Yarra Valley Parklands",
            "areaHa": 72.13
          },
          {
            "name": "Darebin Parklands",
            "areaHa": 19.82
          },
          {
            "name": "Burke Road Billabong Reserve, Kew East",
            "areaHa": 9.68
          }
        ],
        "residentialPopulationCoveragePct": 98.8,
        "componentSpread": 1.4,
        "reviewFlags": []
      }
    },
    {
      "id": "inner-lowcar-benchmark",
      "displayName": "Kensington / Flemington",
      "salSuburbs": [
        "Kensington",
        "Flemington"
      ],
      "salCodes": [
        "21327",
        "20929"
      ],
      "greenspace": 9.5112,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 10.0,
        "majorParkAccess": 9.1499,
        "natureCorridorAccess": 8.8312
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 100.0,
        "representedPopulation": 17309,
        "sampledMeshBlocks": 203
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-15",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 83.0,
          "majorPark": 433.0,
          "natureCorridor": 584.0
        },
        "nearbyOpenSpaces": [
          {
            "name": "Royal Park",
            "areaHa": 80.59
          },
          {
            "name": "Maribyrnong River",
            "areaHa": 52.73
          },
          {
            "name": "Lower Maribyrnong Parklands - Maribyrnong",
            "areaHa": 33.02
          },
          {
            "name": "MARIBYRNONG RIVER",
            "areaHa": 26.4
          },
          {
            "name": "Fairbairn Park",
            "areaHa": 24.25
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "Maribyrnong River",
            "areaHa": 52.73
          },
          {
            "name": "Pipemakers, Burndap and Footscay Park Parklands (COM)",
            "areaHa": 44.1
          },
          {
            "name": "Lower Maribyrnong Parklands - Maribyrnong",
            "areaHa": 33.02
          },
          {
            "name": "MARIBYRNONG RIVER",
            "areaHa": 26.4
          },
          {
            "name": "Lower Maribyrnong Parklands",
            "areaHa": 20.98
          }
        ],
        "residentialPopulationCoveragePct": 97.4,
        "componentSpread": 1.2,
        "reviewFlags": []
      }
    },
    {
      "id": "kew-2br",
      "displayName": "Kew",
      "salSuburbs": [
        "Kew"
      ],
      "salCodes": [
        "21336"
      ],
      "greenspace": 9.0203,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 9.1368,
        "majorParkAccess": 8.9819,
        "natureCorridorAccess": 8.7866
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 86.8,
        "representedPopulation": 24082,
        "sampledMeshBlocks": 271
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-15",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 192.0,
          "majorPark": 452.0,
          "natureCorridor": 451.0
        },
        "nearbyOpenSpaces": [
          {
            "name": "Yarra Bend Park - Boroondara",
            "areaHa": 90.15
          },
          {
            "name": "Yarra Bend Park - Yarra",
            "areaHa": 82.02
          },
          {
            "name": "Yarra River",
            "areaHa": 80.56
          },
          {
            "name": "Wilson Reserve",
            "areaHa": 25.28
          },
          {
            "name": "Darebin Parklands",
            "areaHa": 19.76
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "Yarra Bend Park",
            "areaHa": 252.42
          },
          {
            "name": "Yarra Bend Park - Boroondara",
            "areaHa": 90.15
          },
          {
            "name": "Yarra River",
            "areaHa": 80.56
          },
          {
            "name": "Yarra Bend Park - Yarra",
            "areaHa": 45.78
          },
          {
            "name": "Darebin Parklands",
            "areaHa": 19.76
          }
        ],
        "residentialPopulationCoveragePct": 100.0,
        "componentSpread": 0.4,
        "reviewFlags": []
      }
    },
    {
      "id": "malvern-2br",
      "displayName": "Malvern",
      "salSuburbs": [
        "Malvern"
      ],
      "salCodes": [
        "21586"
      ],
      "greenspace": 8.0047,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 9.1489,
        "majorParkAccess": 7.8208,
        "natureCorridorAccess": 5.4202
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 86.9,
        "representedPopulation": 9751,
        "sampledMeshBlocks": 121
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-15",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 230.0,
          "majorPark": 822.0,
          "natureCorridor": 1269.0
        },
        "nearbyOpenSpaces": [
          {
            "name": "Yarra River",
            "areaHa": 67.24
          },
          {
            "name": "Caulfield Park (Recreation)",
            "areaHa": 18.73
          },
          {
            "name": "Kooyong Park",
            "areaHa": 12.29
          },
          {
            "name": "Patterson Reserve",
            "areaHa": 7.63
          },
          {
            "name": "Central Park",
            "areaHa": 7.47
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "Yarra River",
            "areaHa": 67.24
          },
          {
            "name": "Capital City Trail Linear Reserve (Main Yarra Trail)",
            "areaHa": 2.54
          },
          {
            "name": "Gardiners Creek Frontage - Boroondara",
            "areaHa": 1.22
          },
          {
            "name": "Gardiners Creek Trail",
            "areaHa": 1.03
          },
          {
            "name": "Gardiners Creek Frontage - Stonnington",
            "areaHa": 1.03
          }
        ],
        "residentialPopulationCoveragePct": 100.0,
        "componentSpread": 3.7,
        "reviewFlags": []
      }
    },
    {
      "id": "mckinnon-villa",
      "displayName": "McKinnon",
      "salSuburbs": [
        "McKinnon"
      ],
      "salCodes": [
        "21629"
      ],
      "greenspace": 9.1869,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 9.9589,
        "majorParkAccess": 7.7001,
        "natureCorridorAccess": 9.4869
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 94.6,
        "representedPopulation": 6715,
        "sampledMeshBlocks": 65
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-15",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 170.0,
          "majorPark": 925.0,
          "natureCorridor": 448.0
        },
        "nearbyOpenSpaces": [
          {
            "name": "Dendy Park Athletics Field",
            "areaHa": 26.83
          },
          {
            "name": "Princes Park",
            "areaHa": 10.19
          },
          {
            "name": "Duncan MacKinnon Reserve",
            "areaHa": 8.61
          },
          {
            "name": "Packer Park",
            "areaHa": 7.88
          },
          {
            "name": "Bailey Reserve",
            "areaHa": 7.05
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "Elster Creek Trail",
            "areaHa": 0.88
          },
          {
            "name": "McKinnon Reserve",
            "areaHa": 0.07
          },
          {
            "name": "Hall Street Park",
            "areaHa": 0.06
          }
        ],
        "residentialPopulationCoveragePct": 97.6,
        "componentSpread": 2.3,
        "reviewFlags": []
      }
    },
    {
      "id": "mentone-2br",
      "displayName": "Mentone",
      "salSuburbs": [
        "Mentone"
      ],
      "salCodes": [
        "21648"
      ],
      "greenspace": 8.4536,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 10.0,
        "majorParkAccess": 7.281,
        "natureCorridorAccess": 6.3464
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 96.9,
        "representedPopulation": 12989,
        "sampledMeshBlocks": 171
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-15",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 169.0,
          "majorPark": 986.0,
          "natureCorridor": 1169.0
        },
        "nearbyOpenSpaces": [
          {
            "name": "Beach Park - Black Rock to Beaumaris",
            "areaHa": 51.42
          },
          {
            "name": "Kingston Heath Reserve",
            "areaHa": 29.92
          },
          {
            "name": "Mordialloc Mentone Beach Park",
            "areaHa": 29.64
          },
          {
            "name": "Walter Galt Reserve",
            "areaHa": 7.37
          },
          {
            "name": "Cheltenham Recreation Reserve",
            "areaHa": 5.69
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "Beach Park - Black Rock to Beaumaris",
            "areaHa": 51.42
          },
          {
            "name": "Mordialloc Mentone Beach Park",
            "areaHa": 29.64
          },
          {
            "name": "Beaumaris Motor Yacht Squadron",
            "areaHa": 1.12
          }
        ],
        "residentialPopulationCoveragePct": 98.4,
        "componentSpread": 3.7,
        "reviewFlags": []
      }
    },
    {
      "id": "middle-park-2br",
      "displayName": "Middle Park",
      "salSuburbs": [
        "Middle Park"
      ],
      "salCodes": [
        "21677"
      ],
      "greenspace": 9.9742,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 10.0,
        "majorParkAccess": 10.0,
        "natureCorridorAccess": 9.8712
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 100.0,
        "representedPopulation": 3994,
        "sampledMeshBlocks": 52
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-15",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 140.0,
          "majorPark": 182.0,
          "natureCorridor": 337.0
        },
        "nearbyOpenSpaces": [
          {
            "name": "Albert Park",
            "areaHa": 120.81
          },
          {
            "name": "Albert Park Lake",
            "areaHa": 48.92
          },
          {
            "name": "St Kilda Pier and Breakwater",
            "areaHa": 48.3
          },
          {
            "name": "Port Melb, Albert & Middle Parks F/shore",
            "areaHa": 16.76
          },
          {
            "name": "St Kilda Catani Gardens & Surrounding Foreshore",
            "areaHa": 14.16
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "Albert Park Lake",
            "areaHa": 48.92
          },
          {
            "name": "St Kilda Pier and Breakwater",
            "areaHa": 48.3
          },
          {
            "name": "Port Melb, Albert & Middle Parks F/shore",
            "areaHa": 15.69
          },
          {
            "name": "St Kilda Catani Gardens & Surrounding Foreshore",
            "areaHa": 14.16
          },
          {
            "name": "St Kilda Marina & Surrounding Foreshore",
            "areaHa": 2.8
          }
        ],
        "residentialPopulationCoveragePct": 99.9,
        "componentSpread": 0.1,
        "reviewFlags": []
      }
    },
    {
      "id": "frankston-middle-ring",
      "displayName": "Moorabbin / Cheltenham",
      "salSuburbs": [
        "Moorabbin",
        "Highett",
        "Cheltenham"
      ],
      "salCodes": [
        "21746",
        "21185",
        "20539"
      ],
      "greenspace": 8.5994,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 9.5245,
        "majorParkAccess": 8.8742,
        "natureCorridorAccess": 5.8746
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 90.5,
        "representedPopulation": 41776,
        "sampledMeshBlocks": 438
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-15",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 191.0,
          "majorPark": 497.0,
          "natureCorridor": 1270.0
        },
        "nearbyOpenSpaces": [
          {
            "name": "Beach Park - Black Rock to Beaumaris",
            "areaHa": 51.42
          },
          {
            "name": "Kingston Heath Reserve",
            "areaHa": 29.92
          },
          {
            "name": "Dendy Park Athletics Field",
            "areaHa": 26.83
          },
          {
            "name": "Turner Road Reserve AKA: Highett Reserve",
            "areaHa": 12.87
          },
          {
            "name": "Moorabbin Reserve",
            "areaHa": 10.64
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "Sandbelt Parklands",
            "areaHa": 72.84
          },
          {
            "name": "Beach Park - Black Rock to Beaumaris",
            "areaHa": 51.42
          },
          {
            "name": "Karkarook Park",
            "areaHa": 37.98
          },
          {
            "name": "Merindah Park",
            "areaHa": 2.6
          },
          {
            "name": "Long Hollow Heathland - Beaumaris",
            "areaHa": 2.35
          }
        ],
        "residentialPopulationCoveragePct": 98.9,
        "componentSpread": 3.6,
        "reviewFlags": []
      }
    },
    {
      "id": "north-melbourne-2br",
      "displayName": "North Melbourne",
      "salSuburbs": [
        "North Melbourne"
      ],
      "salCodes": [
        "21966"
      ],
      "greenspace": 9.196,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 10.0,
        "majorParkAccess": 9.1075,
        "natureCorridorAccess": 7.3187
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 100.0,
        "representedPopulation": 14551,
        "sampledMeshBlocks": 138
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-15",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 141.0,
          "majorPark": 578.0,
          "natureCorridor": 958.0
        },
        "nearbyOpenSpaces": [
          {
            "name": "Royal Park",
            "areaHa": 81.13
          },
          {
            "name": "Princes Park",
            "areaHa": 29.33
          },
          {
            "name": "Royal Park Ovals",
            "areaHa": 11.28
          },
          {
            "name": "J J Holland Park",
            "areaHa": 10.2
          },
          {
            "name": "Unnamed open space",
            "areaHa": 9.25
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "Yarra River",
            "areaHa": 8.98
          },
          {
            "name": "Royal Park Wetlands and Bushland",
            "areaHa": 7.67
          },
          {
            "name": "Moonee Ponds Creek Trail",
            "areaHa": 3.77
          },
          {
            "name": "Moonee Ponds Creek & Trail",
            "areaHa": 3.15
          },
          {
            "name": "Moonee Ponds Creek",
            "areaHa": 1.75
          }
        ],
        "residentialPopulationCoveragePct": 100.0,
        "componentSpread": 2.7,
        "reviewFlags": []
      }
    },
    {
      "id": "northcote-2br",
      "displayName": "Northcote",
      "salSuburbs": [
        "Northcote"
      ],
      "salCodes": [
        "21971"
      ],
      "greenspace": 9.5873,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 10.0,
        "majorParkAccess": 9.6792,
        "natureCorridorAccess": 8.4176
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 96.0,
        "representedPopulation": 25110,
        "sampledMeshBlocks": 287
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-15",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 174.0,
          "majorPark": 319.0,
          "natureCorridor": 635.0
        },
        "nearbyOpenSpaces": [
          {
            "name": "Yarra Bend Park - Yarra",
            "areaHa": 82.02
          },
          {
            "name": "Yarra River",
            "areaHa": 78.42
          },
          {
            "name": "Yarra Bend Park - Boroondara",
            "areaHa": 44.63
          },
          {
            "name": "John Cain Memorial Park D.I.S.C.",
            "areaHa": 17.27
          },
          {
            "name": "All Nations Park",
            "areaHa": 13.9
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "Yarra Bend Park",
            "areaHa": 173.23
          },
          {
            "name": "Yarra River",
            "areaHa": 78.42
          },
          {
            "name": "Yarra Bend Park - Yarra",
            "areaHa": 45.78
          },
          {
            "name": "Yarra Bend Park - Boroondara",
            "areaHa": 44.63
          },
          {
            "name": "Merri Creek Frontage - Darebin",
            "areaHa": 7.55
          }
        ],
        "residentialPopulationCoveragePct": 100.0,
        "componentSpread": 1.6,
        "reviewFlags": []
      }
    },
    {
      "id": "northwest-villa-corridor",
      "displayName": "Pascoe Vale / Glenroy",
      "salSuburbs": [
        "Pascoe Vale",
        "Glenroy"
      ],
      "salCodes": [
        "22041",
        "21047"
      ],
      "greenspace": 9.2315,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 9.587,
        "majorParkAccess": 8.8997,
        "natureCorridorAccess": 8.8403
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 91.1,
        "representedPopulation": 41620,
        "sampledMeshBlocks": 395
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-15",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 178.0,
          "majorPark": 528.0,
          "natureCorridor": 524.0
        },
        "nearbyOpenSpaces": [
          {
            "name": "Unnamed open space",
            "areaHa": 56.4
          },
          {
            "name": "Moonee Ponds Creek Parkland and Jacana Reserve",
            "areaHa": 41.4
          },
          {
            "name": "Boeing Reserve",
            "areaHa": 33.01
          },
          {
            "name": "Moonee Ponds Creek Parkland",
            "areaHa": 28.73
          },
          {
            "name": "Northcorp Boulevard Reserve",
            "areaHa": 23.56
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "Unnamed open space",
            "areaHa": 47.2
          },
          {
            "name": "Moonee Ponds Creek Parkland and Jacana Reserve",
            "areaHa": 41.4
          },
          {
            "name": "Moonee Ponds Creek Parkland",
            "areaHa": 28.73
          },
          {
            "name": "Northcorp Boulevard Reserve",
            "areaHa": 22.46
          },
          {
            "name": "Gowanbrae Retarding Basin",
            "areaHa": 19.68
          }
        ],
        "residentialPopulationCoveragePct": 99.2,
        "componentSpread": 0.7,
        "reviewFlags": []
      }
    },
    {
      "id": "preston-villa",
      "displayName": "Preston",
      "salSuburbs": [
        "Preston"
      ],
      "salCodes": [
        "22121"
      ],
      "greenspace": 8.6437,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 9.5651,
        "majorParkAccess": 7.1168,
        "natureCorridorAccess": 8.6308
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 90.9,
        "representedPopulation": 33169,
        "sampledMeshBlocks": 348
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-15",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 203.0,
          "majorPark": 939.0,
          "natureCorridor": 650.0
        },
        "nearbyOpenSpaces": [
          {
            "name": "Edgars Creek Parkland",
            "areaHa": 24.84
          },
          {
            "name": "Darebin Creek Corridor (Near Autumndale Av)",
            "areaHa": 24.54
          },
          {
            "name": "Olympic Park",
            "areaHa": 22.4
          },
          {
            "name": "John Cain Memorial Park D.I.S.C.",
            "areaHa": 17.27
          },
          {
            "name": "K.P. Hardiman Reserve",
            "areaHa": 14.96
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "Edgars Creek Parkland",
            "areaHa": 24.84
          },
          {
            "name": "Darebin Creek Corridor (Near Autumndale Av)",
            "areaHa": 24.54
          },
          {
            "name": "Darebin Creek Reserve (Bell to Southern)",
            "areaHa": 13.55
          },
          {
            "name": "Lake Reserve",
            "areaHa": 12.21
          },
          {
            "name": "Darebin Creek Corridor (Tyler St/Wood St)",
            "areaHa": 12.14
          }
        ],
        "residentialPopulationCoveragePct": 100.0,
        "componentSpread": 2.4,
        "reviewFlags": []
      }
    },
    {
      "id": "northern-rail-value",
      "displayName": "Reservoir",
      "salSuburbs": [
        "Reservoir"
      ],
      "salCodes": [
        "22161"
      ],
      "greenspace": 9.455,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 9.8501,
        "majorParkAccess": 8.7616,
        "natureCorridorAccess": 9.5075
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 93.6,
        "representedPopulation": 50775,
        "sampledMeshBlocks": 539
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-15",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 169.0,
          "majorPark": 499.0,
          "natureCorridor": 314.0
        },
        "nearbyOpenSpaces": [
          {
            "name": "Bundoora Parkland",
            "areaHa": 108.8
          },
          {
            "name": "Galada Tamboore, Merri Creek",
            "areaHa": 66.31
          },
          {
            "name": "Cooper Street Grasslands - Whittlesea",
            "areaHa": 40.12
          },
          {
            "name": "Unnamed open space",
            "areaHa": 36.43
          },
          {
            "name": "Edgars Creek Parkland",
            "areaHa": 24.84
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "Galada Tamboore, Merri Creek",
            "areaHa": 66.31
          },
          {
            "name": "Cooper Street Grasslands - Whittlesea",
            "areaHa": 40.12
          },
          {
            "name": "maram baba (Merri Creek Park)",
            "areaHa": 40.09
          },
          {
            "name": "Unnamed open space",
            "areaHa": 29.9
          },
          {
            "name": "Edgars Creek Parkland",
            "areaHa": 24.84
          }
        ],
        "residentialPopulationCoveragePct": 99.4,
        "componentSpread": 1.1,
        "reviewFlags": []
      }
    },
    {
      "id": "inner-richmond-2br",
      "displayName": "Richmond",
      "salSuburbs": [
        "Richmond"
      ],
      "salCodes": [
        "22170"
      ],
      "greenspace": 9.0544,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 9.1879,
        "majorParkAccess": 9.0797,
        "natureCorridorAccess": 8.6826
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 87.3,
        "representedPopulation": 25836,
        "sampledMeshBlocks": 295
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-15",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 248.0,
          "majorPark": 536.0,
          "natureCorridor": 638.0
        },
        "nearbyOpenSpaces": [
          {
            "name": "Yarra River",
            "areaHa": 96.48
          },
          {
            "name": "Yarra Bend Park - Boroondara",
            "areaHa": 45.52
          },
          {
            "name": "Fawkner Park",
            "areaHa": 41.19
          },
          {
            "name": "Royal Botanic Gardens - Melbourne",
            "areaHa": 35.35
          },
          {
            "name": "Yarra Bend Park - Yarra",
            "areaHa": 30.36
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "Yarra Bend Park",
            "areaHa": 204.79
          },
          {
            "name": "Yarra River",
            "areaHa": 96.48
          },
          {
            "name": "Yarra Bend Park - Boroondara",
            "areaHa": 45.52
          },
          {
            "name": "Yarra River Frontage - Yarra",
            "areaHa": 7.74
          },
          {
            "name": "Yarra River Frontage Park - Yarra",
            "areaHa": 5.7
          }
        ],
        "residentialPopulationCoveragePct": 90.4,
        "componentSpread": 0.5,
        "reviewFlags": []
      }
    },
    {
      "id": "seddon-westfootscray-villa",
      "displayName": "Seddon / West Footscray",
      "salSuburbs": [
        "Seddon",
        "West Footscray"
      ],
      "salCodes": [
        "22256",
        "22756"
      ],
      "greenspace": 9.191,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 10.0,
        "majorParkAccess": 9.0867,
        "natureCorridorAccess": 7.3248
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 95.7,
        "representedPopulation": 16704,
        "sampledMeshBlocks": 179
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-15",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 156.0,
          "majorPark": 557.0,
          "natureCorridor": 972.0
        },
        "nearbyOpenSpaces": [
          {
            "name": "Maribyrnong River",
            "areaHa": 48.89
          },
          {
            "name": "Mcivor Reserve",
            "areaHa": 18.74
          },
          {
            "name": "G J Cruickshank Reserve",
            "areaHa": 14.87
          },
          {
            "name": "Footscray Park - Lower Maribyrnong parklands",
            "areaHa": 14.29
          },
          {
            "name": "Hansen Reserve",
            "areaHa": 10.43
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "Maribyrnong River",
            "areaHa": 48.89
          },
          {
            "name": "Pipemakers, Burndap and Footscay Park Parklands (COM)",
            "areaHa": 20.12
          },
          {
            "name": "G J Cruickshank Reserve",
            "areaHa": 14.87
          },
          {
            "name": "Footscray Park - Lower Maribyrnong parklands",
            "areaHa": 14.29
          },
          {
            "name": "Maribyrnong River Trl",
            "areaHa": 3.2
          }
        ],
        "residentialPopulationCoveragePct": 99.0,
        "componentSpread": 2.7,
        "reviewFlags": []
      }
    },
    {
      "id": "south-melbourne-2br",
      "displayName": "South Melbourne",
      "salSuburbs": [
        "South Melbourne"
      ],
      "salCodes": [
        "22310"
      ],
      "greenspace": 9.4344,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 9.7591,
        "majorParkAccess": 9.3984,
        "natureCorridorAccess": 8.6768
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 92.7,
        "representedPopulation": 10194,
        "sampledMeshBlocks": 114
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-15",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 127.0,
          "majorPark": 342.0,
          "natureCorridor": 662.0
        },
        "nearbyOpenSpaces": [
          {
            "name": "Albert Park",
            "areaHa": 107.17
          },
          {
            "name": "Albert Park Lake",
            "areaHa": 48.92
          },
          {
            "name": "Maribyrnong River",
            "areaHa": 48.89
          },
          {
            "name": "Fawkner Park",
            "areaHa": 41.19
          },
          {
            "name": "Royal Botanic Gardens - Melbourne",
            "areaHa": 37.96
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "Albert Park Lake",
            "areaHa": 48.92
          },
          {
            "name": "Maribyrnong River",
            "areaHa": 48.89
          },
          {
            "name": "Port Melb, Albert & Middle Parks F/shore",
            "areaHa": 15.83
          },
          {
            "name": "Yarra River",
            "areaHa": 10.43
          },
          {
            "name": "Station Pier",
            "areaHa": 8.77
          }
        ],
        "residentialPopulationCoveragePct": 88.3,
        "componentSpread": 1.1,
        "reviewFlags": []
      }
    },
    {
      "id": "inner-south-yarra-2br",
      "displayName": "South Yarra",
      "salSuburbs": [
        "South Yarra"
      ],
      "salCodes": [
        "22314"
      ],
      "greenspace": 9.513,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 10.0,
        "majorParkAccess": 9.3591,
        "natureCorridorAccess": 8.5265
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 98.1,
        "representedPopulation": 24046,
        "sampledMeshBlocks": 307
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-15",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 161.0,
          "majorPark": 358.0,
          "natureCorridor": 581.0
        },
        "nearbyOpenSpaces": [
          {
            "name": "Albert Park",
            "areaHa": 117.18
          },
          {
            "name": "Yarra River",
            "areaHa": 69.53
          },
          {
            "name": "Albert Park Lake",
            "areaHa": 48.92
          },
          {
            "name": "Fawkner Park",
            "areaHa": 41.19
          },
          {
            "name": "Royal Botanic Gardens - Melbourne",
            "areaHa": 37.96
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "Yarra River",
            "areaHa": 69.53
          },
          {
            "name": "Albert Park Lake",
            "areaHa": 48.92
          },
          {
            "name": "Yarra River Frontage - Yarra",
            "areaHa": 7.74
          },
          {
            "name": "Yarra River Frontage Park - Yarra",
            "areaHa": 2.21
          },
          {
            "name": "Yarra River Reserve",
            "areaHa": 2.21
          }
        ],
        "residentialPopulationCoveragePct": 96.1,
        "componentSpread": 1.5,
        "reviewFlags": []
      }
    },
    {
      "id": "spotswood-2br",
      "displayName": "Spotswood",
      "salSuburbs": [
        "Spotswood"
      ],
      "salCodes": [
        "22319"
      ],
      "greenspace": 9.8398,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 10.0,
        "majorParkAccess": 9.8618,
        "natureCorridorAccess": 9.4061
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 100.0,
        "representedPopulation": 2795,
        "sampledMeshBlocks": 26
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-15",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 143.0,
          "majorPark": 334.0,
          "natureCorridor": 491.0
        },
        "nearbyOpenSpaces": [
          {
            "name": "Maribyrnong River",
            "areaHa": 52.51
          },
          {
            "name": "Yarra River",
            "areaHa": 37.53
          },
          {
            "name": "Newport Lakes",
            "areaHa": 33.43
          },
          {
            "name": "Westgate Park",
            "areaHa": 32.46
          },
          {
            "name": "Riverside Park",
            "areaHa": 23.29
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "Maribyrnong River",
            "areaHa": 52.51
          },
          {
            "name": "Yarra River",
            "areaHa": 37.53
          },
          {
            "name": "Newport Lakes",
            "areaHa": 33.43
          },
          {
            "name": "Riverside Park",
            "areaHa": 23.29
          },
          {
            "name": "Greenwich Reserve",
            "areaHa": 18.81
          }
        ],
        "residentialPopulationCoveragePct": 99.1,
        "componentSpread": 0.6,
        "reviewFlags": []
      }
    },
    {
      "id": "se-value-corridor",
      "displayName": "Springvale / Noble Park",
      "salSuburbs": [
        "Springvale",
        "Noble Park",
        "Clayton"
      ],
      "salCodes": [
        "22328",
        "21952",
        "20569"
      ],
      "greenspace": 8.8189,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 9.5922,
        "majorParkAccess": 7.7854,
        "natureCorridorAccess": 8.436
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 91.1,
        "representedPopulation": 70510,
        "sampledMeshBlocks": 681
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-15",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 197.0,
          "majorPark": 702.0,
          "natureCorridor": 627.0
        },
        "nearbyOpenSpaces": [
          {
            "name": "Springvalley Park",
            "areaHa": 31.91
          },
          {
            "name": "Greaves Reserve",
            "areaHa": 27.19
          },
          {
            "name": "Heatherton Park",
            "areaHa": 18.14
          },
          {
            "name": "Fotheringham Reserve",
            "areaHa": 15.86
          },
          {
            "name": "Ross Reserve",
            "areaHa": 15.26
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "Bald Hill Park",
            "areaHa": 13.64
          },
          {
            "name": "Fotheringham Reserve",
            "areaHa": 12.66
          },
          {
            "name": "Warner Reserve",
            "areaHa": 8.52
          },
          {
            "name": "Dandenong Bypass Trail",
            "areaHa": 7.95
          },
          {
            "name": "Namatjira Park",
            "areaHa": 6.34
          }
        ],
        "residentialPopulationCoveragePct": 99.6,
        "componentSpread": 1.8,
        "reviewFlags": []
      }
    },
    {
      "id": "established-western-value",
      "displayName": "St Albans",
      "salSuburbs": [
        "St Albans"
      ],
      "salCodes": [
        "22330"
      ],
      "greenspace": 9.5996,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 10.0,
        "majorParkAccess": 9.1508,
        "natureCorridorAccess": 9.272
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 96.4,
        "representedPopulation": 37369,
        "sampledMeshBlocks": 342
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-15",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 154.0,
          "majorPark": 478.0,
          "natureCorridor": 402.0
        },
        "nearbyOpenSpaces": [
          {
            "name": "Park Victoria External",
            "areaHa": 250.32
          },
          {
            "name": "Green Gully Reserve",
            "areaHa": 122.77
          },
          {
            "name": "Unnamed open space",
            "areaHa": 93.35
          },
          {
            "name": "Iramoo Wildflower Grassland Reserve",
            "areaHa": 32.44
          },
          {
            "name": "Linear Park",
            "areaHa": 17.9
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "Maribyrnong Valley Parklands",
            "areaHa": 269.14
          },
          {
            "name": "Park Victoria External",
            "areaHa": 250.32
          },
          {
            "name": "Green Gully Reserve",
            "areaHa": 56.13
          },
          {
            "name": "Cairnlea Estate Nature Conservation Reserve",
            "areaHa": 34.43
          },
          {
            "name": "Iramoo Wildflower Grassland Reserve",
            "areaHa": 32.44
          }
        ],
        "residentialPopulationCoveragePct": 98.2,
        "componentSpread": 0.8,
        "reviewFlags": []
      }
    },
    {
      "id": "st-kilda-2br",
      "displayName": "St Kilda",
      "salSuburbs": [
        "St Kilda"
      ],
      "salCodes": [
        "22343"
      ],
      "greenspace": 9.5566,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 10.0,
        "majorParkAccess": 9.8388,
        "natureCorridorAccess": 8.0249
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 100.0,
        "representedPopulation": 19102,
        "sampledMeshBlocks": 315
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-15",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 130.0,
          "majorPark": 281.0,
          "natureCorridor": 765.0
        },
        "nearbyOpenSpaces": [
          {
            "name": "Albert Park",
            "areaHa": 117.04
          },
          {
            "name": "Albert Park Lake",
            "areaHa": 48.92
          },
          {
            "name": "St Kilda Pier and Breakwater",
            "areaHa": 48.3
          },
          {
            "name": "Fawkner Park",
            "areaHa": 41.19
          },
          {
            "name": "St Kilda Marina & Surrounding Foreshore",
            "areaHa": 16.28
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "Albert Park Lake",
            "areaHa": 48.92
          },
          {
            "name": "St Kilda Pier and Breakwater",
            "areaHa": 48.3
          },
          {
            "name": "St Kilda Marina & Surrounding Foreshore",
            "areaHa": 16.28
          },
          {
            "name": "St Kilda Catani Gardens & Surrounding Foreshore",
            "areaHa": 14.16
          },
          {
            "name": "Port Melb, Albert & Middle Parks F/shore",
            "areaHa": 11.29
          }
        ],
        "residentialPopulationCoveragePct": 98.0,
        "componentSpread": 2.0,
        "reviewFlags": []
      }
    },
    {
      "id": "sunbury-house",
      "displayName": "Sunbury",
      "salSuburbs": [
        "Sunbury"
      ],
      "salCodes": [
        "22391"
      ],
      "greenspace": 9.8353,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 10.0,
        "majorParkAccess": 9.5878,
        "natureCorridorAccess": 9.795
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 98.7,
        "representedPopulation": 37925,
        "sampledMeshBlocks": 362
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-15",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 103.0,
          "majorPark": 247.0,
          "natureCorridor": 213.0
        },
        "nearbyOpenSpaces": [
          {
            "name": "Unnamed open space",
            "areaHa": 114.69
          },
          {
            "name": "Holden Flora Reserve",
            "areaHa": 90.7
          },
          {
            "name": "Emu Bottom Recreation Reserve",
            "areaHa": 42.9
          },
          {
            "name": "Mt Holden Reserve",
            "areaHa": 38.12
          },
          {
            "name": "Blind Creek Parklands",
            "areaHa": 33.64
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "Holden Flora Reserve",
            "areaHa": 178.76
          },
          {
            "name": "Unnamed open space",
            "areaHa": 95.13
          },
          {
            "name": "Emu Bottom Recreation Reserve",
            "areaHa": 42.9
          },
          {
            "name": "Mt Holden Reserve",
            "areaHa": 38.12
          },
          {
            "name": "Blind Creek Parklands",
            "areaHa": 33.64
          }
        ],
        "residentialPopulationCoveragePct": 100.0,
        "componentSpread": 0.4,
        "reviewFlags": []
      }
    },
    {
      "id": "sunshine-station-2br",
      "displayName": "Sunshine",
      "salSuburbs": [
        "Sunshine"
      ],
      "salCodes": [
        "22395"
      ],
      "greenspace": 9.2694,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 9.716,
        "majorParkAccess": 9.3241,
        "natureCorridorAccess": 8.0709
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 92.3,
        "representedPopulation": 9314,
        "sampledMeshBlocks": 91
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-15",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 154.0,
          "majorPark": 373.0,
          "natureCorridor": 851.0
        },
        "nearbyOpenSpaces": [
          {
            "name": "Unnamed open space",
            "areaHa": 63.72
          },
          {
            "name": "MARIBYRNONG RIVER",
            "areaHa": 26.4
          },
          {
            "name": "Kororoit Creek East Side south Wasley St",
            "areaHa": 23.39
          },
          {
            "name": "Maribyrnong River",
            "areaHa": 17.86
          },
          {
            "name": "Lower Maribyrnong Parklands - Moonee Valley",
            "areaHa": 15.71
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "MARIBYRNONG RIVER",
            "areaHa": 26.4
          },
          {
            "name": "Kororoit Creek East Side south Wasley St",
            "areaHa": 23.39
          },
          {
            "name": "Maribyrnong River",
            "areaHa": 17.86
          },
          {
            "name": "Unnamed open space",
            "areaHa": 16.65
          },
          {
            "name": "Lower Maribyrnong Parklands - Moonee Valley",
            "areaHa": 15.71
          }
        ],
        "residentialPopulationCoveragePct": 98.6,
        "componentSpread": 1.6,
        "reviewFlags": []
      }
    },
    {
      "id": "growth-corridor-stress-test",
      "displayName": "Tarneit / Wyndham Vale",
      "salSuburbs": [
        "Tarneit",
        "Wyndham Vale"
      ],
      "salCodes": [
        "22451",
        "22883"
      ],
      "greenspace": 8.7294,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 8.2527,
        "majorParkAccess": 9.0811,
        "natureCorridorAccess": 9.3938
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 78.4,
        "representedPopulation": 76774,
        "sampledMeshBlocks": 683
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-15",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 165.0,
          "majorPark": 424.0,
          "natureCorridor": 291.0
        },
        "nearbyOpenSpaces": [
          {
            "name": "Unnamed open space",
            "areaHa": 139.08
          },
          {
            "name": "Presidents Park Recreational Reserve",
            "areaHa": 71.81
          },
          {
            "name": "Heathdale Glen Orden Recreational Reserve",
            "areaHa": 40.92
          },
          {
            "name": "Riverbend Historical Nature Reserve",
            "areaHa": 25.49
          },
          {
            "name": "Cobbledicks Ford Streamside Area",
            "areaHa": 25.24
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "Western Grasslands Nature Conservation Reserve",
            "areaHa": 607.52
          },
          {
            "name": "Werribee Township Regional Park",
            "areaHa": 176.97
          },
          {
            "name": "Unnamed open space",
            "areaHa": 96.98
          },
          {
            "name": "Riverbend Historical Nature Reserve",
            "areaHa": 25.49
          },
          {
            "name": "Cobbledicks Ford Streamside Area",
            "areaHa": 25.24
          }
        ],
        "residentialPopulationCoveragePct": 99.9,
        "componentSpread": 1.1,
        "reviewFlags": []
      }
    },
    {
      "id": "thornbury-2br",
      "displayName": "Thornbury",
      "salSuburbs": [
        "Thornbury"
      ],
      "salCodes": [
        "22508"
      ],
      "greenspace": 9.3153,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 10.0,
        "majorParkAccess": 8.2586,
        "natureCorridorAccess": 9.1888
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 97.7,
        "representedPopulation": 18476,
        "sampledMeshBlocks": 221
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-15",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 171.0,
          "majorPark": 740.0,
          "natureCorridor": 452.0
        },
        "nearbyOpenSpaces": [
          {
            "name": "Darebin Parklands",
            "areaHa": 19.97
          },
          {
            "name": "John Cain Memorial Park D.I.S.C.",
            "areaHa": 17.27
          },
          {
            "name": "All Nations Park",
            "areaHa": 13.9
          },
          {
            "name": "Darebin Creek Reserve (Bell to Southern)",
            "areaHa": 13.55
          },
          {
            "name": "McDonell Reserve",
            "areaHa": 8.88
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "Darebin Parklands",
            "areaHa": 19.82
          },
          {
            "name": "Darebin Creek Reserve (Bell to Southern)",
            "areaHa": 13.55
          },
          {
            "name": "Darebin Creek Reserve (Wimpole to Bell)",
            "areaHa": 6.7
          },
          {
            "name": "Rockbeare Park",
            "areaHa": 6.22
          },
          {
            "name": "Darebin Creek Reserve (Banksia to Bond)",
            "areaHa": 4.98
          }
        ],
        "residentialPopulationCoveragePct": 100.0,
        "componentSpread": 1.7,
        "reviewFlags": []
      }
    },
    {
      "id": "toorak-2br",
      "displayName": "Toorak",
      "salSuburbs": [
        "Toorak"
      ],
      "salCodes": [
        "22547"
      ],
      "greenspace": 7.5852,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 7.3195,
        "majorParkAccess": 7.9427,
        "natureCorridorAccess": 7.7133
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 69.5,
        "representedPopulation": 12772,
        "sampledMeshBlocks": 185
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-15",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 290.0,
          "majorPark": 764.0,
          "natureCorridor": 824.0
        },
        "nearbyOpenSpaces": [
          {
            "name": "Yarra River",
            "areaHa": 69.37
          },
          {
            "name": "Kevin Bartlett Reserve",
            "areaHa": 12.9
          },
          {
            "name": "Kooyong Park",
            "areaHa": 12.29
          },
          {
            "name": "Burnley Park",
            "areaHa": 8.53
          },
          {
            "name": "Yarra River Frontage - Yarra",
            "areaHa": 7.74
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "Yarra River",
            "areaHa": 69.37
          },
          {
            "name": "Yarra River Frontage - Yarra",
            "areaHa": 7.74
          },
          {
            "name": "Capital City Trail Linear Reserve (Main Yarra Trail)",
            "areaHa": 4.94
          },
          {
            "name": "Yarra River Frontage Park - Yarra",
            "areaHa": 3.79
          },
          {
            "name": "Yarra River Reserve",
            "areaHa": 2.21
          }
        ],
        "residentialPopulationCoveragePct": 100.0,
        "componentSpread": 0.6,
        "reviewFlags": []
      }
    },
    {
      "id": "inner-windsor-prahran-2br",
      "displayName": "Windsor / Prahran",
      "salSuburbs": [
        "Windsor",
        "Prahran"
      ],
      "salCodes": [
        "22805",
        "22118"
      ],
      "greenspace": 8.2908,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 10.0,
        "majorParkAccess": 8.1763,
        "natureCorridorAccess": 4.1897
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 97.9,
        "representedPopulation": 17976,
        "sampledMeshBlocks": 246
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-15",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 149.0,
          "majorPark": 723.0,
          "natureCorridor": 1644.0
        },
        "nearbyOpenSpaces": [
          {
            "name": "Albert Park",
            "areaHa": 116.34
          },
          {
            "name": "Albert Park Lake",
            "areaHa": 48.92
          },
          {
            "name": "Fawkner Park",
            "areaHa": 41.19
          },
          {
            "name": "Alma Park",
            "areaHa": 9.15
          },
          {
            "name": "Orrong Romanis Park",
            "areaHa": 3.96
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "Albert Park Lake",
            "areaHa": 48.92
          },
          {
            "name": "St Kilda Catani Gardens & Surrounding Foreshore",
            "areaHa": 3.46
          }
        ],
        "residentialPopulationCoveragePct": 92.3,
        "componentSpread": 5.8,
        "reviewFlags": [
          "highComponentSpread"
        ]
      }
    },
    {
      "id": "yarraville-2br",
      "displayName": "Yarraville",
      "salSuburbs": [
        "Yarraville"
      ],
      "salCodes": [
        "22917"
      ],
      "greenspace": 9.6766,
      "greenspaceComponents": {
        "localOpenSpaceAccess": 10.0,
        "majorParkAccess": 9.5458,
        "natureCorridorAccess": 9.0643
      },
      "evidence": {
        "localOpenSpaceCoveragePct": 95.5,
        "representedPopulation": 15503,
        "sampledMeshBlocks": 165
      },
      "sourceMetadata": {
        "methodologyVersion": "greenspace-access-v1",
        "sourceYears": {
          "absSal": 2021,
          "absMeshBlocks": 2021,
          "absMeshBlockCounts": 2021,
          "vpaOpenSpace": 2019,
          "parkresSupplement": 2026
        },
        "retrievedAt": "2026-07-15",
        "distanceMethod": "straight-line",
        "majorParkThresholdHectares": 5
      },
      "audit": {
        "populationWeightedMedianDistanceM": {
          "localOpenSpace": 146.0,
          "majorPark": 349.0,
          "natureCorridor": 430.0
        },
        "nearbyOpenSpaces": [
          {
            "name": "Maribyrnong River",
            "areaHa": 52.51
          },
          {
            "name": "Yarra River",
            "areaHa": 37.6
          },
          {
            "name": "Newport Lakes",
            "areaHa": 33.43
          },
          {
            "name": "Westgate Park",
            "areaHa": 32.46
          },
          {
            "name": "Riverside Park",
            "areaHa": 23.23
          }
        ],
        "nearbyNatureCorridors": [
          {
            "name": "Maribyrnong River",
            "areaHa": 52.51
          },
          {
            "name": "Yarra River",
            "areaHa": 37.6
          },
          {
            "name": "Newport Lakes",
            "areaHa": 33.43
          },
          {
            "name": "Riverside Park",
            "areaHa": 23.23
          },
          {
            "name": "G J Cruickshank Reserve",
            "areaHa": 14.87
          }
        ],
        "residentialPopulationCoveragePct": 99.1,
        "componentSpread": 0.9,
        "reviewFlags": []
      }
    }
  ]
} as const;

export type DwellingGreenspaceRecord =
  (typeof DWELLING_GREENSPACE_CONTEXT.records)[number];

export const DWELLING_GREENSPACE_BY_ID = Object.fromEntries(
  DWELLING_GREENSPACE_CONTEXT.records.map((record) => [record.id, record]),
) as Record<string, DwellingGreenspaceRecord>;
