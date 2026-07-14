/**
 * Community Context · ABS Census 2021
 *
 * Static, source-attributed community context for every suburb used by /dwelling.
 * Descriptive only. Do not use any field in suburb scoring, ranking or demographic
 * preference filtering.
 */

export const DWELLING_COMMUNITY_CONTEXT = {
  "dataset": "dwelling-community-context",
  "version": "2021-gcp-sal-v2",
  "title": "Community Context · ABS Census 2021",
  "generatedAt": "2026-07-14",
  "usage": {
    "purpose": "Reusable descriptive community context for every suburb used by the /dwelling application",
    "contextOnly": true,
    "excludeFromSuburbScore": true,
    "scoreContribution": 0,
    "interpretation": "Descriptive, never evaluative",
    "allowedExamples": [
      "Large Vietnamese-speaking community.",
      "High proportion of young families.",
      "Strong multicultural population.",
      "Higher Cantonese-speaking community than a stated comparison geography."
    ],
    "avoidExamples": [
      "Excellent cultural fit.",
      "Better ethnicity score.",
      "Preferred demographic."
    ],
    "implementationRule": "Do not connect any field in this dataset to ranking, scoring, filtering or weighting based on ethnicity, birthplace, language or religion."
  },
  "coverage": {
    "recordCount": 48,
    "recordUnit": "One record per individual ABS Suburb and Locality",
    "corridorRule": "Combined /dwelling labels are mapped to their component SAL records; demographic counts are not blended unless the UI explicitly aggregates them using counts and applicable denominators.",
    "dwellingLensEntries": [
      {
        "lensLabel": "Seddon/West Footscray",
        "salSuburbs": [
          "Seddon",
          "West Footscray"
        ]
      },
      {
        "lensLabel": "Footscray",
        "salSuburbs": [
          "Footscray"
        ]
      },
      {
        "lensLabel": "Sunshine",
        "salSuburbs": [
          "Sunshine"
        ]
      },
      {
        "lensLabel": "St Albans",
        "salSuburbs": [
          "St Albans"
        ]
      },
      {
        "lensLabel": "Brunswick/Coburg",
        "salSuburbs": [
          "Brunswick",
          "Coburg"
        ]
      },
      {
        "lensLabel": "Pascoe Vale/Glenroy",
        "salSuburbs": [
          "Pascoe Vale",
          "Glenroy"
        ]
      },
      {
        "lensLabel": "Kensington/Flemington",
        "salSuburbs": [
          "Kensington",
          "Flemington"
        ]
      },
      {
        "lensLabel": "Reservoir",
        "salSuburbs": [
          "Reservoir"
        ]
      },
      {
        "lensLabel": "Carnegie/Oakleigh",
        "salSuburbs": [
          "Carnegie",
          "Oakleigh"
        ]
      },
      {
        "lensLabel": "Springvale/Noble Park",
        "salSuburbs": [
          "Springvale",
          "Noble Park"
        ]
      },
      {
        "lensLabel": "Moorabbin/Cheltenham",
        "salSuburbs": [
          "Moorabbin",
          "Cheltenham"
        ]
      },
      {
        "lensLabel": "Cremorne",
        "salSuburbs": [
          "Cremorne"
        ]
      },
      {
        "lensLabel": "Richmond",
        "salSuburbs": [
          "Richmond"
        ]
      },
      {
        "lensLabel": "Collingwood",
        "salSuburbs": [
          "Collingwood"
        ]
      },
      {
        "lensLabel": "Abbotsford",
        "salSuburbs": [
          "Abbotsford"
        ]
      },
      {
        "lensLabel": "South Yarra",
        "salSuburbs": [
          "South Yarra"
        ]
      },
      {
        "lensLabel": "Windsor/Prahran",
        "salSuburbs": [
          "Windsor",
          "Prahran"
        ]
      },
      {
        "lensLabel": "St Kilda",
        "salSuburbs": [
          "St Kilda"
        ]
      },
      {
        "lensLabel": "Balaclava/St Kilda East",
        "salSuburbs": [
          "Balaclava",
          "St Kilda East"
        ]
      },
      {
        "lensLabel": "Elwood",
        "salSuburbs": [
          "Elwood"
        ]
      },
      {
        "lensLabel": "Middle Park",
        "salSuburbs": [
          "Middle Park"
        ]
      },
      {
        "lensLabel": "Mentone",
        "salSuburbs": [
          "Mentone"
        ]
      },
      {
        "lensLabel": "Chelsea/Bonbeach",
        "salSuburbs": [
          "Chelsea",
          "Bonbeach"
        ]
      },
      {
        "lensLabel": "Tarneit/Wyndham Vale",
        "salSuburbs": [
          "Tarneit",
          "Wyndham Vale"
        ]
      },
      {
        "lensLabel": "Craigieburn",
        "salSuburbs": [
          "Craigieburn"
        ]
      },
      {
        "lensLabel": "Donnybrook",
        "salSuburbs": [
          "Donnybrook"
        ]
      },
      {
        "lensLabel": "Kew",
        "salSuburbs": [
          "Kew"
        ]
      },
      {
        "lensLabel": "Malvern",
        "salSuburbs": [
          "Malvern"
        ]
      },
      {
        "lensLabel": "Toorak",
        "salSuburbs": [
          "Toorak"
        ]
      },
      {
        "lensLabel": "Box Hill",
        "salSuburbs": [
          "Box Hill"
        ]
      },
      {
        "lensLabel": "Balwyn",
        "salSuburbs": [
          "Balwyn"
        ]
      },
      {
        "lensLabel": "Thornbury",
        "salSuburbs": [
          "Thornbury"
        ]
      },
      {
        "lensLabel": "Preston",
        "salSuburbs": [
          "Preston"
        ]
      },
      {
        "lensLabel": "Northcote",
        "salSuburbs": [
          "Northcote"
        ]
      },
      {
        "lensLabel": "Albert Park",
        "salSuburbs": [
          "Albert Park"
        ]
      },
      {
        "lensLabel": "North Melbourne",
        "salSuburbs": [
          "North Melbourne"
        ]
      },
      {
        "lensLabel": "Sunbury",
        "salSuburbs": [
          "Sunbury"
        ]
      }
    ]
  },
  "denominatorPolicy": {
    "population": "Published G01 total persons.",
    "language": "All persons in G13, including language/proficiency not stated. English-only and specific-language counts use the same persons denominator.",
    "birthplace": "All persons in G09/G01. Birthplace not stated remains in the denominator but is not included in overseas or named-country numerators.",
    "householdsWithChildren": "Occupied private dwellings classified by household/family composition in G42, not total suburb population.",
    "tenure": "Occupied private dwellings classified by tenure in G37, not total suburb population.",
    "religion": "All persons in G14, including religious affiliation not stated.",
    "medians": "Published ABS medians are retained as scalar values and are not converted to percentages."
  },
  "listLimitations": {
    "countriesOfBirth": "G09c lists the 50 most common country-of-birth responses from the 2016 Census classification. The top-five list is the top five positive overseas country counts available in that GCP table.",
    "languages": "G13c lists the most common language responses from the 2016 Census classification. Aggregate 'Other' and 'Total' rows are excluded to avoid double counting. Both an all-language top five and a non-English top five are provided."
  },
  "records": [
    {
      "suburb": "Seddon",
      "geographyType": "SAL",
      "geographyCode": "SAL22256",
      "censusYear": 2021,
      "source": "Australian Bureau of Statistics",
      "retrievedAt": "2026-07-14",
      "contextOnly": true,
      "excludeFromSuburbScore": true,
      "scoreContribution": 0,
      "sourceMetadata": {
        "product": "2021 Census General Community Profile",
        "profileUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL22256",
        "downloadUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL22256/download/GCP_SAL22256.xlsx",
        "sourceWorkbook": "GCP_SAL22256.xlsx",
        "sourceWorkbookSha256": "f4fd53ee7f7374c837813df7f7edba30951fac478d4e4e228a253cffdac42467",
        "geographicBoundaryEdition": "ASGS Edition 3",
        "privacyNote": "ABS applies small random adjustments to cell values. Component sums can differ slightly from published totals."
      },
      "community": {
        "totalPopulation": {
          "count": 5143,
          "sourceTable": "G01",
          "sourceCells": {
            "value": "D17"
          },
          "basis": "Place of usual residence"
        },
        "medianAge": {
          "value": 36,
          "unit": "years",
          "applicablePopulation": "Persons, excluding overseas visitors",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B13"
          },
          "basis": "Place of usual residence"
        },
        "householdsWithChildren": {
          "count": 774,
          "denominator": 2085,
          "percentage": 37.1,
          "numeratorLabel": "Occupied private dwellings whose primary family is a couple family with children or a one-parent family",
          "denominatorLabel": "Total occupied private dwellings in G42, excluding visitor-only and other non-classifiable households",
          "sourceTable": "G42",
          "sourceCells": {
            "numerator": [
              "C36",
              "D36"
            ],
            "denominator": "I36"
          },
          "basis": "Place of enumeration",
          "components": {
            "coupleFamilyWithChildren": 618,
            "oneParentFamily": 156
          },
          "notes": "For multiple-family households, G42 classifies the household using the primary family's composition."
        },
        "medianHouseholdIncome": {
          "value": 2471,
          "unit": "AUD per week",
          "applicablePopulation": "Occupied private dwellings; published ABS median household income",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B19"
          },
          "basis": "Place of enumeration"
        },
        "tenure": {
          "denominator": 2085,
          "denominatorLabel": "Total occupied private dwellings in G37, excluding visitor-only and other non-classifiable households",
          "basis": "Place of enumeration",
          "sourceTable": "G37",
          "ownerOccupied": {
            "count": 1227,
            "percentage": 58.8,
            "components": {
              "ownedOutright": 475,
              "ownedWithMortgage": 752
            },
            "sourceCells": [
              "G14",
              "G16"
            ]
          },
          "renting": {
            "count": 815,
            "percentage": 39.1,
            "sourceCells": [
              "G25"
            ],
            "notes": "G37 rented total excludes dwellings occupied rent-free; those are included in other tenure."
          },
          "otherTenure": {
            "count": 19,
            "percentage": 0.9,
            "sourceCells": [
              "G27"
            ]
          },
          "notStated": {
            "count": 18,
            "percentage": 0.9,
            "sourceCells": [
              "G29"
            ]
          },
          "denominatorCell": "G31"
        },
        "overseasBornPopulation": {
          "count": 1377,
          "denominator": 5143,
          "percentage": 26.8,
          "numeratorLabel": "Persons born outside Australia",
          "denominatorLabel": "Total persons",
          "sourceTable": "G01",
          "sourceCells": {
            "numerator": [
              "D44"
            ],
            "denominator": "D17"
          },
          "basis": "Place of usual residence",
          "notes": "The G01 'Elsewhere' numerator includes inadequately described birthplaces and people at sea, and excludes birthplace not stated. The denominator is all persons."
        },
        "topOverseasCountriesOfBirth": [
          {
            "name": "Vietnam",
            "count": 196,
            "denominator": 5143,
            "percentage": 3.8,
            "sourceTable": "G09c",
            "sourceCell": "K59",
            "basis": "Place of usual residence"
          },
          {
            "name": "England",
            "count": 160,
            "denominator": 5143,
            "percentage": 3.1,
            "sourceTable": "G09c",
            "sourceCell": "K23",
            "basis": "Place of usual residence"
          },
          {
            "name": "New Zealand",
            "count": 149,
            "denominator": 5143,
            "percentage": 2.9,
            "sourceTable": "G09c",
            "sourceCell": "K44",
            "basis": "Place of usual residence"
          },
          {
            "name": "North Macedonia",
            "count": 73,
            "denominator": 5143,
            "percentage": 1.4,
            "sourceTable": "G09c",
            "sourceCell": "K45",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greece",
            "count": 54,
            "denominator": 5143,
            "percentage": 1.0,
            "sourceTable": "G09c",
            "sourceCell": "K27",
            "basis": "Place of usual residence"
          }
        ],
        "topLanguagesSpokenAtHome": [
          {
            "name": "English only",
            "count": 3889,
            "denominator": 5143,
            "percentage": 75.6,
            "sourceTable": "G13c",
            "sourceCell": "G12",
            "basis": "Place of usual residence"
          },
          {
            "name": "Vietnamese",
            "count": 253,
            "denominator": 5143,
            "percentage": 4.9,
            "sourceTable": "G13c",
            "sourceCell": "G59",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greek",
            "count": 104,
            "denominator": 5143,
            "percentage": 2.0,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Macedonian",
            "count": 92,
            "denominator": 5143,
            "percentage": 1.8,
            "sourceTable": "G13c",
            "sourceCell": "G41",
            "basis": "Place of usual residence"
          },
          {
            "name": "Cantonese",
            "count": 79,
            "denominator": 5143,
            "percentage": 1.5,
            "sourceTable": "G13c",
            "sourceCell": "G19",
            "basis": "Place of usual residence"
          }
        ],
        "topNonEnglishLanguagesSpokenAtHome": [
          {
            "name": "Vietnamese",
            "count": 253,
            "denominator": 5143,
            "percentage": 4.9,
            "sourceTable": "G13c",
            "sourceCell": "G59",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greek",
            "count": 104,
            "denominator": 5143,
            "percentage": 2.0,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Macedonian",
            "count": 92,
            "denominator": 5143,
            "percentage": 1.8,
            "sourceTable": "G13c",
            "sourceCell": "G41",
            "basis": "Place of usual residence"
          },
          {
            "name": "Cantonese",
            "count": 79,
            "denominator": 5143,
            "percentage": 1.5,
            "sourceTable": "G13c",
            "sourceCell": "G19",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 59,
            "denominator": 5143,
            "percentage": 1.1,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          }
        ],
        "religiousAffiliationSummary": [
          {
            "name": "No religion / secular or other spiritual beliefs",
            "count": 3088,
            "denominator": 5143,
            "percentage": 60.0,
            "sourceTable": "G14",
            "sourceCell": "D43",
            "basis": "Place of usual residence"
          },
          {
            "name": "Christianity",
            "count": 1426,
            "denominator": 5143,
            "percentage": 27.7,
            "sourceTable": "G14",
            "sourceCell": "D30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Buddhism",
            "count": 236,
            "denominator": 5143,
            "percentage": 4.6,
            "sourceTable": "G14",
            "sourceCell": "D9",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hinduism",
            "count": 49,
            "denominator": 5143,
            "percentage": 1.0,
            "sourceTable": "G14",
            "sourceCell": "D31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Islam",
            "count": 88,
            "denominator": 5143,
            "percentage": 1.7,
            "sourceTable": "G14",
            "sourceCell": "D32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Judaism",
            "count": 12,
            "denominator": 5143,
            "percentage": 0.2,
            "sourceTable": "G14",
            "sourceCell": "D33",
            "basis": "Place of usual residence"
          },
          {
            "name": "Other religions",
            "count": 20,
            "denominator": 5143,
            "percentage": 0.4,
            "sourceTable": "G14",
            "sourceCell": "D38",
            "basis": "Place of usual residence"
          },
          {
            "name": "Religious affiliation not stated",
            "count": 223,
            "denominator": 5143,
            "percentage": 4.3,
            "sourceTable": "G14",
            "sourceCell": "D44",
            "basis": "Place of usual residence"
          }
        ]
      },
      "additionalHouseholdContext": {
        "cantoneseSpokenAtHome": {
          "count": 79,
          "denominator": 5143,
          "percentage": 1.5,
          "numeratorLabel": "Persons who used Cantonese at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G19"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "mandarinSpokenAtHome": {
          "count": 59,
          "denominator": 5143,
          "percentage": 1.1,
          "numeratorLabel": "Persons who used Mandarin at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G20"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "hongKongBornPopulation": {
          "count": 20,
          "denominator": 5143,
          "percentage": 0.4,
          "numeratorLabel": "Persons born in Hong Kong (SAR of China)",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K28"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        },
        "chinaBornPopulation": {
          "count": 52,
          "denominator": 5143,
          "percentage": 1.0,
          "numeratorLabel": "Persons born in China, excluding SARs and Taiwan",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K20"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        }
      }
    },
    {
      "suburb": "West Footscray",
      "geographyType": "SAL",
      "geographyCode": "SAL22756",
      "censusYear": 2021,
      "source": "Australian Bureau of Statistics",
      "retrievedAt": "2026-07-14",
      "contextOnly": true,
      "excludeFromSuburbScore": true,
      "scoreContribution": 0,
      "sourceMetadata": {
        "product": "2021 Census General Community Profile",
        "profileUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL22756",
        "downloadUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL22756/download/GCP_SAL22756.xlsx",
        "sourceWorkbook": "GCP_SAL22756.xlsx",
        "sourceWorkbookSha256": "41b54322967a1d2783563003ec64bd9fdf8574f507a73c3607e33104b3894505",
        "geographicBoundaryEdition": "ASGS Edition 3",
        "privacyNote": "ABS applies small random adjustments to cell values. Component sums can differ slightly from published totals."
      },
      "community": {
        "totalPopulation": {
          "count": 11729,
          "sourceTable": "G01",
          "sourceCells": {
            "value": "D17"
          },
          "basis": "Place of usual residence"
        },
        "medianAge": {
          "value": 35,
          "unit": "years",
          "applicablePopulation": "Persons, excluding overseas visitors",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B13"
          },
          "basis": "Place of usual residence"
        },
        "householdsWithChildren": {
          "count": 1715,
          "denominator": 4597,
          "percentage": 37.3,
          "numeratorLabel": "Occupied private dwellings whose primary family is a couple family with children or a one-parent family",
          "denominatorLabel": "Total occupied private dwellings in G42, excluding visitor-only and other non-classifiable households",
          "sourceTable": "G42",
          "sourceCells": {
            "numerator": [
              "C36",
              "D36"
            ],
            "denominator": "I36"
          },
          "basis": "Place of enumeration",
          "components": {
            "coupleFamilyWithChildren": 1290,
            "oneParentFamily": 425
          },
          "notes": "For multiple-family households, G42 classifies the household using the primary family's composition."
        },
        "medianHouseholdIncome": {
          "value": 1989,
          "unit": "AUD per week",
          "applicablePopulation": "Occupied private dwellings; published ABS median household income",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B19"
          },
          "basis": "Place of enumeration"
        },
        "tenure": {
          "denominator": 4597,
          "denominatorLabel": "Total occupied private dwellings in G37, excluding visitor-only and other non-classifiable households",
          "basis": "Place of enumeration",
          "sourceTable": "G37",
          "ownerOccupied": {
            "count": 2606,
            "percentage": 56.7,
            "components": {
              "ownedOutright": 998,
              "ownedWithMortgage": 1608
            },
            "sourceCells": [
              "G14",
              "G16"
            ]
          },
          "renting": {
            "count": 1858,
            "percentage": 40.4,
            "sourceCells": [
              "G25"
            ],
            "notes": "G37 rented total excludes dwellings occupied rent-free; those are included in other tenure."
          },
          "otherTenure": {
            "count": 55,
            "percentage": 1.2,
            "sourceCells": [
              "G27"
            ]
          },
          "notStated": {
            "count": 70,
            "percentage": 1.5,
            "sourceCells": [
              "G29"
            ]
          },
          "denominatorCell": "G31"
        },
        "overseasBornPopulation": {
          "count": 3931,
          "denominator": 11729,
          "percentage": 33.5,
          "numeratorLabel": "Persons born outside Australia",
          "denominatorLabel": "Total persons",
          "sourceTable": "G01",
          "sourceCells": {
            "numerator": [
              "D44"
            ],
            "denominator": "D17"
          },
          "basis": "Place of usual residence",
          "notes": "The G01 'Elsewhere' numerator includes inadequately described birthplaces and people at sea, and excludes birthplace not stated. The denominator is all persons."
        },
        "topOverseasCountriesOfBirth": [
          {
            "name": "Vietnam",
            "count": 710,
            "denominator": 11729,
            "percentage": 6.1,
            "sourceTable": "G09c",
            "sourceCell": "K59",
            "basis": "Place of usual residence"
          },
          {
            "name": "India",
            "count": 434,
            "denominator": 11729,
            "percentage": 3.7,
            "sourceTable": "G09c",
            "sourceCell": "K29",
            "basis": "Place of usual residence"
          },
          {
            "name": "England",
            "count": 261,
            "denominator": 11729,
            "percentage": 2.2,
            "sourceTable": "G09c",
            "sourceCell": "K23",
            "basis": "Place of usual residence"
          },
          {
            "name": "New Zealand",
            "count": 223,
            "denominator": 11729,
            "percentage": 1.9,
            "sourceTable": "G09c",
            "sourceCell": "K44",
            "basis": "Place of usual residence"
          },
          {
            "name": "Philippines",
            "count": 195,
            "denominator": 11729,
            "percentage": 1.7,
            "sourceTable": "G09c",
            "sourceCell": "K48",
            "basis": "Place of usual residence"
          }
        ],
        "topLanguagesSpokenAtHome": [
          {
            "name": "English only",
            "count": 7299,
            "denominator": 11729,
            "percentage": 62.2,
            "sourceTable": "G13c",
            "sourceCell": "G12",
            "basis": "Place of usual residence"
          },
          {
            "name": "Vietnamese",
            "count": 957,
            "denominator": 11729,
            "percentage": 8.2,
            "sourceTable": "G13c",
            "sourceCell": "G59",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italian",
            "count": 215,
            "denominator": 11729,
            "percentage": 1.8,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          },
          {
            "name": "Cantonese",
            "count": 183,
            "denominator": 11729,
            "percentage": 1.6,
            "sourceTable": "G13c",
            "sourceCell": "G19",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 173,
            "denominator": 11729,
            "percentage": 1.5,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          }
        ],
        "topNonEnglishLanguagesSpokenAtHome": [
          {
            "name": "Vietnamese",
            "count": 957,
            "denominator": 11729,
            "percentage": 8.2,
            "sourceTable": "G13c",
            "sourceCell": "G59",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italian",
            "count": 215,
            "denominator": 11729,
            "percentage": 1.8,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          },
          {
            "name": "Cantonese",
            "count": 183,
            "denominator": 11729,
            "percentage": 1.6,
            "sourceTable": "G13c",
            "sourceCell": "G19",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 173,
            "denominator": 11729,
            "percentage": 1.5,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Spanish",
            "count": 168,
            "denominator": 11729,
            "percentage": 1.4,
            "sourceTable": "G13c",
            "sourceCell": "G55",
            "basis": "Place of usual residence"
          }
        ],
        "religiousAffiliationSummary": [
          {
            "name": "No religion / secular or other spiritual beliefs",
            "count": 5566,
            "denominator": 11729,
            "percentage": 47.5,
            "sourceTable": "G14",
            "sourceCell": "D43",
            "basis": "Place of usual residence"
          },
          {
            "name": "Christianity",
            "count": 3629,
            "denominator": 11729,
            "percentage": 30.9,
            "sourceTable": "G14",
            "sourceCell": "D30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Buddhism",
            "count": 685,
            "denominator": 11729,
            "percentage": 5.8,
            "sourceTable": "G14",
            "sourceCell": "D9",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hinduism",
            "count": 406,
            "denominator": 11729,
            "percentage": 3.5,
            "sourceTable": "G14",
            "sourceCell": "D31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Islam",
            "count": 448,
            "denominator": 11729,
            "percentage": 3.8,
            "sourceTable": "G14",
            "sourceCell": "D32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Judaism",
            "count": 13,
            "denominator": 11729,
            "percentage": 0.1,
            "sourceTable": "G14",
            "sourceCell": "D33",
            "basis": "Place of usual residence"
          },
          {
            "name": "Other religions",
            "count": 73,
            "denominator": 11729,
            "percentage": 0.6,
            "sourceTable": "G14",
            "sourceCell": "D38",
            "basis": "Place of usual residence"
          },
          {
            "name": "Religious affiliation not stated",
            "count": 909,
            "denominator": 11729,
            "percentage": 7.8,
            "sourceTable": "G14",
            "sourceCell": "D44",
            "basis": "Place of usual residence"
          }
        ]
      },
      "additionalHouseholdContext": {
        "cantoneseSpokenAtHome": {
          "count": 183,
          "denominator": 11729,
          "percentage": 1.6,
          "numeratorLabel": "Persons who used Cantonese at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G19"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "mandarinSpokenAtHome": {
          "count": 173,
          "denominator": 11729,
          "percentage": 1.5,
          "numeratorLabel": "Persons who used Mandarin at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G20"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "hongKongBornPopulation": {
          "count": 31,
          "denominator": 11729,
          "percentage": 0.3,
          "numeratorLabel": "Persons born in Hong Kong (SAR of China)",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K28"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        },
        "chinaBornPopulation": {
          "count": 134,
          "denominator": 11729,
          "percentage": 1.1,
          "numeratorLabel": "Persons born in China, excluding SARs and Taiwan",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K20"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        }
      }
    },
    {
      "suburb": "Footscray",
      "geographyType": "SAL",
      "geographyCode": "SAL20935",
      "censusYear": 2021,
      "source": "Australian Bureau of Statistics",
      "retrievedAt": "2026-07-14",
      "contextOnly": true,
      "excludeFromSuburbScore": true,
      "scoreContribution": 0,
      "sourceMetadata": {
        "product": "2021 Census General Community Profile",
        "profileUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL20935",
        "downloadUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL20935/download/GCP_SAL20935.xlsx",
        "sourceWorkbook": "GCP_SAL20935.xlsx",
        "sourceWorkbookSha256": "d8ab286f1ef95b16e01795b37b746f29162c07cb374919fc7480baf5c570287a",
        "geographicBoundaryEdition": "ASGS Edition 3",
        "privacyNote": "ABS applies small random adjustments to cell values. Component sums can differ slightly from published totals."
      },
      "community": {
        "totalPopulation": {
          "count": 17131,
          "sourceTable": "G01",
          "sourceCells": {
            "value": "D17"
          },
          "basis": "Place of usual residence"
        },
        "medianAge": {
          "value": 34,
          "unit": "years",
          "applicablePopulation": "Persons, excluding overseas visitors",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B13"
          },
          "basis": "Place of usual residence"
        },
        "householdsWithChildren": {
          "count": 1768,
          "denominator": 7370,
          "percentage": 24.0,
          "numeratorLabel": "Occupied private dwellings whose primary family is a couple family with children or a one-parent family",
          "denominatorLabel": "Total occupied private dwellings in G42, excluding visitor-only and other non-classifiable households",
          "sourceTable": "G42",
          "sourceCells": {
            "numerator": [
              "C36",
              "D36"
            ],
            "denominator": "I36"
          },
          "basis": "Place of enumeration",
          "components": {
            "coupleFamilyWithChildren": 1175,
            "oneParentFamily": 593
          },
          "notes": "For multiple-family households, G42 classifies the household using the primary family's composition."
        },
        "medianHouseholdIncome": {
          "value": 1763,
          "unit": "AUD per week",
          "applicablePopulation": "Occupied private dwellings; published ABS median household income",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B19"
          },
          "basis": "Place of enumeration"
        },
        "tenure": {
          "denominator": 7370,
          "denominatorLabel": "Total occupied private dwellings in G37, excluding visitor-only and other non-classifiable households",
          "basis": "Place of enumeration",
          "sourceTable": "G37",
          "ownerOccupied": {
            "count": 3042,
            "percentage": 41.3,
            "components": {
              "ownedOutright": 1054,
              "ownedWithMortgage": 1988
            },
            "sourceCells": [
              "G14",
              "G16"
            ]
          },
          "renting": {
            "count": 4123,
            "percentage": 55.9,
            "sourceCells": [
              "G25"
            ],
            "notes": "G37 rented total excludes dwellings occupied rent-free; those are included in other tenure."
          },
          "otherTenure": {
            "count": 89,
            "percentage": 1.2,
            "sourceCells": [
              "G27"
            ]
          },
          "notStated": {
            "count": 117,
            "percentage": 1.6,
            "sourceCells": [
              "G29"
            ]
          },
          "denominatorCell": "G31"
        },
        "overseasBornPopulation": {
          "count": 7132,
          "denominator": 17131,
          "percentage": 41.6,
          "numeratorLabel": "Persons born outside Australia",
          "denominatorLabel": "Total persons",
          "sourceTable": "G01",
          "sourceCells": {
            "numerator": [
              "D44"
            ],
            "denominator": "D17"
          },
          "basis": "Place of usual residence",
          "notes": "The G01 'Elsewhere' numerator includes inadequately described birthplaces and people at sea, and excludes birthplace not stated. The denominator is all persons."
        },
        "topOverseasCountriesOfBirth": [
          {
            "name": "Vietnam",
            "count": 1460,
            "denominator": 17131,
            "percentage": 8.5,
            "sourceTable": "G09c",
            "sourceCell": "K59",
            "basis": "Place of usual residence"
          },
          {
            "name": "India",
            "count": 800,
            "denominator": 17131,
            "percentage": 4.7,
            "sourceTable": "G09c",
            "sourceCell": "K29",
            "basis": "Place of usual residence"
          },
          {
            "name": "England",
            "count": 375,
            "denominator": 17131,
            "percentage": 2.2,
            "sourceTable": "G09c",
            "sourceCell": "K23",
            "basis": "Place of usual residence"
          },
          {
            "name": "China (excludes SARs and Taiwan)",
            "count": 374,
            "denominator": 17131,
            "percentage": 2.2,
            "sourceTable": "G09c",
            "sourceCell": "K20",
            "basis": "Place of usual residence"
          },
          {
            "name": "New Zealand",
            "count": 349,
            "denominator": 17131,
            "percentage": 2.0,
            "sourceTable": "G09c",
            "sourceCell": "K44",
            "basis": "Place of usual residence"
          }
        ],
        "topLanguagesSpokenAtHome": [
          {
            "name": "English only",
            "count": 9126,
            "denominator": 17131,
            "percentage": 53.3,
            "sourceTable": "G13c",
            "sourceCell": "G12",
            "basis": "Place of usual residence"
          },
          {
            "name": "Vietnamese",
            "count": 1803,
            "denominator": 17131,
            "percentage": 10.5,
            "sourceTable": "G13c",
            "sourceCell": "G59",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 481,
            "denominator": 17131,
            "percentage": 2.8,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Cantonese",
            "count": 399,
            "denominator": 17131,
            "percentage": 2.3,
            "sourceTable": "G13c",
            "sourceCell": "G19",
            "basis": "Place of usual residence"
          },
          {
            "name": "Spanish",
            "count": 346,
            "denominator": 17131,
            "percentage": 2.0,
            "sourceTable": "G13c",
            "sourceCell": "G55",
            "basis": "Place of usual residence"
          }
        ],
        "topNonEnglishLanguagesSpokenAtHome": [
          {
            "name": "Vietnamese",
            "count": 1803,
            "denominator": 17131,
            "percentage": 10.5,
            "sourceTable": "G13c",
            "sourceCell": "G59",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 481,
            "denominator": 17131,
            "percentage": 2.8,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Cantonese",
            "count": 399,
            "denominator": 17131,
            "percentage": 2.3,
            "sourceTable": "G13c",
            "sourceCell": "G19",
            "basis": "Place of usual residence"
          },
          {
            "name": "Spanish",
            "count": 346,
            "denominator": 17131,
            "percentage": 2.0,
            "sourceTable": "G13c",
            "sourceCell": "G55",
            "basis": "Place of usual residence"
          },
          {
            "name": "Nepali",
            "count": 249,
            "denominator": 17131,
            "percentage": 1.5,
            "sourceTable": "G13c",
            "sourceCell": "G31",
            "basis": "Place of usual residence"
          }
        ],
        "religiousAffiliationSummary": [
          {
            "name": "No religion / secular or other spiritual beliefs",
            "count": 8185,
            "denominator": 17131,
            "percentage": 47.8,
            "sourceTable": "G14",
            "sourceCell": "D43",
            "basis": "Place of usual residence"
          },
          {
            "name": "Christianity",
            "count": 4168,
            "denominator": 17131,
            "percentage": 24.3,
            "sourceTable": "G14",
            "sourceCell": "D30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Buddhism",
            "count": 1402,
            "denominator": 17131,
            "percentage": 8.2,
            "sourceTable": "G14",
            "sourceCell": "D9",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hinduism",
            "count": 812,
            "denominator": 17131,
            "percentage": 4.7,
            "sourceTable": "G14",
            "sourceCell": "D31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Islam",
            "count": 768,
            "denominator": 17131,
            "percentage": 4.5,
            "sourceTable": "G14",
            "sourceCell": "D32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Judaism",
            "count": 24,
            "denominator": 17131,
            "percentage": 0.1,
            "sourceTable": "G14",
            "sourceCell": "D33",
            "basis": "Place of usual residence"
          },
          {
            "name": "Other religions",
            "count": 122,
            "denominator": 17131,
            "percentage": 0.7,
            "sourceTable": "G14",
            "sourceCell": "D38",
            "basis": "Place of usual residence"
          },
          {
            "name": "Religious affiliation not stated",
            "count": 1639,
            "denominator": 17131,
            "percentage": 9.6,
            "sourceTable": "G14",
            "sourceCell": "D44",
            "basis": "Place of usual residence"
          }
        ]
      },
      "additionalHouseholdContext": {
        "cantoneseSpokenAtHome": {
          "count": 399,
          "denominator": 17131,
          "percentage": 2.3,
          "numeratorLabel": "Persons who used Cantonese at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G19"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "mandarinSpokenAtHome": {
          "count": 481,
          "denominator": 17131,
          "percentage": 2.8,
          "numeratorLabel": "Persons who used Mandarin at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G20"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "hongKongBornPopulation": {
          "count": 84,
          "denominator": 17131,
          "percentage": 0.5,
          "numeratorLabel": "Persons born in Hong Kong (SAR of China)",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K28"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        },
        "chinaBornPopulation": {
          "count": 374,
          "denominator": 17131,
          "percentage": 2.2,
          "numeratorLabel": "Persons born in China, excluding SARs and Taiwan",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K20"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        }
      }
    },
    {
      "suburb": "Sunshine",
      "geographyType": "SAL",
      "geographyCode": "SAL22395",
      "censusYear": 2021,
      "source": "Australian Bureau of Statistics",
      "retrievedAt": "2026-07-14",
      "contextOnly": true,
      "excludeFromSuburbScore": true,
      "scoreContribution": 0,
      "sourceMetadata": {
        "product": "2021 Census General Community Profile",
        "profileUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL22395",
        "downloadUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL22395/download/GCP_SAL22395.xlsx",
        "sourceWorkbook": "GCP_SAL22395.xlsx",
        "sourceWorkbookSha256": "dac18f39a4f9f461dc92ad973e7a0266627ec9ae8847833a547de5fff4c26caa",
        "geographicBoundaryEdition": "ASGS Edition 3",
        "privacyNote": "ABS applies small random adjustments to cell values. Component sums can differ slightly from published totals."
      },
      "community": {
        "totalPopulation": {
          "count": 9445,
          "sourceTable": "G01",
          "sourceCells": {
            "value": "D17"
          },
          "basis": "Place of usual residence"
        },
        "medianAge": {
          "value": 35,
          "unit": "years",
          "applicablePopulation": "Persons, excluding overseas visitors",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B13"
          },
          "basis": "Place of usual residence"
        },
        "householdsWithChildren": {
          "count": 1427,
          "denominator": 3365,
          "percentage": 42.4,
          "numeratorLabel": "Occupied private dwellings whose primary family is a couple family with children or a one-parent family",
          "denominatorLabel": "Total occupied private dwellings in G42, excluding visitor-only and other non-classifiable households",
          "sourceTable": "G42",
          "sourceCells": {
            "numerator": [
              "C36",
              "D36"
            ],
            "denominator": "I36"
          },
          "basis": "Place of enumeration",
          "components": {
            "coupleFamilyWithChildren": 971,
            "oneParentFamily": 456
          },
          "notes": "For multiple-family households, G42 classifies the household using the primary family's composition."
        },
        "medianHouseholdIncome": {
          "value": 1566,
          "unit": "AUD per week",
          "applicablePopulation": "Occupied private dwellings; published ABS median household income",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B19"
          },
          "basis": "Place of enumeration"
        },
        "tenure": {
          "denominator": 3365,
          "denominatorLabel": "Total occupied private dwellings in G37, excluding visitor-only and other non-classifiable households",
          "basis": "Place of enumeration",
          "sourceTable": "G37",
          "ownerOccupied": {
            "count": 1873,
            "percentage": 55.7,
            "components": {
              "ownedOutright": 912,
              "ownedWithMortgage": 961
            },
            "sourceCells": [
              "G14",
              "G16"
            ]
          },
          "renting": {
            "count": 1361,
            "percentage": 40.4,
            "sourceCells": [
              "G25"
            ],
            "notes": "G37 rented total excludes dwellings occupied rent-free; those are included in other tenure."
          },
          "otherTenure": {
            "count": 56,
            "percentage": 1.7,
            "sourceCells": [
              "G27"
            ]
          },
          "notStated": {
            "count": 69,
            "percentage": 2.1,
            "sourceCells": [
              "G29"
            ]
          },
          "denominatorCell": "G31"
        },
        "overseasBornPopulation": {
          "count": 4560,
          "denominator": 9445,
          "percentage": 48.3,
          "numeratorLabel": "Persons born outside Australia",
          "denominatorLabel": "Total persons",
          "sourceTable": "G01",
          "sourceCells": {
            "numerator": [
              "D44"
            ],
            "denominator": "D17"
          },
          "basis": "Place of usual residence",
          "notes": "The G01 'Elsewhere' numerator includes inadequately described birthplaces and people at sea, and excludes birthplace not stated. The denominator is all persons."
        },
        "topOverseasCountriesOfBirth": [
          {
            "name": "Vietnam",
            "count": 1275,
            "denominator": 9445,
            "percentage": 13.5,
            "sourceTable": "G09c",
            "sourceCell": "K59",
            "basis": "Place of usual residence"
          },
          {
            "name": "India",
            "count": 444,
            "denominator": 9445,
            "percentage": 4.7,
            "sourceTable": "G09c",
            "sourceCell": "K29",
            "basis": "Place of usual residence"
          },
          {
            "name": "Nepal",
            "count": 354,
            "denominator": 9445,
            "percentage": 3.7,
            "sourceTable": "G09c",
            "sourceCell": "K42",
            "basis": "Place of usual residence"
          },
          {
            "name": "Philippines",
            "count": 227,
            "denominator": 9445,
            "percentage": 2.4,
            "sourceTable": "G09c",
            "sourceCell": "K48",
            "basis": "Place of usual residence"
          },
          {
            "name": "China (excludes SARs and Taiwan)",
            "count": 174,
            "denominator": 9445,
            "percentage": 1.8,
            "sourceTable": "G09c",
            "sourceCell": "K20",
            "basis": "Place of usual residence"
          }
        ],
        "topLanguagesSpokenAtHome": [
          {
            "name": "English only",
            "count": 3833,
            "denominator": 9445,
            "percentage": 40.6,
            "sourceTable": "G13c",
            "sourceCell": "G12",
            "basis": "Place of usual residence"
          },
          {
            "name": "Vietnamese",
            "count": 1620,
            "denominator": 9445,
            "percentage": 17.2,
            "sourceTable": "G13c",
            "sourceCell": "G59",
            "basis": "Place of usual residence"
          },
          {
            "name": "Nepali",
            "count": 335,
            "denominator": 9445,
            "percentage": 3.5,
            "sourceTable": "G13c",
            "sourceCell": "G31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Cantonese",
            "count": 236,
            "denominator": 9445,
            "percentage": 2.5,
            "sourceTable": "G13c",
            "sourceCell": "G19",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 201,
            "denominator": 9445,
            "percentage": 2.1,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          }
        ],
        "topNonEnglishLanguagesSpokenAtHome": [
          {
            "name": "Vietnamese",
            "count": 1620,
            "denominator": 9445,
            "percentage": 17.2,
            "sourceTable": "G13c",
            "sourceCell": "G59",
            "basis": "Place of usual residence"
          },
          {
            "name": "Nepali",
            "count": 335,
            "denominator": 9445,
            "percentage": 3.5,
            "sourceTable": "G13c",
            "sourceCell": "G31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Cantonese",
            "count": 236,
            "denominator": 9445,
            "percentage": 2.5,
            "sourceTable": "G13c",
            "sourceCell": "G19",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 201,
            "denominator": 9445,
            "percentage": 2.1,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greek",
            "count": 178,
            "denominator": 9445,
            "percentage": 1.9,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          }
        ],
        "religiousAffiliationSummary": [
          {
            "name": "No religion / secular or other spiritual beliefs",
            "count": 2930,
            "denominator": 9445,
            "percentage": 31.0,
            "sourceTable": "G14",
            "sourceCell": "D43",
            "basis": "Place of usual residence"
          },
          {
            "name": "Christianity",
            "count": 3476,
            "denominator": 9445,
            "percentage": 36.8,
            "sourceTable": "G14",
            "sourceCell": "D30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Buddhism",
            "count": 961,
            "denominator": 9445,
            "percentage": 10.2,
            "sourceTable": "G14",
            "sourceCell": "D9",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hinduism",
            "count": 637,
            "denominator": 9445,
            "percentage": 6.7,
            "sourceTable": "G14",
            "sourceCell": "D31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Islam",
            "count": 534,
            "denominator": 9445,
            "percentage": 5.7,
            "sourceTable": "G14",
            "sourceCell": "D32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Judaism",
            "count": 11,
            "denominator": 9445,
            "percentage": 0.1,
            "sourceTable": "G14",
            "sourceCell": "D33",
            "basis": "Place of usual residence"
          },
          {
            "name": "Other religions",
            "count": 156,
            "denominator": 9445,
            "percentage": 1.7,
            "sourceTable": "G14",
            "sourceCell": "D38",
            "basis": "Place of usual residence"
          },
          {
            "name": "Religious affiliation not stated",
            "count": 739,
            "denominator": 9445,
            "percentage": 7.8,
            "sourceTable": "G14",
            "sourceCell": "D44",
            "basis": "Place of usual residence"
          }
        ]
      },
      "additionalHouseholdContext": {
        "cantoneseSpokenAtHome": {
          "count": 236,
          "denominator": 9445,
          "percentage": 2.5,
          "numeratorLabel": "Persons who used Cantonese at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G19"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "mandarinSpokenAtHome": {
          "count": 201,
          "denominator": 9445,
          "percentage": 2.1,
          "numeratorLabel": "Persons who used Mandarin at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G20"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "hongKongBornPopulation": {
          "count": 16,
          "denominator": 9445,
          "percentage": 0.2,
          "numeratorLabel": "Persons born in Hong Kong (SAR of China)",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K28"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        },
        "chinaBornPopulation": {
          "count": 174,
          "denominator": 9445,
          "percentage": 1.8,
          "numeratorLabel": "Persons born in China, excluding SARs and Taiwan",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K20"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        }
      }
    },
    {
      "suburb": "St Albans",
      "geographyType": "SAL",
      "geographyCode": "SAL22330",
      "censusYear": 2021,
      "source": "Australian Bureau of Statistics",
      "retrievedAt": "2026-07-14",
      "contextOnly": true,
      "excludeFromSuburbScore": true,
      "scoreContribution": 0,
      "sourceMetadata": {
        "product": "2021 Census General Community Profile",
        "profileUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL22330",
        "downloadUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL22330/download/GCP_SAL22330.xlsx",
        "sourceWorkbook": "GCP_SAL22330.xlsx",
        "sourceWorkbookSha256": "79adc1c3ef3659f490d432bf246fdc713c3b93ae6817f7b4b7f92c4d13ba38b7",
        "geographicBoundaryEdition": "ASGS Edition 3",
        "privacyNote": "ABS applies small random adjustments to cell values. Component sums can differ slightly from published totals."
      },
      "community": {
        "totalPopulation": {
          "count": 38042,
          "sourceTable": "G01",
          "sourceCells": {
            "value": "D17"
          },
          "basis": "Place of usual residence"
        },
        "medianAge": {
          "value": 36,
          "unit": "years",
          "applicablePopulation": "Persons, excluding overseas visitors",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B13"
          },
          "basis": "Place of usual residence"
        },
        "householdsWithChildren": {
          "count": 5930,
          "denominator": 12379,
          "percentage": 47.9,
          "numeratorLabel": "Occupied private dwellings whose primary family is a couple family with children or a one-parent family",
          "denominatorLabel": "Total occupied private dwellings in G42, excluding visitor-only and other non-classifiable households",
          "sourceTable": "G42",
          "sourceCells": {
            "numerator": [
              "C36",
              "D36"
            ],
            "denominator": "I36"
          },
          "basis": "Place of enumeration",
          "components": {
            "coupleFamilyWithChildren": 3789,
            "oneParentFamily": 2141
          },
          "notes": "For multiple-family households, G42 classifies the household using the primary family's composition."
        },
        "medianHouseholdIncome": {
          "value": 1205,
          "unit": "AUD per week",
          "applicablePopulation": "Occupied private dwellings; published ABS median household income",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B19"
          },
          "basis": "Place of enumeration"
        },
        "tenure": {
          "denominator": 12379,
          "denominatorLabel": "Total occupied private dwellings in G37, excluding visitor-only and other non-classifiable households",
          "basis": "Place of enumeration",
          "sourceTable": "G37",
          "ownerOccupied": {
            "count": 7308,
            "percentage": 59.0,
            "components": {
              "ownedOutright": 4279,
              "ownedWithMortgage": 3029
            },
            "sourceCells": [
              "G14",
              "G16"
            ]
          },
          "renting": {
            "count": 4476,
            "percentage": 36.2,
            "sourceCells": [
              "G25"
            ],
            "notes": "G37 rented total excludes dwellings occupied rent-free; those are included in other tenure."
          },
          "otherTenure": {
            "count": 231,
            "percentage": 1.9,
            "sourceCells": [
              "G27"
            ]
          },
          "notStated": {
            "count": 363,
            "percentage": 2.9,
            "sourceCells": [
              "G29"
            ]
          },
          "denominatorCell": "G31"
        },
        "overseasBornPopulation": {
          "count": 22222,
          "denominator": 38042,
          "percentage": 58.4,
          "numeratorLabel": "Persons born outside Australia",
          "denominatorLabel": "Total persons",
          "sourceTable": "G01",
          "sourceCells": {
            "numerator": [
              "D44"
            ],
            "denominator": "D17"
          },
          "basis": "Place of usual residence",
          "notes": "The G01 'Elsewhere' numerator includes inadequately described birthplaces and people at sea, and excludes birthplace not stated. The denominator is all persons."
        },
        "topOverseasCountriesOfBirth": [
          {
            "name": "Vietnam",
            "count": 8176,
            "denominator": 38042,
            "percentage": 21.5,
            "sourceTable": "G09c",
            "sourceCell": "K59",
            "basis": "Place of usual residence"
          },
          {
            "name": "India",
            "count": 2222,
            "denominator": 38042,
            "percentage": 5.8,
            "sourceTable": "G09c",
            "sourceCell": "K29",
            "basis": "Place of usual residence"
          },
          {
            "name": "Philippines",
            "count": 1148,
            "denominator": 38042,
            "percentage": 3.0,
            "sourceTable": "G09c",
            "sourceCell": "K48",
            "basis": "Place of usual residence"
          },
          {
            "name": "Malta",
            "count": 1046,
            "denominator": 38042,
            "percentage": 2.7,
            "sourceTable": "G09c",
            "sourceCell": "K39",
            "basis": "Place of usual residence"
          },
          {
            "name": "Iraq",
            "count": 534,
            "denominator": 38042,
            "percentage": 1.4,
            "sourceTable": "G09c",
            "sourceCell": "K32",
            "basis": "Place of usual residence"
          }
        ],
        "topLanguagesSpokenAtHome": [
          {
            "name": "Vietnamese",
            "count": 11102,
            "denominator": 38042,
            "percentage": 29.2,
            "sourceTable": "G13c",
            "sourceCell": "G59",
            "basis": "Place of usual residence"
          },
          {
            "name": "English only",
            "count": 8202,
            "denominator": 38042,
            "percentage": 21.6,
            "sourceTable": "G13c",
            "sourceCell": "G12",
            "basis": "Place of usual residence"
          },
          {
            "name": "Punjabi",
            "count": 1592,
            "denominator": 38042,
            "percentage": 4.2,
            "sourceTable": "G13c",
            "sourceCell": "G32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Cantonese",
            "count": 906,
            "denominator": 38042,
            "percentage": 2.4,
            "sourceTable": "G13c",
            "sourceCell": "G19",
            "basis": "Place of usual residence"
          },
          {
            "name": "Arabic",
            "count": 801,
            "denominator": 38042,
            "percentage": 2.1,
            "sourceTable": "G13c",
            "sourceCell": "G16",
            "basis": "Place of usual residence"
          }
        ],
        "topNonEnglishLanguagesSpokenAtHome": [
          {
            "name": "Vietnamese",
            "count": 11102,
            "denominator": 38042,
            "percentage": 29.2,
            "sourceTable": "G13c",
            "sourceCell": "G59",
            "basis": "Place of usual residence"
          },
          {
            "name": "Punjabi",
            "count": 1592,
            "denominator": 38042,
            "percentage": 4.2,
            "sourceTable": "G13c",
            "sourceCell": "G32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Cantonese",
            "count": 906,
            "denominator": 38042,
            "percentage": 2.4,
            "sourceTable": "G13c",
            "sourceCell": "G19",
            "basis": "Place of usual residence"
          },
          {
            "name": "Arabic",
            "count": 801,
            "denominator": 38042,
            "percentage": 2.1,
            "sourceTable": "G13c",
            "sourceCell": "G16",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greek",
            "count": 685,
            "denominator": 38042,
            "percentage": 1.8,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          }
        ],
        "religiousAffiliationSummary": [
          {
            "name": "No religion / secular or other spiritual beliefs",
            "count": 7554,
            "denominator": 38042,
            "percentage": 19.9,
            "sourceTable": "G14",
            "sourceCell": "D43",
            "basis": "Place of usual residence"
          },
          {
            "name": "Christianity",
            "count": 15461,
            "denominator": 38042,
            "percentage": 40.6,
            "sourceTable": "G14",
            "sourceCell": "D30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Buddhism",
            "count": 5932,
            "denominator": 38042,
            "percentage": 15.6,
            "sourceTable": "G14",
            "sourceCell": "D9",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hinduism",
            "count": 1486,
            "denominator": 38042,
            "percentage": 3.9,
            "sourceTable": "G14",
            "sourceCell": "D31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Islam",
            "count": 2245,
            "denominator": 38042,
            "percentage": 5.9,
            "sourceTable": "G14",
            "sourceCell": "D32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Judaism",
            "count": 5,
            "denominator": 38042,
            "percentage": 0.0,
            "sourceTable": "G14",
            "sourceCell": "D33",
            "basis": "Place of usual residence"
          },
          {
            "name": "Other religions",
            "count": 1316,
            "denominator": 38042,
            "percentage": 3.5,
            "sourceTable": "G14",
            "sourceCell": "D38",
            "basis": "Place of usual residence"
          },
          {
            "name": "Religious affiliation not stated",
            "count": 4029,
            "denominator": 38042,
            "percentage": 10.6,
            "sourceTable": "G14",
            "sourceCell": "D44",
            "basis": "Place of usual residence"
          }
        ]
      },
      "additionalHouseholdContext": {
        "cantoneseSpokenAtHome": {
          "count": 906,
          "denominator": 38042,
          "percentage": 2.4,
          "numeratorLabel": "Persons who used Cantonese at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G19"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "mandarinSpokenAtHome": {
          "count": 477,
          "denominator": 38042,
          "percentage": 1.3,
          "numeratorLabel": "Persons who used Mandarin at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G20"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "hongKongBornPopulation": {
          "count": 88,
          "denominator": 38042,
          "percentage": 0.2,
          "numeratorLabel": "Persons born in Hong Kong (SAR of China)",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K28"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        },
        "chinaBornPopulation": {
          "count": 403,
          "denominator": 38042,
          "percentage": 1.1,
          "numeratorLabel": "Persons born in China, excluding SARs and Taiwan",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K20"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        }
      }
    },
    {
      "suburb": "Brunswick",
      "geographyType": "SAL",
      "geographyCode": "SAL20361",
      "censusYear": 2021,
      "source": "Australian Bureau of Statistics",
      "retrievedAt": "2026-07-14",
      "contextOnly": true,
      "excludeFromSuburbScore": true,
      "scoreContribution": 0,
      "sourceMetadata": {
        "product": "2021 Census General Community Profile",
        "profileUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL20361",
        "downloadUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL20361/download/GCP_SAL20361.xlsx",
        "sourceWorkbook": "GCP_SAL20361.xlsx",
        "sourceWorkbookSha256": "2515e31a4bf5c0a6c3b4089bf81105eb84759c458cc9c63f0daa020658284491",
        "geographicBoundaryEdition": "ASGS Edition 3",
        "privacyNote": "ABS applies small random adjustments to cell values. Component sums can differ slightly from published totals."
      },
      "community": {
        "totalPopulation": {
          "count": 24896,
          "sourceTable": "G01",
          "sourceCells": {
            "value": "D17"
          },
          "basis": "Place of usual residence"
        },
        "medianAge": {
          "value": 34,
          "unit": "years",
          "applicablePopulation": "Persons, excluding overseas visitors",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B13"
          },
          "basis": "Place of usual residence"
        },
        "householdsWithChildren": {
          "count": 2492,
          "denominator": 11040,
          "percentage": 22.6,
          "numeratorLabel": "Occupied private dwellings whose primary family is a couple family with children or a one-parent family",
          "denominatorLabel": "Total occupied private dwellings in G42, excluding visitor-only and other non-classifiable households",
          "sourceTable": "G42",
          "sourceCells": {
            "numerator": [
              "C36",
              "D36"
            ],
            "denominator": "I36"
          },
          "basis": "Place of enumeration",
          "components": {
            "coupleFamilyWithChildren": 1856,
            "oneParentFamily": 636
          },
          "notes": "For multiple-family households, G42 classifies the household using the primary family's composition."
        },
        "medianHouseholdIncome": {
          "value": 2096,
          "unit": "AUD per week",
          "applicablePopulation": "Occupied private dwellings; published ABS median household income",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B19"
          },
          "basis": "Place of enumeration"
        },
        "tenure": {
          "denominator": 11040,
          "denominatorLabel": "Total occupied private dwellings in G37, excluding visitor-only and other non-classifiable households",
          "basis": "Place of enumeration",
          "sourceTable": "G37",
          "ownerOccupied": {
            "count": 5506,
            "percentage": 49.9,
            "components": {
              "ownedOutright": 2614,
              "ownedWithMortgage": 2892
            },
            "sourceCells": [
              "G14",
              "G16"
            ]
          },
          "renting": {
            "count": 5305,
            "percentage": 48.1,
            "sourceCells": [
              "G25"
            ],
            "notes": "G37 rented total excludes dwellings occupied rent-free; those are included in other tenure."
          },
          "otherTenure": {
            "count": 127,
            "percentage": 1.2,
            "sourceCells": [
              "G27"
            ]
          },
          "notStated": {
            "count": 109,
            "percentage": 1.0,
            "sourceCells": [
              "G29"
            ]
          },
          "denominatorCell": "G31"
        },
        "overseasBornPopulation": {
          "count": 7619,
          "denominator": 24896,
          "percentage": 30.6,
          "numeratorLabel": "Persons born outside Australia",
          "denominatorLabel": "Total persons",
          "sourceTable": "G01",
          "sourceCells": {
            "numerator": [
              "D44"
            ],
            "denominator": "D17"
          },
          "basis": "Place of usual residence",
          "notes": "The G01 'Elsewhere' numerator includes inadequately described birthplaces and people at sea, and excludes birthplace not stated. The denominator is all persons."
        },
        "topOverseasCountriesOfBirth": [
          {
            "name": "England",
            "count": 893,
            "denominator": 24896,
            "percentage": 3.6,
            "sourceTable": "G09c",
            "sourceCell": "K23",
            "basis": "Place of usual residence"
          },
          {
            "name": "New Zealand",
            "count": 740,
            "denominator": 24896,
            "percentage": 3.0,
            "sourceTable": "G09c",
            "sourceCell": "K44",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italy",
            "count": 645,
            "denominator": 24896,
            "percentage": 2.6,
            "sourceTable": "G09c",
            "sourceCell": "K34",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greece",
            "count": 612,
            "denominator": 24896,
            "percentage": 2.5,
            "sourceTable": "G09c",
            "sourceCell": "K27",
            "basis": "Place of usual residence"
          },
          {
            "name": "United States of America",
            "count": 324,
            "denominator": 24896,
            "percentage": 1.3,
            "sourceTable": "G09c",
            "sourceCell": "K58",
            "basis": "Place of usual residence"
          }
        ],
        "topLanguagesSpokenAtHome": [
          {
            "name": "English only",
            "count": 18152,
            "denominator": 24896,
            "percentage": 72.9,
            "sourceTable": "G13c",
            "sourceCell": "G12",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greek",
            "count": 1124,
            "denominator": 24896,
            "percentage": 4.5,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italian",
            "count": 966,
            "denominator": 24896,
            "percentage": 3.9,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 451,
            "denominator": 24896,
            "percentage": 1.8,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Arabic",
            "count": 438,
            "denominator": 24896,
            "percentage": 1.8,
            "sourceTable": "G13c",
            "sourceCell": "G16",
            "basis": "Place of usual residence"
          }
        ],
        "topNonEnglishLanguagesSpokenAtHome": [
          {
            "name": "Greek",
            "count": 1124,
            "denominator": 24896,
            "percentage": 4.5,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italian",
            "count": 966,
            "denominator": 24896,
            "percentage": 3.9,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 451,
            "denominator": 24896,
            "percentage": 1.8,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Arabic",
            "count": 438,
            "denominator": 24896,
            "percentage": 1.8,
            "sourceTable": "G13c",
            "sourceCell": "G16",
            "basis": "Place of usual residence"
          },
          {
            "name": "Spanish",
            "count": 341,
            "denominator": 24896,
            "percentage": 1.4,
            "sourceTable": "G13c",
            "sourceCell": "G55",
            "basis": "Place of usual residence"
          }
        ],
        "religiousAffiliationSummary": [
          {
            "name": "No religion / secular or other spiritual beliefs",
            "count": 15587,
            "denominator": 24896,
            "percentage": 62.6,
            "sourceTable": "G14",
            "sourceCell": "D43",
            "basis": "Place of usual residence"
          },
          {
            "name": "Christianity",
            "count": 6252,
            "denominator": 24896,
            "percentage": 25.1,
            "sourceTable": "G14",
            "sourceCell": "D30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Buddhism",
            "count": 474,
            "denominator": 24896,
            "percentage": 1.9,
            "sourceTable": "G14",
            "sourceCell": "D9",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hinduism",
            "count": 423,
            "denominator": 24896,
            "percentage": 1.7,
            "sourceTable": "G14",
            "sourceCell": "D31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Islam",
            "count": 724,
            "denominator": 24896,
            "percentage": 2.9,
            "sourceTable": "G14",
            "sourceCell": "D32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Judaism",
            "count": 116,
            "denominator": 24896,
            "percentage": 0.5,
            "sourceTable": "G14",
            "sourceCell": "D33",
            "basis": "Place of usual residence"
          },
          {
            "name": "Other religions",
            "count": 143,
            "denominator": 24896,
            "percentage": 0.6,
            "sourceTable": "G14",
            "sourceCell": "D38",
            "basis": "Place of usual residence"
          },
          {
            "name": "Religious affiliation not stated",
            "count": 1180,
            "denominator": 24896,
            "percentage": 4.7,
            "sourceTable": "G14",
            "sourceCell": "D44",
            "basis": "Place of usual residence"
          }
        ]
      },
      "additionalHouseholdContext": {
        "cantoneseSpokenAtHome": {
          "count": 179,
          "denominator": 24896,
          "percentage": 0.7,
          "numeratorLabel": "Persons who used Cantonese at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G19"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "mandarinSpokenAtHome": {
          "count": 451,
          "denominator": 24896,
          "percentage": 1.8,
          "numeratorLabel": "Persons who used Mandarin at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G20"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "hongKongBornPopulation": {
          "count": 70,
          "denominator": 24896,
          "percentage": 0.3,
          "numeratorLabel": "Persons born in Hong Kong (SAR of China)",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K28"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        },
        "chinaBornPopulation": {
          "count": 306,
          "denominator": 24896,
          "percentage": 1.2,
          "numeratorLabel": "Persons born in China, excluding SARs and Taiwan",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K20"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        }
      }
    },
    {
      "suburb": "Coburg",
      "geographyType": "SAL",
      "geographyCode": "SAL20596",
      "censusYear": 2021,
      "source": "Australian Bureau of Statistics",
      "retrievedAt": "2026-07-14",
      "contextOnly": true,
      "excludeFromSuburbScore": true,
      "scoreContribution": 0,
      "sourceMetadata": {
        "product": "2021 Census General Community Profile",
        "profileUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL20596",
        "downloadUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL20596/download/GCP_SAL20596.xlsx",
        "sourceWorkbook": "GCP_SAL20596.xlsx",
        "sourceWorkbookSha256": "f0fa11fbc343c5a8c3f9c119367ccaced3e2bfe39766ed6750cb405d401e91fa",
        "geographicBoundaryEdition": "ASGS Edition 3",
        "privacyNote": "ABS applies small random adjustments to cell values. Component sums can differ slightly from published totals."
      },
      "community": {
        "totalPopulation": {
          "count": 26574,
          "sourceTable": "G01",
          "sourceCells": {
            "value": "D17"
          },
          "basis": "Place of usual residence"
        },
        "medianAge": {
          "value": 37,
          "unit": "years",
          "applicablePopulation": "Persons, excluding overseas visitors",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B13"
          },
          "basis": "Place of usual residence"
        },
        "householdsWithChildren": {
          "count": 3993,
          "denominator": 10230,
          "percentage": 39.0,
          "numeratorLabel": "Occupied private dwellings whose primary family is a couple family with children or a one-parent family",
          "denominatorLabel": "Total occupied private dwellings in G42, excluding visitor-only and other non-classifiable households",
          "sourceTable": "G42",
          "sourceCells": {
            "numerator": [
              "C36",
              "D36"
            ],
            "denominator": "I36"
          },
          "basis": "Place of enumeration",
          "components": {
            "coupleFamilyWithChildren": 3055,
            "oneParentFamily": 938
          },
          "notes": "For multiple-family households, G42 classifies the household using the primary family's composition."
        },
        "medianHouseholdIncome": {
          "value": 2065,
          "unit": "AUD per week",
          "applicablePopulation": "Occupied private dwellings; published ABS median household income",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B19"
          },
          "basis": "Place of enumeration"
        },
        "tenure": {
          "denominator": 10230,
          "denominatorLabel": "Total occupied private dwellings in G37, excluding visitor-only and other non-classifiable households",
          "basis": "Place of enumeration",
          "sourceTable": "G37",
          "ownerOccupied": {
            "count": 6577,
            "percentage": 64.3,
            "components": {
              "ownedOutright": 3296,
              "ownedWithMortgage": 3281
            },
            "sourceCells": [
              "G14",
              "G16"
            ]
          },
          "renting": {
            "count": 3395,
            "percentage": 33.2,
            "sourceCells": [
              "G25"
            ],
            "notes": "G37 rented total excludes dwellings occupied rent-free; those are included in other tenure."
          },
          "otherTenure": {
            "count": 136,
            "percentage": 1.3,
            "sourceCells": [
              "G27"
            ]
          },
          "notStated": {
            "count": 126,
            "percentage": 1.2,
            "sourceCells": [
              "G29"
            ]
          },
          "denominatorCell": "G31"
        },
        "overseasBornPopulation": {
          "count": 7886,
          "denominator": 26574,
          "percentage": 29.7,
          "numeratorLabel": "Persons born outside Australia",
          "denominatorLabel": "Total persons",
          "sourceTable": "G01",
          "sourceCells": {
            "numerator": [
              "D44"
            ],
            "denominator": "D17"
          },
          "basis": "Place of usual residence",
          "notes": "The G01 'Elsewhere' numerator includes inadequately described birthplaces and people at sea, and excludes birthplace not stated. The denominator is all persons."
        },
        "topOverseasCountriesOfBirth": [
          {
            "name": "Italy",
            "count": 1178,
            "denominator": 26574,
            "percentage": 4.4,
            "sourceTable": "G09c",
            "sourceCell": "K34",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greece",
            "count": 679,
            "denominator": 26574,
            "percentage": 2.6,
            "sourceTable": "G09c",
            "sourceCell": "K27",
            "basis": "Place of usual residence"
          },
          {
            "name": "England",
            "count": 639,
            "denominator": 26574,
            "percentage": 2.4,
            "sourceTable": "G09c",
            "sourceCell": "K23",
            "basis": "Place of usual residence"
          },
          {
            "name": "Lebanon",
            "count": 617,
            "denominator": 26574,
            "percentage": 2.3,
            "sourceTable": "G09c",
            "sourceCell": "K37",
            "basis": "Place of usual residence"
          },
          {
            "name": "New Zealand",
            "count": 470,
            "denominator": 26574,
            "percentage": 1.8,
            "sourceTable": "G09c",
            "sourceCell": "K44",
            "basis": "Place of usual residence"
          }
        ],
        "topLanguagesSpokenAtHome": [
          {
            "name": "English only",
            "count": 17343,
            "denominator": 26574,
            "percentage": 65.3,
            "sourceTable": "G13c",
            "sourceCell": "G12",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italian",
            "count": 1811,
            "denominator": 26574,
            "percentage": 6.8,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greek",
            "count": 1456,
            "denominator": 26574,
            "percentage": 5.5,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Arabic",
            "count": 1388,
            "denominator": 26574,
            "percentage": 5.2,
            "sourceTable": "G13c",
            "sourceCell": "G16",
            "basis": "Place of usual residence"
          },
          {
            "name": "Turkish",
            "count": 494,
            "denominator": 26574,
            "percentage": 1.9,
            "sourceTable": "G13c",
            "sourceCell": "G58",
            "basis": "Place of usual residence"
          }
        ],
        "topNonEnglishLanguagesSpokenAtHome": [
          {
            "name": "Italian",
            "count": 1811,
            "denominator": 26574,
            "percentage": 6.8,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greek",
            "count": 1456,
            "denominator": 26574,
            "percentage": 5.5,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Arabic",
            "count": 1388,
            "denominator": 26574,
            "percentage": 5.2,
            "sourceTable": "G13c",
            "sourceCell": "G16",
            "basis": "Place of usual residence"
          },
          {
            "name": "Turkish",
            "count": 494,
            "denominator": 26574,
            "percentage": 1.9,
            "sourceTable": "G13c",
            "sourceCell": "G58",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 464,
            "denominator": 26574,
            "percentage": 1.7,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          }
        ],
        "religiousAffiliationSummary": [
          {
            "name": "No religion / secular or other spiritual beliefs",
            "count": 12683,
            "denominator": 26574,
            "percentage": 47.7,
            "sourceTable": "G14",
            "sourceCell": "D43",
            "basis": "Place of usual residence"
          },
          {
            "name": "Christianity",
            "count": 9779,
            "denominator": 26574,
            "percentage": 36.8,
            "sourceTable": "G14",
            "sourceCell": "D30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Buddhism",
            "count": 428,
            "denominator": 26574,
            "percentage": 1.6,
            "sourceTable": "G14",
            "sourceCell": "D9",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hinduism",
            "count": 510,
            "denominator": 26574,
            "percentage": 1.9,
            "sourceTable": "G14",
            "sourceCell": "D31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Islam",
            "count": 1690,
            "denominator": 26574,
            "percentage": 6.4,
            "sourceTable": "G14",
            "sourceCell": "D32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Judaism",
            "count": 49,
            "denominator": 26574,
            "percentage": 0.2,
            "sourceTable": "G14",
            "sourceCell": "D33",
            "basis": "Place of usual residence"
          },
          {
            "name": "Other religions",
            "count": 128,
            "denominator": 26574,
            "percentage": 0.5,
            "sourceTable": "G14",
            "sourceCell": "D38",
            "basis": "Place of usual residence"
          },
          {
            "name": "Religious affiliation not stated",
            "count": 1304,
            "denominator": 26574,
            "percentage": 4.9,
            "sourceTable": "G14",
            "sourceCell": "D44",
            "basis": "Place of usual residence"
          }
        ]
      },
      "additionalHouseholdContext": {
        "cantoneseSpokenAtHome": {
          "count": 115,
          "denominator": 26574,
          "percentage": 0.4,
          "numeratorLabel": "Persons who used Cantonese at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G19"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "mandarinSpokenAtHome": {
          "count": 464,
          "denominator": 26574,
          "percentage": 1.7,
          "numeratorLabel": "Persons who used Mandarin at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G20"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "hongKongBornPopulation": {
          "count": 53,
          "denominator": 26574,
          "percentage": 0.2,
          "numeratorLabel": "Persons born in Hong Kong (SAR of China)",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K28"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        },
        "chinaBornPopulation": {
          "count": 327,
          "denominator": 26574,
          "percentage": 1.2,
          "numeratorLabel": "Persons born in China, excluding SARs and Taiwan",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K20"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        }
      }
    },
    {
      "suburb": "Pascoe Vale",
      "geographyType": "SAL",
      "geographyCode": "SAL22041",
      "censusYear": 2021,
      "source": "Australian Bureau of Statistics",
      "retrievedAt": "2026-07-14",
      "contextOnly": true,
      "excludeFromSuburbScore": true,
      "scoreContribution": 0,
      "sourceMetadata": {
        "product": "2021 Census General Community Profile",
        "profileUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL22041",
        "downloadUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL22041/download/GCP_SAL22041.xlsx",
        "sourceWorkbook": "GCP_SAL22041.xlsx",
        "sourceWorkbookSha256": "32442fe8fc4fbe20c5093ee9353d05910d3d0dbe75257e7554eab4f2a1d2cbde",
        "geographicBoundaryEdition": "ASGS Edition 3",
        "privacyNote": "ABS applies small random adjustments to cell values. Component sums can differ slightly from published totals."
      },
      "community": {
        "totalPopulation": {
          "count": 18171,
          "sourceTable": "G01",
          "sourceCells": {
            "value": "D17"
          },
          "basis": "Place of usual residence"
        },
        "medianAge": {
          "value": 36,
          "unit": "years",
          "applicablePopulation": "Persons, excluding overseas visitors",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B13"
          },
          "basis": "Place of usual residence"
        },
        "householdsWithChildren": {
          "count": 2942,
          "denominator": 7137,
          "percentage": 41.2,
          "numeratorLabel": "Occupied private dwellings whose primary family is a couple family with children or a one-parent family",
          "denominatorLabel": "Total occupied private dwellings in G42, excluding visitor-only and other non-classifiable households",
          "sourceTable": "G42",
          "sourceCells": {
            "numerator": [
              "C36",
              "D36"
            ],
            "denominator": "I36"
          },
          "basis": "Place of enumeration",
          "components": {
            "coupleFamilyWithChildren": 2234,
            "oneParentFamily": 708
          },
          "notes": "For multiple-family households, G42 classifies the household using the primary family's composition."
        },
        "medianHouseholdIncome": {
          "value": 2025,
          "unit": "AUD per week",
          "applicablePopulation": "Occupied private dwellings; published ABS median household income",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B19"
          },
          "basis": "Place of enumeration"
        },
        "tenure": {
          "denominator": 7137,
          "denominatorLabel": "Total occupied private dwellings in G37, excluding visitor-only and other non-classifiable households",
          "basis": "Place of enumeration",
          "sourceTable": "G37",
          "ownerOccupied": {
            "count": 4467,
            "percentage": 62.6,
            "components": {
              "ownedOutright": 2023,
              "ownedWithMortgage": 2444
            },
            "sourceCells": [
              "G14",
              "G16"
            ]
          },
          "renting": {
            "count": 2485,
            "percentage": 34.8,
            "sourceCells": [
              "G25"
            ],
            "notes": "G37 rented total excludes dwellings occupied rent-free; those are included in other tenure."
          },
          "otherTenure": {
            "count": 80,
            "percentage": 1.1,
            "sourceCells": [
              "G27"
            ]
          },
          "notStated": {
            "count": 107,
            "percentage": 1.5,
            "sourceCells": [
              "G29"
            ]
          },
          "denominatorCell": "G31"
        },
        "overseasBornPopulation": {
          "count": 5580,
          "denominator": 18171,
          "percentage": 30.7,
          "numeratorLabel": "Persons born outside Australia",
          "denominatorLabel": "Total persons",
          "sourceTable": "G01",
          "sourceCells": {
            "numerator": [
              "D44"
            ],
            "denominator": "D17"
          },
          "basis": "Place of usual residence",
          "notes": "The G01 'Elsewhere' numerator includes inadequately described birthplaces and people at sea, and excludes birthplace not stated. The denominator is all persons."
        },
        "topOverseasCountriesOfBirth": [
          {
            "name": "Italy",
            "count": 717,
            "denominator": 18171,
            "percentage": 3.9,
            "sourceTable": "G09c",
            "sourceCell": "K34",
            "basis": "Place of usual residence"
          },
          {
            "name": "India",
            "count": 534,
            "denominator": 18171,
            "percentage": 2.9,
            "sourceTable": "G09c",
            "sourceCell": "K29",
            "basis": "Place of usual residence"
          },
          {
            "name": "England",
            "count": 330,
            "denominator": 18171,
            "percentage": 1.8,
            "sourceTable": "G09c",
            "sourceCell": "K23",
            "basis": "Place of usual residence"
          },
          {
            "name": "New Zealand",
            "count": 265,
            "denominator": 18171,
            "percentage": 1.5,
            "sourceTable": "G09c",
            "sourceCell": "K44",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greece",
            "count": 238,
            "denominator": 18171,
            "percentage": 1.3,
            "sourceTable": "G09c",
            "sourceCell": "K27",
            "basis": "Place of usual residence"
          }
        ],
        "topLanguagesSpokenAtHome": [
          {
            "name": "English only",
            "count": 11323,
            "denominator": 18171,
            "percentage": 62.3,
            "sourceTable": "G13c",
            "sourceCell": "G12",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italian",
            "count": 1161,
            "denominator": 18171,
            "percentage": 6.4,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greek",
            "count": 676,
            "denominator": 18171,
            "percentage": 3.7,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Arabic",
            "count": 666,
            "denominator": 18171,
            "percentage": 3.7,
            "sourceTable": "G13c",
            "sourceCell": "G16",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 360,
            "denominator": 18171,
            "percentage": 2.0,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          }
        ],
        "topNonEnglishLanguagesSpokenAtHome": [
          {
            "name": "Italian",
            "count": 1161,
            "denominator": 18171,
            "percentage": 6.4,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greek",
            "count": 676,
            "denominator": 18171,
            "percentage": 3.7,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Arabic",
            "count": 666,
            "denominator": 18171,
            "percentage": 3.7,
            "sourceTable": "G13c",
            "sourceCell": "G16",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 360,
            "denominator": 18171,
            "percentage": 2.0,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Turkish",
            "count": 354,
            "denominator": 18171,
            "percentage": 1.9,
            "sourceTable": "G13c",
            "sourceCell": "G58",
            "basis": "Place of usual residence"
          }
        ],
        "religiousAffiliationSummary": [
          {
            "name": "No religion / secular or other spiritual beliefs",
            "count": 6270,
            "denominator": 18171,
            "percentage": 34.5,
            "sourceTable": "G14",
            "sourceCell": "D43",
            "basis": "Place of usual residence"
          },
          {
            "name": "Christianity",
            "count": 8283,
            "denominator": 18171,
            "percentage": 45.6,
            "sourceTable": "G14",
            "sourceCell": "D30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Buddhism",
            "count": 403,
            "denominator": 18171,
            "percentage": 2.2,
            "sourceTable": "G14",
            "sourceCell": "D9",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hinduism",
            "count": 636,
            "denominator": 18171,
            "percentage": 3.5,
            "sourceTable": "G14",
            "sourceCell": "D31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Islam",
            "count": 1386,
            "denominator": 18171,
            "percentage": 7.6,
            "sourceTable": "G14",
            "sourceCell": "D32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Judaism",
            "count": 6,
            "denominator": 18171,
            "percentage": 0.0,
            "sourceTable": "G14",
            "sourceCell": "D33",
            "basis": "Place of usual residence"
          },
          {
            "name": "Other religions",
            "count": 143,
            "denominator": 18171,
            "percentage": 0.8,
            "sourceTable": "G14",
            "sourceCell": "D38",
            "basis": "Place of usual residence"
          },
          {
            "name": "Religious affiliation not stated",
            "count": 1042,
            "denominator": 18171,
            "percentage": 5.7,
            "sourceTable": "G14",
            "sourceCell": "D44",
            "basis": "Place of usual residence"
          }
        ]
      },
      "additionalHouseholdContext": {
        "cantoneseSpokenAtHome": {
          "count": 100,
          "denominator": 18171,
          "percentage": 0.6,
          "numeratorLabel": "Persons who used Cantonese at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G19"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "mandarinSpokenAtHome": {
          "count": 360,
          "denominator": 18171,
          "percentage": 2.0,
          "numeratorLabel": "Persons who used Mandarin at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G20"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "hongKongBornPopulation": {
          "count": 39,
          "denominator": 18171,
          "percentage": 0.2,
          "numeratorLabel": "Persons born in Hong Kong (SAR of China)",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K28"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        },
        "chinaBornPopulation": {
          "count": 232,
          "denominator": 18171,
          "percentage": 1.3,
          "numeratorLabel": "Persons born in China, excluding SARs and Taiwan",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K20"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        }
      }
    },
    {
      "suburb": "Glenroy",
      "geographyType": "SAL",
      "geographyCode": "SAL21047",
      "censusYear": 2021,
      "source": "Australian Bureau of Statistics",
      "retrievedAt": "2026-07-14",
      "contextOnly": true,
      "excludeFromSuburbScore": true,
      "scoreContribution": 0,
      "sourceMetadata": {
        "product": "2021 Census General Community Profile",
        "profileUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL21047",
        "downloadUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL21047/download/GCP_SAL21047.xlsx",
        "sourceWorkbook": "GCP_SAL21047.xlsx",
        "sourceWorkbookSha256": "b748e76f160fb59461be1ac39e0e9cf4de82b1e4dd3f170ecfa7e8dc0618d9f4",
        "geographicBoundaryEdition": "ASGS Edition 3",
        "privacyNote": "ABS applies small random adjustments to cell values. Component sums can differ slightly from published totals."
      },
      "community": {
        "totalPopulation": {
          "count": 23792,
          "sourceTable": "G01",
          "sourceCells": {
            "value": "D17"
          },
          "basis": "Place of usual residence"
        },
        "medianAge": {
          "value": 34,
          "unit": "years",
          "applicablePopulation": "Persons, excluding overseas visitors",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B13"
          },
          "basis": "Place of usual residence"
        },
        "householdsWithChildren": {
          "count": 3530,
          "denominator": 8609,
          "percentage": 41.0,
          "numeratorLabel": "Occupied private dwellings whose primary family is a couple family with children or a one-parent family",
          "denominatorLabel": "Total occupied private dwellings in G42, excluding visitor-only and other non-classifiable households",
          "sourceTable": "G42",
          "sourceCells": {
            "numerator": [
              "C36",
              "D36"
            ],
            "denominator": "I36"
          },
          "basis": "Place of enumeration",
          "components": {
            "coupleFamilyWithChildren": 2545,
            "oneParentFamily": 985
          },
          "notes": "For multiple-family households, G42 classifies the household using the primary family's composition."
        },
        "medianHouseholdIncome": {
          "value": 1655,
          "unit": "AUD per week",
          "applicablePopulation": "Occupied private dwellings; published ABS median household income",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B19"
          },
          "basis": "Place of enumeration"
        },
        "tenure": {
          "denominator": 8609,
          "denominatorLabel": "Total occupied private dwellings in G37, excluding visitor-only and other non-classifiable households",
          "basis": "Place of enumeration",
          "sourceTable": "G37",
          "ownerOccupied": {
            "count": 5128,
            "percentage": 59.6,
            "components": {
              "ownedOutright": 2336,
              "ownedWithMortgage": 2792
            },
            "sourceCells": [
              "G14",
              "G16"
            ]
          },
          "renting": {
            "count": 3226,
            "percentage": 37.5,
            "sourceCells": [
              "G25"
            ],
            "notes": "G37 rented total excludes dwellings occupied rent-free; those are included in other tenure."
          },
          "otherTenure": {
            "count": 111,
            "percentage": 1.3,
            "sourceCells": [
              "G27"
            ]
          },
          "notStated": {
            "count": 140,
            "percentage": 1.6,
            "sourceCells": [
              "G29"
            ]
          },
          "denominatorCell": "G31"
        },
        "overseasBornPopulation": {
          "count": 10231,
          "denominator": 23792,
          "percentage": 43.0,
          "numeratorLabel": "Persons born outside Australia",
          "denominatorLabel": "Total persons",
          "sourceTable": "G01",
          "sourceCells": {
            "numerator": [
              "D44"
            ],
            "denominator": "D17"
          },
          "basis": "Place of usual residence",
          "notes": "The G01 'Elsewhere' numerator includes inadequately described birthplaces and people at sea, and excludes birthplace not stated. The denominator is all persons."
        },
        "topOverseasCountriesOfBirth": [
          {
            "name": "Nepal",
            "count": 1803,
            "denominator": 23792,
            "percentage": 7.6,
            "sourceTable": "G09c",
            "sourceCell": "K42",
            "basis": "Place of usual residence"
          },
          {
            "name": "India",
            "count": 1236,
            "denominator": 23792,
            "percentage": 5.2,
            "sourceTable": "G09c",
            "sourceCell": "K29",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italy",
            "count": 739,
            "denominator": 23792,
            "percentage": 3.1,
            "sourceTable": "G09c",
            "sourceCell": "K34",
            "basis": "Place of usual residence"
          },
          {
            "name": "Pakistan",
            "count": 715,
            "denominator": 23792,
            "percentage": 3.0,
            "sourceTable": "G09c",
            "sourceCell": "K46",
            "basis": "Place of usual residence"
          },
          {
            "name": "Lebanon",
            "count": 551,
            "denominator": 23792,
            "percentage": 2.3,
            "sourceTable": "G09c",
            "sourceCell": "K37",
            "basis": "Place of usual residence"
          }
        ],
        "topLanguagesSpokenAtHome": [
          {
            "name": "English only",
            "count": 10364,
            "denominator": 23792,
            "percentage": 43.6,
            "sourceTable": "G13c",
            "sourceCell": "G12",
            "basis": "Place of usual residence"
          },
          {
            "name": "Arabic",
            "count": 1972,
            "denominator": 23792,
            "percentage": 8.3,
            "sourceTable": "G13c",
            "sourceCell": "G16",
            "basis": "Place of usual residence"
          },
          {
            "name": "Nepali",
            "count": 1860,
            "denominator": 23792,
            "percentage": 7.8,
            "sourceTable": "G13c",
            "sourceCell": "G31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italian",
            "count": 1073,
            "denominator": 23792,
            "percentage": 4.5,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          },
          {
            "name": "Urdu",
            "count": 903,
            "denominator": 23792,
            "percentage": 3.8,
            "sourceTable": "G13c",
            "sourceCell": "G34",
            "basis": "Place of usual residence"
          }
        ],
        "topNonEnglishLanguagesSpokenAtHome": [
          {
            "name": "Arabic",
            "count": 1972,
            "denominator": 23792,
            "percentage": 8.3,
            "sourceTable": "G13c",
            "sourceCell": "G16",
            "basis": "Place of usual residence"
          },
          {
            "name": "Nepali",
            "count": 1860,
            "denominator": 23792,
            "percentage": 7.8,
            "sourceTable": "G13c",
            "sourceCell": "G31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italian",
            "count": 1073,
            "denominator": 23792,
            "percentage": 4.5,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          },
          {
            "name": "Urdu",
            "count": 903,
            "denominator": 23792,
            "percentage": 3.8,
            "sourceTable": "G13c",
            "sourceCell": "G34",
            "basis": "Place of usual residence"
          },
          {
            "name": "Turkish",
            "count": 884,
            "denominator": 23792,
            "percentage": 3.7,
            "sourceTable": "G13c",
            "sourceCell": "G58",
            "basis": "Place of usual residence"
          }
        ],
        "religiousAffiliationSummary": [
          {
            "name": "No religion / secular or other spiritual beliefs",
            "count": 5419,
            "denominator": 23792,
            "percentage": 22.8,
            "sourceTable": "G14",
            "sourceCell": "D43",
            "basis": "Place of usual residence"
          },
          {
            "name": "Christianity",
            "count": 8471,
            "denominator": 23792,
            "percentage": 35.6,
            "sourceTable": "G14",
            "sourceCell": "D30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Buddhism",
            "count": 704,
            "denominator": 23792,
            "percentage": 3.0,
            "sourceTable": "G14",
            "sourceCell": "D9",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hinduism",
            "count": 2558,
            "denominator": 23792,
            "percentage": 10.8,
            "sourceTable": "G14",
            "sourceCell": "D31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Islam",
            "count": 4440,
            "denominator": 23792,
            "percentage": 18.7,
            "sourceTable": "G14",
            "sourceCell": "D32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Judaism",
            "count": 4,
            "denominator": 23792,
            "percentage": 0.0,
            "sourceTable": "G14",
            "sourceCell": "D33",
            "basis": "Place of usual residence"
          },
          {
            "name": "Other religions",
            "count": 258,
            "denominator": 23792,
            "percentage": 1.1,
            "sourceTable": "G14",
            "sourceCell": "D38",
            "basis": "Place of usual residence"
          },
          {
            "name": "Religious affiliation not stated",
            "count": 1933,
            "denominator": 23792,
            "percentage": 8.1,
            "sourceTable": "G14",
            "sourceCell": "D44",
            "basis": "Place of usual residence"
          }
        ]
      },
      "additionalHouseholdContext": {
        "cantoneseSpokenAtHome": {
          "count": 168,
          "denominator": 23792,
          "percentage": 0.7,
          "numeratorLabel": "Persons who used Cantonese at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G19"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "mandarinSpokenAtHome": {
          "count": 374,
          "denominator": 23792,
          "percentage": 1.6,
          "numeratorLabel": "Persons who used Mandarin at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G20"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "hongKongBornPopulation": {
          "count": 41,
          "denominator": 23792,
          "percentage": 0.2,
          "numeratorLabel": "Persons born in Hong Kong (SAR of China)",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K28"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        },
        "chinaBornPopulation": {
          "count": 305,
          "denominator": 23792,
          "percentage": 1.3,
          "numeratorLabel": "Persons born in China, excluding SARs and Taiwan",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K20"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        }
      }
    },
    {
      "suburb": "Kensington",
      "geographyType": "SAL",
      "geographyCode": "SAL21327",
      "censusYear": 2021,
      "source": "Australian Bureau of Statistics",
      "retrievedAt": "2026-07-14",
      "contextOnly": true,
      "excludeFromSuburbScore": true,
      "scoreContribution": 0,
      "sourceMetadata": {
        "product": "2021 Census General Community Profile",
        "profileUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL21327",
        "downloadUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL21327/download/GCP_SAL21327.xlsx",
        "sourceWorkbook": "GCP_SAL21327.xlsx",
        "sourceWorkbookSha256": "48b06d3777affee033b800bc08f5e10e5c7a9ab2b1d7e945e9f4058e87f566d4",
        "geographicBoundaryEdition": "ASGS Edition 3",
        "privacyNote": "ABS applies small random adjustments to cell values. Component sums can differ slightly from published totals."
      },
      "community": {
        "totalPopulation": {
          "count": 10745,
          "sourceTable": "G01",
          "sourceCells": {
            "value": "D17"
          },
          "basis": "Place of usual residence"
        },
        "medianAge": {
          "value": 35,
          "unit": "years",
          "applicablePopulation": "Persons, excluding overseas visitors",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B13"
          },
          "basis": "Place of usual residence"
        },
        "householdsWithChildren": {
          "count": 1307,
          "denominator": 4727,
          "percentage": 27.6,
          "numeratorLabel": "Occupied private dwellings whose primary family is a couple family with children or a one-parent family",
          "denominatorLabel": "Total occupied private dwellings in G42, excluding visitor-only and other non-classifiable households",
          "sourceTable": "G42",
          "sourceCells": {
            "numerator": [
              "C36",
              "D36"
            ],
            "denominator": "I36"
          },
          "basis": "Place of enumeration",
          "components": {
            "coupleFamilyWithChildren": 951,
            "oneParentFamily": 356
          },
          "notes": "For multiple-family households, G42 classifies the household using the primary family's composition."
        },
        "medianHouseholdIncome": {
          "value": 2216,
          "unit": "AUD per week",
          "applicablePopulation": "Occupied private dwellings; published ABS median household income",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B19"
          },
          "basis": "Place of enumeration"
        },
        "tenure": {
          "denominator": 4727,
          "denominatorLabel": "Total occupied private dwellings in G37, excluding visitor-only and other non-classifiable households",
          "basis": "Place of enumeration",
          "sourceTable": "G37",
          "ownerOccupied": {
            "count": 2300,
            "percentage": 48.7,
            "components": {
              "ownedOutright": 854,
              "ownedWithMortgage": 1446
            },
            "sourceCells": [
              "G14",
              "G16"
            ]
          },
          "renting": {
            "count": 2323,
            "percentage": 49.1,
            "sourceCells": [
              "G25"
            ],
            "notes": "G37 rented total excludes dwellings occupied rent-free; those are included in other tenure."
          },
          "otherTenure": {
            "count": 56,
            "percentage": 1.2,
            "sourceCells": [
              "G27"
            ]
          },
          "notStated": {
            "count": 49,
            "percentage": 1.0,
            "sourceCells": [
              "G29"
            ]
          },
          "denominatorCell": "G31"
        },
        "overseasBornPopulation": {
          "count": 3337,
          "denominator": 10745,
          "percentage": 31.1,
          "numeratorLabel": "Persons born outside Australia",
          "denominatorLabel": "Total persons",
          "sourceTable": "G01",
          "sourceCells": {
            "numerator": [
              "D44"
            ],
            "denominator": "D17"
          },
          "basis": "Place of usual residence",
          "notes": "The G01 'Elsewhere' numerator includes inadequately described birthplaces and people at sea, and excludes birthplace not stated. The denominator is all persons."
        },
        "topOverseasCountriesOfBirth": [
          {
            "name": "England",
            "count": 348,
            "denominator": 10745,
            "percentage": 3.2,
            "sourceTable": "G09c",
            "sourceCell": "K23",
            "basis": "Place of usual residence"
          },
          {
            "name": "Vietnam",
            "count": 321,
            "denominator": 10745,
            "percentage": 3.0,
            "sourceTable": "G09c",
            "sourceCell": "K59",
            "basis": "Place of usual residence"
          },
          {
            "name": "China (excludes SARs and Taiwan)",
            "count": 296,
            "denominator": 10745,
            "percentage": 2.8,
            "sourceTable": "G09c",
            "sourceCell": "K20",
            "basis": "Place of usual residence"
          },
          {
            "name": "New Zealand",
            "count": 273,
            "denominator": 10745,
            "percentage": 2.5,
            "sourceTable": "G09c",
            "sourceCell": "K44",
            "basis": "Place of usual residence"
          },
          {
            "name": "India",
            "count": 171,
            "denominator": 10745,
            "percentage": 1.6,
            "sourceTable": "G09c",
            "sourceCell": "K29",
            "basis": "Place of usual residence"
          }
        ],
        "topLanguagesSpokenAtHome": [
          {
            "name": "English only",
            "count": 7680,
            "denominator": 10745,
            "percentage": 71.5,
            "sourceTable": "G13c",
            "sourceCell": "G12",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 353,
            "denominator": 10745,
            "percentage": 3.3,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Cantonese",
            "count": 342,
            "denominator": 10745,
            "percentage": 3.2,
            "sourceTable": "G13c",
            "sourceCell": "G19",
            "basis": "Place of usual residence"
          },
          {
            "name": "Vietnamese",
            "count": 326,
            "denominator": 10745,
            "percentage": 3.0,
            "sourceTable": "G13c",
            "sourceCell": "G59",
            "basis": "Place of usual residence"
          },
          {
            "name": "Spanish",
            "count": 171,
            "denominator": 10745,
            "percentage": 1.6,
            "sourceTable": "G13c",
            "sourceCell": "G55",
            "basis": "Place of usual residence"
          }
        ],
        "topNonEnglishLanguagesSpokenAtHome": [
          {
            "name": "Mandarin",
            "count": 353,
            "denominator": 10745,
            "percentage": 3.3,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Cantonese",
            "count": 342,
            "denominator": 10745,
            "percentage": 3.2,
            "sourceTable": "G13c",
            "sourceCell": "G19",
            "basis": "Place of usual residence"
          },
          {
            "name": "Vietnamese",
            "count": 326,
            "denominator": 10745,
            "percentage": 3.0,
            "sourceTable": "G13c",
            "sourceCell": "G59",
            "basis": "Place of usual residence"
          },
          {
            "name": "Spanish",
            "count": 171,
            "denominator": 10745,
            "percentage": 1.6,
            "sourceTable": "G13c",
            "sourceCell": "G55",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italian",
            "count": 129,
            "denominator": 10745,
            "percentage": 1.2,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          }
        ],
        "religiousAffiliationSummary": [
          {
            "name": "No religion / secular or other spiritual beliefs",
            "count": 6151,
            "denominator": 10745,
            "percentage": 57.2,
            "sourceTable": "G14",
            "sourceCell": "D43",
            "basis": "Place of usual residence"
          },
          {
            "name": "Christianity",
            "count": 2913,
            "denominator": 10745,
            "percentage": 27.1,
            "sourceTable": "G14",
            "sourceCell": "D30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Buddhism",
            "count": 440,
            "denominator": 10745,
            "percentage": 4.1,
            "sourceTable": "G14",
            "sourceCell": "D9",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hinduism",
            "count": 159,
            "denominator": 10745,
            "percentage": 1.5,
            "sourceTable": "G14",
            "sourceCell": "D31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Islam",
            "count": 413,
            "denominator": 10745,
            "percentage": 3.8,
            "sourceTable": "G14",
            "sourceCell": "D32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Judaism",
            "count": 29,
            "denominator": 10745,
            "percentage": 0.3,
            "sourceTable": "G14",
            "sourceCell": "D33",
            "basis": "Place of usual residence"
          },
          {
            "name": "Other religions",
            "count": 61,
            "denominator": 10745,
            "percentage": 0.6,
            "sourceTable": "G14",
            "sourceCell": "D38",
            "basis": "Place of usual residence"
          },
          {
            "name": "Religious affiliation not stated",
            "count": 584,
            "denominator": 10745,
            "percentage": 5.4,
            "sourceTable": "G14",
            "sourceCell": "D44",
            "basis": "Place of usual residence"
          }
        ]
      },
      "additionalHouseholdContext": {
        "cantoneseSpokenAtHome": {
          "count": 342,
          "denominator": 10745,
          "percentage": 3.2,
          "numeratorLabel": "Persons who used Cantonese at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G19"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "mandarinSpokenAtHome": {
          "count": 353,
          "denominator": 10745,
          "percentage": 3.3,
          "numeratorLabel": "Persons who used Mandarin at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G20"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "hongKongBornPopulation": {
          "count": 68,
          "denominator": 10745,
          "percentage": 0.6,
          "numeratorLabel": "Persons born in Hong Kong (SAR of China)",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K28"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        },
        "chinaBornPopulation": {
          "count": 296,
          "denominator": 10745,
          "percentage": 2.8,
          "numeratorLabel": "Persons born in China, excluding SARs and Taiwan",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K20"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        }
      }
    },
    {
      "suburb": "Flemington",
      "geographyType": "SAL",
      "geographyCode": "SAL20929",
      "censusYear": 2021,
      "source": "Australian Bureau of Statistics",
      "retrievedAt": "2026-07-14",
      "contextOnly": true,
      "excludeFromSuburbScore": true,
      "scoreContribution": 0,
      "sourceMetadata": {
        "product": "2021 Census General Community Profile",
        "profileUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL20929",
        "downloadUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL20929/download/GCP_SAL20929.xlsx",
        "sourceWorkbook": "GCP_SAL20929.xlsx",
        "sourceWorkbookSha256": "1633e14cb904b584c41c985961bd77a3337a5c4ffbcc5029fc9b0618a669da41",
        "geographicBoundaryEdition": "ASGS Edition 3",
        "privacyNote": "ABS applies small random adjustments to cell values. Component sums can differ slightly from published totals."
      },
      "community": {
        "totalPopulation": {
          "count": 7025,
          "sourceTable": "G01",
          "sourceCells": {
            "value": "D17"
          },
          "basis": "Place of usual residence"
        },
        "medianAge": {
          "value": 34,
          "unit": "years",
          "applicablePopulation": "Persons, excluding overseas visitors",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B13"
          },
          "basis": "Place of usual residence"
        },
        "householdsWithChildren": {
          "count": 858,
          "denominator": 3118,
          "percentage": 27.5,
          "numeratorLabel": "Occupied private dwellings whose primary family is a couple family with children or a one-parent family",
          "denominatorLabel": "Total occupied private dwellings in G42, excluding visitor-only and other non-classifiable households",
          "sourceTable": "G42",
          "sourceCells": {
            "numerator": [
              "C36",
              "D36"
            ],
            "denominator": "I36"
          },
          "basis": "Place of enumeration",
          "components": {
            "coupleFamilyWithChildren": 523,
            "oneParentFamily": 335
          },
          "notes": "For multiple-family households, G42 classifies the household using the primary family's composition."
        },
        "medianHouseholdIncome": {
          "value": 1525,
          "unit": "AUD per week",
          "applicablePopulation": "Occupied private dwellings; published ABS median household income",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B19"
          },
          "basis": "Place of enumeration"
        },
        "tenure": {
          "denominator": 3118,
          "denominatorLabel": "Total occupied private dwellings in G37, excluding visitor-only and other non-classifiable households",
          "basis": "Place of enumeration",
          "sourceTable": "G37",
          "ownerOccupied": {
            "count": 1150,
            "percentage": 36.9,
            "components": {
              "ownedOutright": 462,
              "ownedWithMortgage": 688
            },
            "sourceCells": [
              "G14",
              "G16"
            ]
          },
          "renting": {
            "count": 1887,
            "percentage": 60.5,
            "sourceCells": [
              "G25"
            ],
            "notes": "G37 rented total excludes dwellings occupied rent-free; those are included in other tenure."
          },
          "otherTenure": {
            "count": 34,
            "percentage": 1.1,
            "sourceCells": [
              "G27"
            ]
          },
          "notStated": {
            "count": 49,
            "percentage": 1.6,
            "sourceCells": [
              "G29"
            ]
          },
          "denominatorCell": "G31"
        },
        "overseasBornPopulation": {
          "count": 2449,
          "denominator": 7025,
          "percentage": 34.9,
          "numeratorLabel": "Persons born outside Australia",
          "denominatorLabel": "Total persons",
          "sourceTable": "G01",
          "sourceCells": {
            "numerator": [
              "D44"
            ],
            "denominator": "D17"
          },
          "basis": "Place of usual residence",
          "notes": "The G01 'Elsewhere' numerator includes inadequately described birthplaces and people at sea, and excludes birthplace not stated. The denominator is all persons."
        },
        "topOverseasCountriesOfBirth": [
          {
            "name": "Vietnam",
            "count": 318,
            "denominator": 7025,
            "percentage": 4.5,
            "sourceTable": "G09c",
            "sourceCell": "K59",
            "basis": "Place of usual residence"
          },
          {
            "name": "England",
            "count": 149,
            "denominator": 7025,
            "percentage": 2.1,
            "sourceTable": "G09c",
            "sourceCell": "K23",
            "basis": "Place of usual residence"
          },
          {
            "name": "New Zealand",
            "count": 133,
            "denominator": 7025,
            "percentage": 1.9,
            "sourceTable": "G09c",
            "sourceCell": "K44",
            "basis": "Place of usual residence"
          },
          {
            "name": "China (excludes SARs and Taiwan)",
            "count": 111,
            "denominator": 7025,
            "percentage": 1.6,
            "sourceTable": "G09c",
            "sourceCell": "K20",
            "basis": "Place of usual residence"
          },
          {
            "name": "India",
            "count": 105,
            "denominator": 7025,
            "percentage": 1.5,
            "sourceTable": "G09c",
            "sourceCell": "K29",
            "basis": "Place of usual residence"
          }
        ],
        "topLanguagesSpokenAtHome": [
          {
            "name": "English only",
            "count": 4133,
            "denominator": 7025,
            "percentage": 58.8,
            "sourceTable": "G13c",
            "sourceCell": "G12",
            "basis": "Place of usual residence"
          },
          {
            "name": "Vietnamese",
            "count": 299,
            "denominator": 7025,
            "percentage": 4.3,
            "sourceTable": "G13c",
            "sourceCell": "G59",
            "basis": "Place of usual residence"
          },
          {
            "name": "Arabic",
            "count": 216,
            "denominator": 7025,
            "percentage": 3.1,
            "sourceTable": "G13c",
            "sourceCell": "G16",
            "basis": "Place of usual residence"
          },
          {
            "name": "Cantonese",
            "count": 213,
            "denominator": 7025,
            "percentage": 3.0,
            "sourceTable": "G13c",
            "sourceCell": "G19",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 127,
            "denominator": 7025,
            "percentage": 1.8,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          }
        ],
        "topNonEnglishLanguagesSpokenAtHome": [
          {
            "name": "Vietnamese",
            "count": 299,
            "denominator": 7025,
            "percentage": 4.3,
            "sourceTable": "G13c",
            "sourceCell": "G59",
            "basis": "Place of usual residence"
          },
          {
            "name": "Arabic",
            "count": 216,
            "denominator": 7025,
            "percentage": 3.1,
            "sourceTable": "G13c",
            "sourceCell": "G16",
            "basis": "Place of usual residence"
          },
          {
            "name": "Cantonese",
            "count": 213,
            "denominator": 7025,
            "percentage": 3.0,
            "sourceTable": "G13c",
            "sourceCell": "G19",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 127,
            "denominator": 7025,
            "percentage": 1.8,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Spanish",
            "count": 119,
            "denominator": 7025,
            "percentage": 1.7,
            "sourceTable": "G13c",
            "sourceCell": "G55",
            "basis": "Place of usual residence"
          }
        ],
        "religiousAffiliationSummary": [
          {
            "name": "No religion / secular or other spiritual beliefs",
            "count": 3165,
            "denominator": 7025,
            "percentage": 45.1,
            "sourceTable": "G14",
            "sourceCell": "D43",
            "basis": "Place of usual residence"
          },
          {
            "name": "Christianity",
            "count": 1912,
            "denominator": 7025,
            "percentage": 27.2,
            "sourceTable": "G14",
            "sourceCell": "D30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Buddhism",
            "count": 299,
            "denominator": 7025,
            "percentage": 4.3,
            "sourceTable": "G14",
            "sourceCell": "D9",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hinduism",
            "count": 92,
            "denominator": 7025,
            "percentage": 1.3,
            "sourceTable": "G14",
            "sourceCell": "D31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Islam",
            "count": 891,
            "denominator": 7025,
            "percentage": 12.7,
            "sourceTable": "G14",
            "sourceCell": "D32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Judaism",
            "count": 13,
            "denominator": 7025,
            "percentage": 0.2,
            "sourceTable": "G14",
            "sourceCell": "D33",
            "basis": "Place of usual residence"
          },
          {
            "name": "Other religions",
            "count": 31,
            "denominator": 7025,
            "percentage": 0.4,
            "sourceTable": "G14",
            "sourceCell": "D38",
            "basis": "Place of usual residence"
          },
          {
            "name": "Religious affiliation not stated",
            "count": 626,
            "denominator": 7025,
            "percentage": 8.9,
            "sourceTable": "G14",
            "sourceCell": "D44",
            "basis": "Place of usual residence"
          }
        ]
      },
      "additionalHouseholdContext": {
        "cantoneseSpokenAtHome": {
          "count": 213,
          "denominator": 7025,
          "percentage": 3.0,
          "numeratorLabel": "Persons who used Cantonese at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G19"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "mandarinSpokenAtHome": {
          "count": 127,
          "denominator": 7025,
          "percentage": 1.8,
          "numeratorLabel": "Persons who used Mandarin at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G20"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "hongKongBornPopulation": {
          "count": 28,
          "denominator": 7025,
          "percentage": 0.4,
          "numeratorLabel": "Persons born in Hong Kong (SAR of China)",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K28"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        },
        "chinaBornPopulation": {
          "count": 111,
          "denominator": 7025,
          "percentage": 1.6,
          "numeratorLabel": "Persons born in China, excluding SARs and Taiwan",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K20"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        }
      }
    },
    {
      "suburb": "Reservoir",
      "geographyType": "SAL",
      "geographyCode": "SAL22161",
      "censusYear": 2021,
      "source": "Australian Bureau of Statistics",
      "retrievedAt": "2026-07-14",
      "contextOnly": true,
      "excludeFromSuburbScore": true,
      "scoreContribution": 0,
      "sourceMetadata": {
        "product": "2021 Census General Community Profile",
        "profileUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL22161",
        "downloadUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL22161/download/GCP_SAL22161.xlsx",
        "sourceWorkbook": "GCP_SAL22161.xlsx",
        "sourceWorkbookSha256": "db0b5d9ff5e52c34e9af55037ac7f065388236de2af6636744a2ff00a99d4ea6",
        "geographicBoundaryEdition": "ASGS Edition 3",
        "privacyNote": "ABS applies small random adjustments to cell values. Component sums can differ slightly from published totals."
      },
      "community": {
        "totalPopulation": {
          "count": 51096,
          "sourceTable": "G01",
          "sourceCells": {
            "value": "D17"
          },
          "basis": "Place of usual residence"
        },
        "medianAge": {
          "value": 38,
          "unit": "years",
          "applicablePopulation": "Persons, excluding overseas visitors",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B13"
          },
          "basis": "Place of usual residence"
        },
        "householdsWithChildren": {
          "count": 7716,
          "denominator": 20261,
          "percentage": 38.1,
          "numeratorLabel": "Occupied private dwellings whose primary family is a couple family with children or a one-parent family",
          "denominatorLabel": "Total occupied private dwellings in G42, excluding visitor-only and other non-classifiable households",
          "sourceTable": "G42",
          "sourceCells": {
            "numerator": [
              "C36",
              "D36"
            ],
            "denominator": "I36"
          },
          "basis": "Place of enumeration",
          "components": {
            "coupleFamilyWithChildren": 5454,
            "oneParentFamily": 2262
          },
          "notes": "For multiple-family households, G42 classifies the household using the primary family's composition."
        },
        "medianHouseholdIncome": {
          "value": 1541,
          "unit": "AUD per week",
          "applicablePopulation": "Occupied private dwellings; published ABS median household income",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B19"
          },
          "basis": "Place of enumeration"
        },
        "tenure": {
          "denominator": 20261,
          "denominatorLabel": "Total occupied private dwellings in G37, excluding visitor-only and other non-classifiable households",
          "basis": "Place of enumeration",
          "sourceTable": "G37",
          "ownerOccupied": {
            "count": 12152,
            "percentage": 60.0,
            "components": {
              "ownedOutright": 6267,
              "ownedWithMortgage": 5885
            },
            "sourceCells": [
              "G14",
              "G16"
            ]
          },
          "renting": {
            "count": 7383,
            "percentage": 36.4,
            "sourceCells": [
              "G25"
            ],
            "notes": "G37 rented total excludes dwellings occupied rent-free; those are included in other tenure."
          },
          "otherTenure": {
            "count": 325,
            "percentage": 1.6,
            "sourceCells": [
              "G27"
            ]
          },
          "notStated": {
            "count": 399,
            "percentage": 2.0,
            "sourceCells": [
              "G29"
            ]
          },
          "denominatorCell": "G31"
        },
        "overseasBornPopulation": {
          "count": 18158,
          "denominator": 51096,
          "percentage": 35.5,
          "numeratorLabel": "Persons born outside Australia",
          "denominatorLabel": "Total persons",
          "sourceTable": "G01",
          "sourceCells": {
            "numerator": [
              "D44"
            ],
            "denominator": "D17"
          },
          "basis": "Place of usual residence",
          "notes": "The G01 'Elsewhere' numerator includes inadequately described birthplaces and people at sea, and excludes birthplace not stated. The denominator is all persons."
        },
        "topOverseasCountriesOfBirth": [
          {
            "name": "Italy",
            "count": 2812,
            "denominator": 51096,
            "percentage": 5.5,
            "sourceTable": "G09c",
            "sourceCell": "K34",
            "basis": "Place of usual residence"
          },
          {
            "name": "India",
            "count": 1873,
            "denominator": 51096,
            "percentage": 3.7,
            "sourceTable": "G09c",
            "sourceCell": "K29",
            "basis": "Place of usual residence"
          },
          {
            "name": "China (excludes SARs and Taiwan)",
            "count": 1566,
            "denominator": 51096,
            "percentage": 3.1,
            "sourceTable": "G09c",
            "sourceCell": "K20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greece",
            "count": 1237,
            "denominator": 51096,
            "percentage": 2.4,
            "sourceTable": "G09c",
            "sourceCell": "K27",
            "basis": "Place of usual residence"
          },
          {
            "name": "Vietnam",
            "count": 999,
            "denominator": 51096,
            "percentage": 2.0,
            "sourceTable": "G09c",
            "sourceCell": "K59",
            "basis": "Place of usual residence"
          }
        ],
        "topLanguagesSpokenAtHome": [
          {
            "name": "English only",
            "count": 27559,
            "denominator": 51096,
            "percentage": 53.9,
            "sourceTable": "G13c",
            "sourceCell": "G12",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italian",
            "count": 4145,
            "denominator": 51096,
            "percentage": 8.1,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greek",
            "count": 2614,
            "denominator": 51096,
            "percentage": 5.1,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Arabic",
            "count": 2098,
            "denominator": 51096,
            "percentage": 4.1,
            "sourceTable": "G13c",
            "sourceCell": "G16",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 1815,
            "denominator": 51096,
            "percentage": 3.6,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          }
        ],
        "topNonEnglishLanguagesSpokenAtHome": [
          {
            "name": "Italian",
            "count": 4145,
            "denominator": 51096,
            "percentage": 8.1,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greek",
            "count": 2614,
            "denominator": 51096,
            "percentage": 5.1,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Arabic",
            "count": 2098,
            "denominator": 51096,
            "percentage": 4.1,
            "sourceTable": "G13c",
            "sourceCell": "G16",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 1815,
            "denominator": 51096,
            "percentage": 3.6,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Vietnamese",
            "count": 1244,
            "denominator": 51096,
            "percentage": 2.4,
            "sourceTable": "G13c",
            "sourceCell": "G59",
            "basis": "Place of usual residence"
          }
        ],
        "religiousAffiliationSummary": [
          {
            "name": "No religion / secular or other spiritual beliefs",
            "count": 17050,
            "denominator": 51096,
            "percentage": 33.4,
            "sourceTable": "G14",
            "sourceCell": "D43",
            "basis": "Place of usual residence"
          },
          {
            "name": "Christianity",
            "count": 23205,
            "denominator": 51096,
            "percentage": 45.4,
            "sourceTable": "G14",
            "sourceCell": "D30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Buddhism",
            "count": 1451,
            "denominator": 51096,
            "percentage": 2.8,
            "sourceTable": "G14",
            "sourceCell": "D9",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hinduism",
            "count": 1958,
            "denominator": 51096,
            "percentage": 3.8,
            "sourceTable": "G14",
            "sourceCell": "D31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Islam",
            "count": 3278,
            "denominator": 51096,
            "percentage": 6.4,
            "sourceTable": "G14",
            "sourceCell": "D32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Judaism",
            "count": 38,
            "denominator": 51096,
            "percentage": 0.1,
            "sourceTable": "G14",
            "sourceCell": "D33",
            "basis": "Place of usual residence"
          },
          {
            "name": "Other religions",
            "count": 608,
            "denominator": 51096,
            "percentage": 1.2,
            "sourceTable": "G14",
            "sourceCell": "D38",
            "basis": "Place of usual residence"
          },
          {
            "name": "Religious affiliation not stated",
            "count": 3523,
            "denominator": 51096,
            "percentage": 6.9,
            "sourceTable": "G14",
            "sourceCell": "D44",
            "basis": "Place of usual residence"
          }
        ]
      },
      "additionalHouseholdContext": {
        "cantoneseSpokenAtHome": {
          "count": 610,
          "denominator": 51096,
          "percentage": 1.2,
          "numeratorLabel": "Persons who used Cantonese at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G19"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "mandarinSpokenAtHome": {
          "count": 1815,
          "denominator": 51096,
          "percentage": 3.6,
          "numeratorLabel": "Persons who used Mandarin at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G20"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "hongKongBornPopulation": {
          "count": 101,
          "denominator": 51096,
          "percentage": 0.2,
          "numeratorLabel": "Persons born in Hong Kong (SAR of China)",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K28"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        },
        "chinaBornPopulation": {
          "count": 1566,
          "denominator": 51096,
          "percentage": 3.1,
          "numeratorLabel": "Persons born in China, excluding SARs and Taiwan",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K20"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        }
      }
    },
    {
      "suburb": "Carnegie",
      "geographyType": "SAL",
      "geographyCode": "SAL20498",
      "censusYear": 2021,
      "source": "Australian Bureau of Statistics",
      "retrievedAt": "2026-07-14",
      "contextOnly": true,
      "excludeFromSuburbScore": true,
      "scoreContribution": 0,
      "sourceMetadata": {
        "product": "2021 Census General Community Profile",
        "profileUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL20498",
        "downloadUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL20498/download/GCP_SAL20498.xlsx",
        "sourceWorkbook": "GCP_SAL20498.xlsx",
        "sourceWorkbookSha256": "c8cf4f219059ae389a2d502942caf0cd06695c804c2285d75f42f196d3d84411",
        "geographicBoundaryEdition": "ASGS Edition 3",
        "privacyNote": "ABS applies small random adjustments to cell values. Component sums can differ slightly from published totals."
      },
      "community": {
        "totalPopulation": {
          "count": 17909,
          "sourceTable": "G01",
          "sourceCells": {
            "value": "D17"
          },
          "basis": "Place of usual residence"
        },
        "medianAge": {
          "value": 36,
          "unit": "years",
          "applicablePopulation": "Persons, excluding overseas visitors",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B13"
          },
          "basis": "Place of usual residence"
        },
        "householdsWithChildren": {
          "count": 2439,
          "denominator": 7807,
          "percentage": 31.2,
          "numeratorLabel": "Occupied private dwellings whose primary family is a couple family with children or a one-parent family",
          "denominatorLabel": "Total occupied private dwellings in G42, excluding visitor-only and other non-classifiable households",
          "sourceTable": "G42",
          "sourceCells": {
            "numerator": [
              "C36",
              "D36"
            ],
            "denominator": "I36"
          },
          "basis": "Place of enumeration",
          "components": {
            "coupleFamilyWithChildren": 1918,
            "oneParentFamily": 521
          },
          "notes": "For multiple-family households, G42 classifies the household using the primary family's composition."
        },
        "medianHouseholdIncome": {
          "value": 1878,
          "unit": "AUD per week",
          "applicablePopulation": "Occupied private dwellings; published ABS median household income",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B19"
          },
          "basis": "Place of enumeration"
        },
        "tenure": {
          "denominator": 7807,
          "denominatorLabel": "Total occupied private dwellings in G37, excluding visitor-only and other non-classifiable households",
          "basis": "Place of enumeration",
          "sourceTable": "G37",
          "ownerOccupied": {
            "count": 4305,
            "percentage": 55.1,
            "components": {
              "ownedOutright": 2047,
              "ownedWithMortgage": 2258
            },
            "sourceCells": [
              "G14",
              "G16"
            ]
          },
          "renting": {
            "count": 3300,
            "percentage": 42.3,
            "sourceCells": [
              "G25"
            ],
            "notes": "G37 rented total excludes dwellings occupied rent-free; those are included in other tenure."
          },
          "otherTenure": {
            "count": 111,
            "percentage": 1.4,
            "sourceCells": [
              "G27"
            ]
          },
          "notStated": {
            "count": 88,
            "percentage": 1.1,
            "sourceCells": [
              "G29"
            ]
          },
          "denominatorCell": "G31"
        },
        "overseasBornPopulation": {
          "count": 7772,
          "denominator": 17909,
          "percentage": 43.4,
          "numeratorLabel": "Persons born outside Australia",
          "denominatorLabel": "Total persons",
          "sourceTable": "G01",
          "sourceCells": {
            "numerator": [
              "D44"
            ],
            "denominator": "D17"
          },
          "basis": "Place of usual residence",
          "notes": "The G01 'Elsewhere' numerator includes inadequately described birthplaces and people at sea, and excludes birthplace not stated. The denominator is all persons."
        },
        "topOverseasCountriesOfBirth": [
          {
            "name": "India",
            "count": 1644,
            "denominator": 17909,
            "percentage": 9.2,
            "sourceTable": "G09c",
            "sourceCell": "K29",
            "basis": "Place of usual residence"
          },
          {
            "name": "China (excludes SARs and Taiwan)",
            "count": 1107,
            "denominator": 17909,
            "percentage": 6.2,
            "sourceTable": "G09c",
            "sourceCell": "K20",
            "basis": "Place of usual residence"
          },
          {
            "name": "England",
            "count": 411,
            "denominator": 17909,
            "percentage": 2.3,
            "sourceTable": "G09c",
            "sourceCell": "K23",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greece",
            "count": 295,
            "denominator": 17909,
            "percentage": 1.6,
            "sourceTable": "G09c",
            "sourceCell": "K27",
            "basis": "Place of usual residence"
          },
          {
            "name": "Malaysia",
            "count": 287,
            "denominator": 17909,
            "percentage": 1.6,
            "sourceTable": "G09c",
            "sourceCell": "K38",
            "basis": "Place of usual residence"
          }
        ],
        "topLanguagesSpokenAtHome": [
          {
            "name": "English only",
            "count": 10419,
            "denominator": 17909,
            "percentage": 58.2,
            "sourceTable": "G13c",
            "sourceCell": "G12",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 1318,
            "denominator": 17909,
            "percentage": 7.4,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greek",
            "count": 705,
            "denominator": 17909,
            "percentage": 3.9,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Russian",
            "count": 606,
            "denominator": 17909,
            "percentage": 3.4,
            "sourceTable": "G13c",
            "sourceCell": "G46",
            "basis": "Place of usual residence"
          },
          {
            "name": "Cantonese",
            "count": 365,
            "denominator": 17909,
            "percentage": 2.0,
            "sourceTable": "G13c",
            "sourceCell": "G19",
            "basis": "Place of usual residence"
          }
        ],
        "topNonEnglishLanguagesSpokenAtHome": [
          {
            "name": "Mandarin",
            "count": 1318,
            "denominator": 17909,
            "percentage": 7.4,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greek",
            "count": 705,
            "denominator": 17909,
            "percentage": 3.9,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Russian",
            "count": 606,
            "denominator": 17909,
            "percentage": 3.4,
            "sourceTable": "G13c",
            "sourceCell": "G46",
            "basis": "Place of usual residence"
          },
          {
            "name": "Cantonese",
            "count": 365,
            "denominator": 17909,
            "percentage": 2.0,
            "sourceTable": "G13c",
            "sourceCell": "G19",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hindi",
            "count": 360,
            "denominator": 17909,
            "percentage": 2.0,
            "sourceTable": "G13c",
            "sourceCell": "G30",
            "basis": "Place of usual residence"
          }
        ],
        "religiousAffiliationSummary": [
          {
            "name": "No religion / secular or other spiritual beliefs",
            "count": 7535,
            "denominator": 17909,
            "percentage": 42.1,
            "sourceTable": "G14",
            "sourceCell": "D43",
            "basis": "Place of usual residence"
          },
          {
            "name": "Christianity",
            "count": 5765,
            "denominator": 17909,
            "percentage": 32.2,
            "sourceTable": "G14",
            "sourceCell": "D30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Buddhism",
            "count": 540,
            "denominator": 17909,
            "percentage": 3.0,
            "sourceTable": "G14",
            "sourceCell": "D9",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hinduism",
            "count": 1668,
            "denominator": 17909,
            "percentage": 9.3,
            "sourceTable": "G14",
            "sourceCell": "D31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Islam",
            "count": 208,
            "denominator": 17909,
            "percentage": 1.2,
            "sourceTable": "G14",
            "sourceCell": "D32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Judaism",
            "count": 1107,
            "denominator": 17909,
            "percentage": 6.2,
            "sourceTable": "G14",
            "sourceCell": "D33",
            "basis": "Place of usual residence"
          },
          {
            "name": "Other religions",
            "count": 134,
            "denominator": 17909,
            "percentage": 0.7,
            "sourceTable": "G14",
            "sourceCell": "D38",
            "basis": "Place of usual residence"
          },
          {
            "name": "Religious affiliation not stated",
            "count": 958,
            "denominator": 17909,
            "percentage": 5.3,
            "sourceTable": "G14",
            "sourceCell": "D44",
            "basis": "Place of usual residence"
          }
        ]
      },
      "additionalHouseholdContext": {
        "cantoneseSpokenAtHome": {
          "count": 365,
          "denominator": 17909,
          "percentage": 2.0,
          "numeratorLabel": "Persons who used Cantonese at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G19"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "mandarinSpokenAtHome": {
          "count": 1318,
          "denominator": 17909,
          "percentage": 7.4,
          "numeratorLabel": "Persons who used Mandarin at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G20"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "hongKongBornPopulation": {
          "count": 127,
          "denominator": 17909,
          "percentage": 0.7,
          "numeratorLabel": "Persons born in Hong Kong (SAR of China)",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K28"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        },
        "chinaBornPopulation": {
          "count": 1107,
          "denominator": 17909,
          "percentage": 6.2,
          "numeratorLabel": "Persons born in China, excluding SARs and Taiwan",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K20"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        }
      }
    },
    {
      "suburb": "Oakleigh",
      "geographyType": "SAL",
      "geographyCode": "SAL22000",
      "censusYear": 2021,
      "source": "Australian Bureau of Statistics",
      "retrievedAt": "2026-07-14",
      "contextOnly": true,
      "excludeFromSuburbScore": true,
      "scoreContribution": 0,
      "sourceMetadata": {
        "product": "2021 Census General Community Profile",
        "profileUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL22000",
        "downloadUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL22000/download/GCP_SAL22000.xlsx",
        "sourceWorkbook": "GCP_SAL22000.xlsx",
        "sourceWorkbookSha256": "73d3fd88295c80f7d48750687f2dfaf5abe59b9e222eff6c34ce982c81d818a2",
        "geographicBoundaryEdition": "ASGS Edition 3",
        "privacyNote": "ABS applies small random adjustments to cell values. Component sums can differ slightly from published totals."
      },
      "community": {
        "totalPopulation": {
          "count": 8442,
          "sourceTable": "G01",
          "sourceCells": {
            "value": "D17"
          },
          "basis": "Place of usual residence"
        },
        "medianAge": {
          "value": 38,
          "unit": "years",
          "applicablePopulation": "Persons, excluding overseas visitors",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B13"
          },
          "basis": "Place of usual residence"
        },
        "householdsWithChildren": {
          "count": 1334,
          "denominator": 3259,
          "percentage": 40.9,
          "numeratorLabel": "Occupied private dwellings whose primary family is a couple family with children or a one-parent family",
          "denominatorLabel": "Total occupied private dwellings in G42, excluding visitor-only and other non-classifiable households",
          "sourceTable": "G42",
          "sourceCells": {
            "numerator": [
              "C36",
              "D36"
            ],
            "denominator": "I36"
          },
          "basis": "Place of enumeration",
          "components": {
            "coupleFamilyWithChildren": 1028,
            "oneParentFamily": 306
          },
          "notes": "For multiple-family households, G42 classifies the household using the primary family's composition."
        },
        "medianHouseholdIncome": {
          "value": 1926,
          "unit": "AUD per week",
          "applicablePopulation": "Occupied private dwellings; published ABS median household income",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B19"
          },
          "basis": "Place of enumeration"
        },
        "tenure": {
          "denominator": 3259,
          "denominatorLabel": "Total occupied private dwellings in G37, excluding visitor-only and other non-classifiable households",
          "basis": "Place of enumeration",
          "sourceTable": "G37",
          "ownerOccupied": {
            "count": 2042,
            "percentage": 62.7,
            "components": {
              "ownedOutright": 1023,
              "ownedWithMortgage": 1019
            },
            "sourceCells": [
              "G14",
              "G16"
            ]
          },
          "renting": {
            "count": 1125,
            "percentage": 34.5,
            "sourceCells": [
              "G25"
            ],
            "notes": "G37 rented total excludes dwellings occupied rent-free; those are included in other tenure."
          },
          "otherTenure": {
            "count": 50,
            "percentage": 1.5,
            "sourceCells": [
              "G27"
            ]
          },
          "notStated": {
            "count": 41,
            "percentage": 1.3,
            "sourceCells": [
              "G29"
            ]
          },
          "denominatorCell": "G31"
        },
        "overseasBornPopulation": {
          "count": 3271,
          "denominator": 8442,
          "percentage": 38.7,
          "numeratorLabel": "Persons born outside Australia",
          "denominatorLabel": "Total persons",
          "sourceTable": "G01",
          "sourceCells": {
            "numerator": [
              "D44"
            ],
            "denominator": "D17"
          },
          "basis": "Place of usual residence",
          "notes": "The G01 'Elsewhere' numerator includes inadequately described birthplaces and people at sea, and excludes birthplace not stated. The denominator is all persons."
        },
        "topOverseasCountriesOfBirth": [
          {
            "name": "Greece",
            "count": 508,
            "denominator": 8442,
            "percentage": 6.0,
            "sourceTable": "G09c",
            "sourceCell": "K27",
            "basis": "Place of usual residence"
          },
          {
            "name": "China (excludes SARs and Taiwan)",
            "count": 470,
            "denominator": 8442,
            "percentage": 5.6,
            "sourceTable": "G09c",
            "sourceCell": "K20",
            "basis": "Place of usual residence"
          },
          {
            "name": "India",
            "count": 360,
            "denominator": 8442,
            "percentage": 4.3,
            "sourceTable": "G09c",
            "sourceCell": "K29",
            "basis": "Place of usual residence"
          },
          {
            "name": "England",
            "count": 183,
            "denominator": 8442,
            "percentage": 2.2,
            "sourceTable": "G09c",
            "sourceCell": "K23",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italy",
            "count": 137,
            "denominator": 8442,
            "percentage": 1.6,
            "sourceTable": "G09c",
            "sourceCell": "K34",
            "basis": "Place of usual residence"
          }
        ],
        "topLanguagesSpokenAtHome": [
          {
            "name": "English only",
            "count": 4597,
            "denominator": 8442,
            "percentage": 54.5,
            "sourceTable": "G13c",
            "sourceCell": "G12",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greek",
            "count": 1125,
            "denominator": 8442,
            "percentage": 13.3,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 570,
            "denominator": 8442,
            "percentage": 6.8,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italian",
            "count": 171,
            "denominator": 8442,
            "percentage": 2.0,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          },
          {
            "name": "Cantonese",
            "count": 130,
            "denominator": 8442,
            "percentage": 1.5,
            "sourceTable": "G13c",
            "sourceCell": "G19",
            "basis": "Place of usual residence"
          }
        ],
        "topNonEnglishLanguagesSpokenAtHome": [
          {
            "name": "Greek",
            "count": 1125,
            "denominator": 8442,
            "percentage": 13.3,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 570,
            "denominator": 8442,
            "percentage": 6.8,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italian",
            "count": 171,
            "denominator": 8442,
            "percentage": 2.0,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          },
          {
            "name": "Cantonese",
            "count": 130,
            "denominator": 8442,
            "percentage": 1.5,
            "sourceTable": "G13c",
            "sourceCell": "G19",
            "basis": "Place of usual residence"
          },
          {
            "name": "Vietnamese",
            "count": 113,
            "denominator": 8442,
            "percentage": 1.3,
            "sourceTable": "G13c",
            "sourceCell": "G59",
            "basis": "Place of usual residence"
          }
        ],
        "religiousAffiliationSummary": [
          {
            "name": "No religion / secular or other spiritual beliefs",
            "count": 3039,
            "denominator": 8442,
            "percentage": 36.0,
            "sourceTable": "G14",
            "sourceCell": "D43",
            "basis": "Place of usual residence"
          },
          {
            "name": "Christianity",
            "count": 4139,
            "denominator": 8442,
            "percentage": 49.0,
            "sourceTable": "G14",
            "sourceCell": "D30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Buddhism",
            "count": 231,
            "denominator": 8442,
            "percentage": 2.7,
            "sourceTable": "G14",
            "sourceCell": "D9",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hinduism",
            "count": 355,
            "denominator": 8442,
            "percentage": 4.2,
            "sourceTable": "G14",
            "sourceCell": "D31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Islam",
            "count": 104,
            "denominator": 8442,
            "percentage": 1.2,
            "sourceTable": "G14",
            "sourceCell": "D32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Judaism",
            "count": 72,
            "denominator": 8442,
            "percentage": 0.9,
            "sourceTable": "G14",
            "sourceCell": "D33",
            "basis": "Place of usual residence"
          },
          {
            "name": "Other religions",
            "count": 88,
            "denominator": 8442,
            "percentage": 1.0,
            "sourceTable": "G14",
            "sourceCell": "D38",
            "basis": "Place of usual residence"
          },
          {
            "name": "Religious affiliation not stated",
            "count": 416,
            "denominator": 8442,
            "percentage": 4.9,
            "sourceTable": "G14",
            "sourceCell": "D44",
            "basis": "Place of usual residence"
          }
        ]
      },
      "additionalHouseholdContext": {
        "cantoneseSpokenAtHome": {
          "count": 130,
          "denominator": 8442,
          "percentage": 1.5,
          "numeratorLabel": "Persons who used Cantonese at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G19"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "mandarinSpokenAtHome": {
          "count": 570,
          "denominator": 8442,
          "percentage": 6.8,
          "numeratorLabel": "Persons who used Mandarin at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G20"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "hongKongBornPopulation": {
          "count": 35,
          "denominator": 8442,
          "percentage": 0.4,
          "numeratorLabel": "Persons born in Hong Kong (SAR of China)",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K28"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        },
        "chinaBornPopulation": {
          "count": 470,
          "denominator": 8442,
          "percentage": 5.6,
          "numeratorLabel": "Persons born in China, excluding SARs and Taiwan",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K20"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        }
      }
    },
    {
      "suburb": "Springvale",
      "geographyType": "SAL",
      "geographyCode": "SAL22328",
      "censusYear": 2021,
      "source": "Australian Bureau of Statistics",
      "retrievedAt": "2026-07-14",
      "contextOnly": true,
      "excludeFromSuburbScore": true,
      "scoreContribution": 0,
      "sourceMetadata": {
        "product": "2021 Census General Community Profile",
        "profileUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL22328",
        "downloadUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL22328/download/GCP_SAL22328.xlsx",
        "sourceWorkbook": "GCP_SAL22328.xlsx",
        "sourceWorkbookSha256": "06926463c784b2dbe818750a2b54de425b08f9b3ab326882a43e0d946cf91c30",
        "geographicBoundaryEdition": "ASGS Edition 3",
        "privacyNote": "ABS applies small random adjustments to cell values. Component sums can differ slightly from published totals."
      },
      "community": {
        "totalPopulation": {
          "count": 22174,
          "sourceTable": "G01",
          "sourceCells": {
            "value": "D17"
          },
          "basis": "Place of usual residence"
        },
        "medianAge": {
          "value": 36,
          "unit": "years",
          "applicablePopulation": "Persons, excluding overseas visitors",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B13"
          },
          "basis": "Place of usual residence"
        },
        "householdsWithChildren": {
          "count": 3325,
          "denominator": 7165,
          "percentage": 46.4,
          "numeratorLabel": "Occupied private dwellings whose primary family is a couple family with children or a one-parent family",
          "denominatorLabel": "Total occupied private dwellings in G42, excluding visitor-only and other non-classifiable households",
          "sourceTable": "G42",
          "sourceCells": {
            "numerator": [
              "C36",
              "D36"
            ],
            "denominator": "I36"
          },
          "basis": "Place of enumeration",
          "components": {
            "coupleFamilyWithChildren": 2349,
            "oneParentFamily": 976
          },
          "notes": "For multiple-family households, G42 classifies the household using the primary family's composition."
        },
        "medianHouseholdIncome": {
          "value": 1402,
          "unit": "AUD per week",
          "applicablePopulation": "Occupied private dwellings; published ABS median household income",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B19"
          },
          "basis": "Place of enumeration"
        },
        "tenure": {
          "denominator": 7165,
          "denominatorLabel": "Total occupied private dwellings in G37, excluding visitor-only and other non-classifiable households",
          "basis": "Place of enumeration",
          "sourceTable": "G37",
          "ownerOccupied": {
            "count": 3921,
            "percentage": 54.7,
            "components": {
              "ownedOutright": 2271,
              "ownedWithMortgage": 1650
            },
            "sourceCells": [
              "G14",
              "G16"
            ]
          },
          "renting": {
            "count": 2810,
            "percentage": 39.2,
            "sourceCells": [
              "G25"
            ],
            "notes": "G37 rented total excludes dwellings occupied rent-free; those are included in other tenure."
          },
          "otherTenure": {
            "count": 266,
            "percentage": 3.7,
            "sourceCells": [
              "G27"
            ]
          },
          "notStated": {
            "count": 161,
            "percentage": 2.2,
            "sourceCells": [
              "G29"
            ]
          },
          "denominatorCell": "G31"
        },
        "overseasBornPopulation": {
          "count": 14704,
          "denominator": 22174,
          "percentage": 66.3,
          "numeratorLabel": "Persons born outside Australia",
          "denominatorLabel": "Total persons",
          "sourceTable": "G01",
          "sourceCells": {
            "numerator": [
              "D44"
            ],
            "denominator": "D17"
          },
          "basis": "Place of usual residence",
          "notes": "The G01 'Elsewhere' numerator includes inadequately described birthplaces and people at sea, and excludes birthplace not stated. The denominator is all persons."
        },
        "topOverseasCountriesOfBirth": [
          {
            "name": "Vietnam",
            "count": 4645,
            "denominator": 22174,
            "percentage": 20.9,
            "sourceTable": "G09c",
            "sourceCell": "K59",
            "basis": "Place of usual residence"
          },
          {
            "name": "India",
            "count": 1646,
            "denominator": 22174,
            "percentage": 7.4,
            "sourceTable": "G09c",
            "sourceCell": "K29",
            "basis": "Place of usual residence"
          },
          {
            "name": "Cambodia",
            "count": 1243,
            "denominator": 22174,
            "percentage": 5.6,
            "sourceTable": "G09c",
            "sourceCell": "K17",
            "basis": "Place of usual residence"
          },
          {
            "name": "China (excludes SARs and Taiwan)",
            "count": 1186,
            "denominator": 22174,
            "percentage": 5.3,
            "sourceTable": "G09c",
            "sourceCell": "K20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Malaysia",
            "count": 1022,
            "denominator": 22174,
            "percentage": 4.6,
            "sourceTable": "G09c",
            "sourceCell": "K38",
            "basis": "Place of usual residence"
          }
        ],
        "topLanguagesSpokenAtHome": [
          {
            "name": "Vietnamese",
            "count": 5593,
            "denominator": 22174,
            "percentage": 25.2,
            "sourceTable": "G13c",
            "sourceCell": "G59",
            "basis": "Place of usual residence"
          },
          {
            "name": "English only",
            "count": 4145,
            "denominator": 22174,
            "percentage": 18.7,
            "sourceTable": "G13c",
            "sourceCell": "G12",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 1489,
            "denominator": 22174,
            "percentage": 6.7,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Cantonese",
            "count": 1393,
            "denominator": 22174,
            "percentage": 6.3,
            "sourceTable": "G13c",
            "sourceCell": "G19",
            "basis": "Place of usual residence"
          },
          {
            "name": "Khmer",
            "count": 1084,
            "denominator": 22174,
            "percentage": 4.9,
            "sourceTable": "G13c",
            "sourceCell": "G39",
            "basis": "Place of usual residence"
          }
        ],
        "topNonEnglishLanguagesSpokenAtHome": [
          {
            "name": "Vietnamese",
            "count": 5593,
            "denominator": 22174,
            "percentage": 25.2,
            "sourceTable": "G13c",
            "sourceCell": "G59",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 1489,
            "denominator": 22174,
            "percentage": 6.7,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Cantonese",
            "count": 1393,
            "denominator": 22174,
            "percentage": 6.3,
            "sourceTable": "G13c",
            "sourceCell": "G19",
            "basis": "Place of usual residence"
          },
          {
            "name": "Khmer",
            "count": 1084,
            "denominator": 22174,
            "percentage": 4.9,
            "sourceTable": "G13c",
            "sourceCell": "G39",
            "basis": "Place of usual residence"
          },
          {
            "name": "Punjabi",
            "count": 870,
            "denominator": 22174,
            "percentage": 3.9,
            "sourceTable": "G13c",
            "sourceCell": "G32",
            "basis": "Place of usual residence"
          }
        ],
        "religiousAffiliationSummary": [
          {
            "name": "No religion / secular or other spiritual beliefs",
            "count": 5403,
            "denominator": 22174,
            "percentage": 24.4,
            "sourceTable": "G14",
            "sourceCell": "D43",
            "basis": "Place of usual residence"
          },
          {
            "name": "Christianity",
            "count": 6144,
            "denominator": 22174,
            "percentage": 27.7,
            "sourceTable": "G14",
            "sourceCell": "D30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Buddhism",
            "count": 5172,
            "denominator": 22174,
            "percentage": 23.3,
            "sourceTable": "G14",
            "sourceCell": "D9",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hinduism",
            "count": 932,
            "denominator": 22174,
            "percentage": 4.2,
            "sourceTable": "G14",
            "sourceCell": "D31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Islam",
            "count": 2297,
            "denominator": 22174,
            "percentage": 10.4,
            "sourceTable": "G14",
            "sourceCell": "D32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Judaism",
            "count": 29,
            "denominator": 22174,
            "percentage": 0.1,
            "sourceTable": "G14",
            "sourceCell": "D33",
            "basis": "Place of usual residence"
          },
          {
            "name": "Other religions",
            "count": 784,
            "denominator": 22174,
            "percentage": 3.5,
            "sourceTable": "G14",
            "sourceCell": "D38",
            "basis": "Place of usual residence"
          },
          {
            "name": "Religious affiliation not stated",
            "count": 1416,
            "denominator": 22174,
            "percentage": 6.4,
            "sourceTable": "G14",
            "sourceCell": "D44",
            "basis": "Place of usual residence"
          }
        ]
      },
      "additionalHouseholdContext": {
        "cantoneseSpokenAtHome": {
          "count": 1393,
          "denominator": 22174,
          "percentage": 6.3,
          "numeratorLabel": "Persons who used Cantonese at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G19"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "mandarinSpokenAtHome": {
          "count": 1489,
          "denominator": 22174,
          "percentage": 6.7,
          "numeratorLabel": "Persons who used Mandarin at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G20"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "hongKongBornPopulation": {
          "count": 105,
          "denominator": 22174,
          "percentage": 0.5,
          "numeratorLabel": "Persons born in Hong Kong (SAR of China)",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K28"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        },
        "chinaBornPopulation": {
          "count": 1186,
          "denominator": 22174,
          "percentage": 5.3,
          "numeratorLabel": "Persons born in China, excluding SARs and Taiwan",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K20"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        }
      }
    },
    {
      "suburb": "Noble Park",
      "geographyType": "SAL",
      "geographyCode": "SAL21952",
      "censusYear": 2021,
      "source": "Australian Bureau of Statistics",
      "retrievedAt": "2026-07-14",
      "contextOnly": true,
      "excludeFromSuburbScore": true,
      "scoreContribution": 0,
      "sourceMetadata": {
        "product": "2021 Census General Community Profile",
        "profileUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL21952",
        "downloadUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL21952/download/GCP_SAL21952.xlsx",
        "sourceWorkbook": "GCP_SAL21952.xlsx",
        "sourceWorkbookSha256": "8cefe03f0b7a68c060d854268602b20a396d8d79bc4e2370494a4b8686ed593f",
        "geographicBoundaryEdition": "ASGS Edition 3",
        "privacyNote": "ABS applies small random adjustments to cell values. Component sums can differ slightly from published totals."
      },
      "community": {
        "totalPopulation": {
          "count": 32257,
          "sourceTable": "G01",
          "sourceCells": {
            "value": "D17"
          },
          "basis": "Place of usual residence"
        },
        "medianAge": {
          "value": 35,
          "unit": "years",
          "applicablePopulation": "Persons, excluding overseas visitors",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B13"
          },
          "basis": "Place of usual residence"
        },
        "householdsWithChildren": {
          "count": 4967,
          "denominator": 11073,
          "percentage": 44.9,
          "numeratorLabel": "Occupied private dwellings whose primary family is a couple family with children or a one-parent family",
          "denominatorLabel": "Total occupied private dwellings in G42, excluding visitor-only and other non-classifiable households",
          "sourceTable": "G42",
          "sourceCells": {
            "numerator": [
              "C36",
              "D36"
            ],
            "denominator": "I36"
          },
          "basis": "Place of enumeration",
          "components": {
            "coupleFamilyWithChildren": 3420,
            "oneParentFamily": 1547
          },
          "notes": "For multiple-family households, G42 classifies the household using the primary family's composition."
        },
        "medianHouseholdIncome": {
          "value": 1382,
          "unit": "AUD per week",
          "applicablePopulation": "Occupied private dwellings; published ABS median household income",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B19"
          },
          "basis": "Place of enumeration"
        },
        "tenure": {
          "denominator": 11073,
          "denominatorLabel": "Total occupied private dwellings in G37, excluding visitor-only and other non-classifiable households",
          "basis": "Place of enumeration",
          "sourceTable": "G37",
          "ownerOccupied": {
            "count": 6240,
            "percentage": 56.4,
            "components": {
              "ownedOutright": 2980,
              "ownedWithMortgage": 3260
            },
            "sourceCells": [
              "G14",
              "G16"
            ]
          },
          "renting": {
            "count": 4466,
            "percentage": 40.3,
            "sourceCells": [
              "G25"
            ],
            "notes": "G37 rented total excludes dwellings occupied rent-free; those are included in other tenure."
          },
          "otherTenure": {
            "count": 148,
            "percentage": 1.3,
            "sourceCells": [
              "G27"
            ]
          },
          "notStated": {
            "count": 222,
            "percentage": 2.0,
            "sourceCells": [
              "G29"
            ]
          },
          "denominatorCell": "G31"
        },
        "overseasBornPopulation": {
          "count": 19564,
          "denominator": 32257,
          "percentage": 60.7,
          "numeratorLabel": "Persons born outside Australia",
          "denominatorLabel": "Total persons",
          "sourceTable": "G01",
          "sourceCells": {
            "numerator": [
              "D44"
            ],
            "denominator": "D17"
          },
          "basis": "Place of usual residence",
          "notes": "The G01 'Elsewhere' numerator includes inadequately described birthplaces and people at sea, and excludes birthplace not stated. The denominator is all persons."
        },
        "topOverseasCountriesOfBirth": [
          {
            "name": "Vietnam",
            "count": 3397,
            "denominator": 32257,
            "percentage": 10.5,
            "sourceTable": "G09c",
            "sourceCell": "K59",
            "basis": "Place of usual residence"
          },
          {
            "name": "India",
            "count": 3148,
            "denominator": 32257,
            "percentage": 9.8,
            "sourceTable": "G09c",
            "sourceCell": "K29",
            "basis": "Place of usual residence"
          },
          {
            "name": "Cambodia",
            "count": 2278,
            "denominator": 32257,
            "percentage": 7.1,
            "sourceTable": "G09c",
            "sourceCell": "K17",
            "basis": "Place of usual residence"
          },
          {
            "name": "Sri Lanka",
            "count": 1265,
            "denominator": 32257,
            "percentage": 3.9,
            "sourceTable": "G09c",
            "sourceCell": "K54",
            "basis": "Place of usual residence"
          },
          {
            "name": "Malaysia",
            "count": 967,
            "denominator": 32257,
            "percentage": 3.0,
            "sourceTable": "G09c",
            "sourceCell": "K38",
            "basis": "Place of usual residence"
          }
        ],
        "topLanguagesSpokenAtHome": [
          {
            "name": "English only",
            "count": 9431,
            "denominator": 32257,
            "percentage": 29.2,
            "sourceTable": "G13c",
            "sourceCell": "G12",
            "basis": "Place of usual residence"
          },
          {
            "name": "Vietnamese",
            "count": 4473,
            "denominator": 32257,
            "percentage": 13.9,
            "sourceTable": "G13c",
            "sourceCell": "G59",
            "basis": "Place of usual residence"
          },
          {
            "name": "Khmer",
            "count": 2634,
            "denominator": 32257,
            "percentage": 8.2,
            "sourceTable": "G13c",
            "sourceCell": "G39",
            "basis": "Place of usual residence"
          },
          {
            "name": "Punjabi",
            "count": 1768,
            "denominator": 32257,
            "percentage": 5.5,
            "sourceTable": "G13c",
            "sourceCell": "G32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Sinhalese",
            "count": 882,
            "denominator": 32257,
            "percentage": 2.7,
            "sourceTable": "G13c",
            "sourceCell": "G33",
            "basis": "Place of usual residence"
          }
        ],
        "topNonEnglishLanguagesSpokenAtHome": [
          {
            "name": "Vietnamese",
            "count": 4473,
            "denominator": 32257,
            "percentage": 13.9,
            "sourceTable": "G13c",
            "sourceCell": "G59",
            "basis": "Place of usual residence"
          },
          {
            "name": "Khmer",
            "count": 2634,
            "denominator": 32257,
            "percentage": 8.2,
            "sourceTable": "G13c",
            "sourceCell": "G39",
            "basis": "Place of usual residence"
          },
          {
            "name": "Punjabi",
            "count": 1768,
            "denominator": 32257,
            "percentage": 5.5,
            "sourceTable": "G13c",
            "sourceCell": "G32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Sinhalese",
            "count": 882,
            "denominator": 32257,
            "percentage": 2.7,
            "sourceTable": "G13c",
            "sourceCell": "G33",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 734,
            "denominator": 32257,
            "percentage": 2.3,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          }
        ],
        "religiousAffiliationSummary": [
          {
            "name": "No religion / secular or other spiritual beliefs",
            "count": 6807,
            "denominator": 32257,
            "percentage": 21.1,
            "sourceTable": "G14",
            "sourceCell": "D43",
            "basis": "Place of usual residence"
          },
          {
            "name": "Christianity",
            "count": 10376,
            "denominator": 32257,
            "percentage": 32.2,
            "sourceTable": "G14",
            "sourceCell": "D30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Buddhism",
            "count": 5896,
            "denominator": 32257,
            "percentage": 18.3,
            "sourceTable": "G14",
            "sourceCell": "D9",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hinduism",
            "count": 1595,
            "denominator": 32257,
            "percentage": 4.9,
            "sourceTable": "G14",
            "sourceCell": "D31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Islam",
            "count": 3587,
            "denominator": 32257,
            "percentage": 11.1,
            "sourceTable": "G14",
            "sourceCell": "D32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Judaism",
            "count": 41,
            "denominator": 32257,
            "percentage": 0.1,
            "sourceTable": "G14",
            "sourceCell": "D33",
            "basis": "Place of usual residence"
          },
          {
            "name": "Other religions",
            "count": 1660,
            "denominator": 32257,
            "percentage": 5.1,
            "sourceTable": "G14",
            "sourceCell": "D38",
            "basis": "Place of usual residence"
          },
          {
            "name": "Religious affiliation not stated",
            "count": 2296,
            "denominator": 32257,
            "percentage": 7.1,
            "sourceTable": "G14",
            "sourceCell": "D44",
            "basis": "Place of usual residence"
          }
        ]
      },
      "additionalHouseholdContext": {
        "cantoneseSpokenAtHome": {
          "count": 671,
          "denominator": 32257,
          "percentage": 2.1,
          "numeratorLabel": "Persons who used Cantonese at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G19"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "mandarinSpokenAtHome": {
          "count": 734,
          "denominator": 32257,
          "percentage": 2.3,
          "numeratorLabel": "Persons who used Mandarin at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G20"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "hongKongBornPopulation": {
          "count": 84,
          "denominator": 32257,
          "percentage": 0.3,
          "numeratorLabel": "Persons born in Hong Kong (SAR of China)",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K28"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        },
        "chinaBornPopulation": {
          "count": 617,
          "denominator": 32257,
          "percentage": 1.9,
          "numeratorLabel": "Persons born in China, excluding SARs and Taiwan",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K20"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        }
      }
    },
    {
      "suburb": "Moorabbin",
      "geographyType": "SAL",
      "geographyCode": "SAL21746",
      "censusYear": 2021,
      "source": "Australian Bureau of Statistics",
      "retrievedAt": "2026-07-14",
      "contextOnly": true,
      "excludeFromSuburbScore": true,
      "scoreContribution": 0,
      "sourceMetadata": {
        "product": "2021 Census General Community Profile",
        "profileUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL21746",
        "downloadUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL21746/download/GCP_SAL21746.xlsx",
        "sourceWorkbook": "GCP_SAL21746.xlsx",
        "sourceWorkbookSha256": "cc3e98c7500ac8e615a79a4772bc16b5eec60dbfd8a9fc2f056aa4717fbd2fc2",
        "geographicBoundaryEdition": "ASGS Edition 3",
        "privacyNote": "ABS applies small random adjustments to cell values. Component sums can differ slightly from published totals."
      },
      "community": {
        "totalPopulation": {
          "count": 6287,
          "sourceTable": "G01",
          "sourceCells": {
            "value": "D17"
          },
          "basis": "Place of usual residence"
        },
        "medianAge": {
          "value": 39,
          "unit": "years",
          "applicablePopulation": "Persons, excluding overseas visitors",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B13"
          },
          "basis": "Place of usual residence"
        },
        "householdsWithChildren": {
          "count": 1095,
          "denominator": 2415,
          "percentage": 45.3,
          "numeratorLabel": "Occupied private dwellings whose primary family is a couple family with children or a one-parent family",
          "denominatorLabel": "Total occupied private dwellings in G42, excluding visitor-only and other non-classifiable households",
          "sourceTable": "G42",
          "sourceCells": {
            "numerator": [
              "C36",
              "D36"
            ],
            "denominator": "I36"
          },
          "basis": "Place of enumeration",
          "components": {
            "coupleFamilyWithChildren": 831,
            "oneParentFamily": 264
          },
          "notes": "For multiple-family households, G42 classifies the household using the primary family's composition."
        },
        "medianHouseholdIncome": {
          "value": 2031,
          "unit": "AUD per week",
          "applicablePopulation": "Occupied private dwellings; published ABS median household income",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B19"
          },
          "basis": "Place of enumeration"
        },
        "tenure": {
          "denominator": 2415,
          "denominatorLabel": "Total occupied private dwellings in G37, excluding visitor-only and other non-classifiable households",
          "basis": "Place of enumeration",
          "sourceTable": "G37",
          "ownerOccupied": {
            "count": 1643,
            "percentage": 68.0,
            "components": {
              "ownedOutright": 716,
              "ownedWithMortgage": 927
            },
            "sourceCells": [
              "G14",
              "G16"
            ]
          },
          "renting": {
            "count": 694,
            "percentage": 28.7,
            "sourceCells": [
              "G25"
            ],
            "notes": "G37 rented total excludes dwellings occupied rent-free; those are included in other tenure."
          },
          "otherTenure": {
            "count": 43,
            "percentage": 1.8,
            "sourceCells": [
              "G27"
            ]
          },
          "notStated": {
            "count": 32,
            "percentage": 1.3,
            "sourceCells": [
              "G29"
            ]
          },
          "denominatorCell": "G31"
        },
        "overseasBornPopulation": {
          "count": 2137,
          "denominator": 6287,
          "percentage": 34.0,
          "numeratorLabel": "Persons born outside Australia",
          "denominatorLabel": "Total persons",
          "sourceTable": "G01",
          "sourceCells": {
            "numerator": [
              "D44"
            ],
            "denominator": "D17"
          },
          "basis": "Place of usual residence",
          "notes": "The G01 'Elsewhere' numerator includes inadequately described birthplaces and people at sea, and excludes birthplace not stated. The denominator is all persons."
        },
        "topOverseasCountriesOfBirth": [
          {
            "name": "India",
            "count": 259,
            "denominator": 6287,
            "percentage": 4.1,
            "sourceTable": "G09c",
            "sourceCell": "K29",
            "basis": "Place of usual residence"
          },
          {
            "name": "China (excludes SARs and Taiwan)",
            "count": 216,
            "denominator": 6287,
            "percentage": 3.4,
            "sourceTable": "G09c",
            "sourceCell": "K20",
            "basis": "Place of usual residence"
          },
          {
            "name": "England",
            "count": 199,
            "denominator": 6287,
            "percentage": 3.2,
            "sourceTable": "G09c",
            "sourceCell": "K23",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greece",
            "count": 113,
            "denominator": 6287,
            "percentage": 1.8,
            "sourceTable": "G09c",
            "sourceCell": "K27",
            "basis": "Place of usual residence"
          },
          {
            "name": "New Zealand",
            "count": 93,
            "denominator": 6287,
            "percentage": 1.5,
            "sourceTable": "G09c",
            "sourceCell": "K44",
            "basis": "Place of usual residence"
          }
        ],
        "topLanguagesSpokenAtHome": [
          {
            "name": "English only",
            "count": 4244,
            "denominator": 6287,
            "percentage": 67.5,
            "sourceTable": "G13c",
            "sourceCell": "G12",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 258,
            "denominator": 6287,
            "percentage": 4.1,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greek",
            "count": 240,
            "denominator": 6287,
            "percentage": 3.8,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Russian",
            "count": 177,
            "denominator": 6287,
            "percentage": 2.8,
            "sourceTable": "G13c",
            "sourceCell": "G46",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italian",
            "count": 86,
            "denominator": 6287,
            "percentage": 1.4,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          }
        ],
        "topNonEnglishLanguagesSpokenAtHome": [
          {
            "name": "Mandarin",
            "count": 258,
            "denominator": 6287,
            "percentage": 4.1,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greek",
            "count": 240,
            "denominator": 6287,
            "percentage": 3.8,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Russian",
            "count": 177,
            "denominator": 6287,
            "percentage": 2.8,
            "sourceTable": "G13c",
            "sourceCell": "G46",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italian",
            "count": 86,
            "denominator": 6287,
            "percentage": 1.4,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hindi",
            "count": 83,
            "denominator": 6287,
            "percentage": 1.3,
            "sourceTable": "G13c",
            "sourceCell": "G30",
            "basis": "Place of usual residence"
          }
        ],
        "religiousAffiliationSummary": [
          {
            "name": "No religion / secular or other spiritual beliefs",
            "count": 2565,
            "denominator": 6287,
            "percentage": 40.8,
            "sourceTable": "G14",
            "sourceCell": "D43",
            "basis": "Place of usual residence"
          },
          {
            "name": "Christianity",
            "count": 2633,
            "denominator": 6287,
            "percentage": 41.9,
            "sourceTable": "G14",
            "sourceCell": "D30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Buddhism",
            "count": 121,
            "denominator": 6287,
            "percentage": 1.9,
            "sourceTable": "G14",
            "sourceCell": "D9",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hinduism",
            "count": 203,
            "denominator": 6287,
            "percentage": 3.2,
            "sourceTable": "G14",
            "sourceCell": "D31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Islam",
            "count": 42,
            "denominator": 6287,
            "percentage": 0.7,
            "sourceTable": "G14",
            "sourceCell": "D32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Judaism",
            "count": 253,
            "denominator": 6287,
            "percentage": 4.0,
            "sourceTable": "G14",
            "sourceCell": "D33",
            "basis": "Place of usual residence"
          },
          {
            "name": "Other religions",
            "count": 91,
            "denominator": 6287,
            "percentage": 1.4,
            "sourceTable": "G14",
            "sourceCell": "D38",
            "basis": "Place of usual residence"
          },
          {
            "name": "Religious affiliation not stated",
            "count": 383,
            "denominator": 6287,
            "percentage": 6.1,
            "sourceTable": "G14",
            "sourceCell": "D44",
            "basis": "Place of usual residence"
          }
        ]
      },
      "additionalHouseholdContext": {
        "cantoneseSpokenAtHome": {
          "count": 48,
          "denominator": 6287,
          "percentage": 0.8,
          "numeratorLabel": "Persons who used Cantonese at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G19"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "mandarinSpokenAtHome": {
          "count": 258,
          "denominator": 6287,
          "percentage": 4.1,
          "numeratorLabel": "Persons who used Mandarin at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G20"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "hongKongBornPopulation": {
          "count": 19,
          "denominator": 6287,
          "percentage": 0.3,
          "numeratorLabel": "Persons born in Hong Kong (SAR of China)",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K28"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        },
        "chinaBornPopulation": {
          "count": 216,
          "denominator": 6287,
          "percentage": 3.4,
          "numeratorLabel": "Persons born in China, excluding SARs and Taiwan",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K20"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        }
      }
    },
    {
      "suburb": "Cheltenham",
      "geographyType": "SAL",
      "geographyCode": "SAL20539",
      "censusYear": 2021,
      "source": "Australian Bureau of Statistics",
      "retrievedAt": "2026-07-14",
      "contextOnly": true,
      "excludeFromSuburbScore": true,
      "scoreContribution": 0,
      "sourceMetadata": {
        "product": "2021 Census General Community Profile",
        "profileUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL20539",
        "downloadUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL20539/download/GCP_SAL20539.xlsx",
        "sourceWorkbook": "GCP_SAL20539.xlsx",
        "sourceWorkbookSha256": "f1a152c609a87feace091101e2f4181089dc363039aa201e07034d7393bbc3d5",
        "geographicBoundaryEdition": "ASGS Edition 3",
        "privacyNote": "ABS applies small random adjustments to cell values. Component sums can differ slightly from published totals."
      },
      "community": {
        "totalPopulation": {
          "count": 23992,
          "sourceTable": "G01",
          "sourceCells": {
            "value": "D17"
          },
          "basis": "Place of usual residence"
        },
        "medianAge": {
          "value": 40,
          "unit": "years",
          "applicablePopulation": "Persons, excluding overseas visitors",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B13"
          },
          "basis": "Place of usual residence"
        },
        "householdsWithChildren": {
          "count": 4140,
          "denominator": 9463,
          "percentage": 43.7,
          "numeratorLabel": "Occupied private dwellings whose primary family is a couple family with children or a one-parent family",
          "denominatorLabel": "Total occupied private dwellings in G42, excluding visitor-only and other non-classifiable households",
          "sourceTable": "G42",
          "sourceCells": {
            "numerator": [
              "C36",
              "D36"
            ],
            "denominator": "I36"
          },
          "basis": "Place of enumeration",
          "components": {
            "coupleFamilyWithChildren": 3104,
            "oneParentFamily": 1036
          },
          "notes": "For multiple-family households, G42 classifies the household using the primary family's composition."
        },
        "medianHouseholdIncome": {
          "value": 1919,
          "unit": "AUD per week",
          "applicablePopulation": "Occupied private dwellings; published ABS median household income",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B19"
          },
          "basis": "Place of enumeration"
        },
        "tenure": {
          "denominator": 9463,
          "denominatorLabel": "Total occupied private dwellings in G37, excluding visitor-only and other non-classifiable households",
          "basis": "Place of enumeration",
          "sourceTable": "G37",
          "ownerOccupied": {
            "count": 6626,
            "percentage": 70.0,
            "components": {
              "ownedOutright": 3105,
              "ownedWithMortgage": 3521
            },
            "sourceCells": [
              "G14",
              "G16"
            ]
          },
          "renting": {
            "count": 2561,
            "percentage": 27.1,
            "sourceCells": [
              "G25"
            ],
            "notes": "G37 rented total excludes dwellings occupied rent-free; those are included in other tenure."
          },
          "otherTenure": {
            "count": 156,
            "percentage": 1.6,
            "sourceCells": [
              "G27"
            ]
          },
          "notStated": {
            "count": 119,
            "percentage": 1.3,
            "sourceCells": [
              "G29"
            ]
          },
          "denominatorCell": "G31"
        },
        "overseasBornPopulation": {
          "count": 7271,
          "denominator": 23992,
          "percentage": 30.3,
          "numeratorLabel": "Persons born outside Australia",
          "denominatorLabel": "Total persons",
          "sourceTable": "G01",
          "sourceCells": {
            "numerator": [
              "D44"
            ],
            "denominator": "D17"
          },
          "basis": "Place of usual residence",
          "notes": "The G01 'Elsewhere' numerator includes inadequately described birthplaces and people at sea, and excludes birthplace not stated. The denominator is all persons."
        },
        "topOverseasCountriesOfBirth": [
          {
            "name": "England",
            "count": 948,
            "denominator": 23992,
            "percentage": 4.0,
            "sourceTable": "G09c",
            "sourceCell": "K23",
            "basis": "Place of usual residence"
          },
          {
            "name": "China (excludes SARs and Taiwan)",
            "count": 750,
            "denominator": 23992,
            "percentage": 3.1,
            "sourceTable": "G09c",
            "sourceCell": "K20",
            "basis": "Place of usual residence"
          },
          {
            "name": "India",
            "count": 656,
            "denominator": 23992,
            "percentage": 2.7,
            "sourceTable": "G09c",
            "sourceCell": "K29",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greece",
            "count": 478,
            "denominator": 23992,
            "percentage": 2.0,
            "sourceTable": "G09c",
            "sourceCell": "K27",
            "basis": "Place of usual residence"
          },
          {
            "name": "New Zealand",
            "count": 393,
            "denominator": 23992,
            "percentage": 1.6,
            "sourceTable": "G09c",
            "sourceCell": "K44",
            "basis": "Place of usual residence"
          }
        ],
        "topLanguagesSpokenAtHome": [
          {
            "name": "English only",
            "count": 17337,
            "denominator": 23992,
            "percentage": 72.3,
            "sourceTable": "G13c",
            "sourceCell": "G12",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greek",
            "count": 1026,
            "denominator": 23992,
            "percentage": 4.3,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 868,
            "denominator": 23992,
            "percentage": 3.6,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Russian",
            "count": 430,
            "denominator": 23992,
            "percentage": 1.8,
            "sourceTable": "G13c",
            "sourceCell": "G46",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italian",
            "count": 274,
            "denominator": 23992,
            "percentage": 1.1,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          }
        ],
        "topNonEnglishLanguagesSpokenAtHome": [
          {
            "name": "Greek",
            "count": 1026,
            "denominator": 23992,
            "percentage": 4.3,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 868,
            "denominator": 23992,
            "percentage": 3.6,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Russian",
            "count": 430,
            "denominator": 23992,
            "percentage": 1.8,
            "sourceTable": "G13c",
            "sourceCell": "G46",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italian",
            "count": 274,
            "denominator": 23992,
            "percentage": 1.1,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hindi",
            "count": 241,
            "denominator": 23992,
            "percentage": 1.0,
            "sourceTable": "G13c",
            "sourceCell": "G30",
            "basis": "Place of usual residence"
          }
        ],
        "religiousAffiliationSummary": [
          {
            "name": "No religion / secular or other spiritual beliefs",
            "count": 10456,
            "denominator": 23992,
            "percentage": 43.6,
            "sourceTable": "G14",
            "sourceCell": "D43",
            "basis": "Place of usual residence"
          },
          {
            "name": "Christianity",
            "count": 10445,
            "denominator": 23992,
            "percentage": 43.5,
            "sourceTable": "G14",
            "sourceCell": "D30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Buddhism",
            "count": 397,
            "denominator": 23992,
            "percentage": 1.7,
            "sourceTable": "G14",
            "sourceCell": "D9",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hinduism",
            "count": 613,
            "denominator": 23992,
            "percentage": 2.6,
            "sourceTable": "G14",
            "sourceCell": "D31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Islam",
            "count": 317,
            "denominator": 23992,
            "percentage": 1.3,
            "sourceTable": "G14",
            "sourceCell": "D32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Judaism",
            "count": 348,
            "denominator": 23992,
            "percentage": 1.5,
            "sourceTable": "G14",
            "sourceCell": "D33",
            "basis": "Place of usual residence"
          },
          {
            "name": "Other religions",
            "count": 181,
            "denominator": 23992,
            "percentage": 0.8,
            "sourceTable": "G14",
            "sourceCell": "D38",
            "basis": "Place of usual residence"
          },
          {
            "name": "Religious affiliation not stated",
            "count": 1236,
            "denominator": 23992,
            "percentage": 5.2,
            "sourceTable": "G14",
            "sourceCell": "D44",
            "basis": "Place of usual residence"
          }
        ]
      },
      "additionalHouseholdContext": {
        "cantoneseSpokenAtHome": {
          "count": 193,
          "denominator": 23992,
          "percentage": 0.8,
          "numeratorLabel": "Persons who used Cantonese at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G19"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "mandarinSpokenAtHome": {
          "count": 868,
          "denominator": 23992,
          "percentage": 3.6,
          "numeratorLabel": "Persons who used Mandarin at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G20"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "hongKongBornPopulation": {
          "count": 71,
          "denominator": 23992,
          "percentage": 0.3,
          "numeratorLabel": "Persons born in Hong Kong (SAR of China)",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K28"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        },
        "chinaBornPopulation": {
          "count": 750,
          "denominator": 23992,
          "percentage": 3.1,
          "numeratorLabel": "Persons born in China, excluding SARs and Taiwan",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K20"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        }
      }
    },
    {
      "suburb": "Cremorne",
      "geographyType": "SAL",
      "geographyCode": "SAL20670",
      "censusYear": 2021,
      "source": "Australian Bureau of Statistics",
      "retrievedAt": "2026-07-14",
      "contextOnly": true,
      "excludeFromSuburbScore": true,
      "scoreContribution": 0,
      "sourceMetadata": {
        "product": "2021 Census General Community Profile",
        "profileUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL20670",
        "downloadUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL20670/download/GCP_SAL20670.xlsx",
        "sourceWorkbook": "GCP_SAL20670.xlsx",
        "sourceWorkbookSha256": "17d42743ef1bb1e08b3acdcc7b115c6723913615c8425ea5d44ef3d5533b7e07",
        "geographicBoundaryEdition": "ASGS Edition 3",
        "privacyNote": "ABS applies small random adjustments to cell values. Component sums can differ slightly from published totals."
      },
      "community": {
        "totalPopulation": {
          "count": 2158,
          "sourceTable": "G01",
          "sourceCells": {
            "value": "D17"
          },
          "basis": "Place of usual residence"
        },
        "medianAge": {
          "value": 32,
          "unit": "years",
          "applicablePopulation": "Persons, excluding overseas visitors",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B13"
          },
          "basis": "Place of usual residence"
        },
        "householdsWithChildren": {
          "count": 174,
          "denominator": 1001,
          "percentage": 17.4,
          "numeratorLabel": "Occupied private dwellings whose primary family is a couple family with children or a one-parent family",
          "denominatorLabel": "Total occupied private dwellings in G42, excluding visitor-only and other non-classifiable households",
          "sourceTable": "G42",
          "sourceCells": {
            "numerator": [
              "C36",
              "D36"
            ],
            "denominator": "I36"
          },
          "basis": "Place of enumeration",
          "components": {
            "coupleFamilyWithChildren": 142,
            "oneParentFamily": 32
          },
          "notes": "For multiple-family households, G42 classifies the household using the primary family's composition."
        },
        "medianHouseholdIncome": {
          "value": 2959,
          "unit": "AUD per week",
          "applicablePopulation": "Occupied private dwellings; published ABS median household income",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B19"
          },
          "basis": "Place of enumeration"
        },
        "tenure": {
          "denominator": 1001,
          "denominatorLabel": "Total occupied private dwellings in G37, excluding visitor-only and other non-classifiable households",
          "basis": "Place of enumeration",
          "sourceTable": "G37",
          "ownerOccupied": {
            "count": 483,
            "percentage": 48.3,
            "components": {
              "ownedOutright": 168,
              "ownedWithMortgage": 315
            },
            "sourceCells": [
              "G14",
              "G16"
            ]
          },
          "renting": {
            "count": 502,
            "percentage": 50.1,
            "sourceCells": [
              "G25"
            ],
            "notes": "G37 rented total excludes dwellings occupied rent-free; those are included in other tenure."
          },
          "otherTenure": {
            "count": 5,
            "percentage": 0.5,
            "sourceCells": [
              "G27"
            ]
          },
          "notStated": {
            "count": 4,
            "percentage": 0.4,
            "sourceCells": [
              "G29"
            ]
          },
          "denominatorCell": "G31"
        },
        "overseasBornPopulation": {
          "count": 545,
          "denominator": 2158,
          "percentage": 25.3,
          "numeratorLabel": "Persons born outside Australia",
          "denominatorLabel": "Total persons",
          "sourceTable": "G01",
          "sourceCells": {
            "numerator": [
              "D44"
            ],
            "denominator": "D17"
          },
          "basis": "Place of usual residence",
          "notes": "The G01 'Elsewhere' numerator includes inadequately described birthplaces and people at sea, and excludes birthplace not stated. The denominator is all persons."
        },
        "topOverseasCountriesOfBirth": [
          {
            "name": "England",
            "count": 112,
            "denominator": 2158,
            "percentage": 5.2,
            "sourceTable": "G09c",
            "sourceCell": "K23",
            "basis": "Place of usual residence"
          },
          {
            "name": "New Zealand",
            "count": 93,
            "denominator": 2158,
            "percentage": 4.3,
            "sourceTable": "G09c",
            "sourceCell": "K44",
            "basis": "Place of usual residence"
          },
          {
            "name": "United States of America",
            "count": 24,
            "denominator": 2158,
            "percentage": 1.1,
            "sourceTable": "G09c",
            "sourceCell": "K58",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greece",
            "count": 22,
            "denominator": 2158,
            "percentage": 1.0,
            "sourceTable": "G09c",
            "sourceCell": "K27",
            "basis": "Place of usual residence"
          },
          {
            "name": "China (excludes SARs and Taiwan)",
            "count": 20,
            "denominator": 2158,
            "percentage": 0.9,
            "sourceTable": "G09c",
            "sourceCell": "K20",
            "basis": "Place of usual residence"
          }
        ],
        "topLanguagesSpokenAtHome": [
          {
            "name": "English only",
            "count": 1834,
            "denominator": 2158,
            "percentage": 85.0,
            "sourceTable": "G13c",
            "sourceCell": "G12",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greek",
            "count": 31,
            "denominator": 2158,
            "percentage": 1.4,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Spanish",
            "count": 25,
            "denominator": 2158,
            "percentage": 1.2,
            "sourceTable": "G13c",
            "sourceCell": "G55",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 19,
            "denominator": 2158,
            "percentage": 0.9,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italian",
            "count": 16,
            "denominator": 2158,
            "percentage": 0.7,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          }
        ],
        "topNonEnglishLanguagesSpokenAtHome": [
          {
            "name": "Greek",
            "count": 31,
            "denominator": 2158,
            "percentage": 1.4,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Spanish",
            "count": 25,
            "denominator": 2158,
            "percentage": 1.2,
            "sourceTable": "G13c",
            "sourceCell": "G55",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 19,
            "denominator": 2158,
            "percentage": 0.9,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italian",
            "count": 16,
            "denominator": 2158,
            "percentage": 0.7,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          },
          {
            "name": "Vietnamese",
            "count": 14,
            "denominator": 2158,
            "percentage": 0.6,
            "sourceTable": "G13c",
            "sourceCell": "G59",
            "basis": "Place of usual residence"
          }
        ],
        "religiousAffiliationSummary": [
          {
            "name": "No religion / secular or other spiritual beliefs",
            "count": 1367,
            "denominator": 2158,
            "percentage": 63.3,
            "sourceTable": "G14",
            "sourceCell": "D43",
            "basis": "Place of usual residence"
          },
          {
            "name": "Christianity",
            "count": 597,
            "denominator": 2158,
            "percentage": 27.7,
            "sourceTable": "G14",
            "sourceCell": "D30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Buddhism",
            "count": 29,
            "denominator": 2158,
            "percentage": 1.3,
            "sourceTable": "G14",
            "sourceCell": "D9",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hinduism",
            "count": 10,
            "denominator": 2158,
            "percentage": 0.5,
            "sourceTable": "G14",
            "sourceCell": "D31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Islam",
            "count": 15,
            "denominator": 2158,
            "percentage": 0.7,
            "sourceTable": "G14",
            "sourceCell": "D32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Judaism",
            "count": 12,
            "denominator": 2158,
            "percentage": 0.6,
            "sourceTable": "G14",
            "sourceCell": "D33",
            "basis": "Place of usual residence"
          },
          {
            "name": "Other religions",
            "count": 9,
            "denominator": 2158,
            "percentage": 0.4,
            "sourceTable": "G14",
            "sourceCell": "D38",
            "basis": "Place of usual residence"
          },
          {
            "name": "Religious affiliation not stated",
            "count": 117,
            "denominator": 2158,
            "percentage": 5.4,
            "sourceTable": "G14",
            "sourceCell": "D44",
            "basis": "Place of usual residence"
          }
        ]
      },
      "additionalHouseholdContext": {
        "cantoneseSpokenAtHome": {
          "count": 3,
          "denominator": 2158,
          "percentage": 0.1,
          "numeratorLabel": "Persons who used Cantonese at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G19"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "mandarinSpokenAtHome": {
          "count": 19,
          "denominator": 2158,
          "percentage": 0.9,
          "numeratorLabel": "Persons who used Mandarin at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G20"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "hongKongBornPopulation": {
          "count": 4,
          "denominator": 2158,
          "percentage": 0.2,
          "numeratorLabel": "Persons born in Hong Kong (SAR of China)",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K28"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        },
        "chinaBornPopulation": {
          "count": 20,
          "denominator": 2158,
          "percentage": 0.9,
          "numeratorLabel": "Persons born in China, excluding SARs and Taiwan",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K20"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        }
      }
    },
    {
      "suburb": "Richmond",
      "geographyType": "SAL",
      "geographyCode": "SAL22170",
      "censusYear": 2021,
      "source": "Australian Bureau of Statistics",
      "retrievedAt": "2026-07-14",
      "contextOnly": true,
      "excludeFromSuburbScore": true,
      "scoreContribution": 0,
      "sourceMetadata": {
        "product": "2021 Census General Community Profile",
        "profileUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL22170",
        "downloadUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL22170/download/GCP_SAL22170.xlsx",
        "sourceWorkbook": "GCP_SAL22170.xlsx",
        "sourceWorkbookSha256": "f309ad2b329114e1098e292d59792f9ce892de34b253828431e6628bef0d7033",
        "geographicBoundaryEdition": "ASGS Edition 3",
        "privacyNote": "ABS applies small random adjustments to cell values. Component sums can differ slightly from published totals."
      },
      "community": {
        "totalPopulation": {
          "count": 28587,
          "sourceTable": "G01",
          "sourceCells": {
            "value": "D17"
          },
          "basis": "Place of usual residence"
        },
        "medianAge": {
          "value": 34,
          "unit": "years",
          "applicablePopulation": "Persons, excluding overseas visitors",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B13"
          },
          "basis": "Place of usual residence"
        },
        "householdsWithChildren": {
          "count": 2763,
          "denominator": 13301,
          "percentage": 20.8,
          "numeratorLabel": "Occupied private dwellings whose primary family is a couple family with children or a one-parent family",
          "denominatorLabel": "Total occupied private dwellings in G42, excluding visitor-only and other non-classifiable households",
          "sourceTable": "G42",
          "sourceCells": {
            "numerator": [
              "C36",
              "D36"
            ],
            "denominator": "I36"
          },
          "basis": "Place of enumeration",
          "components": {
            "coupleFamilyWithChildren": 1909,
            "oneParentFamily": 854
          },
          "notes": "For multiple-family households, G42 classifies the household using the primary family's composition."
        },
        "medianHouseholdIncome": {
          "value": 2245,
          "unit": "AUD per week",
          "applicablePopulation": "Occupied private dwellings; published ABS median household income",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B19"
          },
          "basis": "Place of enumeration"
        },
        "tenure": {
          "denominator": 13301,
          "denominatorLabel": "Total occupied private dwellings in G37, excluding visitor-only and other non-classifiable households",
          "basis": "Place of enumeration",
          "sourceTable": "G37",
          "ownerOccupied": {
            "count": 5725,
            "percentage": 43.0,
            "components": {
              "ownedOutright": 2501,
              "ownedWithMortgage": 3224
            },
            "sourceCells": [
              "G14",
              "G16"
            ]
          },
          "renting": {
            "count": 7280,
            "percentage": 54.7,
            "sourceCells": [
              "G25"
            ],
            "notes": "G37 rented total excludes dwellings occupied rent-free; those are included in other tenure."
          },
          "otherTenure": {
            "count": 158,
            "percentage": 1.2,
            "sourceCells": [
              "G27"
            ]
          },
          "notStated": {
            "count": 132,
            "percentage": 1.0,
            "sourceCells": [
              "G29"
            ]
          },
          "denominatorCell": "G31"
        },
        "overseasBornPopulation": {
          "count": 8691,
          "denominator": 28587,
          "percentage": 30.4,
          "numeratorLabel": "Persons born outside Australia",
          "denominatorLabel": "Total persons",
          "sourceTable": "G01",
          "sourceCells": {
            "numerator": [
              "D44"
            ],
            "denominator": "D17"
          },
          "basis": "Place of usual residence",
          "notes": "The G01 'Elsewhere' numerator includes inadequately described birthplaces and people at sea, and excludes birthplace not stated. The denominator is all persons."
        },
        "topOverseasCountriesOfBirth": [
          {
            "name": "Vietnam",
            "count": 1220,
            "denominator": 28587,
            "percentage": 4.3,
            "sourceTable": "G09c",
            "sourceCell": "K59",
            "basis": "Place of usual residence"
          },
          {
            "name": "England",
            "count": 1067,
            "denominator": 28587,
            "percentage": 3.7,
            "sourceTable": "G09c",
            "sourceCell": "K23",
            "basis": "Place of usual residence"
          },
          {
            "name": "New Zealand",
            "count": 818,
            "denominator": 28587,
            "percentage": 2.9,
            "sourceTable": "G09c",
            "sourceCell": "K44",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greece",
            "count": 482,
            "denominator": 28587,
            "percentage": 1.7,
            "sourceTable": "G09c",
            "sourceCell": "K27",
            "basis": "Place of usual residence"
          },
          {
            "name": "China (excludes SARs and Taiwan)",
            "count": 472,
            "denominator": 28587,
            "percentage": 1.7,
            "sourceTable": "G09c",
            "sourceCell": "K20",
            "basis": "Place of usual residence"
          }
        ],
        "topLanguagesSpokenAtHome": [
          {
            "name": "English only",
            "count": 20614,
            "denominator": 28587,
            "percentage": 72.1,
            "sourceTable": "G13c",
            "sourceCell": "G12",
            "basis": "Place of usual residence"
          },
          {
            "name": "Vietnamese",
            "count": 1557,
            "denominator": 28587,
            "percentage": 5.4,
            "sourceTable": "G13c",
            "sourceCell": "G59",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greek",
            "count": 979,
            "denominator": 28587,
            "percentage": 3.4,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 670,
            "denominator": 28587,
            "percentage": 2.3,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Cantonese",
            "count": 384,
            "denominator": 28587,
            "percentage": 1.3,
            "sourceTable": "G13c",
            "sourceCell": "G19",
            "basis": "Place of usual residence"
          }
        ],
        "topNonEnglishLanguagesSpokenAtHome": [
          {
            "name": "Vietnamese",
            "count": 1557,
            "denominator": 28587,
            "percentage": 5.4,
            "sourceTable": "G13c",
            "sourceCell": "G59",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greek",
            "count": 979,
            "denominator": 28587,
            "percentage": 3.4,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 670,
            "denominator": 28587,
            "percentage": 2.3,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Cantonese",
            "count": 384,
            "denominator": 28587,
            "percentage": 1.3,
            "sourceTable": "G13c",
            "sourceCell": "G19",
            "basis": "Place of usual residence"
          },
          {
            "name": "Spanish",
            "count": 286,
            "denominator": 28587,
            "percentage": 1.0,
            "sourceTable": "G13c",
            "sourceCell": "G55",
            "basis": "Place of usual residence"
          }
        ],
        "religiousAffiliationSummary": [
          {
            "name": "No religion / secular or other spiritual beliefs",
            "count": 15604,
            "denominator": 28587,
            "percentage": 54.6,
            "sourceTable": "G14",
            "sourceCell": "D43",
            "basis": "Place of usual residence"
          },
          {
            "name": "Christianity",
            "count": 8805,
            "denominator": 28587,
            "percentage": 30.8,
            "sourceTable": "G14",
            "sourceCell": "D30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Buddhism",
            "count": 1378,
            "denominator": 28587,
            "percentage": 4.8,
            "sourceTable": "G14",
            "sourceCell": "D9",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hinduism",
            "count": 262,
            "denominator": 28587,
            "percentage": 0.9,
            "sourceTable": "G14",
            "sourceCell": "D31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Islam",
            "count": 488,
            "denominator": 28587,
            "percentage": 1.7,
            "sourceTable": "G14",
            "sourceCell": "D32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Judaism",
            "count": 175,
            "denominator": 28587,
            "percentage": 0.6,
            "sourceTable": "G14",
            "sourceCell": "D33",
            "basis": "Place of usual residence"
          },
          {
            "name": "Other religions",
            "count": 102,
            "denominator": 28587,
            "percentage": 0.4,
            "sourceTable": "G14",
            "sourceCell": "D38",
            "basis": "Place of usual residence"
          },
          {
            "name": "Religious affiliation not stated",
            "count": 1775,
            "denominator": 28587,
            "percentage": 6.2,
            "sourceTable": "G14",
            "sourceCell": "D44",
            "basis": "Place of usual residence"
          }
        ]
      },
      "additionalHouseholdContext": {
        "cantoneseSpokenAtHome": {
          "count": 384,
          "denominator": 28587,
          "percentage": 1.3,
          "numeratorLabel": "Persons who used Cantonese at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G19"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "mandarinSpokenAtHome": {
          "count": 670,
          "denominator": 28587,
          "percentage": 2.3,
          "numeratorLabel": "Persons who used Mandarin at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G20"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "hongKongBornPopulation": {
          "count": 116,
          "denominator": 28587,
          "percentage": 0.4,
          "numeratorLabel": "Persons born in Hong Kong (SAR of China)",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K28"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        },
        "chinaBornPopulation": {
          "count": 472,
          "denominator": 28587,
          "percentage": 1.7,
          "numeratorLabel": "Persons born in China, excluding SARs and Taiwan",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K20"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        }
      }
    },
    {
      "suburb": "Collingwood",
      "geographyType": "SAL",
      "geographyCode": "SAL20616",
      "censusYear": 2021,
      "source": "Australian Bureau of Statistics",
      "retrievedAt": "2026-07-14",
      "contextOnly": true,
      "excludeFromSuburbScore": true,
      "scoreContribution": 0,
      "sourceMetadata": {
        "product": "2021 Census General Community Profile",
        "profileUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL20616",
        "downloadUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL20616/download/GCP_SAL20616.xlsx",
        "sourceWorkbook": "GCP_SAL20616.xlsx",
        "sourceWorkbookSha256": "6f653daca802355ff2df54628c81e07f089339a2d9e37edaa15a3de51d8a215b",
        "geographicBoundaryEdition": "ASGS Edition 3",
        "privacyNote": "ABS applies small random adjustments to cell values. Component sums can differ slightly from published totals."
      },
      "community": {
        "totalPopulation": {
          "count": 9179,
          "sourceTable": "G01",
          "sourceCells": {
            "value": "D17"
          },
          "basis": "Place of usual residence"
        },
        "medianAge": {
          "value": 33,
          "unit": "years",
          "applicablePopulation": "Persons, excluding overseas visitors",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B13"
          },
          "basis": "Place of usual residence"
        },
        "householdsWithChildren": {
          "count": 715,
          "denominator": 4489,
          "percentage": 15.9,
          "numeratorLabel": "Occupied private dwellings whose primary family is a couple family with children or a one-parent family",
          "denominatorLabel": "Total occupied private dwellings in G42, excluding visitor-only and other non-classifiable households",
          "sourceTable": "G42",
          "sourceCells": {
            "numerator": [
              "C36",
              "D36"
            ],
            "denominator": "I36"
          },
          "basis": "Place of enumeration",
          "components": {
            "coupleFamilyWithChildren": 402,
            "oneParentFamily": 313
          },
          "notes": "For multiple-family households, G42 classifies the household using the primary family's composition."
        },
        "medianHouseholdIncome": {
          "value": 2130,
          "unit": "AUD per week",
          "applicablePopulation": "Occupied private dwellings; published ABS median household income",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B19"
          },
          "basis": "Place of enumeration"
        },
        "tenure": {
          "denominator": 4489,
          "denominatorLabel": "Total occupied private dwellings in G37, excluding visitor-only and other non-classifiable households",
          "basis": "Place of enumeration",
          "sourceTable": "G37",
          "ownerOccupied": {
            "count": 1495,
            "percentage": 33.3,
            "components": {
              "ownedOutright": 484,
              "ownedWithMortgage": 1011
            },
            "sourceCells": [
              "G14",
              "G16"
            ]
          },
          "renting": {
            "count": 2888,
            "percentage": 64.3,
            "sourceCells": [
              "G25"
            ],
            "notes": "G37 rented total excludes dwellings occupied rent-free; those are included in other tenure."
          },
          "otherTenure": {
            "count": 51,
            "percentage": 1.1,
            "sourceCells": [
              "G27"
            ]
          },
          "notStated": {
            "count": 61,
            "percentage": 1.4,
            "sourceCells": [
              "G29"
            ]
          },
          "denominatorCell": "G31"
        },
        "overseasBornPopulation": {
          "count": 3198,
          "denominator": 9179,
          "percentage": 34.8,
          "numeratorLabel": "Persons born outside Australia",
          "denominatorLabel": "Total persons",
          "sourceTable": "G01",
          "sourceCells": {
            "numerator": [
              "D44"
            ],
            "denominator": "D17"
          },
          "basis": "Place of usual residence",
          "notes": "The G01 'Elsewhere' numerator includes inadequately described birthplaces and people at sea, and excludes birthplace not stated. The denominator is all persons."
        },
        "topOverseasCountriesOfBirth": [
          {
            "name": "England",
            "count": 398,
            "denominator": 9179,
            "percentage": 4.3,
            "sourceTable": "G09c",
            "sourceCell": "K23",
            "basis": "Place of usual residence"
          },
          {
            "name": "New Zealand",
            "count": 329,
            "denominator": 9179,
            "percentage": 3.6,
            "sourceTable": "G09c",
            "sourceCell": "K44",
            "basis": "Place of usual residence"
          },
          {
            "name": "Vietnam",
            "count": 284,
            "denominator": 9179,
            "percentage": 3.1,
            "sourceTable": "G09c",
            "sourceCell": "K59",
            "basis": "Place of usual residence"
          },
          {
            "name": "China (excludes SARs and Taiwan)",
            "count": 161,
            "denominator": 9179,
            "percentage": 1.8,
            "sourceTable": "G09c",
            "sourceCell": "K20",
            "basis": "Place of usual residence"
          },
          {
            "name": "United States of America",
            "count": 136,
            "denominator": 9179,
            "percentage": 1.5,
            "sourceTable": "G09c",
            "sourceCell": "K58",
            "basis": "Place of usual residence"
          }
        ],
        "topLanguagesSpokenAtHome": [
          {
            "name": "English only",
            "count": 6269,
            "denominator": 9179,
            "percentage": 68.3,
            "sourceTable": "G13c",
            "sourceCell": "G12",
            "basis": "Place of usual residence"
          },
          {
            "name": "Vietnamese",
            "count": 370,
            "denominator": 9179,
            "percentage": 4.0,
            "sourceTable": "G13c",
            "sourceCell": "G59",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 200,
            "denominator": 9179,
            "percentage": 2.2,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Cantonese",
            "count": 134,
            "denominator": 9179,
            "percentage": 1.5,
            "sourceTable": "G13c",
            "sourceCell": "G19",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greek",
            "count": 121,
            "denominator": 9179,
            "percentage": 1.3,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          }
        ],
        "topNonEnglishLanguagesSpokenAtHome": [
          {
            "name": "Vietnamese",
            "count": 370,
            "denominator": 9179,
            "percentage": 4.0,
            "sourceTable": "G13c",
            "sourceCell": "G59",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 200,
            "denominator": 9179,
            "percentage": 2.2,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Cantonese",
            "count": 134,
            "denominator": 9179,
            "percentage": 1.5,
            "sourceTable": "G13c",
            "sourceCell": "G19",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greek",
            "count": 121,
            "denominator": 9179,
            "percentage": 1.3,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Arabic",
            "count": 119,
            "denominator": 9179,
            "percentage": 1.3,
            "sourceTable": "G13c",
            "sourceCell": "G16",
            "basis": "Place of usual residence"
          }
        ],
        "religiousAffiliationSummary": [
          {
            "name": "No religion / secular or other spiritual beliefs",
            "count": 5425,
            "denominator": 9179,
            "percentage": 59.1,
            "sourceTable": "G14",
            "sourceCell": "D43",
            "basis": "Place of usual residence"
          },
          {
            "name": "Christianity",
            "count": 1809,
            "denominator": 9179,
            "percentage": 19.7,
            "sourceTable": "G14",
            "sourceCell": "D30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Buddhism",
            "count": 371,
            "denominator": 9179,
            "percentage": 4.0,
            "sourceTable": "G14",
            "sourceCell": "D9",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hinduism",
            "count": 57,
            "denominator": 9179,
            "percentage": 0.6,
            "sourceTable": "G14",
            "sourceCell": "D31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Islam",
            "count": 653,
            "denominator": 9179,
            "percentage": 7.1,
            "sourceTable": "G14",
            "sourceCell": "D32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Judaism",
            "count": 68,
            "denominator": 9179,
            "percentage": 0.7,
            "sourceTable": "G14",
            "sourceCell": "D33",
            "basis": "Place of usual residence"
          },
          {
            "name": "Other religions",
            "count": 33,
            "denominator": 9179,
            "percentage": 0.4,
            "sourceTable": "G14",
            "sourceCell": "D38",
            "basis": "Place of usual residence"
          },
          {
            "name": "Religious affiliation not stated",
            "count": 749,
            "denominator": 9179,
            "percentage": 8.2,
            "sourceTable": "G14",
            "sourceCell": "D44",
            "basis": "Place of usual residence"
          }
        ]
      },
      "additionalHouseholdContext": {
        "cantoneseSpokenAtHome": {
          "count": 134,
          "denominator": 9179,
          "percentage": 1.5,
          "numeratorLabel": "Persons who used Cantonese at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G19"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "mandarinSpokenAtHome": {
          "count": 200,
          "denominator": 9179,
          "percentage": 2.2,
          "numeratorLabel": "Persons who used Mandarin at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G20"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "hongKongBornPopulation": {
          "count": 54,
          "denominator": 9179,
          "percentage": 0.6,
          "numeratorLabel": "Persons born in Hong Kong (SAR of China)",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K28"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        },
        "chinaBornPopulation": {
          "count": 161,
          "denominator": 9179,
          "percentage": 1.8,
          "numeratorLabel": "Persons born in China, excluding SARs and Taiwan",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K20"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        }
      }
    },
    {
      "suburb": "Abbotsford",
      "geographyType": "SAL",
      "geographyCode": "SAL20002",
      "censusYear": 2021,
      "source": "Australian Bureau of Statistics",
      "retrievedAt": "2026-07-14",
      "contextOnly": true,
      "excludeFromSuburbScore": true,
      "scoreContribution": 0,
      "sourceMetadata": {
        "product": "2021 Census General Community Profile",
        "profileUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL20002",
        "downloadUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL20002/download/GCP_SAL20002.xlsx",
        "sourceWorkbook": "GCP_SAL20002.xlsx",
        "sourceWorkbookSha256": "b92d71d6cb08849424d6097a74bb18b624aa9c8b3e253ce7725efe3809e34673",
        "geographicBoundaryEdition": "ASGS Edition 3",
        "privacyNote": "ABS applies small random adjustments to cell values. Component sums can differ slightly from published totals."
      },
      "community": {
        "totalPopulation": {
          "count": 9088,
          "sourceTable": "G01",
          "sourceCells": {
            "value": "D17"
          },
          "basis": "Place of usual residence"
        },
        "medianAge": {
          "value": 33,
          "unit": "years",
          "applicablePopulation": "Persons, excluding overseas visitors",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B13"
          },
          "basis": "Place of usual residence"
        },
        "householdsWithChildren": {
          "count": 732,
          "denominator": 4398,
          "percentage": 16.6,
          "numeratorLabel": "Occupied private dwellings whose primary family is a couple family with children or a one-parent family",
          "denominatorLabel": "Total occupied private dwellings in G42, excluding visitor-only and other non-classifiable households",
          "sourceTable": "G42",
          "sourceCells": {
            "numerator": [
              "C36",
              "D36"
            ],
            "denominator": "I36"
          },
          "basis": "Place of enumeration",
          "components": {
            "coupleFamilyWithChildren": 547,
            "oneParentFamily": 185
          },
          "notes": "For multiple-family households, G42 classifies the household using the primary family's composition."
        },
        "medianHouseholdIncome": {
          "value": 2197,
          "unit": "AUD per week",
          "applicablePopulation": "Occupied private dwellings; published ABS median household income",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B19"
          },
          "basis": "Place of enumeration"
        },
        "tenure": {
          "denominator": 4398,
          "denominatorLabel": "Total occupied private dwellings in G37, excluding visitor-only and other non-classifiable households",
          "basis": "Place of enumeration",
          "sourceTable": "G37",
          "ownerOccupied": {
            "count": 1867,
            "percentage": 42.5,
            "components": {
              "ownedOutright": 684,
              "ownedWithMortgage": 1183
            },
            "sourceCells": [
              "G14",
              "G16"
            ]
          },
          "renting": {
            "count": 2436,
            "percentage": 55.4,
            "sourceCells": [
              "G25"
            ],
            "notes": "G37 rented total excludes dwellings occupied rent-free; those are included in other tenure."
          },
          "otherTenure": {
            "count": 60,
            "percentage": 1.4,
            "sourceCells": [
              "G27"
            ]
          },
          "notStated": {
            "count": 33,
            "percentage": 0.8,
            "sourceCells": [
              "G29"
            ]
          },
          "denominatorCell": "G31"
        },
        "overseasBornPopulation": {
          "count": 3090,
          "denominator": 9088,
          "percentage": 34.0,
          "numeratorLabel": "Persons born outside Australia",
          "denominatorLabel": "Total persons",
          "sourceTable": "G01",
          "sourceCells": {
            "numerator": [
              "D44"
            ],
            "denominator": "D17"
          },
          "basis": "Place of usual residence",
          "notes": "The G01 'Elsewhere' numerator includes inadequately described birthplaces and people at sea, and excludes birthplace not stated. The denominator is all persons."
        },
        "topOverseasCountriesOfBirth": [
          {
            "name": "Vietnam",
            "count": 353,
            "denominator": 9088,
            "percentage": 3.9,
            "sourceTable": "G09c",
            "sourceCell": "K59",
            "basis": "Place of usual residence"
          },
          {
            "name": "England",
            "count": 339,
            "denominator": 9088,
            "percentage": 3.7,
            "sourceTable": "G09c",
            "sourceCell": "K23",
            "basis": "Place of usual residence"
          },
          {
            "name": "New Zealand",
            "count": 285,
            "denominator": 9088,
            "percentage": 3.1,
            "sourceTable": "G09c",
            "sourceCell": "K44",
            "basis": "Place of usual residence"
          },
          {
            "name": "Malaysia",
            "count": 162,
            "denominator": 9088,
            "percentage": 1.8,
            "sourceTable": "G09c",
            "sourceCell": "K38",
            "basis": "Place of usual residence"
          },
          {
            "name": "China (excludes SARs and Taiwan)",
            "count": 158,
            "denominator": 9088,
            "percentage": 1.7,
            "sourceTable": "G09c",
            "sourceCell": "K20",
            "basis": "Place of usual residence"
          }
        ],
        "topLanguagesSpokenAtHome": [
          {
            "name": "English only",
            "count": 6449,
            "denominator": 9088,
            "percentage": 71.0,
            "sourceTable": "G13c",
            "sourceCell": "G12",
            "basis": "Place of usual residence"
          },
          {
            "name": "Vietnamese",
            "count": 417,
            "denominator": 9088,
            "percentage": 4.6,
            "sourceTable": "G13c",
            "sourceCell": "G59",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 271,
            "denominator": 9088,
            "percentage": 3.0,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greek",
            "count": 173,
            "denominator": 9088,
            "percentage": 1.9,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Cantonese",
            "count": 167,
            "denominator": 9088,
            "percentage": 1.8,
            "sourceTable": "G13c",
            "sourceCell": "G19",
            "basis": "Place of usual residence"
          }
        ],
        "topNonEnglishLanguagesSpokenAtHome": [
          {
            "name": "Vietnamese",
            "count": 417,
            "denominator": 9088,
            "percentage": 4.6,
            "sourceTable": "G13c",
            "sourceCell": "G59",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 271,
            "denominator": 9088,
            "percentage": 3.0,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greek",
            "count": 173,
            "denominator": 9088,
            "percentage": 1.9,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Cantonese",
            "count": 167,
            "denominator": 9088,
            "percentage": 1.8,
            "sourceTable": "G13c",
            "sourceCell": "G19",
            "basis": "Place of usual residence"
          },
          {
            "name": "Spanish",
            "count": 151,
            "denominator": 9088,
            "percentage": 1.7,
            "sourceTable": "G13c",
            "sourceCell": "G55",
            "basis": "Place of usual residence"
          }
        ],
        "religiousAffiliationSummary": [
          {
            "name": "No religion / secular or other spiritual beliefs",
            "count": 5512,
            "denominator": 9088,
            "percentage": 60.7,
            "sourceTable": "G14",
            "sourceCell": "D43",
            "basis": "Place of usual residence"
          },
          {
            "name": "Christianity",
            "count": 2140,
            "denominator": 9088,
            "percentage": 23.5,
            "sourceTable": "G14",
            "sourceCell": "D30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Buddhism",
            "count": 432,
            "denominator": 9088,
            "percentage": 4.8,
            "sourceTable": "G14",
            "sourceCell": "D9",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hinduism",
            "count": 130,
            "denominator": 9088,
            "percentage": 1.4,
            "sourceTable": "G14",
            "sourceCell": "D31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Islam",
            "count": 92,
            "denominator": 9088,
            "percentage": 1.0,
            "sourceTable": "G14",
            "sourceCell": "D32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Judaism",
            "count": 78,
            "denominator": 9088,
            "percentage": 0.9,
            "sourceTable": "G14",
            "sourceCell": "D33",
            "basis": "Place of usual residence"
          },
          {
            "name": "Other religions",
            "count": 50,
            "denominator": 9088,
            "percentage": 0.6,
            "sourceTable": "G14",
            "sourceCell": "D38",
            "basis": "Place of usual residence"
          },
          {
            "name": "Religious affiliation not stated",
            "count": 651,
            "denominator": 9088,
            "percentage": 7.2,
            "sourceTable": "G14",
            "sourceCell": "D44",
            "basis": "Place of usual residence"
          }
        ]
      },
      "additionalHouseholdContext": {
        "cantoneseSpokenAtHome": {
          "count": 167,
          "denominator": 9088,
          "percentage": 1.8,
          "numeratorLabel": "Persons who used Cantonese at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G19"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "mandarinSpokenAtHome": {
          "count": 271,
          "denominator": 9088,
          "percentage": 3.0,
          "numeratorLabel": "Persons who used Mandarin at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G20"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "hongKongBornPopulation": {
          "count": 45,
          "denominator": 9088,
          "percentage": 0.5,
          "numeratorLabel": "Persons born in Hong Kong (SAR of China)",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K28"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        },
        "chinaBornPopulation": {
          "count": 158,
          "denominator": 9088,
          "percentage": 1.7,
          "numeratorLabel": "Persons born in China, excluding SARs and Taiwan",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K20"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        }
      }
    },
    {
      "suburb": "South Yarra",
      "geographyType": "SAL",
      "geographyCode": "SAL22314",
      "censusYear": 2021,
      "source": "Australian Bureau of Statistics",
      "retrievedAt": "2026-07-14",
      "contextOnly": true,
      "excludeFromSuburbScore": true,
      "scoreContribution": 0,
      "sourceMetadata": {
        "product": "2021 Census General Community Profile",
        "profileUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL22314",
        "downloadUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL22314/download/GCP_SAL22314.xlsx",
        "sourceWorkbook": "GCP_SAL22314.xlsx",
        "sourceWorkbookSha256": "7f96ff69276dc0e687fe2c30c3b3766d3671d65cc886cdd722610e88b887e325",
        "geographicBoundaryEdition": "ASGS Edition 3",
        "privacyNote": "ABS applies small random adjustments to cell values. Component sums can differ slightly from published totals."
      },
      "community": {
        "totalPopulation": {
          "count": 25028,
          "sourceTable": "G01",
          "sourceCells": {
            "value": "D17"
          },
          "basis": "Place of usual residence"
        },
        "medianAge": {
          "value": 33,
          "unit": "years",
          "applicablePopulation": "Persons, excluding overseas visitors",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B13"
          },
          "basis": "Place of usual residence"
        },
        "householdsWithChildren": {
          "count": 1750,
          "denominator": 13082,
          "percentage": 13.4,
          "numeratorLabel": "Occupied private dwellings whose primary family is a couple family with children or a one-parent family",
          "denominatorLabel": "Total occupied private dwellings in G42, excluding visitor-only and other non-classifiable households",
          "sourceTable": "G42",
          "sourceCells": {
            "numerator": [
              "C36",
              "D36"
            ],
            "denominator": "I36"
          },
          "basis": "Place of enumeration",
          "components": {
            "coupleFamilyWithChildren": 1168,
            "oneParentFamily": 582
          },
          "notes": "For multiple-family households, G42 classifies the household using the primary family's composition."
        },
        "medianHouseholdIncome": {
          "value": 2063,
          "unit": "AUD per week",
          "applicablePopulation": "Occupied private dwellings; published ABS median household income",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B19"
          },
          "basis": "Place of enumeration"
        },
        "tenure": {
          "denominator": 13082,
          "denominatorLabel": "Total occupied private dwellings in G37, excluding visitor-only and other non-classifiable households",
          "basis": "Place of enumeration",
          "sourceTable": "G37",
          "ownerOccupied": {
            "count": 4647,
            "percentage": 35.5,
            "components": {
              "ownedOutright": 2334,
              "ownedWithMortgage": 2313
            },
            "sourceCells": [
              "G14",
              "G16"
            ]
          },
          "renting": {
            "count": 8081,
            "percentage": 61.8,
            "sourceCells": [
              "G25"
            ],
            "notes": "G37 rented total excludes dwellings occupied rent-free; those are included in other tenure."
          },
          "otherTenure": {
            "count": 237,
            "percentage": 1.8,
            "sourceCells": [
              "G27"
            ]
          },
          "notStated": {
            "count": 121,
            "percentage": 0.9,
            "sourceCells": [
              "G29"
            ]
          },
          "denominatorCell": "G31"
        },
        "overseasBornPopulation": {
          "count": 9413,
          "denominator": 25028,
          "percentage": 37.6,
          "numeratorLabel": "Persons born outside Australia",
          "denominatorLabel": "Total persons",
          "sourceTable": "G01",
          "sourceCells": {
            "numerator": [
              "D44"
            ],
            "denominator": "D17"
          },
          "basis": "Place of usual residence",
          "notes": "The G01 'Elsewhere' numerator includes inadequately described birthplaces and people at sea, and excludes birthplace not stated. The denominator is all persons."
        },
        "topOverseasCountriesOfBirth": [
          {
            "name": "England",
            "count": 1106,
            "denominator": 25028,
            "percentage": 4.4,
            "sourceTable": "G09c",
            "sourceCell": "K23",
            "basis": "Place of usual residence"
          },
          {
            "name": "China (excludes SARs and Taiwan)",
            "count": 1103,
            "denominator": 25028,
            "percentage": 4.4,
            "sourceTable": "G09c",
            "sourceCell": "K20",
            "basis": "Place of usual residence"
          },
          {
            "name": "New Zealand",
            "count": 768,
            "denominator": 25028,
            "percentage": 3.1,
            "sourceTable": "G09c",
            "sourceCell": "K44",
            "basis": "Place of usual residence"
          },
          {
            "name": "India",
            "count": 515,
            "denominator": 25028,
            "percentage": 2.1,
            "sourceTable": "G09c",
            "sourceCell": "K29",
            "basis": "Place of usual residence"
          },
          {
            "name": "Malaysia",
            "count": 363,
            "denominator": 25028,
            "percentage": 1.5,
            "sourceTable": "G09c",
            "sourceCell": "K38",
            "basis": "Place of usual residence"
          }
        ],
        "topLanguagesSpokenAtHome": [
          {
            "name": "English only",
            "count": 17228,
            "denominator": 25028,
            "percentage": 68.8,
            "sourceTable": "G13c",
            "sourceCell": "G12",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 1333,
            "denominator": 25028,
            "percentage": 5.3,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Spanish",
            "count": 502,
            "denominator": 25028,
            "percentage": 2.0,
            "sourceTable": "G13c",
            "sourceCell": "G55",
            "basis": "Place of usual residence"
          },
          {
            "name": "Cantonese",
            "count": 400,
            "denominator": 25028,
            "percentage": 1.6,
            "sourceTable": "G13c",
            "sourceCell": "G19",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greek",
            "count": 364,
            "denominator": 25028,
            "percentage": 1.5,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          }
        ],
        "topNonEnglishLanguagesSpokenAtHome": [
          {
            "name": "Mandarin",
            "count": 1333,
            "denominator": 25028,
            "percentage": 5.3,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Spanish",
            "count": 502,
            "denominator": 25028,
            "percentage": 2.0,
            "sourceTable": "G13c",
            "sourceCell": "G55",
            "basis": "Place of usual residence"
          },
          {
            "name": "Cantonese",
            "count": 400,
            "denominator": 25028,
            "percentage": 1.6,
            "sourceTable": "G13c",
            "sourceCell": "G19",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greek",
            "count": 364,
            "denominator": 25028,
            "percentage": 1.5,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Russian",
            "count": 286,
            "denominator": 25028,
            "percentage": 1.1,
            "sourceTable": "G13c",
            "sourceCell": "G46",
            "basis": "Place of usual residence"
          }
        ],
        "religiousAffiliationSummary": [
          {
            "name": "No religion / secular or other spiritual beliefs",
            "count": 13103,
            "denominator": 25028,
            "percentage": 52.4,
            "sourceTable": "G14",
            "sourceCell": "D43",
            "basis": "Place of usual residence"
          },
          {
            "name": "Christianity",
            "count": 7568,
            "denominator": 25028,
            "percentage": 30.2,
            "sourceTable": "G14",
            "sourceCell": "D30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Buddhism",
            "count": 709,
            "denominator": 25028,
            "percentage": 2.8,
            "sourceTable": "G14",
            "sourceCell": "D9",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hinduism",
            "count": 495,
            "denominator": 25028,
            "percentage": 2.0,
            "sourceTable": "G14",
            "sourceCell": "D31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Islam",
            "count": 425,
            "denominator": 25028,
            "percentage": 1.7,
            "sourceTable": "G14",
            "sourceCell": "D32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Judaism",
            "count": 509,
            "denominator": 25028,
            "percentage": 2.0,
            "sourceTable": "G14",
            "sourceCell": "D33",
            "basis": "Place of usual residence"
          },
          {
            "name": "Other religions",
            "count": 97,
            "denominator": 25028,
            "percentage": 0.4,
            "sourceTable": "G14",
            "sourceCell": "D38",
            "basis": "Place of usual residence"
          },
          {
            "name": "Religious affiliation not stated",
            "count": 2126,
            "denominator": 25028,
            "percentage": 8.5,
            "sourceTable": "G14",
            "sourceCell": "D44",
            "basis": "Place of usual residence"
          }
        ]
      },
      "additionalHouseholdContext": {
        "cantoneseSpokenAtHome": {
          "count": 400,
          "denominator": 25028,
          "percentage": 1.6,
          "numeratorLabel": "Persons who used Cantonese at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G19"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "mandarinSpokenAtHome": {
          "count": 1333,
          "denominator": 25028,
          "percentage": 5.3,
          "numeratorLabel": "Persons who used Mandarin at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G20"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "hongKongBornPopulation": {
          "count": 168,
          "denominator": 25028,
          "percentage": 0.7,
          "numeratorLabel": "Persons born in Hong Kong (SAR of China)",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K28"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        },
        "chinaBornPopulation": {
          "count": 1103,
          "denominator": 25028,
          "percentage": 4.4,
          "numeratorLabel": "Persons born in China, excluding SARs and Taiwan",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K20"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        }
      }
    },
    {
      "suburb": "Windsor",
      "geographyType": "SAL",
      "geographyCode": "SAL22805",
      "censusYear": 2021,
      "source": "Australian Bureau of Statistics",
      "retrievedAt": "2026-07-14",
      "contextOnly": true,
      "excludeFromSuburbScore": true,
      "scoreContribution": 0,
      "sourceMetadata": {
        "product": "2021 Census General Community Profile",
        "profileUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL22805",
        "downloadUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL22805/download/GCP_SAL22805.xlsx",
        "sourceWorkbook": "GCP_SAL22805.xlsx",
        "sourceWorkbookSha256": "802b0a4e58cbc84a75eea2b46bc0bf9b0db5360e1af76cf7d739278400146375",
        "geographicBoundaryEdition": "ASGS Edition 3",
        "privacyNote": "ABS applies small random adjustments to cell values. Component sums can differ slightly from published totals."
      },
      "community": {
        "totalPopulation": {
          "count": 7273,
          "sourceTable": "G01",
          "sourceCells": {
            "value": "D17"
          },
          "basis": "Place of usual residence"
        },
        "medianAge": {
          "value": 34,
          "unit": "years",
          "applicablePopulation": "Persons, excluding overseas visitors",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B13"
          },
          "basis": "Place of usual residence"
        },
        "householdsWithChildren": {
          "count": 540,
          "denominator": 3611,
          "percentage": 15.0,
          "numeratorLabel": "Occupied private dwellings whose primary family is a couple family with children or a one-parent family",
          "denominatorLabel": "Total occupied private dwellings in G42, excluding visitor-only and other non-classifiable households",
          "sourceTable": "G42",
          "sourceCells": {
            "numerator": [
              "C36",
              "D36"
            ],
            "denominator": "I36"
          },
          "basis": "Place of enumeration",
          "components": {
            "coupleFamilyWithChildren": 375,
            "oneParentFamily": 165
          },
          "notes": "For multiple-family households, G42 classifies the household using the primary family's composition."
        },
        "medianHouseholdIncome": {
          "value": 2022,
          "unit": "AUD per week",
          "applicablePopulation": "Occupied private dwellings; published ABS median household income",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B19"
          },
          "basis": "Place of enumeration"
        },
        "tenure": {
          "denominator": 3611,
          "denominatorLabel": "Total occupied private dwellings in G37, excluding visitor-only and other non-classifiable households",
          "basis": "Place of enumeration",
          "sourceTable": "G37",
          "ownerOccupied": {
            "count": 1424,
            "percentage": 39.4,
            "components": {
              "ownedOutright": 607,
              "ownedWithMortgage": 817
            },
            "sourceCells": [
              "G14",
              "G16"
            ]
          },
          "renting": {
            "count": 2083,
            "percentage": 57.7,
            "sourceCells": [
              "G25"
            ],
            "notes": "G37 rented total excludes dwellings occupied rent-free; those are included in other tenure."
          },
          "otherTenure": {
            "count": 53,
            "percentage": 1.5,
            "sourceCells": [
              "G27"
            ]
          },
          "notStated": {
            "count": 43,
            "percentage": 1.2,
            "sourceCells": [
              "G29"
            ]
          },
          "denominatorCell": "G31"
        },
        "overseasBornPopulation": {
          "count": 2426,
          "denominator": 7273,
          "percentage": 33.4,
          "numeratorLabel": "Persons born outside Australia",
          "denominatorLabel": "Total persons",
          "sourceTable": "G01",
          "sourceCells": {
            "numerator": [
              "D44"
            ],
            "denominator": "D17"
          },
          "basis": "Place of usual residence",
          "notes": "The G01 'Elsewhere' numerator includes inadequately described birthplaces and people at sea, and excludes birthplace not stated. The denominator is all persons."
        },
        "topOverseasCountriesOfBirth": [
          {
            "name": "England",
            "count": 366,
            "denominator": 7273,
            "percentage": 5.0,
            "sourceTable": "G09c",
            "sourceCell": "K23",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greece",
            "count": 227,
            "denominator": 7273,
            "percentage": 3.1,
            "sourceTable": "G09c",
            "sourceCell": "K27",
            "basis": "Place of usual residence"
          },
          {
            "name": "New Zealand",
            "count": 224,
            "denominator": 7273,
            "percentage": 3.1,
            "sourceTable": "G09c",
            "sourceCell": "K44",
            "basis": "Place of usual residence"
          },
          {
            "name": "China (excludes SARs and Taiwan)",
            "count": 109,
            "denominator": 7273,
            "percentage": 1.5,
            "sourceTable": "G09c",
            "sourceCell": "K20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Ireland",
            "count": 87,
            "denominator": 7273,
            "percentage": 1.2,
            "sourceTable": "G09c",
            "sourceCell": "K33",
            "basis": "Place of usual residence"
          }
        ],
        "topLanguagesSpokenAtHome": [
          {
            "name": "English only",
            "count": 5220,
            "denominator": 7273,
            "percentage": 71.8,
            "sourceTable": "G13c",
            "sourceCell": "G12",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greek",
            "count": 337,
            "denominator": 7273,
            "percentage": 4.6,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 141,
            "denominator": 7273,
            "percentage": 1.9,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Spanish",
            "count": 114,
            "denominator": 7273,
            "percentage": 1.6,
            "sourceTable": "G13c",
            "sourceCell": "G55",
            "basis": "Place of usual residence"
          },
          {
            "name": "Russian",
            "count": 78,
            "denominator": 7273,
            "percentage": 1.1,
            "sourceTable": "G13c",
            "sourceCell": "G46",
            "basis": "Place of usual residence"
          }
        ],
        "topNonEnglishLanguagesSpokenAtHome": [
          {
            "name": "Greek",
            "count": 337,
            "denominator": 7273,
            "percentage": 4.6,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 141,
            "denominator": 7273,
            "percentage": 1.9,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Spanish",
            "count": 114,
            "denominator": 7273,
            "percentage": 1.6,
            "sourceTable": "G13c",
            "sourceCell": "G55",
            "basis": "Place of usual residence"
          },
          {
            "name": "Russian",
            "count": 78,
            "denominator": 7273,
            "percentage": 1.1,
            "sourceTable": "G13c",
            "sourceCell": "G46",
            "basis": "Place of usual residence"
          },
          {
            "name": "Turkish",
            "count": 75,
            "denominator": 7273,
            "percentage": 1.0,
            "sourceTable": "G13c",
            "sourceCell": "G58",
            "basis": "Place of usual residence"
          }
        ],
        "religiousAffiliationSummary": [
          {
            "name": "No religion / secular or other spiritual beliefs",
            "count": 3965,
            "denominator": 7273,
            "percentage": 54.5,
            "sourceTable": "G14",
            "sourceCell": "D43",
            "basis": "Place of usual residence"
          },
          {
            "name": "Christianity",
            "count": 2084,
            "denominator": 7273,
            "percentage": 28.7,
            "sourceTable": "G14",
            "sourceCell": "D30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Buddhism",
            "count": 139,
            "denominator": 7273,
            "percentage": 1.9,
            "sourceTable": "G14",
            "sourceCell": "D9",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hinduism",
            "count": 101,
            "denominator": 7273,
            "percentage": 1.4,
            "sourceTable": "G14",
            "sourceCell": "D31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Islam",
            "count": 169,
            "denominator": 7273,
            "percentage": 2.3,
            "sourceTable": "G14",
            "sourceCell": "D32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Judaism",
            "count": 180,
            "denominator": 7273,
            "percentage": 2.5,
            "sourceTable": "G14",
            "sourceCell": "D33",
            "basis": "Place of usual residence"
          },
          {
            "name": "Other religions",
            "count": 27,
            "denominator": 7273,
            "percentage": 0.4,
            "sourceTable": "G14",
            "sourceCell": "D38",
            "basis": "Place of usual residence"
          },
          {
            "name": "Religious affiliation not stated",
            "count": 604,
            "denominator": 7273,
            "percentage": 8.3,
            "sourceTable": "G14",
            "sourceCell": "D44",
            "basis": "Place of usual residence"
          }
        ]
      },
      "additionalHouseholdContext": {
        "cantoneseSpokenAtHome": {
          "count": 63,
          "denominator": 7273,
          "percentage": 0.9,
          "numeratorLabel": "Persons who used Cantonese at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G19"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "mandarinSpokenAtHome": {
          "count": 141,
          "denominator": 7273,
          "percentage": 1.9,
          "numeratorLabel": "Persons who used Mandarin at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G20"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "hongKongBornPopulation": {
          "count": 29,
          "denominator": 7273,
          "percentage": 0.4,
          "numeratorLabel": "Persons born in Hong Kong (SAR of China)",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K28"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        },
        "chinaBornPopulation": {
          "count": 109,
          "denominator": 7273,
          "percentage": 1.5,
          "numeratorLabel": "Persons born in China, excluding SARs and Taiwan",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K20"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        }
      }
    },
    {
      "suburb": "Prahran",
      "geographyType": "SAL",
      "geographyCode": "SAL22118",
      "censusYear": 2021,
      "source": "Australian Bureau of Statistics",
      "retrievedAt": "2026-07-14",
      "contextOnly": true,
      "excludeFromSuburbScore": true,
      "scoreContribution": 0,
      "sourceMetadata": {
        "product": "2021 Census General Community Profile",
        "profileUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL22118",
        "downloadUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL22118/download/GCP_SAL22118.xlsx",
        "sourceWorkbook": "GCP_SAL22118.xlsx",
        "sourceWorkbookSha256": "c03abf3731a18f93e6976c345d439bccd0c5d628bb5515ecab6c0653333887dd",
        "geographicBoundaryEdition": "ASGS Edition 3",
        "privacyNote": "ABS applies small random adjustments to cell values. Component sums can differ slightly from published totals."
      },
      "community": {
        "totalPopulation": {
          "count": 12203,
          "sourceTable": "G01",
          "sourceCells": {
            "value": "D17"
          },
          "basis": "Place of usual residence"
        },
        "medianAge": {
          "value": 34,
          "unit": "years",
          "applicablePopulation": "Persons, excluding overseas visitors",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B13"
          },
          "basis": "Place of usual residence"
        },
        "householdsWithChildren": {
          "count": 1056,
          "denominator": 6218,
          "percentage": 17.0,
          "numeratorLabel": "Occupied private dwellings whose primary family is a couple family with children or a one-parent family",
          "denominatorLabel": "Total occupied private dwellings in G42, excluding visitor-only and other non-classifiable households",
          "sourceTable": "G42",
          "sourceCells": {
            "numerator": [
              "C36",
              "D36"
            ],
            "denominator": "I36"
          },
          "basis": "Place of enumeration",
          "components": {
            "coupleFamilyWithChildren": 778,
            "oneParentFamily": 278
          },
          "notes": "For multiple-family households, G42 classifies the household using the primary family's composition."
        },
        "medianHouseholdIncome": {
          "value": 2121,
          "unit": "AUD per week",
          "applicablePopulation": "Occupied private dwellings; published ABS median household income",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B19"
          },
          "basis": "Place of enumeration"
        },
        "tenure": {
          "denominator": 6218,
          "denominatorLabel": "Total occupied private dwellings in G37, excluding visitor-only and other non-classifiable households",
          "basis": "Place of enumeration",
          "sourceTable": "G37",
          "ownerOccupied": {
            "count": 2710,
            "percentage": 43.6,
            "components": {
              "ownedOutright": 1224,
              "ownedWithMortgage": 1486
            },
            "sourceCells": [
              "G14",
              "G16"
            ]
          },
          "renting": {
            "count": 3370,
            "percentage": 54.2,
            "sourceCells": [
              "G25"
            ],
            "notes": "G37 rented total excludes dwellings occupied rent-free; those are included in other tenure."
          },
          "otherTenure": {
            "count": 83,
            "percentage": 1.3,
            "sourceCells": [
              "G27"
            ]
          },
          "notStated": {
            "count": 56,
            "percentage": 0.9,
            "sourceCells": [
              "G29"
            ]
          },
          "denominatorCell": "G31"
        },
        "overseasBornPopulation": {
          "count": 3828,
          "denominator": 12203,
          "percentage": 31.4,
          "numeratorLabel": "Persons born outside Australia",
          "denominatorLabel": "Total persons",
          "sourceTable": "G01",
          "sourceCells": {
            "numerator": [
              "D44"
            ],
            "denominator": "D17"
          },
          "basis": "Place of usual residence",
          "notes": "The G01 'Elsewhere' numerator includes inadequately described birthplaces and people at sea, and excludes birthplace not stated. The denominator is all persons."
        },
        "topOverseasCountriesOfBirth": [
          {
            "name": "England",
            "count": 559,
            "denominator": 12203,
            "percentage": 4.6,
            "sourceTable": "G09c",
            "sourceCell": "K23",
            "basis": "Place of usual residence"
          },
          {
            "name": "New Zealand",
            "count": 389,
            "denominator": 12203,
            "percentage": 3.2,
            "sourceTable": "G09c",
            "sourceCell": "K44",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greece",
            "count": 327,
            "denominator": 12203,
            "percentage": 2.7,
            "sourceTable": "G09c",
            "sourceCell": "K27",
            "basis": "Place of usual residence"
          },
          {
            "name": "China (excludes SARs and Taiwan)",
            "count": 181,
            "denominator": 12203,
            "percentage": 1.5,
            "sourceTable": "G09c",
            "sourceCell": "K20",
            "basis": "Place of usual residence"
          },
          {
            "name": "India",
            "count": 175,
            "denominator": 12203,
            "percentage": 1.4,
            "sourceTable": "G09c",
            "sourceCell": "K29",
            "basis": "Place of usual residence"
          }
        ],
        "topLanguagesSpokenAtHome": [
          {
            "name": "English only",
            "count": 9209,
            "denominator": 12203,
            "percentage": 75.5,
            "sourceTable": "G13c",
            "sourceCell": "G12",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greek",
            "count": 604,
            "denominator": 12203,
            "percentage": 4.9,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 232,
            "denominator": 12203,
            "percentage": 1.9,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Spanish",
            "count": 183,
            "denominator": 12203,
            "percentage": 1.5,
            "sourceTable": "G13c",
            "sourceCell": "G55",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italian",
            "count": 105,
            "denominator": 12203,
            "percentage": 0.9,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          }
        ],
        "topNonEnglishLanguagesSpokenAtHome": [
          {
            "name": "Greek",
            "count": 604,
            "denominator": 12203,
            "percentage": 4.9,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 232,
            "denominator": 12203,
            "percentage": 1.9,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Spanish",
            "count": 183,
            "denominator": 12203,
            "percentage": 1.5,
            "sourceTable": "G13c",
            "sourceCell": "G55",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italian",
            "count": 105,
            "denominator": 12203,
            "percentage": 0.9,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          },
          {
            "name": "French",
            "count": 100,
            "denominator": 12203,
            "percentage": 0.8,
            "sourceTable": "G13c",
            "sourceCell": "G24",
            "basis": "Place of usual residence"
          }
        ],
        "religiousAffiliationSummary": [
          {
            "name": "No religion / secular or other spiritual beliefs",
            "count": 6492,
            "denominator": 12203,
            "percentage": 53.2,
            "sourceTable": "G14",
            "sourceCell": "D43",
            "basis": "Place of usual residence"
          },
          {
            "name": "Christianity",
            "count": 3910,
            "denominator": 12203,
            "percentage": 32.0,
            "sourceTable": "G14",
            "sourceCell": "D30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Buddhism",
            "count": 197,
            "denominator": 12203,
            "percentage": 1.6,
            "sourceTable": "G14",
            "sourceCell": "D9",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hinduism",
            "count": 174,
            "denominator": 12203,
            "percentage": 1.4,
            "sourceTable": "G14",
            "sourceCell": "D31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Islam",
            "count": 146,
            "denominator": 12203,
            "percentage": 1.2,
            "sourceTable": "G14",
            "sourceCell": "D32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Judaism",
            "count": 396,
            "denominator": 12203,
            "percentage": 3.2,
            "sourceTable": "G14",
            "sourceCell": "D33",
            "basis": "Place of usual residence"
          },
          {
            "name": "Other religions",
            "count": 41,
            "denominator": 12203,
            "percentage": 0.3,
            "sourceTable": "G14",
            "sourceCell": "D38",
            "basis": "Place of usual residence"
          },
          {
            "name": "Religious affiliation not stated",
            "count": 847,
            "denominator": 12203,
            "percentage": 6.9,
            "sourceTable": "G14",
            "sourceCell": "D44",
            "basis": "Place of usual residence"
          }
        ]
      },
      "additionalHouseholdContext": {
        "cantoneseSpokenAtHome": {
          "count": 93,
          "denominator": 12203,
          "percentage": 0.8,
          "numeratorLabel": "Persons who used Cantonese at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G19"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "mandarinSpokenAtHome": {
          "count": 232,
          "denominator": 12203,
          "percentage": 1.9,
          "numeratorLabel": "Persons who used Mandarin at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G20"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "hongKongBornPopulation": {
          "count": 39,
          "denominator": 12203,
          "percentage": 0.3,
          "numeratorLabel": "Persons born in Hong Kong (SAR of China)",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K28"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        },
        "chinaBornPopulation": {
          "count": 181,
          "denominator": 12203,
          "percentage": 1.5,
          "numeratorLabel": "Persons born in China, excluding SARs and Taiwan",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K20"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        }
      }
    },
    {
      "suburb": "St Kilda",
      "geographyType": "SAL",
      "geographyCode": "SAL22343",
      "censusYear": 2021,
      "source": "Australian Bureau of Statistics",
      "retrievedAt": "2026-07-14",
      "contextOnly": true,
      "excludeFromSuburbScore": true,
      "scoreContribution": 0,
      "sourceMetadata": {
        "product": "2021 Census General Community Profile",
        "profileUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL22343",
        "downloadUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL22343/download/GCP_SAL22343.xlsx",
        "sourceWorkbook": "GCP_SAL22343.xlsx",
        "sourceWorkbookSha256": "bd4a654a7567c2306311eddfe88d27b8c5cb29f8ca86aaf2d62f9e6f664f3c26",
        "geographicBoundaryEdition": "ASGS Edition 3",
        "privacyNote": "ABS applies small random adjustments to cell values. Component sums can differ slightly from published totals."
      },
      "community": {
        "totalPopulation": {
          "count": 19490,
          "sourceTable": "G01",
          "sourceCells": {
            "value": "D17"
          },
          "basis": "Place of usual residence"
        },
        "medianAge": {
          "value": 36,
          "unit": "years",
          "applicablePopulation": "Persons, excluding overseas visitors",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B13"
          },
          "basis": "Place of usual residence"
        },
        "householdsWithChildren": {
          "count": 1336,
          "denominator": 10372,
          "percentage": 12.9,
          "numeratorLabel": "Occupied private dwellings whose primary family is a couple family with children or a one-parent family",
          "denominatorLabel": "Total occupied private dwellings in G42, excluding visitor-only and other non-classifiable households",
          "sourceTable": "G42",
          "sourceCells": {
            "numerator": [
              "C36",
              "D36"
            ],
            "denominator": "I36"
          },
          "basis": "Place of enumeration",
          "components": {
            "coupleFamilyWithChildren": 898,
            "oneParentFamily": 438
          },
          "notes": "For multiple-family households, G42 classifies the household using the primary family's composition."
        },
        "medianHouseholdIncome": {
          "value": 1779,
          "unit": "AUD per week",
          "applicablePopulation": "Occupied private dwellings; published ABS median household income",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B19"
          },
          "basis": "Place of enumeration"
        },
        "tenure": {
          "denominator": 10372,
          "denominatorLabel": "Total occupied private dwellings in G37, excluding visitor-only and other non-classifiable households",
          "basis": "Place of enumeration",
          "sourceTable": "G37",
          "ownerOccupied": {
            "count": 3846,
            "percentage": 37.1,
            "components": {
              "ownedOutright": 1475,
              "ownedWithMortgage": 2371
            },
            "sourceCells": [
              "G14",
              "G16"
            ]
          },
          "renting": {
            "count": 6266,
            "percentage": 60.4,
            "sourceCells": [
              "G25"
            ],
            "notes": "G37 rented total excludes dwellings occupied rent-free; those are included in other tenure."
          },
          "otherTenure": {
            "count": 119,
            "percentage": 1.1,
            "sourceCells": [
              "G27"
            ]
          },
          "notStated": {
            "count": 136,
            "percentage": 1.3,
            "sourceCells": [
              "G29"
            ]
          },
          "denominatorCell": "G31"
        },
        "overseasBornPopulation": {
          "count": 7193,
          "denominator": 19490,
          "percentage": 36.9,
          "numeratorLabel": "Persons born outside Australia",
          "denominatorLabel": "Total persons",
          "sourceTable": "G01",
          "sourceCells": {
            "numerator": [
              "D44"
            ],
            "denominator": "D17"
          },
          "basis": "Place of usual residence",
          "notes": "The G01 'Elsewhere' numerator includes inadequately described birthplaces and people at sea, and excludes birthplace not stated. The denominator is all persons."
        },
        "topOverseasCountriesOfBirth": [
          {
            "name": "England",
            "count": 1077,
            "denominator": 19490,
            "percentage": 5.5,
            "sourceTable": "G09c",
            "sourceCell": "K23",
            "basis": "Place of usual residence"
          },
          {
            "name": "New Zealand",
            "count": 633,
            "denominator": 19490,
            "percentage": 3.2,
            "sourceTable": "G09c",
            "sourceCell": "K44",
            "basis": "Place of usual residence"
          },
          {
            "name": "Ireland",
            "count": 484,
            "denominator": 19490,
            "percentage": 2.5,
            "sourceTable": "G09c",
            "sourceCell": "K33",
            "basis": "Place of usual residence"
          },
          {
            "name": "India",
            "count": 466,
            "denominator": 19490,
            "percentage": 2.4,
            "sourceTable": "G09c",
            "sourceCell": "K29",
            "basis": "Place of usual residence"
          },
          {
            "name": "United States of America",
            "count": 250,
            "denominator": 19490,
            "percentage": 1.3,
            "sourceTable": "G09c",
            "sourceCell": "K58",
            "basis": "Place of usual residence"
          }
        ],
        "topLanguagesSpokenAtHome": [
          {
            "name": "English only",
            "count": 14009,
            "denominator": 19490,
            "percentage": 71.9,
            "sourceTable": "G13c",
            "sourceCell": "G12",
            "basis": "Place of usual residence"
          },
          {
            "name": "Spanish",
            "count": 513,
            "denominator": 19490,
            "percentage": 2.6,
            "sourceTable": "G13c",
            "sourceCell": "G55",
            "basis": "Place of usual residence"
          },
          {
            "name": "French",
            "count": 265,
            "denominator": 19490,
            "percentage": 1.4,
            "sourceTable": "G13c",
            "sourceCell": "G24",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 258,
            "denominator": 19490,
            "percentage": 1.3,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italian",
            "count": 239,
            "denominator": 19490,
            "percentage": 1.2,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          }
        ],
        "topNonEnglishLanguagesSpokenAtHome": [
          {
            "name": "Spanish",
            "count": 513,
            "denominator": 19490,
            "percentage": 2.6,
            "sourceTable": "G13c",
            "sourceCell": "G55",
            "basis": "Place of usual residence"
          },
          {
            "name": "French",
            "count": 265,
            "denominator": 19490,
            "percentage": 1.4,
            "sourceTable": "G13c",
            "sourceCell": "G24",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 258,
            "denominator": 19490,
            "percentage": 1.3,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italian",
            "count": 239,
            "denominator": 19490,
            "percentage": 1.2,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          },
          {
            "name": "Russian",
            "count": 233,
            "denominator": 19490,
            "percentage": 1.2,
            "sourceTable": "G13c",
            "sourceCell": "G46",
            "basis": "Place of usual residence"
          }
        ],
        "religiousAffiliationSummary": [
          {
            "name": "No religion / secular or other spiritual beliefs",
            "count": 10954,
            "denominator": 19490,
            "percentage": 56.2,
            "sourceTable": "G14",
            "sourceCell": "D43",
            "basis": "Place of usual residence"
          },
          {
            "name": "Christianity",
            "count": 4978,
            "denominator": 19490,
            "percentage": 25.5,
            "sourceTable": "G14",
            "sourceCell": "D30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Buddhism",
            "count": 348,
            "denominator": 19490,
            "percentage": 1.8,
            "sourceTable": "G14",
            "sourceCell": "D9",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hinduism",
            "count": 405,
            "denominator": 19490,
            "percentage": 2.1,
            "sourceTable": "G14",
            "sourceCell": "D31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Islam",
            "count": 220,
            "denominator": 19490,
            "percentage": 1.1,
            "sourceTable": "G14",
            "sourceCell": "D32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Judaism",
            "count": 433,
            "denominator": 19490,
            "percentage": 2.2,
            "sourceTable": "G14",
            "sourceCell": "D33",
            "basis": "Place of usual residence"
          },
          {
            "name": "Other religions",
            "count": 141,
            "denominator": 19490,
            "percentage": 0.7,
            "sourceTable": "G14",
            "sourceCell": "D38",
            "basis": "Place of usual residence"
          },
          {
            "name": "Religious affiliation not stated",
            "count": 2006,
            "denominator": 19490,
            "percentage": 10.3,
            "sourceTable": "G14",
            "sourceCell": "D44",
            "basis": "Place of usual residence"
          }
        ]
      },
      "additionalHouseholdContext": {
        "cantoneseSpokenAtHome": {
          "count": 109,
          "denominator": 19490,
          "percentage": 0.6,
          "numeratorLabel": "Persons who used Cantonese at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G19"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "mandarinSpokenAtHome": {
          "count": 258,
          "denominator": 19490,
          "percentage": 1.3,
          "numeratorLabel": "Persons who used Mandarin at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G20"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "hongKongBornPopulation": {
          "count": 49,
          "denominator": 19490,
          "percentage": 0.3,
          "numeratorLabel": "Persons born in Hong Kong (SAR of China)",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K28"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        },
        "chinaBornPopulation": {
          "count": 206,
          "denominator": 19490,
          "percentage": 1.1,
          "numeratorLabel": "Persons born in China, excluding SARs and Taiwan",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K20"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        }
      }
    },
    {
      "suburb": "Balaclava",
      "geographyType": "SAL",
      "geographyCode": "SAL20105",
      "censusYear": 2021,
      "source": "Australian Bureau of Statistics",
      "retrievedAt": "2026-07-14",
      "contextOnly": true,
      "excludeFromSuburbScore": true,
      "scoreContribution": 0,
      "sourceMetadata": {
        "product": "2021 Census General Community Profile",
        "profileUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL20105",
        "downloadUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL20105/download/GCP_SAL20105.xlsx",
        "sourceWorkbook": "GCP_SAL20105.xlsx",
        "sourceWorkbookSha256": "22dfb085d79f899b19d21b4785eff34403a1ad4ba725ed12141af20c0300b94c",
        "geographicBoundaryEdition": "ASGS Edition 3",
        "privacyNote": "ABS applies small random adjustments to cell values. Component sums can differ slightly from published totals."
      },
      "community": {
        "totalPopulation": {
          "count": 5392,
          "sourceTable": "G01",
          "sourceCells": {
            "value": "D17"
          },
          "basis": "Place of usual residence"
        },
        "medianAge": {
          "value": 35,
          "unit": "years",
          "applicablePopulation": "Persons, excluding overseas visitors",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B13"
          },
          "basis": "Place of usual residence"
        },
        "householdsWithChildren": {
          "count": 563,
          "denominator": 2423,
          "percentage": 23.2,
          "numeratorLabel": "Occupied private dwellings whose primary family is a couple family with children or a one-parent family",
          "denominatorLabel": "Total occupied private dwellings in G42, excluding visitor-only and other non-classifiable households",
          "sourceTable": "G42",
          "sourceCells": {
            "numerator": [
              "C36",
              "D36"
            ],
            "denominator": "I36"
          },
          "basis": "Place of enumeration",
          "components": {
            "coupleFamilyWithChildren": 423,
            "oneParentFamily": 140
          },
          "notes": "For multiple-family households, G42 classifies the household using the primary family's composition."
        },
        "medianHouseholdIncome": {
          "value": 2026,
          "unit": "AUD per week",
          "applicablePopulation": "Occupied private dwellings; published ABS median household income",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B19"
          },
          "basis": "Place of enumeration"
        },
        "tenure": {
          "denominator": 2423,
          "denominatorLabel": "Total occupied private dwellings in G37, excluding visitor-only and other non-classifiable households",
          "basis": "Place of enumeration",
          "sourceTable": "G37",
          "ownerOccupied": {
            "count": 1187,
            "percentage": 49.0,
            "components": {
              "ownedOutright": 466,
              "ownedWithMortgage": 721
            },
            "sourceCells": [
              "G14",
              "G16"
            ]
          },
          "renting": {
            "count": 1171,
            "percentage": 48.3,
            "sourceCells": [
              "G25"
            ],
            "notes": "G37 rented total excludes dwellings occupied rent-free; those are included in other tenure."
          },
          "otherTenure": {
            "count": 31,
            "percentage": 1.3,
            "sourceCells": [
              "G27"
            ]
          },
          "notStated": {
            "count": 36,
            "percentage": 1.5,
            "sourceCells": [
              "G29"
            ]
          },
          "denominatorCell": "G31"
        },
        "overseasBornPopulation": {
          "count": 1782,
          "denominator": 5392,
          "percentage": 33.0,
          "numeratorLabel": "Persons born outside Australia",
          "denominatorLabel": "Total persons",
          "sourceTable": "G01",
          "sourceCells": {
            "numerator": [
              "D44"
            ],
            "denominator": "D17"
          },
          "basis": "Place of usual residence",
          "notes": "The G01 'Elsewhere' numerator includes inadequately described birthplaces and people at sea, and excludes birthplace not stated. The denominator is all persons."
        },
        "topOverseasCountriesOfBirth": [
          {
            "name": "England",
            "count": 251,
            "denominator": 5392,
            "percentage": 4.7,
            "sourceTable": "G09c",
            "sourceCell": "K23",
            "basis": "Place of usual residence"
          },
          {
            "name": "India",
            "count": 157,
            "denominator": 5392,
            "percentage": 2.9,
            "sourceTable": "G09c",
            "sourceCell": "K29",
            "basis": "Place of usual residence"
          },
          {
            "name": "New Zealand",
            "count": 138,
            "denominator": 5392,
            "percentage": 2.6,
            "sourceTable": "G09c",
            "sourceCell": "K44",
            "basis": "Place of usual residence"
          },
          {
            "name": "Ireland",
            "count": 88,
            "denominator": 5392,
            "percentage": 1.6,
            "sourceTable": "G09c",
            "sourceCell": "K33",
            "basis": "Place of usual residence"
          },
          {
            "name": "United States of America",
            "count": 82,
            "denominator": 5392,
            "percentage": 1.5,
            "sourceTable": "G09c",
            "sourceCell": "K58",
            "basis": "Place of usual residence"
          }
        ],
        "topLanguagesSpokenAtHome": [
          {
            "name": "English only",
            "count": 3873,
            "denominator": 5392,
            "percentage": 71.8,
            "sourceTable": "G13c",
            "sourceCell": "G12",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greek",
            "count": 99,
            "denominator": 5392,
            "percentage": 1.8,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Spanish",
            "count": 83,
            "denominator": 5392,
            "percentage": 1.5,
            "sourceTable": "G13c",
            "sourceCell": "G55",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 69,
            "denominator": 5392,
            "percentage": 1.3,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Russian",
            "count": 69,
            "denominator": 5392,
            "percentage": 1.3,
            "sourceTable": "G13c",
            "sourceCell": "G46",
            "basis": "Place of usual residence"
          }
        ],
        "topNonEnglishLanguagesSpokenAtHome": [
          {
            "name": "Greek",
            "count": 99,
            "denominator": 5392,
            "percentage": 1.8,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Spanish",
            "count": 83,
            "denominator": 5392,
            "percentage": 1.5,
            "sourceTable": "G13c",
            "sourceCell": "G55",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 69,
            "denominator": 5392,
            "percentage": 1.3,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Russian",
            "count": 69,
            "denominator": 5392,
            "percentage": 1.3,
            "sourceTable": "G13c",
            "sourceCell": "G46",
            "basis": "Place of usual residence"
          },
          {
            "name": "Nepali",
            "count": 56,
            "denominator": 5392,
            "percentage": 1.0,
            "sourceTable": "G13c",
            "sourceCell": "G31",
            "basis": "Place of usual residence"
          }
        ],
        "religiousAffiliationSummary": [
          {
            "name": "No religion / secular or other spiritual beliefs",
            "count": 2749,
            "denominator": 5392,
            "percentage": 51.0,
            "sourceTable": "G14",
            "sourceCell": "D43",
            "basis": "Place of usual residence"
          },
          {
            "name": "Christianity",
            "count": 1226,
            "denominator": 5392,
            "percentage": 22.7,
            "sourceTable": "G14",
            "sourceCell": "D30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Buddhism",
            "count": 65,
            "denominator": 5392,
            "percentage": 1.2,
            "sourceTable": "G14",
            "sourceCell": "D9",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hinduism",
            "count": 175,
            "denominator": 5392,
            "percentage": 3.2,
            "sourceTable": "G14",
            "sourceCell": "D31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Islam",
            "count": 51,
            "denominator": 5392,
            "percentage": 0.9,
            "sourceTable": "G14",
            "sourceCell": "D32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Judaism",
            "count": 628,
            "denominator": 5392,
            "percentage": 11.6,
            "sourceTable": "G14",
            "sourceCell": "D33",
            "basis": "Place of usual residence"
          },
          {
            "name": "Other religions",
            "count": 28,
            "denominator": 5392,
            "percentage": 0.5,
            "sourceTable": "G14",
            "sourceCell": "D38",
            "basis": "Place of usual residence"
          },
          {
            "name": "Religious affiliation not stated",
            "count": 470,
            "denominator": 5392,
            "percentage": 8.7,
            "sourceTable": "G14",
            "sourceCell": "D44",
            "basis": "Place of usual residence"
          }
        ]
      },
      "additionalHouseholdContext": {
        "cantoneseSpokenAtHome": {
          "count": 43,
          "denominator": 5392,
          "percentage": 0.8,
          "numeratorLabel": "Persons who used Cantonese at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G19"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "mandarinSpokenAtHome": {
          "count": 69,
          "denominator": 5392,
          "percentage": 1.3,
          "numeratorLabel": "Persons who used Mandarin at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G20"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "hongKongBornPopulation": {
          "count": 10,
          "denominator": 5392,
          "percentage": 0.2,
          "numeratorLabel": "Persons born in Hong Kong (SAR of China)",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K28"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        },
        "chinaBornPopulation": {
          "count": 53,
          "denominator": 5392,
          "percentage": 1.0,
          "numeratorLabel": "Persons born in China, excluding SARs and Taiwan",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K20"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        }
      }
    },
    {
      "suburb": "St Kilda East",
      "geographyType": "SAL",
      "geographyCode": "SAL22344",
      "censusYear": 2021,
      "source": "Australian Bureau of Statistics",
      "retrievedAt": "2026-07-14",
      "contextOnly": true,
      "excludeFromSuburbScore": true,
      "scoreContribution": 0,
      "sourceMetadata": {
        "product": "2021 Census General Community Profile",
        "profileUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL22344",
        "downloadUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL22344/download/GCP_SAL22344.xlsx",
        "sourceWorkbook": "GCP_SAL22344.xlsx",
        "sourceWorkbookSha256": "bdcfebdbb136a8de221319b07fe1e0a8b8a3a9fc8d61b7f3f0939e07e18f5d42",
        "geographicBoundaryEdition": "ASGS Edition 3",
        "privacyNote": "ABS applies small random adjustments to cell values. Component sums can differ slightly from published totals."
      },
      "community": {
        "totalPopulation": {
          "count": 12571,
          "sourceTable": "G01",
          "sourceCells": {
            "value": "D17"
          },
          "basis": "Place of usual residence"
        },
        "medianAge": {
          "value": 34,
          "unit": "years",
          "applicablePopulation": "Persons, excluding overseas visitors",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B13"
          },
          "basis": "Place of usual residence"
        },
        "householdsWithChildren": {
          "count": 1388,
          "denominator": 5508,
          "percentage": 25.2,
          "numeratorLabel": "Occupied private dwellings whose primary family is a couple family with children or a one-parent family",
          "denominatorLabel": "Total occupied private dwellings in G42, excluding visitor-only and other non-classifiable households",
          "sourceTable": "G42",
          "sourceCells": {
            "numerator": [
              "C36",
              "D36"
            ],
            "denominator": "I36"
          },
          "basis": "Place of enumeration",
          "components": {
            "coupleFamilyWithChildren": 1085,
            "oneParentFamily": 303
          },
          "notes": "For multiple-family households, G42 classifies the household using the primary family's composition."
        },
        "medianHouseholdIncome": {
          "value": 2020,
          "unit": "AUD per week",
          "applicablePopulation": "Occupied private dwellings; published ABS median household income",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B19"
          },
          "basis": "Place of enumeration"
        },
        "tenure": {
          "denominator": 5508,
          "denominatorLabel": "Total occupied private dwellings in G37, excluding visitor-only and other non-classifiable households",
          "basis": "Place of enumeration",
          "sourceTable": "G37",
          "ownerOccupied": {
            "count": 2687,
            "percentage": 48.8,
            "components": {
              "ownedOutright": 1128,
              "ownedWithMortgage": 1559
            },
            "sourceCells": [
              "G14",
              "G16"
            ]
          },
          "renting": {
            "count": 2672,
            "percentage": 48.5,
            "sourceCells": [
              "G25"
            ],
            "notes": "G37 rented total excludes dwellings occupied rent-free; those are included in other tenure."
          },
          "otherTenure": {
            "count": 63,
            "percentage": 1.1,
            "sourceCells": [
              "G27"
            ]
          },
          "notStated": {
            "count": 89,
            "percentage": 1.6,
            "sourceCells": [
              "G29"
            ]
          },
          "denominatorCell": "G31"
        },
        "overseasBornPopulation": {
          "count": 3878,
          "denominator": 12571,
          "percentage": 30.8,
          "numeratorLabel": "Persons born outside Australia",
          "denominatorLabel": "Total persons",
          "sourceTable": "G01",
          "sourceCells": {
            "numerator": [
              "D44"
            ],
            "denominator": "D17"
          },
          "basis": "Place of usual residence",
          "notes": "The G01 'Elsewhere' numerator includes inadequately described birthplaces and people at sea, and excludes birthplace not stated. The denominator is all persons."
        },
        "topOverseasCountriesOfBirth": [
          {
            "name": "England",
            "count": 490,
            "denominator": 12571,
            "percentage": 3.9,
            "sourceTable": "G09c",
            "sourceCell": "K23",
            "basis": "Place of usual residence"
          },
          {
            "name": "India",
            "count": 293,
            "denominator": 12571,
            "percentage": 2.3,
            "sourceTable": "G09c",
            "sourceCell": "K29",
            "basis": "Place of usual residence"
          },
          {
            "name": "New Zealand",
            "count": 274,
            "denominator": 12571,
            "percentage": 2.2,
            "sourceTable": "G09c",
            "sourceCell": "K44",
            "basis": "Place of usual residence"
          },
          {
            "name": "United States of America",
            "count": 274,
            "denominator": 12571,
            "percentage": 2.2,
            "sourceTable": "G09c",
            "sourceCell": "K58",
            "basis": "Place of usual residence"
          },
          {
            "name": "South Africa",
            "count": 191,
            "denominator": 12571,
            "percentage": 1.5,
            "sourceTable": "G09c",
            "sourceCell": "K53",
            "basis": "Place of usual residence"
          }
        ],
        "topLanguagesSpokenAtHome": [
          {
            "name": "English only",
            "count": 9208,
            "denominator": 12571,
            "percentage": 73.2,
            "sourceTable": "G13c",
            "sourceCell": "G12",
            "basis": "Place of usual residence"
          },
          {
            "name": "Russian",
            "count": 210,
            "denominator": 12571,
            "percentage": 1.7,
            "sourceTable": "G13c",
            "sourceCell": "G46",
            "basis": "Place of usual residence"
          },
          {
            "name": "Spanish",
            "count": 208,
            "denominator": 12571,
            "percentage": 1.7,
            "sourceTable": "G13c",
            "sourceCell": "G55",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greek",
            "count": 187,
            "denominator": 12571,
            "percentage": 1.5,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 138,
            "denominator": 12571,
            "percentage": 1.1,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          }
        ],
        "topNonEnglishLanguagesSpokenAtHome": [
          {
            "name": "Russian",
            "count": 210,
            "denominator": 12571,
            "percentage": 1.7,
            "sourceTable": "G13c",
            "sourceCell": "G46",
            "basis": "Place of usual residence"
          },
          {
            "name": "Spanish",
            "count": 208,
            "denominator": 12571,
            "percentage": 1.7,
            "sourceTable": "G13c",
            "sourceCell": "G55",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greek",
            "count": 187,
            "denominator": 12571,
            "percentage": 1.5,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 138,
            "denominator": 12571,
            "percentage": 1.1,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italian",
            "count": 97,
            "denominator": 12571,
            "percentage": 0.8,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          }
        ],
        "religiousAffiliationSummary": [
          {
            "name": "No religion / secular or other spiritual beliefs",
            "count": 5319,
            "denominator": 12571,
            "percentage": 42.3,
            "sourceTable": "G14",
            "sourceCell": "D43",
            "basis": "Place of usual residence"
          },
          {
            "name": "Christianity",
            "count": 2418,
            "denominator": 12571,
            "percentage": 19.2,
            "sourceTable": "G14",
            "sourceCell": "D30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Buddhism",
            "count": 167,
            "denominator": 12571,
            "percentage": 1.3,
            "sourceTable": "G14",
            "sourceCell": "D9",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hinduism",
            "count": 280,
            "denominator": 12571,
            "percentage": 2.2,
            "sourceTable": "G14",
            "sourceCell": "D31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Islam",
            "count": 78,
            "denominator": 12571,
            "percentage": 0.6,
            "sourceTable": "G14",
            "sourceCell": "D32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Judaism",
            "count": 3317,
            "denominator": 12571,
            "percentage": 26.4,
            "sourceTable": "G14",
            "sourceCell": "D33",
            "basis": "Place of usual residence"
          },
          {
            "name": "Other religions",
            "count": 53,
            "denominator": 12571,
            "percentage": 0.4,
            "sourceTable": "G14",
            "sourceCell": "D38",
            "basis": "Place of usual residence"
          },
          {
            "name": "Religious affiliation not stated",
            "count": 944,
            "denominator": 12571,
            "percentage": 7.5,
            "sourceTable": "G14",
            "sourceCell": "D44",
            "basis": "Place of usual residence"
          }
        ]
      },
      "additionalHouseholdContext": {
        "cantoneseSpokenAtHome": {
          "count": 56,
          "denominator": 12571,
          "percentage": 0.4,
          "numeratorLabel": "Persons who used Cantonese at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G19"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "mandarinSpokenAtHome": {
          "count": 138,
          "denominator": 12571,
          "percentage": 1.1,
          "numeratorLabel": "Persons who used Mandarin at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G20"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "hongKongBornPopulation": {
          "count": 39,
          "denominator": 12571,
          "percentage": 0.3,
          "numeratorLabel": "Persons born in Hong Kong (SAR of China)",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K28"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        },
        "chinaBornPopulation": {
          "count": 100,
          "denominator": 12571,
          "percentage": 0.8,
          "numeratorLabel": "Persons born in China, excluding SARs and Taiwan",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K20"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        }
      }
    },
    {
      "suburb": "Elwood",
      "geographyType": "SAL",
      "geographyCode": "SAL20867",
      "censusYear": 2021,
      "source": "Australian Bureau of Statistics",
      "retrievedAt": "2026-07-14",
      "contextOnly": true,
      "excludeFromSuburbScore": true,
      "scoreContribution": 0,
      "sourceMetadata": {
        "product": "2021 Census General Community Profile",
        "profileUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL20867",
        "downloadUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL20867/download/GCP_SAL20867.xlsx",
        "sourceWorkbook": "GCP_SAL20867.xlsx",
        "sourceWorkbookSha256": "a480c528cf5451e6354949afdde038c0f740846a8f75df2706758bccecb56cb8",
        "geographicBoundaryEdition": "ASGS Edition 3",
        "privacyNote": "ABS applies small random adjustments to cell values. Component sums can differ slightly from published totals."
      },
      "community": {
        "totalPopulation": {
          "count": 15153,
          "sourceTable": "G01",
          "sourceCells": {
            "value": "D17"
          },
          "basis": "Place of usual residence"
        },
        "medianAge": {
          "value": 38,
          "unit": "years",
          "applicablePopulation": "Persons, excluding overseas visitors",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B13"
          },
          "basis": "Place of usual residence"
        },
        "householdsWithChildren": {
          "count": 1773,
          "denominator": 7264,
          "percentage": 24.4,
          "numeratorLabel": "Occupied private dwellings whose primary family is a couple family with children or a one-parent family",
          "denominatorLabel": "Total occupied private dwellings in G42, excluding visitor-only and other non-classifiable households",
          "sourceTable": "G42",
          "sourceCells": {
            "numerator": [
              "C36",
              "D36"
            ],
            "denominator": "I36"
          },
          "basis": "Place of enumeration",
          "components": {
            "coupleFamilyWithChildren": 1293,
            "oneParentFamily": 480
          },
          "notes": "For multiple-family households, G42 classifies the household using the primary family's composition."
        },
        "medianHouseholdIncome": {
          "value": 2096,
          "unit": "AUD per week",
          "applicablePopulation": "Occupied private dwellings; published ABS median household income",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B19"
          },
          "basis": "Place of enumeration"
        },
        "tenure": {
          "denominator": 7264,
          "denominatorLabel": "Total occupied private dwellings in G37, excluding visitor-only and other non-classifiable households",
          "basis": "Place of enumeration",
          "sourceTable": "G37",
          "ownerOccupied": {
            "count": 3410,
            "percentage": 46.9,
            "components": {
              "ownedOutright": 1513,
              "ownedWithMortgage": 1897
            },
            "sourceCells": [
              "G14",
              "G16"
            ]
          },
          "renting": {
            "count": 3731,
            "percentage": 51.4,
            "sourceCells": [
              "G25"
            ],
            "notes": "G37 rented total excludes dwellings occupied rent-free; those are included in other tenure."
          },
          "otherTenure": {
            "count": 67,
            "percentage": 0.9,
            "sourceCells": [
              "G27"
            ]
          },
          "notStated": {
            "count": 55,
            "percentage": 0.8,
            "sourceCells": [
              "G29"
            ]
          },
          "denominatorCell": "G31"
        },
        "overseasBornPopulation": {
          "count": 4037,
          "denominator": 15153,
          "percentage": 26.6,
          "numeratorLabel": "Persons born outside Australia",
          "denominatorLabel": "Total persons",
          "sourceTable": "G01",
          "sourceCells": {
            "numerator": [
              "D44"
            ],
            "denominator": "D17"
          },
          "basis": "Place of usual residence",
          "notes": "The G01 'Elsewhere' numerator includes inadequately described birthplaces and people at sea, and excludes birthplace not stated. The denominator is all persons."
        },
        "topOverseasCountriesOfBirth": [
          {
            "name": "England",
            "count": 775,
            "denominator": 15153,
            "percentage": 5.1,
            "sourceTable": "G09c",
            "sourceCell": "K23",
            "basis": "Place of usual residence"
          },
          {
            "name": "New Zealand",
            "count": 356,
            "denominator": 15153,
            "percentage": 2.3,
            "sourceTable": "G09c",
            "sourceCell": "K44",
            "basis": "Place of usual residence"
          },
          {
            "name": "United States of America",
            "count": 187,
            "denominator": 15153,
            "percentage": 1.2,
            "sourceTable": "G09c",
            "sourceCell": "K58",
            "basis": "Place of usual residence"
          },
          {
            "name": "Ireland",
            "count": 176,
            "denominator": 15153,
            "percentage": 1.2,
            "sourceTable": "G09c",
            "sourceCell": "K33",
            "basis": "Place of usual residence"
          },
          {
            "name": "India",
            "count": 145,
            "denominator": 15153,
            "percentage": 1.0,
            "sourceTable": "G09c",
            "sourceCell": "K29",
            "basis": "Place of usual residence"
          }
        ],
        "topLanguagesSpokenAtHome": [
          {
            "name": "English only",
            "count": 12043,
            "denominator": 15153,
            "percentage": 79.5,
            "sourceTable": "G13c",
            "sourceCell": "G12",
            "basis": "Place of usual residence"
          },
          {
            "name": "Spanish",
            "count": 225,
            "denominator": 15153,
            "percentage": 1.5,
            "sourceTable": "G13c",
            "sourceCell": "G55",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greek",
            "count": 219,
            "denominator": 15153,
            "percentage": 1.4,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italian",
            "count": 199,
            "denominator": 15153,
            "percentage": 1.3,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          },
          {
            "name": "French",
            "count": 171,
            "denominator": 15153,
            "percentage": 1.1,
            "sourceTable": "G13c",
            "sourceCell": "G24",
            "basis": "Place of usual residence"
          }
        ],
        "topNonEnglishLanguagesSpokenAtHome": [
          {
            "name": "Spanish",
            "count": 225,
            "denominator": 15153,
            "percentage": 1.5,
            "sourceTable": "G13c",
            "sourceCell": "G55",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greek",
            "count": 219,
            "denominator": 15153,
            "percentage": 1.4,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italian",
            "count": 199,
            "denominator": 15153,
            "percentage": 1.3,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          },
          {
            "name": "French",
            "count": 171,
            "denominator": 15153,
            "percentage": 1.1,
            "sourceTable": "G13c",
            "sourceCell": "G24",
            "basis": "Place of usual residence"
          },
          {
            "name": "Russian",
            "count": 156,
            "denominator": 15153,
            "percentage": 1.0,
            "sourceTable": "G13c",
            "sourceCell": "G46",
            "basis": "Place of usual residence"
          }
        ],
        "religiousAffiliationSummary": [
          {
            "name": "No religion / secular or other spiritual beliefs",
            "count": 8788,
            "denominator": 15153,
            "percentage": 58.0,
            "sourceTable": "G14",
            "sourceCell": "D43",
            "basis": "Place of usual residence"
          },
          {
            "name": "Christianity",
            "count": 4188,
            "denominator": 15153,
            "percentage": 27.6,
            "sourceTable": "G14",
            "sourceCell": "D30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Buddhism",
            "count": 187,
            "denominator": 15153,
            "percentage": 1.2,
            "sourceTable": "G14",
            "sourceCell": "D9",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hinduism",
            "count": 101,
            "denominator": 15153,
            "percentage": 0.7,
            "sourceTable": "G14",
            "sourceCell": "D31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Islam",
            "count": 86,
            "denominator": 15153,
            "percentage": 0.6,
            "sourceTable": "G14",
            "sourceCell": "D32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Judaism",
            "count": 534,
            "denominator": 15153,
            "percentage": 3.5,
            "sourceTable": "G14",
            "sourceCell": "D33",
            "basis": "Place of usual residence"
          },
          {
            "name": "Other religions",
            "count": 71,
            "denominator": 15153,
            "percentage": 0.5,
            "sourceTable": "G14",
            "sourceCell": "D38",
            "basis": "Place of usual residence"
          },
          {
            "name": "Religious affiliation not stated",
            "count": 1202,
            "denominator": 15153,
            "percentage": 7.9,
            "sourceTable": "G14",
            "sourceCell": "D44",
            "basis": "Place of usual residence"
          }
        ]
      },
      "additionalHouseholdContext": {
        "cantoneseSpokenAtHome": {
          "count": 35,
          "denominator": 15153,
          "percentage": 0.2,
          "numeratorLabel": "Persons who used Cantonese at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G19"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "mandarinSpokenAtHome": {
          "count": 91,
          "denominator": 15153,
          "percentage": 0.6,
          "numeratorLabel": "Persons who used Mandarin at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G20"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "hongKongBornPopulation": {
          "count": 38,
          "denominator": 15153,
          "percentage": 0.3,
          "numeratorLabel": "Persons born in Hong Kong (SAR of China)",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K28"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        },
        "chinaBornPopulation": {
          "count": 72,
          "denominator": 15153,
          "percentage": 0.5,
          "numeratorLabel": "Persons born in China, excluding SARs and Taiwan",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K20"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        }
      }
    },
    {
      "suburb": "Middle Park",
      "geographyType": "SAL",
      "geographyCode": "SAL21677",
      "censusYear": 2021,
      "source": "Australian Bureau of Statistics",
      "retrievedAt": "2026-07-14",
      "contextOnly": true,
      "excludeFromSuburbScore": true,
      "scoreContribution": 0,
      "sourceMetadata": {
        "product": "2021 Census General Community Profile",
        "profileUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL21677",
        "downloadUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL21677/download/GCP_SAL21677.xlsx",
        "sourceWorkbook": "GCP_SAL21677.xlsx",
        "sourceWorkbookSha256": "8be49eb420be05bdfa22f89b451cd991c467aa18d2e2c0d2bd73993369d667f2",
        "geographicBoundaryEdition": "ASGS Edition 3",
        "privacyNote": "ABS applies small random adjustments to cell values. Component sums can differ slightly from published totals."
      },
      "community": {
        "totalPopulation": {
          "count": 4000,
          "sourceTable": "G01",
          "sourceCells": {
            "value": "D17"
          },
          "basis": "Place of usual residence"
        },
        "medianAge": {
          "value": 45,
          "unit": "years",
          "applicablePopulation": "Persons, excluding overseas visitors",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B13"
          },
          "basis": "Place of usual residence"
        },
        "householdsWithChildren": {
          "count": 633,
          "denominator": 1628,
          "percentage": 38.9,
          "numeratorLabel": "Occupied private dwellings whose primary family is a couple family with children or a one-parent family",
          "denominatorLabel": "Total occupied private dwellings in G42, excluding visitor-only and other non-classifiable households",
          "sourceTable": "G42",
          "sourceCells": {
            "numerator": [
              "C36",
              "D36"
            ],
            "denominator": "I36"
          },
          "basis": "Place of enumeration",
          "components": {
            "coupleFamilyWithChildren": 504,
            "oneParentFamily": 129
          },
          "notes": "For multiple-family households, G42 classifies the household using the primary family's composition."
        },
        "medianHouseholdIncome": {
          "value": 2836,
          "unit": "AUD per week",
          "applicablePopulation": "Occupied private dwellings; published ABS median household income",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B19"
          },
          "basis": "Place of enumeration"
        },
        "tenure": {
          "denominator": 1628,
          "denominatorLabel": "Total occupied private dwellings in G37, excluding visitor-only and other non-classifiable households",
          "basis": "Place of enumeration",
          "sourceTable": "G37",
          "ownerOccupied": {
            "count": 1077,
            "percentage": 66.2,
            "components": {
              "ownedOutright": 674,
              "ownedWithMortgage": 403
            },
            "sourceCells": [
              "G14",
              "G16"
            ]
          },
          "renting": {
            "count": 520,
            "percentage": 31.9,
            "sourceCells": [
              "G25"
            ],
            "notes": "G37 rented total excludes dwellings occupied rent-free; those are included in other tenure."
          },
          "otherTenure": {
            "count": 29,
            "percentage": 1.8,
            "sourceCells": [
              "G27"
            ]
          },
          "notStated": {
            "count": 5,
            "percentage": 0.3,
            "sourceCells": [
              "G29"
            ]
          },
          "denominatorCell": "G31"
        },
        "overseasBornPopulation": {
          "count": 999,
          "denominator": 4000,
          "percentage": 25.0,
          "numeratorLabel": "Persons born outside Australia",
          "denominatorLabel": "Total persons",
          "sourceTable": "G01",
          "sourceCells": {
            "numerator": [
              "D44"
            ],
            "denominator": "D17"
          },
          "basis": "Place of usual residence",
          "notes": "The G01 'Elsewhere' numerator includes inadequately described birthplaces and people at sea, and excludes birthplace not stated. The denominator is all persons."
        },
        "topOverseasCountriesOfBirth": [
          {
            "name": "England",
            "count": 197,
            "denominator": 4000,
            "percentage": 4.9,
            "sourceTable": "G09c",
            "sourceCell": "K23",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greece",
            "count": 111,
            "denominator": 4000,
            "percentage": 2.8,
            "sourceTable": "G09c",
            "sourceCell": "K27",
            "basis": "Place of usual residence"
          },
          {
            "name": "New Zealand",
            "count": 70,
            "denominator": 4000,
            "percentage": 1.8,
            "sourceTable": "G09c",
            "sourceCell": "K44",
            "basis": "Place of usual residence"
          },
          {
            "name": "United States of America",
            "count": 57,
            "denominator": 4000,
            "percentage": 1.4,
            "sourceTable": "G09c",
            "sourceCell": "K58",
            "basis": "Place of usual residence"
          },
          {
            "name": "India",
            "count": 56,
            "denominator": 4000,
            "percentage": 1.4,
            "sourceTable": "G09c",
            "sourceCell": "K29",
            "basis": "Place of usual residence"
          }
        ],
        "topLanguagesSpokenAtHome": [
          {
            "name": "English only",
            "count": 3189,
            "denominator": 4000,
            "percentage": 79.7,
            "sourceTable": "G13c",
            "sourceCell": "G12",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greek",
            "count": 282,
            "denominator": 4000,
            "percentage": 7.0,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italian",
            "count": 58,
            "denominator": 4000,
            "percentage": 1.5,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          },
          {
            "name": "French",
            "count": 47,
            "denominator": 4000,
            "percentage": 1.2,
            "sourceTable": "G13c",
            "sourceCell": "G24",
            "basis": "Place of usual residence"
          },
          {
            "name": "German",
            "count": 28,
            "denominator": 4000,
            "percentage": 0.7,
            "sourceTable": "G13c",
            "sourceCell": "G25",
            "basis": "Place of usual residence"
          }
        ],
        "topNonEnglishLanguagesSpokenAtHome": [
          {
            "name": "Greek",
            "count": 282,
            "denominator": 4000,
            "percentage": 7.0,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italian",
            "count": 58,
            "denominator": 4000,
            "percentage": 1.5,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          },
          {
            "name": "French",
            "count": 47,
            "denominator": 4000,
            "percentage": 1.2,
            "sourceTable": "G13c",
            "sourceCell": "G24",
            "basis": "Place of usual residence"
          },
          {
            "name": "German",
            "count": 28,
            "denominator": 4000,
            "percentage": 0.7,
            "sourceTable": "G13c",
            "sourceCell": "G25",
            "basis": "Place of usual residence"
          },
          {
            "name": "Spanish",
            "count": 27,
            "denominator": 4000,
            "percentage": 0.7,
            "sourceTable": "G13c",
            "sourceCell": "G55",
            "basis": "Place of usual residence"
          }
        ],
        "religiousAffiliationSummary": [
          {
            "name": "No religion / secular or other spiritual beliefs",
            "count": 1847,
            "denominator": 4000,
            "percentage": 46.2,
            "sourceTable": "G14",
            "sourceCell": "D43",
            "basis": "Place of usual residence"
          },
          {
            "name": "Christianity",
            "count": 1831,
            "denominator": 4000,
            "percentage": 45.8,
            "sourceTable": "G14",
            "sourceCell": "D30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Buddhism",
            "count": 28,
            "denominator": 4000,
            "percentage": 0.7,
            "sourceTable": "G14",
            "sourceCell": "D9",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hinduism",
            "count": 58,
            "denominator": 4000,
            "percentage": 1.5,
            "sourceTable": "G14",
            "sourceCell": "D31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Islam",
            "count": 15,
            "denominator": 4000,
            "percentage": 0.4,
            "sourceTable": "G14",
            "sourceCell": "D32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Judaism",
            "count": 42,
            "denominator": 4000,
            "percentage": 1.1,
            "sourceTable": "G14",
            "sourceCell": "D33",
            "basis": "Place of usual residence"
          },
          {
            "name": "Other religions",
            "count": 9,
            "denominator": 4000,
            "percentage": 0.2,
            "sourceTable": "G14",
            "sourceCell": "D38",
            "basis": "Place of usual residence"
          },
          {
            "name": "Religious affiliation not stated",
            "count": 171,
            "denominator": 4000,
            "percentage": 4.3,
            "sourceTable": "G14",
            "sourceCell": "D44",
            "basis": "Place of usual residence"
          }
        ]
      },
      "additionalHouseholdContext": {
        "cantoneseSpokenAtHome": {
          "count": 3,
          "denominator": 4000,
          "percentage": 0.1,
          "numeratorLabel": "Persons who used Cantonese at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G19"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "mandarinSpokenAtHome": {
          "count": 20,
          "denominator": 4000,
          "percentage": 0.5,
          "numeratorLabel": "Persons who used Mandarin at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G20"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "hongKongBornPopulation": {
          "count": 7,
          "denominator": 4000,
          "percentage": 0.2,
          "numeratorLabel": "Persons born in Hong Kong (SAR of China)",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K28"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        },
        "chinaBornPopulation": {
          "count": 10,
          "denominator": 4000,
          "percentage": 0.2,
          "numeratorLabel": "Persons born in China, excluding SARs and Taiwan",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K20"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        }
      }
    },
    {
      "suburb": "Mentone",
      "geographyType": "SAL",
      "geographyCode": "SAL21648",
      "censusYear": 2021,
      "source": "Australian Bureau of Statistics",
      "retrievedAt": "2026-07-14",
      "contextOnly": true,
      "excludeFromSuburbScore": true,
      "scoreContribution": 0,
      "sourceMetadata": {
        "product": "2021 Census General Community Profile",
        "profileUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL21648",
        "downloadUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL21648/download/GCP_SAL21648.xlsx",
        "sourceWorkbook": "GCP_SAL21648.xlsx",
        "sourceWorkbookSha256": "e73ca0cf72d194912412b734efb5a558178801650c6755b2ed7e1b42fd454859",
        "geographicBoundaryEdition": "ASGS Edition 3",
        "privacyNote": "ABS applies small random adjustments to cell values. Component sums can differ slightly from published totals."
      },
      "community": {
        "totalPopulation": {
          "count": 13197,
          "sourceTable": "G01",
          "sourceCells": {
            "value": "D17"
          },
          "basis": "Place of usual residence"
        },
        "medianAge": {
          "value": 42,
          "unit": "years",
          "applicablePopulation": "Persons, excluding overseas visitors",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B13"
          },
          "basis": "Place of usual residence"
        },
        "householdsWithChildren": {
          "count": 2133,
          "denominator": 5642,
          "percentage": 37.8,
          "numeratorLabel": "Occupied private dwellings whose primary family is a couple family with children or a one-parent family",
          "denominatorLabel": "Total occupied private dwellings in G42, excluding visitor-only and other non-classifiable households",
          "sourceTable": "G42",
          "sourceCells": {
            "numerator": [
              "C36",
              "D36"
            ],
            "denominator": "I36"
          },
          "basis": "Place of enumeration",
          "components": {
            "coupleFamilyWithChildren": 1554,
            "oneParentFamily": 579
          },
          "notes": "For multiple-family households, G42 classifies the household using the primary family's composition."
        },
        "medianHouseholdIncome": {
          "value": 1889,
          "unit": "AUD per week",
          "applicablePopulation": "Occupied private dwellings; published ABS median household income",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B19"
          },
          "basis": "Place of enumeration"
        },
        "tenure": {
          "denominator": 5642,
          "denominatorLabel": "Total occupied private dwellings in G37, excluding visitor-only and other non-classifiable households",
          "basis": "Place of enumeration",
          "sourceTable": "G37",
          "ownerOccupied": {
            "count": 3703,
            "percentage": 65.6,
            "components": {
              "ownedOutright": 1790,
              "ownedWithMortgage": 1913
            },
            "sourceCells": [
              "G14",
              "G16"
            ]
          },
          "renting": {
            "count": 1816,
            "percentage": 32.2,
            "sourceCells": [
              "G25"
            ],
            "notes": "G37 rented total excludes dwellings occupied rent-free; those are included in other tenure."
          },
          "otherTenure": {
            "count": 70,
            "percentage": 1.2,
            "sourceCells": [
              "G27"
            ]
          },
          "notStated": {
            "count": 57,
            "percentage": 1.0,
            "sourceCells": [
              "G29"
            ]
          },
          "denominatorCell": "G31"
        },
        "overseasBornPopulation": {
          "count": 3804,
          "denominator": 13197,
          "percentage": 28.8,
          "numeratorLabel": "Persons born outside Australia",
          "denominatorLabel": "Total persons",
          "sourceTable": "G01",
          "sourceCells": {
            "numerator": [
              "D44"
            ],
            "denominator": "D17"
          },
          "basis": "Place of usual residence",
          "notes": "The G01 'Elsewhere' numerator includes inadequately described birthplaces and people at sea, and excludes birthplace not stated. The denominator is all persons."
        },
        "topOverseasCountriesOfBirth": [
          {
            "name": "England",
            "count": 622,
            "denominator": 13197,
            "percentage": 4.7,
            "sourceTable": "G09c",
            "sourceCell": "K23",
            "basis": "Place of usual residence"
          },
          {
            "name": "China (excludes SARs and Taiwan)",
            "count": 353,
            "denominator": 13197,
            "percentage": 2.7,
            "sourceTable": "G09c",
            "sourceCell": "K20",
            "basis": "Place of usual residence"
          },
          {
            "name": "India",
            "count": 253,
            "denominator": 13197,
            "percentage": 1.9,
            "sourceTable": "G09c",
            "sourceCell": "K29",
            "basis": "Place of usual residence"
          },
          {
            "name": "New Zealand",
            "count": 243,
            "denominator": 13197,
            "percentage": 1.8,
            "sourceTable": "G09c",
            "sourceCell": "K44",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greece",
            "count": 227,
            "denominator": 13197,
            "percentage": 1.7,
            "sourceTable": "G09c",
            "sourceCell": "K27",
            "basis": "Place of usual residence"
          }
        ],
        "topLanguagesSpokenAtHome": [
          {
            "name": "English only",
            "count": 10225,
            "denominator": 13197,
            "percentage": 77.5,
            "sourceTable": "G13c",
            "sourceCell": "G12",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greek",
            "count": 460,
            "denominator": 13197,
            "percentage": 3.5,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 391,
            "denominator": 13197,
            "percentage": 3.0,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Russian",
            "count": 195,
            "denominator": 13197,
            "percentage": 1.5,
            "sourceTable": "G13c",
            "sourceCell": "G46",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italian",
            "count": 151,
            "denominator": 13197,
            "percentage": 1.1,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          }
        ],
        "topNonEnglishLanguagesSpokenAtHome": [
          {
            "name": "Greek",
            "count": 460,
            "denominator": 13197,
            "percentage": 3.5,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 391,
            "denominator": 13197,
            "percentage": 3.0,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Russian",
            "count": 195,
            "denominator": 13197,
            "percentage": 1.5,
            "sourceTable": "G13c",
            "sourceCell": "G46",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italian",
            "count": 151,
            "denominator": 13197,
            "percentage": 1.1,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          },
          {
            "name": "Spanish",
            "count": 145,
            "denominator": 13197,
            "percentage": 1.1,
            "sourceTable": "G13c",
            "sourceCell": "G55",
            "basis": "Place of usual residence"
          }
        ],
        "religiousAffiliationSummary": [
          {
            "name": "No religion / secular or other spiritual beliefs",
            "count": 5962,
            "denominator": 13197,
            "percentage": 45.2,
            "sourceTable": "G14",
            "sourceCell": "D43",
            "basis": "Place of usual residence"
          },
          {
            "name": "Christianity",
            "count": 5938,
            "denominator": 13197,
            "percentage": 45.0,
            "sourceTable": "G14",
            "sourceCell": "D30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Buddhism",
            "count": 184,
            "denominator": 13197,
            "percentage": 1.4,
            "sourceTable": "G14",
            "sourceCell": "D9",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hinduism",
            "count": 226,
            "denominator": 13197,
            "percentage": 1.7,
            "sourceTable": "G14",
            "sourceCell": "D31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Islam",
            "count": 150,
            "denominator": 13197,
            "percentage": 1.1,
            "sourceTable": "G14",
            "sourceCell": "D32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Judaism",
            "count": 108,
            "denominator": 13197,
            "percentage": 0.8,
            "sourceTable": "G14",
            "sourceCell": "D33",
            "basis": "Place of usual residence"
          },
          {
            "name": "Other religions",
            "count": 47,
            "denominator": 13197,
            "percentage": 0.4,
            "sourceTable": "G14",
            "sourceCell": "D38",
            "basis": "Place of usual residence"
          },
          {
            "name": "Religious affiliation not stated",
            "count": 592,
            "denominator": 13197,
            "percentage": 4.5,
            "sourceTable": "G14",
            "sourceCell": "D44",
            "basis": "Place of usual residence"
          }
        ]
      },
      "additionalHouseholdContext": {
        "cantoneseSpokenAtHome": {
          "count": 86,
          "denominator": 13197,
          "percentage": 0.7,
          "numeratorLabel": "Persons who used Cantonese at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G19"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "mandarinSpokenAtHome": {
          "count": 391,
          "denominator": 13197,
          "percentage": 3.0,
          "numeratorLabel": "Persons who used Mandarin at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G20"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "hongKongBornPopulation": {
          "count": 30,
          "denominator": 13197,
          "percentage": 0.2,
          "numeratorLabel": "Persons born in Hong Kong (SAR of China)",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K28"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        },
        "chinaBornPopulation": {
          "count": 353,
          "denominator": 13197,
          "percentage": 2.7,
          "numeratorLabel": "Persons born in China, excluding SARs and Taiwan",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K20"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        }
      }
    },
    {
      "suburb": "Chelsea",
      "geographyType": "SAL",
      "geographyCode": "SAL20537",
      "censusYear": 2021,
      "source": "Australian Bureau of Statistics",
      "retrievedAt": "2026-07-14",
      "contextOnly": true,
      "excludeFromSuburbScore": true,
      "scoreContribution": 0,
      "sourceMetadata": {
        "product": "2021 Census General Community Profile",
        "profileUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL20537",
        "downloadUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL20537/download/GCP_SAL20537.xlsx",
        "sourceWorkbook": "GCP_SAL20537.xlsx",
        "sourceWorkbookSha256": "0b6d67924e30176602c7fd15feabfa9fac3e1e8935d2d63beb52c2a3889806d0",
        "geographicBoundaryEdition": "ASGS Edition 3",
        "privacyNote": "ABS applies small random adjustments to cell values. Component sums can differ slightly from published totals."
      },
      "community": {
        "totalPopulation": {
          "count": 8347,
          "sourceTable": "G01",
          "sourceCells": {
            "value": "D17"
          },
          "basis": "Place of usual residence"
        },
        "medianAge": {
          "value": 41,
          "unit": "years",
          "applicablePopulation": "Persons, excluding overseas visitors",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B13"
          },
          "basis": "Place of usual residence"
        },
        "householdsWithChildren": {
          "count": 1303,
          "denominator": 3606,
          "percentage": 36.1,
          "numeratorLabel": "Occupied private dwellings whose primary family is a couple family with children or a one-parent family",
          "denominatorLabel": "Total occupied private dwellings in G42, excluding visitor-only and other non-classifiable households",
          "sourceTable": "G42",
          "sourceCells": {
            "numerator": [
              "C36",
              "D36"
            ],
            "denominator": "I36"
          },
          "basis": "Place of enumeration",
          "components": {
            "coupleFamilyWithChildren": 906,
            "oneParentFamily": 397
          },
          "notes": "For multiple-family households, G42 classifies the household using the primary family's composition."
        },
        "medianHouseholdIncome": {
          "value": 1683,
          "unit": "AUD per week",
          "applicablePopulation": "Occupied private dwellings; published ABS median household income",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B19"
          },
          "basis": "Place of enumeration"
        },
        "tenure": {
          "denominator": 3606,
          "denominatorLabel": "Total occupied private dwellings in G37, excluding visitor-only and other non-classifiable households",
          "basis": "Place of enumeration",
          "sourceTable": "G37",
          "ownerOccupied": {
            "count": 2348,
            "percentage": 65.1,
            "components": {
              "ownedOutright": 1035,
              "ownedWithMortgage": 1313
            },
            "sourceCells": [
              "G14",
              "G16"
            ]
          },
          "renting": {
            "count": 1140,
            "percentage": 31.6,
            "sourceCells": [
              "G25"
            ],
            "notes": "G37 rented total excludes dwellings occupied rent-free; those are included in other tenure."
          },
          "otherTenure": {
            "count": 60,
            "percentage": 1.7,
            "sourceCells": [
              "G27"
            ]
          },
          "notStated": {
            "count": 51,
            "percentage": 1.4,
            "sourceCells": [
              "G29"
            ]
          },
          "denominatorCell": "G31"
        },
        "overseasBornPopulation": {
          "count": 2038,
          "denominator": 8347,
          "percentage": 24.4,
          "numeratorLabel": "Persons born outside Australia",
          "denominatorLabel": "Total persons",
          "sourceTable": "G01",
          "sourceCells": {
            "numerator": [
              "D44"
            ],
            "denominator": "D17"
          },
          "basis": "Place of usual residence",
          "notes": "The G01 'Elsewhere' numerator includes inadequately described birthplaces and people at sea, and excludes birthplace not stated. The denominator is all persons."
        },
        "topOverseasCountriesOfBirth": [
          {
            "name": "England",
            "count": 400,
            "denominator": 8347,
            "percentage": 4.8,
            "sourceTable": "G09c",
            "sourceCell": "K23",
            "basis": "Place of usual residence"
          },
          {
            "name": "New Zealand",
            "count": 158,
            "denominator": 8347,
            "percentage": 1.9,
            "sourceTable": "G09c",
            "sourceCell": "K44",
            "basis": "Place of usual residence"
          },
          {
            "name": "India",
            "count": 115,
            "denominator": 8347,
            "percentage": 1.4,
            "sourceTable": "G09c",
            "sourceCell": "K29",
            "basis": "Place of usual residence"
          },
          {
            "name": "Philippines",
            "count": 74,
            "denominator": 8347,
            "percentage": 0.9,
            "sourceTable": "G09c",
            "sourceCell": "K48",
            "basis": "Place of usual residence"
          },
          {
            "name": "Scotland",
            "count": 71,
            "denominator": 8347,
            "percentage": 0.9,
            "sourceTable": "G09c",
            "sourceCell": "K51",
            "basis": "Place of usual residence"
          }
        ],
        "topLanguagesSpokenAtHome": [
          {
            "name": "English only",
            "count": 6756,
            "denominator": 8347,
            "percentage": 80.9,
            "sourceTable": "G13c",
            "sourceCell": "G12",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greek",
            "count": 148,
            "denominator": 8347,
            "percentage": 1.8,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Russian",
            "count": 94,
            "denominator": 8347,
            "percentage": 1.1,
            "sourceTable": "G13c",
            "sourceCell": "G46",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 92,
            "denominator": 8347,
            "percentage": 1.1,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italian",
            "count": 84,
            "denominator": 8347,
            "percentage": 1.0,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          }
        ],
        "topNonEnglishLanguagesSpokenAtHome": [
          {
            "name": "Greek",
            "count": 148,
            "denominator": 8347,
            "percentage": 1.8,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Russian",
            "count": 94,
            "denominator": 8347,
            "percentage": 1.1,
            "sourceTable": "G13c",
            "sourceCell": "G46",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 92,
            "denominator": 8347,
            "percentage": 1.1,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italian",
            "count": 84,
            "denominator": 8347,
            "percentage": 1.0,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          },
          {
            "name": "Spanish",
            "count": 64,
            "denominator": 8347,
            "percentage": 0.8,
            "sourceTable": "G13c",
            "sourceCell": "G55",
            "basis": "Place of usual residence"
          }
        ],
        "religiousAffiliationSummary": [
          {
            "name": "No religion / secular or other spiritual beliefs",
            "count": 3981,
            "denominator": 8347,
            "percentage": 47.7,
            "sourceTable": "G14",
            "sourceCell": "D43",
            "basis": "Place of usual residence"
          },
          {
            "name": "Christianity",
            "count": 3541,
            "denominator": 8347,
            "percentage": 42.4,
            "sourceTable": "G14",
            "sourceCell": "D30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Buddhism",
            "count": 108,
            "denominator": 8347,
            "percentage": 1.3,
            "sourceTable": "G14",
            "sourceCell": "D9",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hinduism",
            "count": 77,
            "denominator": 8347,
            "percentage": 0.9,
            "sourceTable": "G14",
            "sourceCell": "D31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Islam",
            "count": 48,
            "denominator": 8347,
            "percentage": 0.6,
            "sourceTable": "G14",
            "sourceCell": "D32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Judaism",
            "count": 45,
            "denominator": 8347,
            "percentage": 0.5,
            "sourceTable": "G14",
            "sourceCell": "D33",
            "basis": "Place of usual residence"
          },
          {
            "name": "Other religions",
            "count": 35,
            "denominator": 8347,
            "percentage": 0.4,
            "sourceTable": "G14",
            "sourceCell": "D38",
            "basis": "Place of usual residence"
          },
          {
            "name": "Religious affiliation not stated",
            "count": 506,
            "denominator": 8347,
            "percentage": 6.1,
            "sourceTable": "G14",
            "sourceCell": "D44",
            "basis": "Place of usual residence"
          }
        ]
      },
      "additionalHouseholdContext": {
        "cantoneseSpokenAtHome": {
          "count": 27,
          "denominator": 8347,
          "percentage": 0.3,
          "numeratorLabel": "Persons who used Cantonese at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G19"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "mandarinSpokenAtHome": {
          "count": 92,
          "denominator": 8347,
          "percentage": 1.1,
          "numeratorLabel": "Persons who used Mandarin at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G20"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "hongKongBornPopulation": {
          "count": 16,
          "denominator": 8347,
          "percentage": 0.2,
          "numeratorLabel": "Persons born in Hong Kong (SAR of China)",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K28"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        },
        "chinaBornPopulation": {
          "count": 68,
          "denominator": 8347,
          "percentage": 0.8,
          "numeratorLabel": "Persons born in China, excluding SARs and Taiwan",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K20"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        }
      }
    },
    {
      "suburb": "Bonbeach",
      "geographyType": "SAL",
      "geographyCode": "SAL20278",
      "censusYear": 2021,
      "source": "Australian Bureau of Statistics",
      "retrievedAt": "2026-07-14",
      "contextOnly": true,
      "excludeFromSuburbScore": true,
      "scoreContribution": 0,
      "sourceMetadata": {
        "product": "2021 Census General Community Profile",
        "profileUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL20278",
        "downloadUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL20278/download/GCP_SAL20278.xlsx",
        "sourceWorkbook": "GCP_SAL20278.xlsx",
        "sourceWorkbookSha256": "cdc3a6f6b3939d84b60a6935b87c49ec4848cfae5893270ad1c1d3d26b76578f",
        "geographicBoundaryEdition": "ASGS Edition 3",
        "privacyNote": "ABS applies small random adjustments to cell values. Component sums can differ slightly from published totals."
      },
      "community": {
        "totalPopulation": {
          "count": 6855,
          "sourceTable": "G01",
          "sourceCells": {
            "value": "D17"
          },
          "basis": "Place of usual residence"
        },
        "medianAge": {
          "value": 42,
          "unit": "years",
          "applicablePopulation": "Persons, excluding overseas visitors",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B13"
          },
          "basis": "Place of usual residence"
        },
        "householdsWithChildren": {
          "count": 1025,
          "denominator": 2844,
          "percentage": 36.0,
          "numeratorLabel": "Occupied private dwellings whose primary family is a couple family with children or a one-parent family",
          "denominatorLabel": "Total occupied private dwellings in G42, excluding visitor-only and other non-classifiable households",
          "sourceTable": "G42",
          "sourceCells": {
            "numerator": [
              "C36",
              "D36"
            ],
            "denominator": "I36"
          },
          "basis": "Place of enumeration",
          "components": {
            "coupleFamilyWithChildren": 753,
            "oneParentFamily": 272
          },
          "notes": "For multiple-family households, G42 classifies the household using the primary family's composition."
        },
        "medianHouseholdIncome": {
          "value": 1766,
          "unit": "AUD per week",
          "applicablePopulation": "Occupied private dwellings; published ABS median household income",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B19"
          },
          "basis": "Place of enumeration"
        },
        "tenure": {
          "denominator": 2844,
          "denominatorLabel": "Total occupied private dwellings in G37, excluding visitor-only and other non-classifiable households",
          "basis": "Place of enumeration",
          "sourceTable": "G37",
          "ownerOccupied": {
            "count": 1951,
            "percentage": 68.6,
            "components": {
              "ownedOutright": 857,
              "ownedWithMortgage": 1094
            },
            "sourceCells": [
              "G14",
              "G16"
            ]
          },
          "renting": {
            "count": 832,
            "percentage": 29.3,
            "sourceCells": [
              "G25"
            ],
            "notes": "G37 rented total excludes dwellings occupied rent-free; those are included in other tenure."
          },
          "otherTenure": {
            "count": 31,
            "percentage": 1.1,
            "sourceCells": [
              "G27"
            ]
          },
          "notStated": {
            "count": 34,
            "percentage": 1.2,
            "sourceCells": [
              "G29"
            ]
          },
          "denominatorCell": "G31"
        },
        "overseasBornPopulation": {
          "count": 1569,
          "denominator": 6855,
          "percentage": 22.9,
          "numeratorLabel": "Persons born outside Australia",
          "denominatorLabel": "Total persons",
          "sourceTable": "G01",
          "sourceCells": {
            "numerator": [
              "D44"
            ],
            "denominator": "D17"
          },
          "basis": "Place of usual residence",
          "notes": "The G01 'Elsewhere' numerator includes inadequately described birthplaces and people at sea, and excludes birthplace not stated. The denominator is all persons."
        },
        "topOverseasCountriesOfBirth": [
          {
            "name": "England",
            "count": 360,
            "denominator": 6855,
            "percentage": 5.3,
            "sourceTable": "G09c",
            "sourceCell": "K23",
            "basis": "Place of usual residence"
          },
          {
            "name": "New Zealand",
            "count": 183,
            "denominator": 6855,
            "percentage": 2.7,
            "sourceTable": "G09c",
            "sourceCell": "K44",
            "basis": "Place of usual residence"
          },
          {
            "name": "India",
            "count": 59,
            "denominator": 6855,
            "percentage": 0.9,
            "sourceTable": "G09c",
            "sourceCell": "K29",
            "basis": "Place of usual residence"
          },
          {
            "name": "China (excludes SARs and Taiwan)",
            "count": 55,
            "denominator": 6855,
            "percentage": 0.8,
            "sourceTable": "G09c",
            "sourceCell": "K20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Scotland",
            "count": 55,
            "denominator": 6855,
            "percentage": 0.8,
            "sourceTable": "G09c",
            "sourceCell": "K51",
            "basis": "Place of usual residence"
          }
        ],
        "topLanguagesSpokenAtHome": [
          {
            "name": "English only",
            "count": 5750,
            "denominator": 6855,
            "percentage": 83.9,
            "sourceTable": "G13c",
            "sourceCell": "G12",
            "basis": "Place of usual residence"
          },
          {
            "name": "Russian",
            "count": 105,
            "denominator": 6855,
            "percentage": 1.5,
            "sourceTable": "G13c",
            "sourceCell": "G46",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 60,
            "denominator": 6855,
            "percentage": 0.9,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greek",
            "count": 52,
            "denominator": 6855,
            "percentage": 0.8,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italian",
            "count": 50,
            "denominator": 6855,
            "percentage": 0.7,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          }
        ],
        "topNonEnglishLanguagesSpokenAtHome": [
          {
            "name": "Russian",
            "count": 105,
            "denominator": 6855,
            "percentage": 1.5,
            "sourceTable": "G13c",
            "sourceCell": "G46",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 60,
            "denominator": 6855,
            "percentage": 0.9,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greek",
            "count": 52,
            "denominator": 6855,
            "percentage": 0.8,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italian",
            "count": 50,
            "denominator": 6855,
            "percentage": 0.7,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          },
          {
            "name": "Spanish",
            "count": 45,
            "denominator": 6855,
            "percentage": 0.7,
            "sourceTable": "G13c",
            "sourceCell": "G55",
            "basis": "Place of usual residence"
          }
        ],
        "religiousAffiliationSummary": [
          {
            "name": "No religion / secular or other spiritual beliefs",
            "count": 3405,
            "denominator": 6855,
            "percentage": 49.7,
            "sourceTable": "G14",
            "sourceCell": "D43",
            "basis": "Place of usual residence"
          },
          {
            "name": "Christianity",
            "count": 2819,
            "denominator": 6855,
            "percentage": 41.1,
            "sourceTable": "G14",
            "sourceCell": "D30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Buddhism",
            "count": 73,
            "denominator": 6855,
            "percentage": 1.1,
            "sourceTable": "G14",
            "sourceCell": "D9",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hinduism",
            "count": 25,
            "denominator": 6855,
            "percentage": 0.4,
            "sourceTable": "G14",
            "sourceCell": "D31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Islam",
            "count": 17,
            "denominator": 6855,
            "percentage": 0.2,
            "sourceTable": "G14",
            "sourceCell": "D32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Judaism",
            "count": 30,
            "denominator": 6855,
            "percentage": 0.4,
            "sourceTable": "G14",
            "sourceCell": "D33",
            "basis": "Place of usual residence"
          },
          {
            "name": "Other religions",
            "count": 14,
            "denominator": 6855,
            "percentage": 0.2,
            "sourceTable": "G14",
            "sourceCell": "D38",
            "basis": "Place of usual residence"
          },
          {
            "name": "Religious affiliation not stated",
            "count": 474,
            "denominator": 6855,
            "percentage": 6.9,
            "sourceTable": "G14",
            "sourceCell": "D44",
            "basis": "Place of usual residence"
          }
        ]
      },
      "additionalHouseholdContext": {
        "cantoneseSpokenAtHome": {
          "count": 21,
          "denominator": 6855,
          "percentage": 0.3,
          "numeratorLabel": "Persons who used Cantonese at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G19"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "mandarinSpokenAtHome": {
          "count": 60,
          "denominator": 6855,
          "percentage": 0.9,
          "numeratorLabel": "Persons who used Mandarin at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G20"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "hongKongBornPopulation": {
          "count": 13,
          "denominator": 6855,
          "percentage": 0.2,
          "numeratorLabel": "Persons born in Hong Kong (SAR of China)",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K28"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        },
        "chinaBornPopulation": {
          "count": 55,
          "denominator": 6855,
          "percentage": 0.8,
          "numeratorLabel": "Persons born in China, excluding SARs and Taiwan",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K20"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        }
      }
    },
    {
      "suburb": "Tarneit",
      "geographyType": "SAL",
      "geographyCode": "SAL22451",
      "censusYear": 2021,
      "source": "Australian Bureau of Statistics",
      "retrievedAt": "2026-07-14",
      "contextOnly": true,
      "excludeFromSuburbScore": true,
      "scoreContribution": 0,
      "sourceMetadata": {
        "product": "2021 Census General Community Profile",
        "profileUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL22451",
        "downloadUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL22451/download/GCP_SAL22451.xlsx",
        "sourceWorkbook": "GCP_SAL22451.xlsx",
        "sourceWorkbookSha256": "aeab91e255824cf37679c4568a3394388ee8697a8955ff8187cfe8c0dc8a7998",
        "geographicBoundaryEdition": "ASGS Edition 3",
        "privacyNote": "ABS applies small random adjustments to cell values. Component sums can differ slightly from published totals."
      },
      "community": {
        "totalPopulation": {
          "count": 56370,
          "sourceTable": "G01",
          "sourceCells": {
            "value": "D17"
          },
          "basis": "Place of usual residence"
        },
        "medianAge": {
          "value": 30,
          "unit": "years",
          "applicablePopulation": "Persons, excluding overseas visitors",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B13"
          },
          "basis": "Place of usual residence"
        },
        "householdsWithChildren": {
          "count": 10594,
          "denominator": 15542,
          "percentage": 68.2,
          "numeratorLabel": "Occupied private dwellings whose primary family is a couple family with children or a one-parent family",
          "denominatorLabel": "Total occupied private dwellings in G42, excluding visitor-only and other non-classifiable households",
          "sourceTable": "G42",
          "sourceCells": {
            "numerator": [
              "C36",
              "D36"
            ],
            "denominator": "I36"
          },
          "basis": "Place of enumeration",
          "components": {
            "coupleFamilyWithChildren": 9183,
            "oneParentFamily": 1411
          },
          "notes": "For multiple-family households, G42 classifies the household using the primary family's composition."
        },
        "medianHouseholdIncome": {
          "value": 2103,
          "unit": "AUD per week",
          "applicablePopulation": "Occupied private dwellings; published ABS median household income",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B19"
          },
          "basis": "Place of enumeration"
        },
        "tenure": {
          "denominator": 15542,
          "denominatorLabel": "Total occupied private dwellings in G37, excluding visitor-only and other non-classifiable households",
          "basis": "Place of enumeration",
          "sourceTable": "G37",
          "ownerOccupied": {
            "count": 10358,
            "percentage": 66.6,
            "components": {
              "ownedOutright": 1513,
              "ownedWithMortgage": 8845
            },
            "sourceCells": [
              "G14",
              "G16"
            ]
          },
          "renting": {
            "count": 4583,
            "percentage": 29.5,
            "sourceCells": [
              "G25"
            ],
            "notes": "G37 rented total excludes dwellings occupied rent-free; those are included in other tenure."
          },
          "otherTenure": {
            "count": 290,
            "percentage": 1.9,
            "sourceCells": [
              "G27"
            ]
          },
          "notStated": {
            "count": 311,
            "percentage": 2.0,
            "sourceCells": [
              "G29"
            ]
          },
          "denominatorCell": "G31"
        },
        "overseasBornPopulation": {
          "count": 32147,
          "denominator": 56370,
          "percentage": 57.0,
          "numeratorLabel": "Persons born outside Australia",
          "denominatorLabel": "Total persons",
          "sourceTable": "G01",
          "sourceCells": {
            "numerator": [
              "D44"
            ],
            "denominator": "D17"
          },
          "basis": "Place of usual residence",
          "notes": "The G01 'Elsewhere' numerator includes inadequately described birthplaces and people at sea, and excludes birthplace not stated. The denominator is all persons."
        },
        "topOverseasCountriesOfBirth": [
          {
            "name": "India",
            "count": 16231,
            "denominator": 56370,
            "percentage": 28.8,
            "sourceTable": "G09c",
            "sourceCell": "K29",
            "basis": "Place of usual residence"
          },
          {
            "name": "New Zealand",
            "count": 2049,
            "denominator": 56370,
            "percentage": 3.6,
            "sourceTable": "G09c",
            "sourceCell": "K44",
            "basis": "Place of usual residence"
          },
          {
            "name": "Philippines",
            "count": 1912,
            "denominator": 56370,
            "percentage": 3.4,
            "sourceTable": "G09c",
            "sourceCell": "K48",
            "basis": "Place of usual residence"
          },
          {
            "name": "Pakistan",
            "count": 1433,
            "denominator": 56370,
            "percentage": 2.5,
            "sourceTable": "G09c",
            "sourceCell": "K46",
            "basis": "Place of usual residence"
          },
          {
            "name": "Bangladesh",
            "count": 771,
            "denominator": 56370,
            "percentage": 1.4,
            "sourceTable": "G09c",
            "sourceCell": "K14",
            "basis": "Place of usual residence"
          }
        ],
        "topLanguagesSpokenAtHome": [
          {
            "name": "English only",
            "count": 16557,
            "denominator": 56370,
            "percentage": 29.4,
            "sourceTable": "G13c",
            "sourceCell": "G12",
            "basis": "Place of usual residence"
          },
          {
            "name": "Punjabi",
            "count": 8938,
            "denominator": 56370,
            "percentage": 15.9,
            "sourceTable": "G13c",
            "sourceCell": "G32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hindi",
            "count": 3573,
            "denominator": 56370,
            "percentage": 6.3,
            "sourceTable": "G13c",
            "sourceCell": "G30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Urdu",
            "count": 2896,
            "denominator": 56370,
            "percentage": 5.1,
            "sourceTable": "G13c",
            "sourceCell": "G34",
            "basis": "Place of usual residence"
          },
          {
            "name": "Gujarati",
            "count": 2584,
            "denominator": 56370,
            "percentage": 4.6,
            "sourceTable": "G13c",
            "sourceCell": "G29",
            "basis": "Place of usual residence"
          }
        ],
        "topNonEnglishLanguagesSpokenAtHome": [
          {
            "name": "Punjabi",
            "count": 8938,
            "denominator": 56370,
            "percentage": 15.9,
            "sourceTable": "G13c",
            "sourceCell": "G32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hindi",
            "count": 3573,
            "denominator": 56370,
            "percentage": 6.3,
            "sourceTable": "G13c",
            "sourceCell": "G30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Urdu",
            "count": 2896,
            "denominator": 56370,
            "percentage": 5.1,
            "sourceTable": "G13c",
            "sourceCell": "G34",
            "basis": "Place of usual residence"
          },
          {
            "name": "Gujarati",
            "count": 2584,
            "denominator": 56370,
            "percentage": 4.6,
            "sourceTable": "G13c",
            "sourceCell": "G29",
            "basis": "Place of usual residence"
          },
          {
            "name": "Arabic",
            "count": 1336,
            "denominator": 56370,
            "percentage": 2.4,
            "sourceTable": "G13c",
            "sourceCell": "G16",
            "basis": "Place of usual residence"
          }
        ],
        "religiousAffiliationSummary": [
          {
            "name": "No religion / secular or other spiritual beliefs",
            "count": 7175,
            "denominator": 56370,
            "percentage": 12.7,
            "sourceTable": "G14",
            "sourceCell": "D43",
            "basis": "Place of usual residence"
          },
          {
            "name": "Christianity",
            "count": 15879,
            "denominator": 56370,
            "percentage": 28.2,
            "sourceTable": "G14",
            "sourceCell": "D30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Buddhism",
            "count": 1102,
            "denominator": 56370,
            "percentage": 2.0,
            "sourceTable": "G14",
            "sourceCell": "D9",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hinduism",
            "count": 11884,
            "denominator": 56370,
            "percentage": 21.1,
            "sourceTable": "G14",
            "sourceCell": "D31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Islam",
            "count": 8480,
            "denominator": 56370,
            "percentage": 15.0,
            "sourceTable": "G14",
            "sourceCell": "D32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Judaism",
            "count": 13,
            "denominator": 56370,
            "percentage": 0.0,
            "sourceTable": "G14",
            "sourceCell": "D33",
            "basis": "Place of usual residence"
          },
          {
            "name": "Other religions",
            "count": 7883,
            "denominator": 56370,
            "percentage": 14.0,
            "sourceTable": "G14",
            "sourceCell": "D38",
            "basis": "Place of usual residence"
          },
          {
            "name": "Religious affiliation not stated",
            "count": 3963,
            "denominator": 56370,
            "percentage": 7.0,
            "sourceTable": "G14",
            "sourceCell": "D44",
            "basis": "Place of usual residence"
          }
        ]
      },
      "additionalHouseholdContext": {
        "cantoneseSpokenAtHome": {
          "count": 268,
          "denominator": 56370,
          "percentage": 0.5,
          "numeratorLabel": "Persons who used Cantonese at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G19"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "mandarinSpokenAtHome": {
          "count": 703,
          "denominator": 56370,
          "percentage": 1.2,
          "numeratorLabel": "Persons who used Mandarin at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G20"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "hongKongBornPopulation": {
          "count": 87,
          "denominator": 56370,
          "percentage": 0.2,
          "numeratorLabel": "Persons born in Hong Kong (SAR of China)",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K28"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        },
        "chinaBornPopulation": {
          "count": 526,
          "denominator": 56370,
          "percentage": 0.9,
          "numeratorLabel": "Persons born in China, excluding SARs and Taiwan",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K20"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        }
      }
    },
    {
      "suburb": "Wyndham Vale",
      "geographyType": "SAL",
      "geographyCode": "SAL22883",
      "censusYear": 2021,
      "source": "Australian Bureau of Statistics",
      "retrievedAt": "2026-07-14",
      "contextOnly": true,
      "excludeFromSuburbScore": true,
      "scoreContribution": 0,
      "sourceMetadata": {
        "product": "2021 Census General Community Profile",
        "profileUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL22883",
        "downloadUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL22883/download/GCP_SAL22883.xlsx",
        "sourceWorkbook": "GCP_SAL22883.xlsx",
        "sourceWorkbookSha256": "8c7528aa0d458629440b8008e40b9d33a054111adffa94e39e520be49bed22ff",
        "geographicBoundaryEdition": "ASGS Edition 3",
        "privacyNote": "ABS applies small random adjustments to cell values. Component sums can differ slightly from published totals."
      },
      "community": {
        "totalPopulation": {
          "count": 20518,
          "sourceTable": "G01",
          "sourceCells": {
            "value": "D17"
          },
          "basis": "Place of usual residence"
        },
        "medianAge": {
          "value": 31,
          "unit": "years",
          "applicablePopulation": "Persons, excluding overseas visitors",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B13"
          },
          "basis": "Place of usual residence"
        },
        "householdsWithChildren": {
          "count": 3852,
          "denominator": 6520,
          "percentage": 59.1,
          "numeratorLabel": "Occupied private dwellings whose primary family is a couple family with children or a one-parent family",
          "denominatorLabel": "Total occupied private dwellings in G42, excluding visitor-only and other non-classifiable households",
          "sourceTable": "G42",
          "sourceCells": {
            "numerator": [
              "C36",
              "D36"
            ],
            "denominator": "I36"
          },
          "basis": "Place of enumeration",
          "components": {
            "coupleFamilyWithChildren": 2802,
            "oneParentFamily": 1050
          },
          "notes": "For multiple-family households, G42 classifies the household using the primary family's composition."
        },
        "medianHouseholdIncome": {
          "value": 1766,
          "unit": "AUD per week",
          "applicablePopulation": "Occupied private dwellings; published ABS median household income",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B19"
          },
          "basis": "Place of enumeration"
        },
        "tenure": {
          "denominator": 6520,
          "denominatorLabel": "Total occupied private dwellings in G37, excluding visitor-only and other non-classifiable households",
          "basis": "Place of enumeration",
          "sourceTable": "G37",
          "ownerOccupied": {
            "count": 4327,
            "percentage": 66.4,
            "components": {
              "ownedOutright": 1077,
              "ownedWithMortgage": 3250
            },
            "sourceCells": [
              "G14",
              "G16"
            ]
          },
          "renting": {
            "count": 2045,
            "percentage": 31.4,
            "sourceCells": [
              "G25"
            ],
            "notes": "G37 rented total excludes dwellings occupied rent-free; those are included in other tenure."
          },
          "otherTenure": {
            "count": 51,
            "percentage": 0.8,
            "sourceCells": [
              "G27"
            ]
          },
          "notStated": {
            "count": 94,
            "percentage": 1.4,
            "sourceCells": [
              "G29"
            ]
          },
          "denominatorCell": "G31"
        },
        "overseasBornPopulation": {
          "count": 8218,
          "denominator": 20518,
          "percentage": 40.1,
          "numeratorLabel": "Persons born outside Australia",
          "denominatorLabel": "Total persons",
          "sourceTable": "G01",
          "sourceCells": {
            "numerator": [
              "D44"
            ],
            "denominator": "D17"
          },
          "basis": "Place of usual residence",
          "notes": "The G01 'Elsewhere' numerator includes inadequately described birthplaces and people at sea, and excludes birthplace not stated. The denominator is all persons."
        },
        "topOverseasCountriesOfBirth": [
          {
            "name": "India",
            "count": 2698,
            "denominator": 20518,
            "percentage": 13.1,
            "sourceTable": "G09c",
            "sourceCell": "K29",
            "basis": "Place of usual residence"
          },
          {
            "name": "New Zealand",
            "count": 586,
            "denominator": 20518,
            "percentage": 2.9,
            "sourceTable": "G09c",
            "sourceCell": "K44",
            "basis": "Place of usual residence"
          },
          {
            "name": "Myanmar",
            "count": 549,
            "denominator": 20518,
            "percentage": 2.7,
            "sourceTable": "G09c",
            "sourceCell": "K41",
            "basis": "Place of usual residence"
          },
          {
            "name": "Thailand",
            "count": 438,
            "denominator": 20518,
            "percentage": 2.1,
            "sourceTable": "G09c",
            "sourceCell": "K56",
            "basis": "Place of usual residence"
          },
          {
            "name": "England",
            "count": 398,
            "denominator": 20518,
            "percentage": 1.9,
            "sourceTable": "G09c",
            "sourceCell": "K23",
            "basis": "Place of usual residence"
          }
        ],
        "topLanguagesSpokenAtHome": [
          {
            "name": "English only",
            "count": 11189,
            "denominator": 20518,
            "percentage": 54.5,
            "sourceTable": "G13c",
            "sourceCell": "G12",
            "basis": "Place of usual residence"
          },
          {
            "name": "Punjabi",
            "count": 1210,
            "denominator": 20518,
            "percentage": 5.9,
            "sourceTable": "G13c",
            "sourceCell": "G32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hindi",
            "count": 674,
            "denominator": 20518,
            "percentage": 3.3,
            "sourceTable": "G13c",
            "sourceCell": "G30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Urdu",
            "count": 312,
            "denominator": 20518,
            "percentage": 1.5,
            "sourceTable": "G13c",
            "sourceCell": "G34",
            "basis": "Place of usual residence"
          },
          {
            "name": "Tamil",
            "count": 259,
            "denominator": 20518,
            "percentage": 1.3,
            "sourceTable": "G13c",
            "sourceCell": "G56",
            "basis": "Place of usual residence"
          }
        ],
        "topNonEnglishLanguagesSpokenAtHome": [
          {
            "name": "Punjabi",
            "count": 1210,
            "denominator": 20518,
            "percentage": 5.9,
            "sourceTable": "G13c",
            "sourceCell": "G32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hindi",
            "count": 674,
            "denominator": 20518,
            "percentage": 3.3,
            "sourceTable": "G13c",
            "sourceCell": "G30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Urdu",
            "count": 312,
            "denominator": 20518,
            "percentage": 1.5,
            "sourceTable": "G13c",
            "sourceCell": "G34",
            "basis": "Place of usual residence"
          },
          {
            "name": "Tamil",
            "count": 259,
            "denominator": 20518,
            "percentage": 1.3,
            "sourceTable": "G13c",
            "sourceCell": "G56",
            "basis": "Place of usual residence"
          },
          {
            "name": "Bengali",
            "count": 241,
            "denominator": 20518,
            "percentage": 1.2,
            "sourceTable": "G13c",
            "sourceCell": "G28",
            "basis": "Place of usual residence"
          }
        ],
        "religiousAffiliationSummary": [
          {
            "name": "No religion / secular or other spiritual beliefs",
            "count": 6080,
            "denominator": 20518,
            "percentage": 29.6,
            "sourceTable": "G14",
            "sourceCell": "D43",
            "basis": "Place of usual residence"
          },
          {
            "name": "Christianity",
            "count": 7901,
            "denominator": 20518,
            "percentage": 38.5,
            "sourceTable": "G14",
            "sourceCell": "D30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Buddhism",
            "count": 524,
            "denominator": 20518,
            "percentage": 2.6,
            "sourceTable": "G14",
            "sourceCell": "D9",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hinduism",
            "count": 2354,
            "denominator": 20518,
            "percentage": 11.5,
            "sourceTable": "G14",
            "sourceCell": "D31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Islam",
            "count": 1089,
            "denominator": 20518,
            "percentage": 5.3,
            "sourceTable": "G14",
            "sourceCell": "D32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Judaism",
            "count": 3,
            "denominator": 20518,
            "percentage": 0.0,
            "sourceTable": "G14",
            "sourceCell": "D33",
            "basis": "Place of usual residence"
          },
          {
            "name": "Other religions",
            "count": 1142,
            "denominator": 20518,
            "percentage": 5.6,
            "sourceTable": "G14",
            "sourceCell": "D38",
            "basis": "Place of usual residence"
          },
          {
            "name": "Religious affiliation not stated",
            "count": 1423,
            "denominator": 20518,
            "percentage": 6.9,
            "sourceTable": "G14",
            "sourceCell": "D44",
            "basis": "Place of usual residence"
          }
        ]
      },
      "additionalHouseholdContext": {
        "cantoneseSpokenAtHome": {
          "count": 70,
          "denominator": 20518,
          "percentage": 0.3,
          "numeratorLabel": "Persons who used Cantonese at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G19"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "mandarinSpokenAtHome": {
          "count": 212,
          "denominator": 20518,
          "percentage": 1.0,
          "numeratorLabel": "Persons who used Mandarin at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G20"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "hongKongBornPopulation": {
          "count": 41,
          "denominator": 20518,
          "percentage": 0.2,
          "numeratorLabel": "Persons born in Hong Kong (SAR of China)",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K28"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        },
        "chinaBornPopulation": {
          "count": 132,
          "denominator": 20518,
          "percentage": 0.6,
          "numeratorLabel": "Persons born in China, excluding SARs and Taiwan",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K20"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        }
      }
    },
    {
      "suburb": "Craigieburn",
      "geographyType": "SAL",
      "geographyCode": "SAL20661",
      "censusYear": 2021,
      "source": "Australian Bureau of Statistics",
      "retrievedAt": "2026-07-14",
      "contextOnly": true,
      "excludeFromSuburbScore": true,
      "scoreContribution": 0,
      "sourceMetadata": {
        "product": "2021 Census General Community Profile",
        "profileUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL20661",
        "downloadUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL20661/download/GCP_SAL20661.xlsx",
        "sourceWorkbook": "GCP_SAL20661.xlsx",
        "sourceWorkbookSha256": "62934faf5ace6d0a4ac385cfc85b3527615891909ed9bbee481b2568736e48e4",
        "geographicBoundaryEdition": "ASGS Edition 3",
        "privacyNote": "ABS applies small random adjustments to cell values. Component sums can differ slightly from published totals."
      },
      "community": {
        "totalPopulation": {
          "count": 65178,
          "sourceTable": "G01",
          "sourceCells": {
            "value": "D17"
          },
          "basis": "Place of usual residence"
        },
        "medianAge": {
          "value": 32,
          "unit": "years",
          "applicablePopulation": "Persons, excluding overseas visitors",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B13"
          },
          "basis": "Place of usual residence"
        },
        "householdsWithChildren": {
          "count": 12514,
          "denominator": 18957,
          "percentage": 66.0,
          "numeratorLabel": "Occupied private dwellings whose primary family is a couple family with children or a one-parent family",
          "denominatorLabel": "Total occupied private dwellings in G42, excluding visitor-only and other non-classifiable households",
          "sourceTable": "G42",
          "sourceCells": {
            "numerator": [
              "C36",
              "D36"
            ],
            "denominator": "I36"
          },
          "basis": "Place of enumeration",
          "components": {
            "coupleFamilyWithChildren": 10126,
            "oneParentFamily": 2388
          },
          "notes": "For multiple-family households, G42 classifies the household using the primary family's composition."
        },
        "medianHouseholdIncome": {
          "value": 1798,
          "unit": "AUD per week",
          "applicablePopulation": "Occupied private dwellings; published ABS median household income",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B19"
          },
          "basis": "Place of enumeration"
        },
        "tenure": {
          "denominator": 18957,
          "denominatorLabel": "Total occupied private dwellings in G37, excluding visitor-only and other non-classifiable households",
          "basis": "Place of enumeration",
          "sourceTable": "G37",
          "ownerOccupied": {
            "count": 13021,
            "percentage": 68.7,
            "components": {
              "ownedOutright": 2855,
              "ownedWithMortgage": 10166
            },
            "sourceCells": [
              "G14",
              "G16"
            ]
          },
          "renting": {
            "count": 5379,
            "percentage": 28.4,
            "sourceCells": [
              "G25"
            ],
            "notes": "G37 rented total excludes dwellings occupied rent-free; those are included in other tenure."
          },
          "otherTenure": {
            "count": 236,
            "percentage": 1.2,
            "sourceCells": [
              "G27"
            ]
          },
          "notStated": {
            "count": 321,
            "percentage": 1.7,
            "sourceCells": [
              "G29"
            ]
          },
          "denominatorCell": "G31"
        },
        "overseasBornPopulation": {
          "count": 31681,
          "denominator": 65178,
          "percentage": 48.6,
          "numeratorLabel": "Persons born outside Australia",
          "denominatorLabel": "Total persons",
          "sourceTable": "G01",
          "sourceCells": {
            "numerator": [
              "D44"
            ],
            "denominator": "D17"
          },
          "basis": "Place of usual residence",
          "notes": "The G01 'Elsewhere' numerator includes inadequately described birthplaces and people at sea, and excludes birthplace not stated. The denominator is all persons."
        },
        "topOverseasCountriesOfBirth": [
          {
            "name": "India",
            "count": 8809,
            "denominator": 65178,
            "percentage": 13.5,
            "sourceTable": "G09c",
            "sourceCell": "K29",
            "basis": "Place of usual residence"
          },
          {
            "name": "Iraq",
            "count": 6208,
            "denominator": 65178,
            "percentage": 9.5,
            "sourceTable": "G09c",
            "sourceCell": "K32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Sri Lanka",
            "count": 1734,
            "denominator": 65178,
            "percentage": 2.7,
            "sourceTable": "G09c",
            "sourceCell": "K54",
            "basis": "Place of usual residence"
          },
          {
            "name": "New Zealand",
            "count": 1303,
            "denominator": 65178,
            "percentage": 2.0,
            "sourceTable": "G09c",
            "sourceCell": "K44",
            "basis": "Place of usual residence"
          },
          {
            "name": "Pakistan",
            "count": 1238,
            "denominator": 65178,
            "percentage": 1.9,
            "sourceTable": "G09c",
            "sourceCell": "K46",
            "basis": "Place of usual residence"
          }
        ],
        "topLanguagesSpokenAtHome": [
          {
            "name": "English only",
            "count": 22878,
            "denominator": 65178,
            "percentage": 35.1,
            "sourceTable": "G13c",
            "sourceCell": "G12",
            "basis": "Place of usual residence"
          },
          {
            "name": "Punjabi",
            "count": 7127,
            "denominator": 65178,
            "percentage": 10.9,
            "sourceTable": "G13c",
            "sourceCell": "G32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Arabic",
            "count": 5192,
            "denominator": 65178,
            "percentage": 8.0,
            "sourceTable": "G13c",
            "sourceCell": "G16",
            "basis": "Place of usual residence"
          },
          {
            "name": "Turkish",
            "count": 2763,
            "denominator": 65178,
            "percentage": 4.2,
            "sourceTable": "G13c",
            "sourceCell": "G58",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hindi",
            "count": 2244,
            "denominator": 65178,
            "percentage": 3.4,
            "sourceTable": "G13c",
            "sourceCell": "G30",
            "basis": "Place of usual residence"
          }
        ],
        "topNonEnglishLanguagesSpokenAtHome": [
          {
            "name": "Punjabi",
            "count": 7127,
            "denominator": 65178,
            "percentage": 10.9,
            "sourceTable": "G13c",
            "sourceCell": "G32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Arabic",
            "count": 5192,
            "denominator": 65178,
            "percentage": 8.0,
            "sourceTable": "G13c",
            "sourceCell": "G16",
            "basis": "Place of usual residence"
          },
          {
            "name": "Turkish",
            "count": 2763,
            "denominator": 65178,
            "percentage": 4.2,
            "sourceTable": "G13c",
            "sourceCell": "G58",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hindi",
            "count": 2244,
            "denominator": 65178,
            "percentage": 3.4,
            "sourceTable": "G13c",
            "sourceCell": "G30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Sinhalese",
            "count": 1980,
            "denominator": 65178,
            "percentage": 3.0,
            "sourceTable": "G13c",
            "sourceCell": "G33",
            "basis": "Place of usual residence"
          }
        ],
        "religiousAffiliationSummary": [
          {
            "name": "No religion / secular or other spiritual beliefs",
            "count": 9693,
            "denominator": 65178,
            "percentage": 14.9,
            "sourceTable": "G14",
            "sourceCell": "D43",
            "basis": "Place of usual residence"
          },
          {
            "name": "Christianity",
            "count": 26696,
            "denominator": 65178,
            "percentage": 41.0,
            "sourceTable": "G14",
            "sourceCell": "D30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Buddhism",
            "count": 2329,
            "denominator": 65178,
            "percentage": 3.6,
            "sourceTable": "G14",
            "sourceCell": "D9",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hinduism",
            "count": 6184,
            "denominator": 65178,
            "percentage": 9.5,
            "sourceTable": "G14",
            "sourceCell": "D31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Islam",
            "count": 9968,
            "denominator": 65178,
            "percentage": 15.3,
            "sourceTable": "G14",
            "sourceCell": "D32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Judaism",
            "count": 23,
            "denominator": 65178,
            "percentage": 0.0,
            "sourceTable": "G14",
            "sourceCell": "D33",
            "basis": "Place of usual residence"
          },
          {
            "name": "Other religions",
            "count": 6389,
            "denominator": 65178,
            "percentage": 9.8,
            "sourceTable": "G14",
            "sourceCell": "D38",
            "basis": "Place of usual residence"
          },
          {
            "name": "Religious affiliation not stated",
            "count": 3896,
            "denominator": 65178,
            "percentage": 6.0,
            "sourceTable": "G14",
            "sourceCell": "D44",
            "basis": "Place of usual residence"
          }
        ]
      },
      "additionalHouseholdContext": {
        "cantoneseSpokenAtHome": {
          "count": 99,
          "denominator": 65178,
          "percentage": 0.2,
          "numeratorLabel": "Persons who used Cantonese at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G19"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "mandarinSpokenAtHome": {
          "count": 360,
          "denominator": 65178,
          "percentage": 0.6,
          "numeratorLabel": "Persons who used Mandarin at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G20"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "hongKongBornPopulation": {
          "count": 55,
          "denominator": 65178,
          "percentage": 0.1,
          "numeratorLabel": "Persons born in Hong Kong (SAR of China)",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K28"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        },
        "chinaBornPopulation": {
          "count": 209,
          "denominator": 65178,
          "percentage": 0.3,
          "numeratorLabel": "Persons born in China, excluding SARs and Taiwan",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K20"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        }
      }
    },
    {
      "suburb": "Donnybrook",
      "geographyType": "SAL",
      "geographyCode": "SAL20773",
      "censusYear": 2021,
      "source": "Australian Bureau of Statistics",
      "retrievedAt": "2026-07-14",
      "contextOnly": true,
      "excludeFromSuburbScore": true,
      "scoreContribution": 0,
      "sourceMetadata": {
        "product": "2021 Census General Community Profile",
        "profileUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL20773",
        "downloadUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL20773/download/GCP_SAL20773.xlsx",
        "sourceWorkbook": "GCP_SAL20773.xlsx",
        "sourceWorkbookSha256": "808a46eac06e3aff9ec8c9e19b4736a8dec2e86d1a360ae218528c2726c4ab9e",
        "geographicBoundaryEdition": "ASGS Edition 3",
        "privacyNote": "ABS applies small random adjustments to cell values. Component sums can differ slightly from published totals."
      },
      "community": {
        "totalPopulation": {
          "count": 2100,
          "sourceTable": "G01",
          "sourceCells": {
            "value": "D17"
          },
          "basis": "Place of usual residence"
        },
        "medianAge": {
          "value": 30,
          "unit": "years",
          "applicablePopulation": "Persons, excluding overseas visitors",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B13"
          },
          "basis": "Place of usual residence"
        },
        "householdsWithChildren": {
          "count": 339,
          "denominator": 621,
          "percentage": 54.6,
          "numeratorLabel": "Occupied private dwellings whose primary family is a couple family with children or a one-parent family",
          "denominatorLabel": "Total occupied private dwellings in G42, excluding visitor-only and other non-classifiable households",
          "sourceTable": "G42",
          "sourceCells": {
            "numerator": [
              "C36",
              "D36"
            ],
            "denominator": "I36"
          },
          "basis": "Place of enumeration",
          "components": {
            "coupleFamilyWithChildren": 300,
            "oneParentFamily": 39
          },
          "notes": "For multiple-family households, G42 classifies the household using the primary family's composition."
        },
        "medianHouseholdIncome": {
          "value": 2207,
          "unit": "AUD per week",
          "applicablePopulation": "Occupied private dwellings; published ABS median household income",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B19"
          },
          "basis": "Place of enumeration"
        },
        "tenure": {
          "denominator": 621,
          "denominatorLabel": "Total occupied private dwellings in G37, excluding visitor-only and other non-classifiable households",
          "basis": "Place of enumeration",
          "sourceTable": "G37",
          "ownerOccupied": {
            "count": 480,
            "percentage": 77.3,
            "components": {
              "ownedOutright": 29,
              "ownedWithMortgage": 451
            },
            "sourceCells": [
              "G14",
              "G16"
            ]
          },
          "renting": {
            "count": 128,
            "percentage": 20.6,
            "sourceCells": [
              "G25"
            ],
            "notes": "G37 rented total excludes dwellings occupied rent-free; those are included in other tenure."
          },
          "otherTenure": {
            "count": 0,
            "percentage": 0.0,
            "sourceCells": [
              "G27"
            ]
          },
          "notStated": {
            "count": 10,
            "percentage": 1.6,
            "sourceCells": [
              "G29"
            ]
          },
          "denominatorCell": "G31"
        },
        "overseasBornPopulation": {
          "count": 939,
          "denominator": 2100,
          "percentage": 44.7,
          "numeratorLabel": "Persons born outside Australia",
          "denominatorLabel": "Total persons",
          "sourceTable": "G01",
          "sourceCells": {
            "numerator": [
              "D44"
            ],
            "denominator": "D17"
          },
          "basis": "Place of usual residence",
          "notes": "The G01 'Elsewhere' numerator includes inadequately described birthplaces and people at sea, and excludes birthplace not stated. The denominator is all persons."
        },
        "topOverseasCountriesOfBirth": [
          {
            "name": "India",
            "count": 495,
            "denominator": 2100,
            "percentage": 23.6,
            "sourceTable": "G09c",
            "sourceCell": "K29",
            "basis": "Place of usual residence"
          },
          {
            "name": "Philippines",
            "count": 68,
            "denominator": 2100,
            "percentage": 3.2,
            "sourceTable": "G09c",
            "sourceCell": "K48",
            "basis": "Place of usual residence"
          },
          {
            "name": "New Zealand",
            "count": 40,
            "denominator": 2100,
            "percentage": 1.9,
            "sourceTable": "G09c",
            "sourceCell": "K44",
            "basis": "Place of usual residence"
          },
          {
            "name": "Sri Lanka",
            "count": 35,
            "denominator": 2100,
            "percentage": 1.7,
            "sourceTable": "G09c",
            "sourceCell": "K54",
            "basis": "Place of usual residence"
          },
          {
            "name": "Zimbabwe",
            "count": 25,
            "denominator": 2100,
            "percentage": 1.2,
            "sourceTable": "G09c",
            "sourceCell": "K61",
            "basis": "Place of usual residence"
          }
        ],
        "topLanguagesSpokenAtHome": [
          {
            "name": "English only",
            "count": 751,
            "denominator": 2100,
            "percentage": 35.8,
            "sourceTable": "G13c",
            "sourceCell": "G12",
            "basis": "Place of usual residence"
          },
          {
            "name": "Punjabi",
            "count": 450,
            "denominator": 2100,
            "percentage": 21.4,
            "sourceTable": "G13c",
            "sourceCell": "G32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hindi",
            "count": 99,
            "denominator": 2100,
            "percentage": 4.7,
            "sourceTable": "G13c",
            "sourceCell": "G30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Malayalam",
            "count": 54,
            "denominator": 2100,
            "percentage": 2.6,
            "sourceTable": "G13c",
            "sourceCell": "G42",
            "basis": "Place of usual residence"
          },
          {
            "name": "Filipino",
            "count": 39,
            "denominator": 2100,
            "percentage": 1.9,
            "sourceTable": "G13c",
            "sourceCell": "G50",
            "basis": "Place of usual residence"
          }
        ],
        "topNonEnglishLanguagesSpokenAtHome": [
          {
            "name": "Punjabi",
            "count": 450,
            "denominator": 2100,
            "percentage": 21.4,
            "sourceTable": "G13c",
            "sourceCell": "G32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hindi",
            "count": 99,
            "denominator": 2100,
            "percentage": 4.7,
            "sourceTable": "G13c",
            "sourceCell": "G30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Malayalam",
            "count": 54,
            "denominator": 2100,
            "percentage": 2.6,
            "sourceTable": "G13c",
            "sourceCell": "G42",
            "basis": "Place of usual residence"
          },
          {
            "name": "Filipino",
            "count": 39,
            "denominator": 2100,
            "percentage": 1.9,
            "sourceTable": "G13c",
            "sourceCell": "G50",
            "basis": "Place of usual residence"
          },
          {
            "name": "Sinhalese",
            "count": 33,
            "denominator": 2100,
            "percentage": 1.6,
            "sourceTable": "G13c",
            "sourceCell": "G33",
            "basis": "Place of usual residence"
          }
        ],
        "religiousAffiliationSummary": [
          {
            "name": "No religion / secular or other spiritual beliefs",
            "count": 350,
            "denominator": 2100,
            "percentage": 16.7,
            "sourceTable": "G14",
            "sourceCell": "D43",
            "basis": "Place of usual residence"
          },
          {
            "name": "Christianity",
            "count": 648,
            "denominator": 2100,
            "percentage": 30.9,
            "sourceTable": "G14",
            "sourceCell": "D30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Buddhism",
            "count": 54,
            "denominator": 2100,
            "percentage": 2.6,
            "sourceTable": "G14",
            "sourceCell": "D9",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hinduism",
            "count": 250,
            "denominator": 2100,
            "percentage": 11.9,
            "sourceTable": "G14",
            "sourceCell": "D31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Islam",
            "count": 133,
            "denominator": 2100,
            "percentage": 6.3,
            "sourceTable": "G14",
            "sourceCell": "D32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Judaism",
            "count": 0,
            "denominator": 2100,
            "percentage": 0.0,
            "sourceTable": "G14",
            "sourceCell": "D33",
            "basis": "Place of usual residence"
          },
          {
            "name": "Other religions",
            "count": 393,
            "denominator": 2100,
            "percentage": 18.7,
            "sourceTable": "G14",
            "sourceCell": "D38",
            "basis": "Place of usual residence"
          },
          {
            "name": "Religious affiliation not stated",
            "count": 273,
            "denominator": 2100,
            "percentage": 13.0,
            "sourceTable": "G14",
            "sourceCell": "D44",
            "basis": "Place of usual residence"
          }
        ]
      },
      "additionalHouseholdContext": {
        "cantoneseSpokenAtHome": {
          "count": 0,
          "denominator": 2100,
          "percentage": 0.0,
          "numeratorLabel": "Persons who used Cantonese at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G19"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "mandarinSpokenAtHome": {
          "count": 8,
          "denominator": 2100,
          "percentage": 0.4,
          "numeratorLabel": "Persons who used Mandarin at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G20"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "hongKongBornPopulation": {
          "count": 3,
          "denominator": 2100,
          "percentage": 0.1,
          "numeratorLabel": "Persons born in Hong Kong (SAR of China)",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K28"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        },
        "chinaBornPopulation": {
          "count": 0,
          "denominator": 2100,
          "percentage": 0.0,
          "numeratorLabel": "Persons born in China, excluding SARs and Taiwan",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K20"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        }
      }
    },
    {
      "suburb": "Kew",
      "geographyType": "SAL",
      "geographyCode": "SAL21336",
      "censusYear": 2021,
      "source": "Australian Bureau of Statistics",
      "retrievedAt": "2026-07-14",
      "contextOnly": true,
      "excludeFromSuburbScore": true,
      "scoreContribution": 0,
      "sourceMetadata": {
        "product": "2021 Census General Community Profile",
        "profileUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL21336",
        "downloadUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL21336/download/GCP_SAL21336.xlsx",
        "sourceWorkbook": "GCP_SAL21336.xlsx",
        "sourceWorkbookSha256": "342040dd4e941827ccd5d44c2f82131e8d1203bddc1d89d6bf47904617a1cdab",
        "geographicBoundaryEdition": "ASGS Edition 3",
        "privacyNote": "ABS applies small random adjustments to cell values. Component sums can differ slightly from published totals."
      },
      "community": {
        "totalPopulation": {
          "count": 24499,
          "sourceTable": "G01",
          "sourceCells": {
            "value": "D17"
          },
          "basis": "Place of usual residence"
        },
        "medianAge": {
          "value": 41,
          "unit": "years",
          "applicablePopulation": "Persons, excluding overseas visitors",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B13"
          },
          "basis": "Place of usual residence"
        },
        "householdsWithChildren": {
          "count": 3793,
          "denominator": 9069,
          "percentage": 41.8,
          "numeratorLabel": "Occupied private dwellings whose primary family is a couple family with children or a one-parent family",
          "denominatorLabel": "Total occupied private dwellings in G42, excluding visitor-only and other non-classifiable households",
          "sourceTable": "G42",
          "sourceCells": {
            "numerator": [
              "C36",
              "D36"
            ],
            "denominator": "I36"
          },
          "basis": "Place of enumeration",
          "components": {
            "coupleFamilyWithChildren": 2948,
            "oneParentFamily": 845
          },
          "notes": "For multiple-family households, G42 classifies the household using the primary family's composition."
        },
        "medianHouseholdIncome": {
          "value": 2497,
          "unit": "AUD per week",
          "applicablePopulation": "Occupied private dwellings; published ABS median household income",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B19"
          },
          "basis": "Place of enumeration"
        },
        "tenure": {
          "denominator": 9069,
          "denominatorLabel": "Total occupied private dwellings in G37, excluding visitor-only and other non-classifiable households",
          "basis": "Place of enumeration",
          "sourceTable": "G37",
          "ownerOccupied": {
            "count": 6211,
            "percentage": 68.5,
            "components": {
              "ownedOutright": 3583,
              "ownedWithMortgage": 2628
            },
            "sourceCells": [
              "G14",
              "G16"
            ]
          },
          "renting": {
            "count": 2590,
            "percentage": 28.6,
            "sourceCells": [
              "G25"
            ],
            "notes": "G37 rented total excludes dwellings occupied rent-free; those are included in other tenure."
          },
          "otherTenure": {
            "count": 165,
            "percentage": 1.8,
            "sourceCells": [
              "G27"
            ]
          },
          "notStated": {
            "count": 104,
            "percentage": 1.1,
            "sourceCells": [
              "G29"
            ]
          },
          "denominatorCell": "G31"
        },
        "overseasBornPopulation": {
          "count": 7505,
          "denominator": 24499,
          "percentage": 30.6,
          "numeratorLabel": "Persons born outside Australia",
          "denominatorLabel": "Total persons",
          "sourceTable": "G01",
          "sourceCells": {
            "numerator": [
              "D44"
            ],
            "denominator": "D17"
          },
          "basis": "Place of usual residence",
          "notes": "The G01 'Elsewhere' numerator includes inadequately described birthplaces and people at sea, and excludes birthplace not stated. The denominator is all persons."
        },
        "topOverseasCountriesOfBirth": [
          {
            "name": "China (excludes SARs and Taiwan)",
            "count": 1622,
            "denominator": 24499,
            "percentage": 6.6,
            "sourceTable": "G09c",
            "sourceCell": "K20",
            "basis": "Place of usual residence"
          },
          {
            "name": "England",
            "count": 708,
            "denominator": 24499,
            "percentage": 2.9,
            "sourceTable": "G09c",
            "sourceCell": "K23",
            "basis": "Place of usual residence"
          },
          {
            "name": "Malaysia",
            "count": 539,
            "denominator": 24499,
            "percentage": 2.2,
            "sourceTable": "G09c",
            "sourceCell": "K38",
            "basis": "Place of usual residence"
          },
          {
            "name": "India",
            "count": 448,
            "denominator": 24499,
            "percentage": 1.8,
            "sourceTable": "G09c",
            "sourceCell": "K29",
            "basis": "Place of usual residence"
          },
          {
            "name": "New Zealand",
            "count": 336,
            "denominator": 24499,
            "percentage": 1.4,
            "sourceTable": "G09c",
            "sourceCell": "K44",
            "basis": "Place of usual residence"
          }
        ],
        "topLanguagesSpokenAtHome": [
          {
            "name": "English only",
            "count": 17227,
            "denominator": 24499,
            "percentage": 70.3,
            "sourceTable": "G13c",
            "sourceCell": "G12",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 2115,
            "denominator": 24499,
            "percentage": 8.6,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greek",
            "count": 723,
            "denominator": 24499,
            "percentage": 3.0,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Cantonese",
            "count": 696,
            "denominator": 24499,
            "percentage": 2.8,
            "sourceTable": "G13c",
            "sourceCell": "G19",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italian",
            "count": 411,
            "denominator": 24499,
            "percentage": 1.7,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          }
        ],
        "topNonEnglishLanguagesSpokenAtHome": [
          {
            "name": "Mandarin",
            "count": 2115,
            "denominator": 24499,
            "percentage": 8.6,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greek",
            "count": 723,
            "denominator": 24499,
            "percentage": 3.0,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Cantonese",
            "count": 696,
            "denominator": 24499,
            "percentage": 2.8,
            "sourceTable": "G13c",
            "sourceCell": "G19",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italian",
            "count": 411,
            "denominator": 24499,
            "percentage": 1.7,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          },
          {
            "name": "Vietnamese",
            "count": 353,
            "denominator": 24499,
            "percentage": 1.4,
            "sourceTable": "G13c",
            "sourceCell": "G59",
            "basis": "Place of usual residence"
          }
        ],
        "religiousAffiliationSummary": [
          {
            "name": "No religion / secular or other spiritual beliefs",
            "count": 10966,
            "denominator": 24499,
            "percentage": 44.8,
            "sourceTable": "G14",
            "sourceCell": "D43",
            "basis": "Place of usual residence"
          },
          {
            "name": "Christianity",
            "count": 10505,
            "denominator": 24499,
            "percentage": 42.9,
            "sourceTable": "G14",
            "sourceCell": "D30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Buddhism",
            "count": 713,
            "denominator": 24499,
            "percentage": 2.9,
            "sourceTable": "G14",
            "sourceCell": "D9",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hinduism",
            "count": 402,
            "denominator": 24499,
            "percentage": 1.6,
            "sourceTable": "G14",
            "sourceCell": "D31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Islam",
            "count": 199,
            "denominator": 24499,
            "percentage": 0.8,
            "sourceTable": "G14",
            "sourceCell": "D32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Judaism",
            "count": 218,
            "denominator": 24499,
            "percentage": 0.9,
            "sourceTable": "G14",
            "sourceCell": "D33",
            "basis": "Place of usual residence"
          },
          {
            "name": "Other religions",
            "count": 166,
            "denominator": 24499,
            "percentage": 0.7,
            "sourceTable": "G14",
            "sourceCell": "D38",
            "basis": "Place of usual residence"
          },
          {
            "name": "Religious affiliation not stated",
            "count": 1337,
            "denominator": 24499,
            "percentage": 5.5,
            "sourceTable": "G14",
            "sourceCell": "D44",
            "basis": "Place of usual residence"
          }
        ]
      },
      "additionalHouseholdContext": {
        "cantoneseSpokenAtHome": {
          "count": 696,
          "denominator": 24499,
          "percentage": 2.8,
          "numeratorLabel": "Persons who used Cantonese at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G19"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "mandarinSpokenAtHome": {
          "count": 2115,
          "denominator": 24499,
          "percentage": 8.6,
          "numeratorLabel": "Persons who used Mandarin at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G20"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "hongKongBornPopulation": {
          "count": 317,
          "denominator": 24499,
          "percentage": 1.3,
          "numeratorLabel": "Persons born in Hong Kong (SAR of China)",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K28"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        },
        "chinaBornPopulation": {
          "count": 1622,
          "denominator": 24499,
          "percentage": 6.6,
          "numeratorLabel": "Persons born in China, excluding SARs and Taiwan",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K20"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        }
      }
    },
    {
      "suburb": "Malvern",
      "geographyType": "SAL",
      "geographyCode": "SAL21586",
      "censusYear": 2021,
      "source": "Australian Bureau of Statistics",
      "retrievedAt": "2026-07-14",
      "contextOnly": true,
      "excludeFromSuburbScore": true,
      "scoreContribution": 0,
      "sourceMetadata": {
        "product": "2021 Census General Community Profile",
        "profileUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL21586",
        "downloadUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL21586/download/GCP_SAL21586.xlsx",
        "sourceWorkbook": "GCP_SAL21586.xlsx",
        "sourceWorkbookSha256": "755e050095fe3106f28bafaa416dd1427e78465372ad1965b404f9f774f6df6c",
        "geographicBoundaryEdition": "ASGS Edition 3",
        "privacyNote": "ABS applies small random adjustments to cell values. Component sums can differ slightly from published totals."
      },
      "community": {
        "totalPopulation": {
          "count": 9929,
          "sourceTable": "G01",
          "sourceCells": {
            "value": "D17"
          },
          "basis": "Place of usual residence"
        },
        "medianAge": {
          "value": 44,
          "unit": "years",
          "applicablePopulation": "Persons, excluding overseas visitors",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B13"
          },
          "basis": "Place of usual residence"
        },
        "householdsWithChildren": {
          "count": 1454,
          "denominator": 4007,
          "percentage": 36.3,
          "numeratorLabel": "Occupied private dwellings whose primary family is a couple family with children or a one-parent family",
          "denominatorLabel": "Total occupied private dwellings in G42, excluding visitor-only and other non-classifiable households",
          "sourceTable": "G42",
          "sourceCells": {
            "numerator": [
              "C36",
              "D36"
            ],
            "denominator": "I36"
          },
          "basis": "Place of enumeration",
          "components": {
            "coupleFamilyWithChildren": 1153,
            "oneParentFamily": 301
          },
          "notes": "For multiple-family households, G42 classifies the household using the primary family's composition."
        },
        "medianHouseholdIncome": {
          "value": 2606,
          "unit": "AUD per week",
          "applicablePopulation": "Occupied private dwellings; published ABS median household income",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B19"
          },
          "basis": "Place of enumeration"
        },
        "tenure": {
          "denominator": 4007,
          "denominatorLabel": "Total occupied private dwellings in G37, excluding visitor-only and other non-classifiable households",
          "basis": "Place of enumeration",
          "sourceTable": "G37",
          "ownerOccupied": {
            "count": 2811,
            "percentage": 70.2,
            "components": {
              "ownedOutright": 1677,
              "ownedWithMortgage": 1134
            },
            "sourceCells": [
              "G14",
              "G16"
            ]
          },
          "renting": {
            "count": 1069,
            "percentage": 26.7,
            "sourceCells": [
              "G25"
            ],
            "notes": "G37 rented total excludes dwellings occupied rent-free; those are included in other tenure."
          },
          "otherTenure": {
            "count": 76,
            "percentage": 1.9,
            "sourceCells": [
              "G27"
            ]
          },
          "notStated": {
            "count": 42,
            "percentage": 1.0,
            "sourceCells": [
              "G29"
            ]
          },
          "denominatorCell": "G31"
        },
        "overseasBornPopulation": {
          "count": 2375,
          "denominator": 9929,
          "percentage": 23.9,
          "numeratorLabel": "Persons born outside Australia",
          "denominatorLabel": "Total persons",
          "sourceTable": "G01",
          "sourceCells": {
            "numerator": [
              "D44"
            ],
            "denominator": "D17"
          },
          "basis": "Place of usual residence",
          "notes": "The G01 'Elsewhere' numerator includes inadequately described birthplaces and people at sea, and excludes birthplace not stated. The denominator is all persons."
        },
        "topOverseasCountriesOfBirth": [
          {
            "name": "England",
            "count": 346,
            "denominator": 9929,
            "percentage": 3.5,
            "sourceTable": "G09c",
            "sourceCell": "K23",
            "basis": "Place of usual residence"
          },
          {
            "name": "China (excludes SARs and Taiwan)",
            "count": 222,
            "denominator": 9929,
            "percentage": 2.2,
            "sourceTable": "G09c",
            "sourceCell": "K20",
            "basis": "Place of usual residence"
          },
          {
            "name": "India",
            "count": 194,
            "denominator": 9929,
            "percentage": 2.0,
            "sourceTable": "G09c",
            "sourceCell": "K29",
            "basis": "Place of usual residence"
          },
          {
            "name": "New Zealand",
            "count": 159,
            "denominator": 9929,
            "percentage": 1.6,
            "sourceTable": "G09c",
            "sourceCell": "K44",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greece",
            "count": 126,
            "denominator": 9929,
            "percentage": 1.3,
            "sourceTable": "G09c",
            "sourceCell": "K27",
            "basis": "Place of usual residence"
          }
        ],
        "topLanguagesSpokenAtHome": [
          {
            "name": "English only",
            "count": 7987,
            "denominator": 9929,
            "percentage": 80.4,
            "sourceTable": "G13c",
            "sourceCell": "G12",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 321,
            "denominator": 9929,
            "percentage": 3.2,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greek",
            "count": 308,
            "denominator": 9929,
            "percentage": 3.1,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Cantonese",
            "count": 105,
            "denominator": 9929,
            "percentage": 1.1,
            "sourceTable": "G13c",
            "sourceCell": "G19",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italian",
            "count": 91,
            "denominator": 9929,
            "percentage": 0.9,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          }
        ],
        "topNonEnglishLanguagesSpokenAtHome": [
          {
            "name": "Mandarin",
            "count": 321,
            "denominator": 9929,
            "percentage": 3.2,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greek",
            "count": 308,
            "denominator": 9929,
            "percentage": 3.1,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Cantonese",
            "count": 105,
            "denominator": 9929,
            "percentage": 1.1,
            "sourceTable": "G13c",
            "sourceCell": "G19",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italian",
            "count": 91,
            "denominator": 9929,
            "percentage": 0.9,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          },
          {
            "name": "Spanish",
            "count": 62,
            "denominator": 9929,
            "percentage": 0.6,
            "sourceTable": "G13c",
            "sourceCell": "G55",
            "basis": "Place of usual residence"
          }
        ],
        "religiousAffiliationSummary": [
          {
            "name": "No religion / secular or other spiritual beliefs",
            "count": 3782,
            "denominator": 9929,
            "percentage": 38.1,
            "sourceTable": "G14",
            "sourceCell": "D43",
            "basis": "Place of usual residence"
          },
          {
            "name": "Christianity",
            "count": 4442,
            "denominator": 9929,
            "percentage": 44.7,
            "sourceTable": "G14",
            "sourceCell": "D30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Buddhism",
            "count": 127,
            "denominator": 9929,
            "percentage": 1.3,
            "sourceTable": "G14",
            "sourceCell": "D9",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hinduism",
            "count": 181,
            "denominator": 9929,
            "percentage": 1.8,
            "sourceTable": "G14",
            "sourceCell": "D31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Islam",
            "count": 66,
            "denominator": 9929,
            "percentage": 0.7,
            "sourceTable": "G14",
            "sourceCell": "D32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Judaism",
            "count": 720,
            "denominator": 9929,
            "percentage": 7.3,
            "sourceTable": "G14",
            "sourceCell": "D33",
            "basis": "Place of usual residence"
          },
          {
            "name": "Other religions",
            "count": 35,
            "denominator": 9929,
            "percentage": 0.4,
            "sourceTable": "G14",
            "sourceCell": "D38",
            "basis": "Place of usual residence"
          },
          {
            "name": "Religious affiliation not stated",
            "count": 584,
            "denominator": 9929,
            "percentage": 5.9,
            "sourceTable": "G14",
            "sourceCell": "D44",
            "basis": "Place of usual residence"
          }
        ]
      },
      "additionalHouseholdContext": {
        "cantoneseSpokenAtHome": {
          "count": 105,
          "denominator": 9929,
          "percentage": 1.1,
          "numeratorLabel": "Persons who used Cantonese at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G19"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "mandarinSpokenAtHome": {
          "count": 321,
          "denominator": 9929,
          "percentage": 3.2,
          "numeratorLabel": "Persons who used Mandarin at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G20"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "hongKongBornPopulation": {
          "count": 66,
          "denominator": 9929,
          "percentage": 0.7,
          "numeratorLabel": "Persons born in Hong Kong (SAR of China)",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K28"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        },
        "chinaBornPopulation": {
          "count": 222,
          "denominator": 9929,
          "percentage": 2.2,
          "numeratorLabel": "Persons born in China, excluding SARs and Taiwan",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K20"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        }
      }
    },
    {
      "suburb": "Toorak",
      "geographyType": "SAL",
      "geographyCode": "SAL22547",
      "censusYear": 2021,
      "source": "Australian Bureau of Statistics",
      "retrievedAt": "2026-07-14",
      "contextOnly": true,
      "excludeFromSuburbScore": true,
      "scoreContribution": 0,
      "sourceMetadata": {
        "product": "2021 Census General Community Profile",
        "profileUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL22547",
        "downloadUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL22547/download/GCP_SAL22547.xlsx",
        "sourceWorkbook": "GCP_SAL22547.xlsx",
        "sourceWorkbookSha256": "c7cd5e340e98dce0c2a6e59d409843ed28252bc7043165e43d06ae8afbe5b487",
        "geographicBoundaryEdition": "ASGS Edition 3",
        "privacyNote": "ABS applies small random adjustments to cell values. Component sums can differ slightly from published totals."
      },
      "community": {
        "totalPopulation": {
          "count": 12817,
          "sourceTable": "G01",
          "sourceCells": {
            "value": "D17"
          },
          "basis": "Place of usual residence"
        },
        "medianAge": {
          "value": 47,
          "unit": "years",
          "applicablePopulation": "Persons, excluding overseas visitors",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B13"
          },
          "basis": "Place of usual residence"
        },
        "householdsWithChildren": {
          "count": 1510,
          "denominator": 5481,
          "percentage": 27.5,
          "numeratorLabel": "Occupied private dwellings whose primary family is a couple family with children or a one-parent family",
          "denominatorLabel": "Total occupied private dwellings in G42, excluding visitor-only and other non-classifiable households",
          "sourceTable": "G42",
          "sourceCells": {
            "numerator": [
              "C36",
              "D36"
            ],
            "denominator": "I36"
          },
          "basis": "Place of enumeration",
          "components": {
            "coupleFamilyWithChildren": 1139,
            "oneParentFamily": 371
          },
          "notes": "For multiple-family households, G42 classifies the household using the primary family's composition."
        },
        "medianHouseholdIncome": {
          "value": 2533,
          "unit": "AUD per week",
          "applicablePopulation": "Occupied private dwellings; published ABS median household income",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B19"
          },
          "basis": "Place of enumeration"
        },
        "tenure": {
          "denominator": 5481,
          "denominatorLabel": "Total occupied private dwellings in G37, excluding visitor-only and other non-classifiable households",
          "basis": "Place of enumeration",
          "sourceTable": "G37",
          "ownerOccupied": {
            "count": 3574,
            "percentage": 65.2,
            "components": {
              "ownedOutright": 2335,
              "ownedWithMortgage": 1239
            },
            "sourceCells": [
              "G14",
              "G16"
            ]
          },
          "renting": {
            "count": 1705,
            "percentage": 31.1,
            "sourceCells": [
              "G25"
            ],
            "notes": "G37 rented total excludes dwellings occupied rent-free; those are included in other tenure."
          },
          "otherTenure": {
            "count": 132,
            "percentage": 2.4,
            "sourceCells": [
              "G27"
            ]
          },
          "notStated": {
            "count": 75,
            "percentage": 1.4,
            "sourceCells": [
              "G29"
            ]
          },
          "denominatorCell": "G31"
        },
        "overseasBornPopulation": {
          "count": 3963,
          "denominator": 12817,
          "percentage": 30.9,
          "numeratorLabel": "Persons born outside Australia",
          "denominatorLabel": "Total persons",
          "sourceTable": "G01",
          "sourceCells": {
            "numerator": [
              "D44"
            ],
            "denominator": "D17"
          },
          "basis": "Place of usual residence",
          "notes": "The G01 'Elsewhere' numerator includes inadequately described birthplaces and people at sea, and excludes birthplace not stated. The denominator is all persons."
        },
        "topOverseasCountriesOfBirth": [
          {
            "name": "China (excludes SARs and Taiwan)",
            "count": 635,
            "denominator": 12817,
            "percentage": 5.0,
            "sourceTable": "G09c",
            "sourceCell": "K20",
            "basis": "Place of usual residence"
          },
          {
            "name": "England",
            "count": 442,
            "denominator": 12817,
            "percentage": 3.4,
            "sourceTable": "G09c",
            "sourceCell": "K23",
            "basis": "Place of usual residence"
          },
          {
            "name": "New Zealand",
            "count": 254,
            "denominator": 12817,
            "percentage": 2.0,
            "sourceTable": "G09c",
            "sourceCell": "K44",
            "basis": "Place of usual residence"
          },
          {
            "name": "India",
            "count": 239,
            "denominator": 12817,
            "percentage": 1.9,
            "sourceTable": "G09c",
            "sourceCell": "K29",
            "basis": "Place of usual residence"
          },
          {
            "name": "Malaysia",
            "count": 181,
            "denominator": 12817,
            "percentage": 1.4,
            "sourceTable": "G09c",
            "sourceCell": "K38",
            "basis": "Place of usual residence"
          }
        ],
        "topLanguagesSpokenAtHome": [
          {
            "name": "English only",
            "count": 9489,
            "denominator": 12817,
            "percentage": 74.0,
            "sourceTable": "G13c",
            "sourceCell": "G12",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 815,
            "denominator": 12817,
            "percentage": 6.4,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Cantonese",
            "count": 198,
            "denominator": 12817,
            "percentage": 1.5,
            "sourceTable": "G13c",
            "sourceCell": "G19",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greek",
            "count": 196,
            "denominator": 12817,
            "percentage": 1.5,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Spanish",
            "count": 117,
            "denominator": 12817,
            "percentage": 0.9,
            "sourceTable": "G13c",
            "sourceCell": "G55",
            "basis": "Place of usual residence"
          }
        ],
        "topNonEnglishLanguagesSpokenAtHome": [
          {
            "name": "Mandarin",
            "count": 815,
            "denominator": 12817,
            "percentage": 6.4,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Cantonese",
            "count": 198,
            "denominator": 12817,
            "percentage": 1.5,
            "sourceTable": "G13c",
            "sourceCell": "G19",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greek",
            "count": 196,
            "denominator": 12817,
            "percentage": 1.5,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Spanish",
            "count": 117,
            "denominator": 12817,
            "percentage": 0.9,
            "sourceTable": "G13c",
            "sourceCell": "G55",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italian",
            "count": 111,
            "denominator": 12817,
            "percentage": 0.9,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          }
        ],
        "religiousAffiliationSummary": [
          {
            "name": "No religion / secular or other spiritual beliefs",
            "count": 4781,
            "denominator": 12817,
            "percentage": 37.3,
            "sourceTable": "G14",
            "sourceCell": "D43",
            "basis": "Place of usual residence"
          },
          {
            "name": "Christianity",
            "count": 5080,
            "denominator": 12817,
            "percentage": 39.6,
            "sourceTable": "G14",
            "sourceCell": "D30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Buddhism",
            "count": 288,
            "denominator": 12817,
            "percentage": 2.2,
            "sourceTable": "G14",
            "sourceCell": "D9",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hinduism",
            "count": 223,
            "denominator": 12817,
            "percentage": 1.7,
            "sourceTable": "G14",
            "sourceCell": "D31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Islam",
            "count": 106,
            "denominator": 12817,
            "percentage": 0.8,
            "sourceTable": "G14",
            "sourceCell": "D32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Judaism",
            "count": 1251,
            "denominator": 12817,
            "percentage": 9.8,
            "sourceTable": "G14",
            "sourceCell": "D33",
            "basis": "Place of usual residence"
          },
          {
            "name": "Other religions",
            "count": 61,
            "denominator": 12817,
            "percentage": 0.5,
            "sourceTable": "G14",
            "sourceCell": "D38",
            "basis": "Place of usual residence"
          },
          {
            "name": "Religious affiliation not stated",
            "count": 1035,
            "denominator": 12817,
            "percentage": 8.1,
            "sourceTable": "G14",
            "sourceCell": "D44",
            "basis": "Place of usual residence"
          }
        ]
      },
      "additionalHouseholdContext": {
        "cantoneseSpokenAtHome": {
          "count": 198,
          "denominator": 12817,
          "percentage": 1.5,
          "numeratorLabel": "Persons who used Cantonese at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G19"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "mandarinSpokenAtHome": {
          "count": 815,
          "denominator": 12817,
          "percentage": 6.4,
          "numeratorLabel": "Persons who used Mandarin at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G20"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "hongKongBornPopulation": {
          "count": 113,
          "denominator": 12817,
          "percentage": 0.9,
          "numeratorLabel": "Persons born in Hong Kong (SAR of China)",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K28"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        },
        "chinaBornPopulation": {
          "count": 635,
          "denominator": 12817,
          "percentage": 5.0,
          "numeratorLabel": "Persons born in China, excluding SARs and Taiwan",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K20"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        }
      }
    },
    {
      "suburb": "Box Hill",
      "geographyType": "SAL",
      "geographyCode": "SAL20314",
      "censusYear": 2021,
      "source": "Australian Bureau of Statistics",
      "retrievedAt": "2026-07-14",
      "contextOnly": true,
      "excludeFromSuburbScore": true,
      "scoreContribution": 0,
      "sourceMetadata": {
        "product": "2021 Census General Community Profile",
        "profileUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL20314",
        "downloadUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL20314/download/GCP_SAL20314.xlsx",
        "sourceWorkbook": "GCP_SAL20314.xlsx",
        "sourceWorkbookSha256": "85c38744746e24ae4b3a23691c1e2845cf62d5db2aa2d469823113ee6f09f3f2",
        "geographicBoundaryEdition": "ASGS Edition 3",
        "privacyNote": "ABS applies small random adjustments to cell values. Component sums can differ slightly from published totals."
      },
      "community": {
        "totalPopulation": {
          "count": 14353,
          "sourceTable": "G01",
          "sourceCells": {
            "value": "D17"
          },
          "basis": "Place of usual residence"
        },
        "medianAge": {
          "value": 33,
          "unit": "years",
          "applicablePopulation": "Persons, excluding overseas visitors",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B13"
          },
          "basis": "Place of usual residence"
        },
        "householdsWithChildren": {
          "count": 1624,
          "denominator": 5965,
          "percentage": 27.2,
          "numeratorLabel": "Occupied private dwellings whose primary family is a couple family with children or a one-parent family",
          "denominatorLabel": "Total occupied private dwellings in G42, excluding visitor-only and other non-classifiable households",
          "sourceTable": "G42",
          "sourceCells": {
            "numerator": [
              "C36",
              "D36"
            ],
            "denominator": "I36"
          },
          "basis": "Place of enumeration",
          "components": {
            "coupleFamilyWithChildren": 1073,
            "oneParentFamily": 551
          },
          "notes": "For multiple-family households, G42 classifies the household using the primary family's composition."
        },
        "medianHouseholdIncome": {
          "value": 1267,
          "unit": "AUD per week",
          "applicablePopulation": "Occupied private dwellings; published ABS median household income",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B19"
          },
          "basis": "Place of enumeration"
        },
        "tenure": {
          "denominator": 5965,
          "denominatorLabel": "Total occupied private dwellings in G37, excluding visitor-only and other non-classifiable households",
          "basis": "Place of enumeration",
          "sourceTable": "G37",
          "ownerOccupied": {
            "count": 2233,
            "percentage": 37.4,
            "components": {
              "ownedOutright": 1184,
              "ownedWithMortgage": 1049
            },
            "sourceCells": [
              "G14",
              "G16"
            ]
          },
          "renting": {
            "count": 3452,
            "percentage": 57.9,
            "sourceCells": [
              "G25"
            ],
            "notes": "G37 rented total excludes dwellings occupied rent-free; those are included in other tenure."
          },
          "otherTenure": {
            "count": 210,
            "percentage": 3.5,
            "sourceCells": [
              "G27"
            ]
          },
          "notStated": {
            "count": 69,
            "percentage": 1.2,
            "sourceCells": [
              "G29"
            ]
          },
          "denominatorCell": "G31"
        },
        "overseasBornPopulation": {
          "count": 8762,
          "denominator": 14353,
          "percentage": 61.0,
          "numeratorLabel": "Persons born outside Australia",
          "denominatorLabel": "Total persons",
          "sourceTable": "G01",
          "sourceCells": {
            "numerator": [
              "D44"
            ],
            "denominator": "D17"
          },
          "basis": "Place of usual residence",
          "notes": "The G01 'Elsewhere' numerator includes inadequately described birthplaces and people at sea, and excludes birthplace not stated. The denominator is all persons."
        },
        "topOverseasCountriesOfBirth": [
          {
            "name": "China (excludes SARs and Taiwan)",
            "count": 4236,
            "denominator": 14353,
            "percentage": 29.5,
            "sourceTable": "G09c",
            "sourceCell": "K20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Malaysia",
            "count": 920,
            "denominator": 14353,
            "percentage": 6.4,
            "sourceTable": "G09c",
            "sourceCell": "K38",
            "basis": "Place of usual residence"
          },
          {
            "name": "India",
            "count": 644,
            "denominator": 14353,
            "percentage": 4.5,
            "sourceTable": "G09c",
            "sourceCell": "K29",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hong Kong (SAR of China)",
            "count": 360,
            "denominator": 14353,
            "percentage": 2.5,
            "sourceTable": "G09c",
            "sourceCell": "K28",
            "basis": "Place of usual residence"
          },
          {
            "name": "Vietnam",
            "count": 275,
            "denominator": 14353,
            "percentage": 1.9,
            "sourceTable": "G09c",
            "sourceCell": "K59",
            "basis": "Place of usual residence"
          }
        ],
        "topLanguagesSpokenAtHome": [
          {
            "name": "Mandarin",
            "count": 4863,
            "denominator": 14353,
            "percentage": 33.9,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "English only",
            "count": 4660,
            "denominator": 14353,
            "percentage": 32.5,
            "sourceTable": "G13c",
            "sourceCell": "G12",
            "basis": "Place of usual residence"
          },
          {
            "name": "Cantonese",
            "count": 1223,
            "denominator": 14353,
            "percentage": 8.5,
            "sourceTable": "G13c",
            "sourceCell": "G19",
            "basis": "Place of usual residence"
          },
          {
            "name": "Vietnamese",
            "count": 240,
            "denominator": 14353,
            "percentage": 1.7,
            "sourceTable": "G13c",
            "sourceCell": "G59",
            "basis": "Place of usual residence"
          },
          {
            "name": "Korean",
            "count": 212,
            "denominator": 14353,
            "percentage": 1.5,
            "sourceTable": "G13c",
            "sourceCell": "G40",
            "basis": "Place of usual residence"
          }
        ],
        "topNonEnglishLanguagesSpokenAtHome": [
          {
            "name": "Mandarin",
            "count": 4863,
            "denominator": 14353,
            "percentage": 33.9,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Cantonese",
            "count": 1223,
            "denominator": 14353,
            "percentage": 8.5,
            "sourceTable": "G13c",
            "sourceCell": "G19",
            "basis": "Place of usual residence"
          },
          {
            "name": "Vietnamese",
            "count": 240,
            "denominator": 14353,
            "percentage": 1.7,
            "sourceTable": "G13c",
            "sourceCell": "G59",
            "basis": "Place of usual residence"
          },
          {
            "name": "Korean",
            "count": 212,
            "denominator": 14353,
            "percentage": 1.5,
            "sourceTable": "G13c",
            "sourceCell": "G40",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hindi",
            "count": 189,
            "denominator": 14353,
            "percentage": 1.3,
            "sourceTable": "G13c",
            "sourceCell": "G30",
            "basis": "Place of usual residence"
          }
        ],
        "religiousAffiliationSummary": [
          {
            "name": "No religion / secular or other spiritual beliefs",
            "count": 7298,
            "denominator": 14353,
            "percentage": 50.8,
            "sourceTable": "G14",
            "sourceCell": "D43",
            "basis": "Place of usual residence"
          },
          {
            "name": "Christianity",
            "count": 3395,
            "denominator": 14353,
            "percentage": 23.7,
            "sourceTable": "G14",
            "sourceCell": "D30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Buddhism",
            "count": 1289,
            "denominator": 14353,
            "percentage": 9.0,
            "sourceTable": "G14",
            "sourceCell": "D9",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hinduism",
            "count": 646,
            "denominator": 14353,
            "percentage": 4.5,
            "sourceTable": "G14",
            "sourceCell": "D31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Islam",
            "count": 266,
            "denominator": 14353,
            "percentage": 1.9,
            "sourceTable": "G14",
            "sourceCell": "D32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Judaism",
            "count": 12,
            "denominator": 14353,
            "percentage": 0.1,
            "sourceTable": "G14",
            "sourceCell": "D33",
            "basis": "Place of usual residence"
          },
          {
            "name": "Other religions",
            "count": 116,
            "denominator": 14353,
            "percentage": 0.8,
            "sourceTable": "G14",
            "sourceCell": "D38",
            "basis": "Place of usual residence"
          },
          {
            "name": "Religious affiliation not stated",
            "count": 1335,
            "denominator": 14353,
            "percentage": 9.3,
            "sourceTable": "G14",
            "sourceCell": "D44",
            "basis": "Place of usual residence"
          }
        ]
      },
      "additionalHouseholdContext": {
        "cantoneseSpokenAtHome": {
          "count": 1223,
          "denominator": 14353,
          "percentage": 8.5,
          "numeratorLabel": "Persons who used Cantonese at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G19"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "mandarinSpokenAtHome": {
          "count": 4863,
          "denominator": 14353,
          "percentage": 33.9,
          "numeratorLabel": "Persons who used Mandarin at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G20"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "hongKongBornPopulation": {
          "count": 360,
          "denominator": 14353,
          "percentage": 2.5,
          "numeratorLabel": "Persons born in Hong Kong (SAR of China)",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K28"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        },
        "chinaBornPopulation": {
          "count": 4236,
          "denominator": 14353,
          "percentage": 29.5,
          "numeratorLabel": "Persons born in China, excluding SARs and Taiwan",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K20"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        }
      }
    },
    {
      "suburb": "Balwyn",
      "geographyType": "SAL",
      "geographyCode": "SAL20123",
      "censusYear": 2021,
      "source": "Australian Bureau of Statistics",
      "retrievedAt": "2026-07-14",
      "contextOnly": true,
      "excludeFromSuburbScore": true,
      "scoreContribution": 0,
      "sourceMetadata": {
        "product": "2021 Census General Community Profile",
        "profileUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL20123",
        "downloadUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL20123/download/GCP_SAL20123.xlsx",
        "sourceWorkbook": "GCP_SAL20123.xlsx",
        "sourceWorkbookSha256": "663f4d699de1224f8052cd957eaa2af318645f27275363790277acb711d78e6e",
        "geographicBoundaryEdition": "ASGS Edition 3",
        "privacyNote": "ABS applies small random adjustments to cell values. Component sums can differ slightly from published totals."
      },
      "community": {
        "totalPopulation": {
          "count": 13495,
          "sourceTable": "G01",
          "sourceCells": {
            "value": "D17"
          },
          "basis": "Place of usual residence"
        },
        "medianAge": {
          "value": 43,
          "unit": "years",
          "applicablePopulation": "Persons, excluding overseas visitors",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B13"
          },
          "basis": "Place of usual residence"
        },
        "householdsWithChildren": {
          "count": 2450,
          "denominator": 5085,
          "percentage": 48.2,
          "numeratorLabel": "Occupied private dwellings whose primary family is a couple family with children or a one-parent family",
          "denominatorLabel": "Total occupied private dwellings in G42, excluding visitor-only and other non-classifiable households",
          "sourceTable": "G42",
          "sourceCells": {
            "numerator": [
              "C36",
              "D36"
            ],
            "denominator": "I36"
          },
          "basis": "Place of enumeration",
          "components": {
            "coupleFamilyWithChildren": 1848,
            "oneParentFamily": 602
          },
          "notes": "For multiple-family households, G42 classifies the household using the primary family's composition."
        },
        "medianHouseholdIncome": {
          "value": 1975,
          "unit": "AUD per week",
          "applicablePopulation": "Occupied private dwellings; published ABS median household income",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B19"
          },
          "basis": "Place of enumeration"
        },
        "tenure": {
          "denominator": 5085,
          "denominatorLabel": "Total occupied private dwellings in G37, excluding visitor-only and other non-classifiable households",
          "basis": "Place of enumeration",
          "sourceTable": "G37",
          "ownerOccupied": {
            "count": 3521,
            "percentage": 69.2,
            "components": {
              "ownedOutright": 2145,
              "ownedWithMortgage": 1376
            },
            "sourceCells": [
              "G14",
              "G16"
            ]
          },
          "renting": {
            "count": 1356,
            "percentage": 26.7,
            "sourceCells": [
              "G25"
            ],
            "notes": "G37 rented total excludes dwellings occupied rent-free; those are included in other tenure."
          },
          "otherTenure": {
            "count": 148,
            "percentage": 2.9,
            "sourceCells": [
              "G27"
            ]
          },
          "notStated": {
            "count": 55,
            "percentage": 1.1,
            "sourceCells": [
              "G29"
            ]
          },
          "denominatorCell": "G31"
        },
        "overseasBornPopulation": {
          "count": 6141,
          "denominator": 13495,
          "percentage": 45.5,
          "numeratorLabel": "Persons born outside Australia",
          "denominatorLabel": "Total persons",
          "sourceTable": "G01",
          "sourceCells": {
            "numerator": [
              "D44"
            ],
            "denominator": "D17"
          },
          "basis": "Place of usual residence",
          "notes": "The G01 'Elsewhere' numerator includes inadequately described birthplaces and people at sea, and excludes birthplace not stated. The denominator is all persons."
        },
        "topOverseasCountriesOfBirth": [
          {
            "name": "China (excludes SARs and Taiwan)",
            "count": 2325,
            "denominator": 13495,
            "percentage": 17.2,
            "sourceTable": "G09c",
            "sourceCell": "K20",
            "basis": "Place of usual residence"
          },
          {
            "name": "India",
            "count": 491,
            "denominator": 13495,
            "percentage": 3.6,
            "sourceTable": "G09c",
            "sourceCell": "K29",
            "basis": "Place of usual residence"
          },
          {
            "name": "Malaysia",
            "count": 450,
            "denominator": 13495,
            "percentage": 3.3,
            "sourceTable": "G09c",
            "sourceCell": "K38",
            "basis": "Place of usual residence"
          },
          {
            "name": "England",
            "count": 321,
            "denominator": 13495,
            "percentage": 2.4,
            "sourceTable": "G09c",
            "sourceCell": "K23",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hong Kong (SAR of China)",
            "count": 282,
            "denominator": 13495,
            "percentage": 2.1,
            "sourceTable": "G09c",
            "sourceCell": "K28",
            "basis": "Place of usual residence"
          }
        ],
        "topLanguagesSpokenAtHome": [
          {
            "name": "English only",
            "count": 6912,
            "denominator": 13495,
            "percentage": 51.2,
            "sourceTable": "G13c",
            "sourceCell": "G12",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 2961,
            "denominator": 13495,
            "percentage": 21.9,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Cantonese",
            "count": 897,
            "denominator": 13495,
            "percentage": 6.6,
            "sourceTable": "G13c",
            "sourceCell": "G19",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greek",
            "count": 344,
            "denominator": 13495,
            "percentage": 2.5,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Vietnamese",
            "count": 197,
            "denominator": 13495,
            "percentage": 1.5,
            "sourceTable": "G13c",
            "sourceCell": "G59",
            "basis": "Place of usual residence"
          }
        ],
        "topNonEnglishLanguagesSpokenAtHome": [
          {
            "name": "Mandarin",
            "count": 2961,
            "denominator": 13495,
            "percentage": 21.9,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Cantonese",
            "count": 897,
            "denominator": 13495,
            "percentage": 6.6,
            "sourceTable": "G13c",
            "sourceCell": "G19",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greek",
            "count": 344,
            "denominator": 13495,
            "percentage": 2.5,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Vietnamese",
            "count": 197,
            "denominator": 13495,
            "percentage": 1.5,
            "sourceTable": "G13c",
            "sourceCell": "G59",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hindi",
            "count": 191,
            "denominator": 13495,
            "percentage": 1.4,
            "sourceTable": "G13c",
            "sourceCell": "G30",
            "basis": "Place of usual residence"
          }
        ],
        "religiousAffiliationSummary": [
          {
            "name": "No religion / secular or other spiritual beliefs",
            "count": 5993,
            "denominator": 13495,
            "percentage": 44.4,
            "sourceTable": "G14",
            "sourceCell": "D43",
            "basis": "Place of usual residence"
          },
          {
            "name": "Christianity",
            "count": 5258,
            "denominator": 13495,
            "percentage": 39.0,
            "sourceTable": "G14",
            "sourceCell": "D30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Buddhism",
            "count": 758,
            "denominator": 13495,
            "percentage": 5.6,
            "sourceTable": "G14",
            "sourceCell": "D9",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hinduism",
            "count": 547,
            "denominator": 13495,
            "percentage": 4.1,
            "sourceTable": "G14",
            "sourceCell": "D31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Islam",
            "count": 186,
            "denominator": 13495,
            "percentage": 1.4,
            "sourceTable": "G14",
            "sourceCell": "D32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Judaism",
            "count": 42,
            "denominator": 13495,
            "percentage": 0.3,
            "sourceTable": "G14",
            "sourceCell": "D33",
            "basis": "Place of usual residence"
          },
          {
            "name": "Other religions",
            "count": 96,
            "denominator": 13495,
            "percentage": 0.7,
            "sourceTable": "G14",
            "sourceCell": "D38",
            "basis": "Place of usual residence"
          },
          {
            "name": "Religious affiliation not stated",
            "count": 617,
            "denominator": 13495,
            "percentage": 4.6,
            "sourceTable": "G14",
            "sourceCell": "D44",
            "basis": "Place of usual residence"
          }
        ]
      },
      "additionalHouseholdContext": {
        "cantoneseSpokenAtHome": {
          "count": 897,
          "denominator": 13495,
          "percentage": 6.6,
          "numeratorLabel": "Persons who used Cantonese at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G19"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "mandarinSpokenAtHome": {
          "count": 2961,
          "denominator": 13495,
          "percentage": 21.9,
          "numeratorLabel": "Persons who used Mandarin at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G20"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "hongKongBornPopulation": {
          "count": 282,
          "denominator": 13495,
          "percentage": 2.1,
          "numeratorLabel": "Persons born in Hong Kong (SAR of China)",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K28"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        },
        "chinaBornPopulation": {
          "count": 2325,
          "denominator": 13495,
          "percentage": 17.2,
          "numeratorLabel": "Persons born in China, excluding SARs and Taiwan",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K20"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        }
      }
    },
    {
      "suburb": "Thornbury",
      "geographyType": "SAL",
      "geographyCode": "SAL22508",
      "censusYear": 2021,
      "source": "Australian Bureau of Statistics",
      "retrievedAt": "2026-07-14",
      "contextOnly": true,
      "excludeFromSuburbScore": true,
      "scoreContribution": 0,
      "sourceMetadata": {
        "product": "2021 Census General Community Profile",
        "profileUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL22508",
        "downloadUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL22508/download/GCP_SAL22508.xlsx",
        "sourceWorkbook": "GCP_SAL22508.xlsx",
        "sourceWorkbookSha256": "87cabee0a190d2dfc8cee9bc74bdfff1e6c287a45006821d577b0bae30bac5ec",
        "geographicBoundaryEdition": "ASGS Edition 3",
        "privacyNote": "ABS applies small random adjustments to cell values. Component sums can differ slightly from published totals."
      },
      "community": {
        "totalPopulation": {
          "count": 19005,
          "sourceTable": "G01",
          "sourceCells": {
            "value": "D17"
          },
          "basis": "Place of usual residence"
        },
        "medianAge": {
          "value": 37,
          "unit": "years",
          "applicablePopulation": "Persons, excluding overseas visitors",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B13"
          },
          "basis": "Place of usual residence"
        },
        "householdsWithChildren": {
          "count": 2712,
          "denominator": 7996,
          "percentage": 33.9,
          "numeratorLabel": "Occupied private dwellings whose primary family is a couple family with children or a one-parent family",
          "denominatorLabel": "Total occupied private dwellings in G42, excluding visitor-only and other non-classifiable households",
          "sourceTable": "G42",
          "sourceCells": {
            "numerator": [
              "C36",
              "D36"
            ],
            "denominator": "I36"
          },
          "basis": "Place of enumeration",
          "components": {
            "coupleFamilyWithChildren": 2042,
            "oneParentFamily": 670
          },
          "notes": "For multiple-family households, G42 classifies the household using the primary family's composition."
        },
        "medianHouseholdIncome": {
          "value": 1971,
          "unit": "AUD per week",
          "applicablePopulation": "Occupied private dwellings; published ABS median household income",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B19"
          },
          "basis": "Place of enumeration"
        },
        "tenure": {
          "denominator": 7996,
          "denominatorLabel": "Total occupied private dwellings in G37, excluding visitor-only and other non-classifiable households",
          "basis": "Place of enumeration",
          "sourceTable": "G37",
          "ownerOccupied": {
            "count": 4471,
            "percentage": 55.9,
            "components": {
              "ownedOutright": 2165,
              "ownedWithMortgage": 2306
            },
            "sourceCells": [
              "G14",
              "G16"
            ]
          },
          "renting": {
            "count": 3347,
            "percentage": 41.9,
            "sourceCells": [
              "G25"
            ],
            "notes": "G37 rented total excludes dwellings occupied rent-free; those are included in other tenure."
          },
          "otherTenure": {
            "count": 91,
            "percentage": 1.1,
            "sourceCells": [
              "G27"
            ]
          },
          "notStated": {
            "count": 91,
            "percentage": 1.1,
            "sourceCells": [
              "G29"
            ]
          },
          "denominatorCell": "G31"
        },
        "overseasBornPopulation": {
          "count": 5059,
          "denominator": 19005,
          "percentage": 26.6,
          "numeratorLabel": "Persons born outside Australia",
          "denominatorLabel": "Total persons",
          "sourceTable": "G01",
          "sourceCells": {
            "numerator": [
              "D44"
            ],
            "denominator": "D17"
          },
          "basis": "Place of usual residence",
          "notes": "The G01 'Elsewhere' numerator includes inadequately described birthplaces and people at sea, and excludes birthplace not stated. The denominator is all persons."
        },
        "topOverseasCountriesOfBirth": [
          {
            "name": "Greece",
            "count": 795,
            "denominator": 19005,
            "percentage": 4.2,
            "sourceTable": "G09c",
            "sourceCell": "K27",
            "basis": "Place of usual residence"
          },
          {
            "name": "England",
            "count": 549,
            "denominator": 19005,
            "percentage": 2.9,
            "sourceTable": "G09c",
            "sourceCell": "K23",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italy",
            "count": 548,
            "denominator": 19005,
            "percentage": 2.9,
            "sourceTable": "G09c",
            "sourceCell": "K34",
            "basis": "Place of usual residence"
          },
          {
            "name": "New Zealand",
            "count": 412,
            "denominator": 19005,
            "percentage": 2.2,
            "sourceTable": "G09c",
            "sourceCell": "K44",
            "basis": "Place of usual residence"
          },
          {
            "name": "India",
            "count": 223,
            "denominator": 19005,
            "percentage": 1.2,
            "sourceTable": "G09c",
            "sourceCell": "K29",
            "basis": "Place of usual residence"
          }
        ],
        "topLanguagesSpokenAtHome": [
          {
            "name": "English only",
            "count": 13631,
            "denominator": 19005,
            "percentage": 71.7,
            "sourceTable": "G13c",
            "sourceCell": "G12",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greek",
            "count": 1520,
            "denominator": 19005,
            "percentage": 8.0,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italian",
            "count": 800,
            "denominator": 19005,
            "percentage": 4.2,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          },
          {
            "name": "Arabic",
            "count": 330,
            "denominator": 19005,
            "percentage": 1.7,
            "sourceTable": "G13c",
            "sourceCell": "G16",
            "basis": "Place of usual residence"
          },
          {
            "name": "Vietnamese",
            "count": 216,
            "denominator": 19005,
            "percentage": 1.1,
            "sourceTable": "G13c",
            "sourceCell": "G59",
            "basis": "Place of usual residence"
          }
        ],
        "topNonEnglishLanguagesSpokenAtHome": [
          {
            "name": "Greek",
            "count": 1520,
            "denominator": 19005,
            "percentage": 8.0,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italian",
            "count": 800,
            "denominator": 19005,
            "percentage": 4.2,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          },
          {
            "name": "Arabic",
            "count": 330,
            "denominator": 19005,
            "percentage": 1.7,
            "sourceTable": "G13c",
            "sourceCell": "G16",
            "basis": "Place of usual residence"
          },
          {
            "name": "Vietnamese",
            "count": 216,
            "denominator": 19005,
            "percentage": 1.1,
            "sourceTable": "G13c",
            "sourceCell": "G59",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 200,
            "denominator": 19005,
            "percentage": 1.1,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          }
        ],
        "religiousAffiliationSummary": [
          {
            "name": "No religion / secular or other spiritual beliefs",
            "count": 10341,
            "denominator": 19005,
            "percentage": 54.4,
            "sourceTable": "G14",
            "sourceCell": "D43",
            "basis": "Place of usual residence"
          },
          {
            "name": "Christianity",
            "count": 6626,
            "denominator": 19005,
            "percentage": 34.9,
            "sourceTable": "G14",
            "sourceCell": "D30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Buddhism",
            "count": 321,
            "denominator": 19005,
            "percentage": 1.7,
            "sourceTable": "G14",
            "sourceCell": "D9",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hinduism",
            "count": 213,
            "denominator": 19005,
            "percentage": 1.1,
            "sourceTable": "G14",
            "sourceCell": "D31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Islam",
            "count": 402,
            "denominator": 19005,
            "percentage": 2.1,
            "sourceTable": "G14",
            "sourceCell": "D32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Judaism",
            "count": 67,
            "denominator": 19005,
            "percentage": 0.4,
            "sourceTable": "G14",
            "sourceCell": "D33",
            "basis": "Place of usual residence"
          },
          {
            "name": "Other religions",
            "count": 128,
            "denominator": 19005,
            "percentage": 0.7,
            "sourceTable": "G14",
            "sourceCell": "D38",
            "basis": "Place of usual residence"
          },
          {
            "name": "Religious affiliation not stated",
            "count": 909,
            "denominator": 19005,
            "percentage": 4.8,
            "sourceTable": "G14",
            "sourceCell": "D44",
            "basis": "Place of usual residence"
          }
        ]
      },
      "additionalHouseholdContext": {
        "cantoneseSpokenAtHome": {
          "count": 158,
          "denominator": 19005,
          "percentage": 0.8,
          "numeratorLabel": "Persons who used Cantonese at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G19"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "mandarinSpokenAtHome": {
          "count": 200,
          "denominator": 19005,
          "percentage": 1.1,
          "numeratorLabel": "Persons who used Mandarin at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G20"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "hongKongBornPopulation": {
          "count": 42,
          "denominator": 19005,
          "percentage": 0.2,
          "numeratorLabel": "Persons born in Hong Kong (SAR of China)",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K28"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        },
        "chinaBornPopulation": {
          "count": 164,
          "denominator": 19005,
          "percentage": 0.9,
          "numeratorLabel": "Persons born in China, excluding SARs and Taiwan",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K20"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        }
      }
    },
    {
      "suburb": "Preston",
      "geographyType": "SAL",
      "geographyCode": "SAL22121",
      "censusYear": 2021,
      "source": "Australian Bureau of Statistics",
      "retrievedAt": "2026-07-14",
      "contextOnly": true,
      "excludeFromSuburbScore": true,
      "scoreContribution": 0,
      "sourceMetadata": {
        "product": "2021 Census General Community Profile",
        "profileUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL22121",
        "downloadUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL22121/download/GCP_SAL22121.xlsx",
        "sourceWorkbook": "GCP_SAL22121.xlsx",
        "sourceWorkbookSha256": "7b1ba9fdadc1a677a66a835d84a1d3ad8d18f1e2280ecfdf8e1375a3be3cfbfb",
        "geographicBoundaryEdition": "ASGS Edition 3",
        "privacyNote": "ABS applies small random adjustments to cell values. Component sums can differ slightly from published totals."
      },
      "community": {
        "totalPopulation": {
          "count": 33790,
          "sourceTable": "G01",
          "sourceCells": {
            "value": "D17"
          },
          "basis": "Place of usual residence"
        },
        "medianAge": {
          "value": 37,
          "unit": "years",
          "applicablePopulation": "Persons, excluding overseas visitors",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B13"
          },
          "basis": "Place of usual residence"
        },
        "householdsWithChildren": {
          "count": 4943,
          "denominator": 13645,
          "percentage": 36.2,
          "numeratorLabel": "Occupied private dwellings whose primary family is a couple family with children or a one-parent family",
          "denominatorLabel": "Total occupied private dwellings in G42, excluding visitor-only and other non-classifiable households",
          "sourceTable": "G42",
          "sourceCells": {
            "numerator": [
              "C36",
              "D36"
            ],
            "denominator": "I36"
          },
          "basis": "Place of enumeration",
          "components": {
            "coupleFamilyWithChildren": 3617,
            "oneParentFamily": 1326
          },
          "notes": "For multiple-family households, G42 classifies the household using the primary family's composition."
        },
        "medianHouseholdIncome": {
          "value": 1844,
          "unit": "AUD per week",
          "applicablePopulation": "Occupied private dwellings; published ABS median household income",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B19"
          },
          "basis": "Place of enumeration"
        },
        "tenure": {
          "denominator": 13645,
          "denominatorLabel": "Total occupied private dwellings in G37, excluding visitor-only and other non-classifiable households",
          "basis": "Place of enumeration",
          "sourceTable": "G37",
          "ownerOccupied": {
            "count": 7821,
            "percentage": 57.3,
            "components": {
              "ownedOutright": 3711,
              "ownedWithMortgage": 4110
            },
            "sourceCells": [
              "G14",
              "G16"
            ]
          },
          "renting": {
            "count": 5472,
            "percentage": 40.1,
            "sourceCells": [
              "G25"
            ],
            "notes": "G37 rented total excludes dwellings occupied rent-free; those are included in other tenure."
          },
          "otherTenure": {
            "count": 178,
            "percentage": 1.3,
            "sourceCells": [
              "G27"
            ]
          },
          "notStated": {
            "count": 172,
            "percentage": 1.3,
            "sourceCells": [
              "G29"
            ]
          },
          "denominatorCell": "G31"
        },
        "overseasBornPopulation": {
          "count": 10947,
          "denominator": 33790,
          "percentage": 32.4,
          "numeratorLabel": "Persons born outside Australia",
          "denominatorLabel": "Total persons",
          "sourceTable": "G01",
          "sourceCells": {
            "numerator": [
              "D44"
            ],
            "denominator": "D17"
          },
          "basis": "Place of usual residence",
          "notes": "The G01 'Elsewhere' numerator includes inadequately described birthplaces and people at sea, and excludes birthplace not stated. The denominator is all persons."
        },
        "topOverseasCountriesOfBirth": [
          {
            "name": "China (excludes SARs and Taiwan)",
            "count": 1020,
            "denominator": 33790,
            "percentage": 3.0,
            "sourceTable": "G09c",
            "sourceCell": "K20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italy",
            "count": 1014,
            "denominator": 33790,
            "percentage": 3.0,
            "sourceTable": "G09c",
            "sourceCell": "K34",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greece",
            "count": 963,
            "denominator": 33790,
            "percentage": 2.8,
            "sourceTable": "G09c",
            "sourceCell": "K27",
            "basis": "Place of usual residence"
          },
          {
            "name": "India",
            "count": 828,
            "denominator": 33790,
            "percentage": 2.5,
            "sourceTable": "G09c",
            "sourceCell": "K29",
            "basis": "Place of usual residence"
          },
          {
            "name": "Vietnam",
            "count": 747,
            "denominator": 33790,
            "percentage": 2.2,
            "sourceTable": "G09c",
            "sourceCell": "K59",
            "basis": "Place of usual residence"
          }
        ],
        "topLanguagesSpokenAtHome": [
          {
            "name": "English only",
            "count": 20968,
            "denominator": 33790,
            "percentage": 62.1,
            "sourceTable": "G13c",
            "sourceCell": "G12",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greek",
            "count": 1919,
            "denominator": 33790,
            "percentage": 5.7,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italian",
            "count": 1553,
            "denominator": 33790,
            "percentage": 4.6,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 1175,
            "denominator": 33790,
            "percentage": 3.5,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Vietnamese",
            "count": 901,
            "denominator": 33790,
            "percentage": 2.7,
            "sourceTable": "G13c",
            "sourceCell": "G59",
            "basis": "Place of usual residence"
          }
        ],
        "topNonEnglishLanguagesSpokenAtHome": [
          {
            "name": "Greek",
            "count": 1919,
            "denominator": 33790,
            "percentage": 5.7,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italian",
            "count": 1553,
            "denominator": 33790,
            "percentage": 4.6,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 1175,
            "denominator": 33790,
            "percentage": 3.5,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Vietnamese",
            "count": 901,
            "denominator": 33790,
            "percentage": 2.7,
            "sourceTable": "G13c",
            "sourceCell": "G59",
            "basis": "Place of usual residence"
          },
          {
            "name": "Arabic",
            "count": 771,
            "denominator": 33790,
            "percentage": 2.3,
            "sourceTable": "G13c",
            "sourceCell": "G16",
            "basis": "Place of usual residence"
          }
        ],
        "religiousAffiliationSummary": [
          {
            "name": "No religion / secular or other spiritual beliefs",
            "count": 15862,
            "denominator": 33790,
            "percentage": 46.9,
            "sourceTable": "G14",
            "sourceCell": "D43",
            "basis": "Place of usual residence"
          },
          {
            "name": "Christianity",
            "count": 12238,
            "denominator": 33790,
            "percentage": 36.2,
            "sourceTable": "G14",
            "sourceCell": "D30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Buddhism",
            "count": 1062,
            "denominator": 33790,
            "percentage": 3.1,
            "sourceTable": "G14",
            "sourceCell": "D9",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hinduism",
            "count": 805,
            "denominator": 33790,
            "percentage": 2.4,
            "sourceTable": "G14",
            "sourceCell": "D31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Islam",
            "count": 1631,
            "denominator": 33790,
            "percentage": 4.8,
            "sourceTable": "G14",
            "sourceCell": "D32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Judaism",
            "count": 55,
            "denominator": 33790,
            "percentage": 0.2,
            "sourceTable": "G14",
            "sourceCell": "D33",
            "basis": "Place of usual residence"
          },
          {
            "name": "Other religions",
            "count": 235,
            "denominator": 33790,
            "percentage": 0.7,
            "sourceTable": "G14",
            "sourceCell": "D38",
            "basis": "Place of usual residence"
          },
          {
            "name": "Religious affiliation not stated",
            "count": 1895,
            "denominator": 33790,
            "percentage": 5.6,
            "sourceTable": "G14",
            "sourceCell": "D44",
            "basis": "Place of usual residence"
          }
        ]
      },
      "additionalHouseholdContext": {
        "cantoneseSpokenAtHome": {
          "count": 454,
          "denominator": 33790,
          "percentage": 1.3,
          "numeratorLabel": "Persons who used Cantonese at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G19"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "mandarinSpokenAtHome": {
          "count": 1175,
          "denominator": 33790,
          "percentage": 3.5,
          "numeratorLabel": "Persons who used Mandarin at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G20"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "hongKongBornPopulation": {
          "count": 65,
          "denominator": 33790,
          "percentage": 0.2,
          "numeratorLabel": "Persons born in Hong Kong (SAR of China)",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K28"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        },
        "chinaBornPopulation": {
          "count": 1020,
          "denominator": 33790,
          "percentage": 3.0,
          "numeratorLabel": "Persons born in China, excluding SARs and Taiwan",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K20"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        }
      }
    },
    {
      "suburb": "Northcote",
      "geographyType": "SAL",
      "geographyCode": "SAL21971",
      "censusYear": 2021,
      "source": "Australian Bureau of Statistics",
      "retrievedAt": "2026-07-14",
      "contextOnly": true,
      "excludeFromSuburbScore": true,
      "scoreContribution": 0,
      "sourceMetadata": {
        "product": "2021 Census General Community Profile",
        "profileUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL21971",
        "downloadUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL21971/download/GCP_SAL21971.xlsx",
        "sourceWorkbook": "GCP_SAL21971.xlsx",
        "sourceWorkbookSha256": "c3d6eaad27cb9003ebccdfe920c85b2e8659523b5a3aef86fe289c978d0a60e6",
        "geographicBoundaryEdition": "ASGS Edition 3",
        "privacyNote": "ABS applies small random adjustments to cell values. Component sums can differ slightly from published totals."
      },
      "community": {
        "totalPopulation": {
          "count": 25276,
          "sourceTable": "G01",
          "sourceCells": {
            "value": "D17"
          },
          "basis": "Place of usual residence"
        },
        "medianAge": {
          "value": 37,
          "unit": "years",
          "applicablePopulation": "Persons, excluding overseas visitors",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B13"
          },
          "basis": "Place of usual residence"
        },
        "householdsWithChildren": {
          "count": 3530,
          "denominator": 10237,
          "percentage": 34.5,
          "numeratorLabel": "Occupied private dwellings whose primary family is a couple family with children or a one-parent family",
          "denominatorLabel": "Total occupied private dwellings in G42, excluding visitor-only and other non-classifiable households",
          "sourceTable": "G42",
          "sourceCells": {
            "numerator": [
              "C36",
              "D36"
            ],
            "denominator": "I36"
          },
          "basis": "Place of enumeration",
          "components": {
            "coupleFamilyWithChildren": 2755,
            "oneParentFamily": 775
          },
          "notes": "For multiple-family households, G42 classifies the household using the primary family's composition."
        },
        "medianHouseholdIncome": {
          "value": 2287,
          "unit": "AUD per week",
          "applicablePopulation": "Occupied private dwellings; published ABS median household income",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B19"
          },
          "basis": "Place of enumeration"
        },
        "tenure": {
          "denominator": 10237,
          "denominatorLabel": "Total occupied private dwellings in G37, excluding visitor-only and other non-classifiable households",
          "basis": "Place of enumeration",
          "sourceTable": "G37",
          "ownerOccupied": {
            "count": 6172,
            "percentage": 60.3,
            "components": {
              "ownedOutright": 3081,
              "ownedWithMortgage": 3091
            },
            "sourceCells": [
              "G14",
              "G16"
            ]
          },
          "renting": {
            "count": 3838,
            "percentage": 37.5,
            "sourceCells": [
              "G25"
            ],
            "notes": "G37 rented total excludes dwellings occupied rent-free; those are included in other tenure."
          },
          "otherTenure": {
            "count": 133,
            "percentage": 1.3,
            "sourceCells": [
              "G27"
            ]
          },
          "notStated": {
            "count": 97,
            "percentage": 0.9,
            "sourceCells": [
              "G29"
            ]
          },
          "denominatorCell": "G31"
        },
        "overseasBornPopulation": {
          "count": 6167,
          "denominator": 25276,
          "percentage": 24.4,
          "numeratorLabel": "Persons born outside Australia",
          "denominatorLabel": "Total persons",
          "sourceTable": "G01",
          "sourceCells": {
            "numerator": [
              "D44"
            ],
            "denominator": "D17"
          },
          "basis": "Place of usual residence",
          "notes": "The G01 'Elsewhere' numerator includes inadequately described birthplaces and people at sea, and excludes birthplace not stated. The denominator is all persons."
        },
        "topOverseasCountriesOfBirth": [
          {
            "name": "England",
            "count": 961,
            "denominator": 25276,
            "percentage": 3.8,
            "sourceTable": "G09c",
            "sourceCell": "K23",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greece",
            "count": 888,
            "denominator": 25276,
            "percentage": 3.5,
            "sourceTable": "G09c",
            "sourceCell": "K27",
            "basis": "Place of usual residence"
          },
          {
            "name": "New Zealand",
            "count": 569,
            "denominator": 25276,
            "percentage": 2.3,
            "sourceTable": "G09c",
            "sourceCell": "K44",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italy",
            "count": 455,
            "denominator": 25276,
            "percentage": 1.8,
            "sourceTable": "G09c",
            "sourceCell": "K34",
            "basis": "Place of usual residence"
          },
          {
            "name": "United States of America",
            "count": 258,
            "denominator": 25276,
            "percentage": 1.0,
            "sourceTable": "G09c",
            "sourceCell": "K58",
            "basis": "Place of usual residence"
          }
        ],
        "topLanguagesSpokenAtHome": [
          {
            "name": "English only",
            "count": 19519,
            "denominator": 25276,
            "percentage": 77.2,
            "sourceTable": "G13c",
            "sourceCell": "G12",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greek",
            "count": 1640,
            "denominator": 25276,
            "percentage": 6.5,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italian",
            "count": 691,
            "denominator": 25276,
            "percentage": 2.7,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 246,
            "denominator": 25276,
            "percentage": 1.0,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Vietnamese",
            "count": 233,
            "denominator": 25276,
            "percentage": 0.9,
            "sourceTable": "G13c",
            "sourceCell": "G59",
            "basis": "Place of usual residence"
          }
        ],
        "topNonEnglishLanguagesSpokenAtHome": [
          {
            "name": "Greek",
            "count": 1640,
            "denominator": 25276,
            "percentage": 6.5,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italian",
            "count": 691,
            "denominator": 25276,
            "percentage": 2.7,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 246,
            "denominator": 25276,
            "percentage": 1.0,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Vietnamese",
            "count": 233,
            "denominator": 25276,
            "percentage": 0.9,
            "sourceTable": "G13c",
            "sourceCell": "G59",
            "basis": "Place of usual residence"
          },
          {
            "name": "Spanish",
            "count": 222,
            "denominator": 25276,
            "percentage": 0.9,
            "sourceTable": "G13c",
            "sourceCell": "G55",
            "basis": "Place of usual residence"
          }
        ],
        "religiousAffiliationSummary": [
          {
            "name": "No religion / secular or other spiritual beliefs",
            "count": 15696,
            "denominator": 25276,
            "percentage": 62.1,
            "sourceTable": "G14",
            "sourceCell": "D43",
            "basis": "Place of usual residence"
          },
          {
            "name": "Christianity",
            "count": 7319,
            "denominator": 25276,
            "percentage": 29.0,
            "sourceTable": "G14",
            "sourceCell": "D30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Buddhism",
            "count": 405,
            "denominator": 25276,
            "percentage": 1.6,
            "sourceTable": "G14",
            "sourceCell": "D9",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hinduism",
            "count": 143,
            "denominator": 25276,
            "percentage": 0.6,
            "sourceTable": "G14",
            "sourceCell": "D31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Islam",
            "count": 244,
            "denominator": 25276,
            "percentage": 1.0,
            "sourceTable": "G14",
            "sourceCell": "D32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Judaism",
            "count": 159,
            "denominator": 25276,
            "percentage": 0.6,
            "sourceTable": "G14",
            "sourceCell": "D33",
            "basis": "Place of usual residence"
          },
          {
            "name": "Other religions",
            "count": 75,
            "denominator": 25276,
            "percentage": 0.3,
            "sourceTable": "G14",
            "sourceCell": "D38",
            "basis": "Place of usual residence"
          },
          {
            "name": "Religious affiliation not stated",
            "count": 1241,
            "denominator": 25276,
            "percentage": 4.9,
            "sourceTable": "G14",
            "sourceCell": "D44",
            "basis": "Place of usual residence"
          }
        ]
      },
      "additionalHouseholdContext": {
        "cantoneseSpokenAtHome": {
          "count": 151,
          "denominator": 25276,
          "percentage": 0.6,
          "numeratorLabel": "Persons who used Cantonese at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G19"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "mandarinSpokenAtHome": {
          "count": 246,
          "denominator": 25276,
          "percentage": 1.0,
          "numeratorLabel": "Persons who used Mandarin at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G20"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "hongKongBornPopulation": {
          "count": 42,
          "denominator": 25276,
          "percentage": 0.2,
          "numeratorLabel": "Persons born in Hong Kong (SAR of China)",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K28"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        },
        "chinaBornPopulation": {
          "count": 193,
          "denominator": 25276,
          "percentage": 0.8,
          "numeratorLabel": "Persons born in China, excluding SARs and Taiwan",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K20"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        }
      }
    },
    {
      "suburb": "Albert Park",
      "geographyType": "SAL",
      "geographyCode": "SAL20018",
      "censusYear": 2021,
      "source": "Australian Bureau of Statistics",
      "retrievedAt": "2026-07-14",
      "contextOnly": true,
      "excludeFromSuburbScore": true,
      "scoreContribution": 0,
      "sourceMetadata": {
        "product": "2021 Census General Community Profile",
        "profileUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL20018",
        "downloadUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL20018/download/GCP_SAL20018.xlsx",
        "sourceWorkbook": "GCP_SAL20018.xlsx",
        "sourceWorkbookSha256": "b350b0713eef436189d57dde34e9c22622a658d51514336d6f70d08cfd958ecc",
        "geographicBoundaryEdition": "ASGS Edition 3",
        "privacyNote": "ABS applies small random adjustments to cell values. Component sums can differ slightly from published totals."
      },
      "community": {
        "totalPopulation": {
          "count": 6044,
          "sourceTable": "G01",
          "sourceCells": {
            "value": "D17"
          },
          "basis": "Place of usual residence"
        },
        "medianAge": {
          "value": 46,
          "unit": "years",
          "applicablePopulation": "Persons, excluding overseas visitors",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B13"
          },
          "basis": "Place of usual residence"
        },
        "householdsWithChildren": {
          "count": 899,
          "denominator": 2514,
          "percentage": 35.8,
          "numeratorLabel": "Occupied private dwellings whose primary family is a couple family with children or a one-parent family",
          "denominatorLabel": "Total occupied private dwellings in G42, excluding visitor-only and other non-classifiable households",
          "sourceTable": "G42",
          "sourceCells": {
            "numerator": [
              "C36",
              "D36"
            ],
            "denominator": "I36"
          },
          "basis": "Place of enumeration",
          "components": {
            "coupleFamilyWithChildren": 705,
            "oneParentFamily": 194
          },
          "notes": "For multiple-family households, G42 classifies the household using the primary family's composition."
        },
        "medianHouseholdIncome": {
          "value": 2533,
          "unit": "AUD per week",
          "applicablePopulation": "Occupied private dwellings; published ABS median household income",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B19"
          },
          "basis": "Place of enumeration"
        },
        "tenure": {
          "denominator": 2514,
          "denominatorLabel": "Total occupied private dwellings in G37, excluding visitor-only and other non-classifiable households",
          "basis": "Place of enumeration",
          "sourceTable": "G37",
          "ownerOccupied": {
            "count": 1529,
            "percentage": 60.8,
            "components": {
              "ownedOutright": 928,
              "ownedWithMortgage": 601
            },
            "sourceCells": [
              "G14",
              "G16"
            ]
          },
          "renting": {
            "count": 927,
            "percentage": 36.9,
            "sourceCells": [
              "G25"
            ],
            "notes": "G37 rented total excludes dwellings occupied rent-free; those are included in other tenure."
          },
          "otherTenure": {
            "count": 36,
            "percentage": 1.4,
            "sourceCells": [
              "G27"
            ]
          },
          "notStated": {
            "count": 23,
            "percentage": 0.9,
            "sourceCells": [
              "G29"
            ]
          },
          "denominatorCell": "G31"
        },
        "overseasBornPopulation": {
          "count": 1585,
          "denominator": 6044,
          "percentage": 26.2,
          "numeratorLabel": "Persons born outside Australia",
          "denominatorLabel": "Total persons",
          "sourceTable": "G01",
          "sourceCells": {
            "numerator": [
              "D44"
            ],
            "denominator": "D17"
          },
          "basis": "Place of usual residence",
          "notes": "The G01 'Elsewhere' numerator includes inadequately described birthplaces and people at sea, and excludes birthplace not stated. The denominator is all persons."
        },
        "topOverseasCountriesOfBirth": [
          {
            "name": "England",
            "count": 319,
            "denominator": 6044,
            "percentage": 5.3,
            "sourceTable": "G09c",
            "sourceCell": "K23",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greece",
            "count": 206,
            "denominator": 6044,
            "percentage": 3.4,
            "sourceTable": "G09c",
            "sourceCell": "K27",
            "basis": "Place of usual residence"
          },
          {
            "name": "New Zealand",
            "count": 127,
            "denominator": 6044,
            "percentage": 2.1,
            "sourceTable": "G09c",
            "sourceCell": "K44",
            "basis": "Place of usual residence"
          },
          {
            "name": "India",
            "count": 106,
            "denominator": 6044,
            "percentage": 1.8,
            "sourceTable": "G09c",
            "sourceCell": "K29",
            "basis": "Place of usual residence"
          },
          {
            "name": "United States of America",
            "count": 69,
            "denominator": 6044,
            "percentage": 1.1,
            "sourceTable": "G09c",
            "sourceCell": "K58",
            "basis": "Place of usual residence"
          }
        ],
        "topLanguagesSpokenAtHome": [
          {
            "name": "English only",
            "count": 4725,
            "denominator": 6044,
            "percentage": 78.2,
            "sourceTable": "G13c",
            "sourceCell": "G12",
            "basis": "Place of usual residence"
          },
          {
            "name": "Greek",
            "count": 444,
            "denominator": 6044,
            "percentage": 7.3,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italian",
            "count": 82,
            "denominator": 6044,
            "percentage": 1.4,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          },
          {
            "name": "French",
            "count": 73,
            "denominator": 6044,
            "percentage": 1.2,
            "sourceTable": "G13c",
            "sourceCell": "G24",
            "basis": "Place of usual residence"
          },
          {
            "name": "Vietnamese",
            "count": 42,
            "denominator": 6044,
            "percentage": 0.7,
            "sourceTable": "G13c",
            "sourceCell": "G59",
            "basis": "Place of usual residence"
          }
        ],
        "topNonEnglishLanguagesSpokenAtHome": [
          {
            "name": "Greek",
            "count": 444,
            "denominator": 6044,
            "percentage": 7.3,
            "sourceTable": "G13c",
            "sourceCell": "G26",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italian",
            "count": 82,
            "denominator": 6044,
            "percentage": 1.4,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          },
          {
            "name": "French",
            "count": 73,
            "denominator": 6044,
            "percentage": 1.2,
            "sourceTable": "G13c",
            "sourceCell": "G24",
            "basis": "Place of usual residence"
          },
          {
            "name": "Vietnamese",
            "count": 42,
            "denominator": 6044,
            "percentage": 0.7,
            "sourceTable": "G13c",
            "sourceCell": "G59",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hindi",
            "count": 40,
            "denominator": 6044,
            "percentage": 0.7,
            "sourceTable": "G13c",
            "sourceCell": "G30",
            "basis": "Place of usual residence"
          }
        ],
        "religiousAffiliationSummary": [
          {
            "name": "No religion / secular or other spiritual beliefs",
            "count": 2836,
            "denominator": 6044,
            "percentage": 46.9,
            "sourceTable": "G14",
            "sourceCell": "D43",
            "basis": "Place of usual residence"
          },
          {
            "name": "Christianity",
            "count": 2605,
            "denominator": 6044,
            "percentage": 43.1,
            "sourceTable": "G14",
            "sourceCell": "D30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Buddhism",
            "count": 76,
            "denominator": 6044,
            "percentage": 1.3,
            "sourceTable": "G14",
            "sourceCell": "D9",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hinduism",
            "count": 143,
            "denominator": 6044,
            "percentage": 2.4,
            "sourceTable": "G14",
            "sourceCell": "D31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Islam",
            "count": 25,
            "denominator": 6044,
            "percentage": 0.4,
            "sourceTable": "G14",
            "sourceCell": "D32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Judaism",
            "count": 39,
            "denominator": 6044,
            "percentage": 0.6,
            "sourceTable": "G14",
            "sourceCell": "D33",
            "basis": "Place of usual residence"
          },
          {
            "name": "Other religions",
            "count": 13,
            "denominator": 6044,
            "percentage": 0.2,
            "sourceTable": "G14",
            "sourceCell": "D38",
            "basis": "Place of usual residence"
          },
          {
            "name": "Religious affiliation not stated",
            "count": 305,
            "denominator": 6044,
            "percentage": 5.0,
            "sourceTable": "G14",
            "sourceCell": "D44",
            "basis": "Place of usual residence"
          }
        ]
      },
      "additionalHouseholdContext": {
        "cantoneseSpokenAtHome": {
          "count": 11,
          "denominator": 6044,
          "percentage": 0.2,
          "numeratorLabel": "Persons who used Cantonese at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G19"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "mandarinSpokenAtHome": {
          "count": 25,
          "denominator": 6044,
          "percentage": 0.4,
          "numeratorLabel": "Persons who used Mandarin at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G20"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "hongKongBornPopulation": {
          "count": 8,
          "denominator": 6044,
          "percentage": 0.1,
          "numeratorLabel": "Persons born in Hong Kong (SAR of China)",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K28"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        },
        "chinaBornPopulation": {
          "count": 25,
          "denominator": 6044,
          "percentage": 0.4,
          "numeratorLabel": "Persons born in China, excluding SARs and Taiwan",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K20"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        }
      }
    },
    {
      "suburb": "North Melbourne",
      "geographyType": "SAL",
      "geographyCode": "SAL21966",
      "censusYear": 2021,
      "source": "Australian Bureau of Statistics",
      "retrievedAt": "2026-07-14",
      "contextOnly": true,
      "excludeFromSuburbScore": true,
      "scoreContribution": 0,
      "sourceMetadata": {
        "product": "2021 Census General Community Profile",
        "profileUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL21966",
        "downloadUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL21966/download/GCP_SAL21966.xlsx",
        "sourceWorkbook": "GCP_SAL21966.xlsx",
        "sourceWorkbookSha256": "e797177a0531b51f27fb48c74fc7aa60e0165843e968400cd357a90c8ede845f",
        "geographicBoundaryEdition": "ASGS Edition 3",
        "privacyNote": "ABS applies small random adjustments to cell values. Component sums can differ slightly from published totals."
      },
      "community": {
        "totalPopulation": {
          "count": 14953,
          "sourceTable": "G01",
          "sourceCells": {
            "value": "D17"
          },
          "basis": "Place of usual residence"
        },
        "medianAge": {
          "value": 31,
          "unit": "years",
          "applicablePopulation": "Persons, excluding overseas visitors",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B13"
          },
          "basis": "Place of usual residence"
        },
        "householdsWithChildren": {
          "count": 1460,
          "denominator": 6486,
          "percentage": 22.5,
          "numeratorLabel": "Occupied private dwellings whose primary family is a couple family with children or a one-parent family",
          "denominatorLabel": "Total occupied private dwellings in G42, excluding visitor-only and other non-classifiable households",
          "sourceTable": "G42",
          "sourceCells": {
            "numerator": [
              "C36",
              "D36"
            ],
            "denominator": "I36"
          },
          "basis": "Place of enumeration",
          "components": {
            "coupleFamilyWithChildren": 933,
            "oneParentFamily": 527
          },
          "notes": "For multiple-family households, G42 classifies the household using the primary family's composition."
        },
        "medianHouseholdIncome": {
          "value": 1717,
          "unit": "AUD per week",
          "applicablePopulation": "Occupied private dwellings; published ABS median household income",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B19"
          },
          "basis": "Place of enumeration"
        },
        "tenure": {
          "denominator": 6486,
          "denominatorLabel": "Total occupied private dwellings in G37, excluding visitor-only and other non-classifiable households",
          "basis": "Place of enumeration",
          "sourceTable": "G37",
          "ownerOccupied": {
            "count": 2144,
            "percentage": 33.1,
            "components": {
              "ownedOutright": 858,
              "ownedWithMortgage": 1286
            },
            "sourceCells": [
              "G14",
              "G16"
            ]
          },
          "renting": {
            "count": 4134,
            "percentage": 63.7,
            "sourceCells": [
              "G25"
            ],
            "notes": "G37 rented total excludes dwellings occupied rent-free; those are included in other tenure."
          },
          "otherTenure": {
            "count": 128,
            "percentage": 2.0,
            "sourceCells": [
              "G27"
            ]
          },
          "notStated": {
            "count": 83,
            "percentage": 1.3,
            "sourceCells": [
              "G29"
            ]
          },
          "denominatorCell": "G31"
        },
        "overseasBornPopulation": {
          "count": 6306,
          "denominator": 14953,
          "percentage": 42.2,
          "numeratorLabel": "Persons born outside Australia",
          "denominatorLabel": "Total persons",
          "sourceTable": "G01",
          "sourceCells": {
            "numerator": [
              "D44"
            ],
            "denominator": "D17"
          },
          "basis": "Place of usual residence",
          "notes": "The G01 'Elsewhere' numerator includes inadequately described birthplaces and people at sea, and excludes birthplace not stated. The denominator is all persons."
        },
        "topOverseasCountriesOfBirth": [
          {
            "name": "China (excludes SARs and Taiwan)",
            "count": 1150,
            "denominator": 14953,
            "percentage": 7.7,
            "sourceTable": "G09c",
            "sourceCell": "K20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Vietnam",
            "count": 415,
            "denominator": 14953,
            "percentage": 2.8,
            "sourceTable": "G09c",
            "sourceCell": "K59",
            "basis": "Place of usual residence"
          },
          {
            "name": "Malaysia",
            "count": 391,
            "denominator": 14953,
            "percentage": 2.6,
            "sourceTable": "G09c",
            "sourceCell": "K38",
            "basis": "Place of usual residence"
          },
          {
            "name": "India",
            "count": 387,
            "denominator": 14953,
            "percentage": 2.6,
            "sourceTable": "G09c",
            "sourceCell": "K29",
            "basis": "Place of usual residence"
          },
          {
            "name": "England",
            "count": 342,
            "denominator": 14953,
            "percentage": 2.3,
            "sourceTable": "G09c",
            "sourceCell": "K23",
            "basis": "Place of usual residence"
          }
        ],
        "topLanguagesSpokenAtHome": [
          {
            "name": "English only",
            "count": 7995,
            "denominator": 14953,
            "percentage": 53.5,
            "sourceTable": "G13c",
            "sourceCell": "G12",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 1417,
            "denominator": 14953,
            "percentage": 9.5,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Cantonese",
            "count": 535,
            "denominator": 14953,
            "percentage": 3.6,
            "sourceTable": "G13c",
            "sourceCell": "G19",
            "basis": "Place of usual residence"
          },
          {
            "name": "Vietnamese",
            "count": 465,
            "denominator": 14953,
            "percentage": 3.1,
            "sourceTable": "G13c",
            "sourceCell": "G59",
            "basis": "Place of usual residence"
          },
          {
            "name": "Arabic",
            "count": 290,
            "denominator": 14953,
            "percentage": 1.9,
            "sourceTable": "G13c",
            "sourceCell": "G16",
            "basis": "Place of usual residence"
          }
        ],
        "topNonEnglishLanguagesSpokenAtHome": [
          {
            "name": "Mandarin",
            "count": 1417,
            "denominator": 14953,
            "percentage": 9.5,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Cantonese",
            "count": 535,
            "denominator": 14953,
            "percentage": 3.6,
            "sourceTable": "G13c",
            "sourceCell": "G19",
            "basis": "Place of usual residence"
          },
          {
            "name": "Vietnamese",
            "count": 465,
            "denominator": 14953,
            "percentage": 3.1,
            "sourceTable": "G13c",
            "sourceCell": "G59",
            "basis": "Place of usual residence"
          },
          {
            "name": "Arabic",
            "count": 290,
            "denominator": 14953,
            "percentage": 1.9,
            "sourceTable": "G13c",
            "sourceCell": "G16",
            "basis": "Place of usual residence"
          },
          {
            "name": "Spanish",
            "count": 283,
            "denominator": 14953,
            "percentage": 1.9,
            "sourceTable": "G13c",
            "sourceCell": "G55",
            "basis": "Place of usual residence"
          }
        ],
        "religiousAffiliationSummary": [
          {
            "name": "No religion / secular or other spiritual beliefs",
            "count": 8042,
            "denominator": 14953,
            "percentage": 53.8,
            "sourceTable": "G14",
            "sourceCell": "D43",
            "basis": "Place of usual residence"
          },
          {
            "name": "Christianity",
            "count": 3161,
            "denominator": 14953,
            "percentage": 21.1,
            "sourceTable": "G14",
            "sourceCell": "D30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Buddhism",
            "count": 665,
            "denominator": 14953,
            "percentage": 4.4,
            "sourceTable": "G14",
            "sourceCell": "D9",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hinduism",
            "count": 373,
            "denominator": 14953,
            "percentage": 2.5,
            "sourceTable": "G14",
            "sourceCell": "D31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Islam",
            "count": 1045,
            "denominator": 14953,
            "percentage": 7.0,
            "sourceTable": "G14",
            "sourceCell": "D32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Judaism",
            "count": 45,
            "denominator": 14953,
            "percentage": 0.3,
            "sourceTable": "G14",
            "sourceCell": "D33",
            "basis": "Place of usual residence"
          },
          {
            "name": "Other religions",
            "count": 77,
            "denominator": 14953,
            "percentage": 0.5,
            "sourceTable": "G14",
            "sourceCell": "D38",
            "basis": "Place of usual residence"
          },
          {
            "name": "Religious affiliation not stated",
            "count": 1543,
            "denominator": 14953,
            "percentage": 10.3,
            "sourceTable": "G14",
            "sourceCell": "D44",
            "basis": "Place of usual residence"
          }
        ]
      },
      "additionalHouseholdContext": {
        "cantoneseSpokenAtHome": {
          "count": 535,
          "denominator": 14953,
          "percentage": 3.6,
          "numeratorLabel": "Persons who used Cantonese at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G19"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "mandarinSpokenAtHome": {
          "count": 1417,
          "denominator": 14953,
          "percentage": 9.5,
          "numeratorLabel": "Persons who used Mandarin at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G20"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "hongKongBornPopulation": {
          "count": 137,
          "denominator": 14953,
          "percentage": 0.9,
          "numeratorLabel": "Persons born in Hong Kong (SAR of China)",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K28"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        },
        "chinaBornPopulation": {
          "count": 1150,
          "denominator": 14953,
          "percentage": 7.7,
          "numeratorLabel": "Persons born in China, excluding SARs and Taiwan",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K20"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        }
      }
    },
    {
      "suburb": "Sunbury",
      "geographyType": "SAL",
      "geographyCode": "SAL22391",
      "censusYear": 2021,
      "source": "Australian Bureau of Statistics",
      "retrievedAt": "2026-07-14",
      "contextOnly": true,
      "excludeFromSuburbScore": true,
      "scoreContribution": 0,
      "sourceMetadata": {
        "product": "2021 Census General Community Profile",
        "profileUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL22391",
        "downloadUrl": "https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL22391/download/GCP_SAL22391.xlsx",
        "sourceWorkbook": "GCP_SAL22391.xlsx",
        "sourceWorkbookSha256": "5d5c64625661e7f30204c7c96bfc8d91b342e0dfa7eda028731d1a1390d6b1d1",
        "geographicBoundaryEdition": "ASGS Edition 3",
        "privacyNote": "ABS applies small random adjustments to cell values. Component sums can differ slightly from published totals."
      },
      "community": {
        "totalPopulation": {
          "count": 38851,
          "sourceTable": "G01",
          "sourceCells": {
            "value": "D17"
          },
          "basis": "Place of usual residence"
        },
        "medianAge": {
          "value": 38,
          "unit": "years",
          "applicablePopulation": "Persons, excluding overseas visitors",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B13"
          },
          "basis": "Place of usual residence"
        },
        "householdsWithChildren": {
          "count": 6945,
          "denominator": 14118,
          "percentage": 49.2,
          "numeratorLabel": "Occupied private dwellings whose primary family is a couple family with children or a one-parent family",
          "denominatorLabel": "Total occupied private dwellings in G42, excluding visitor-only and other non-classifiable households",
          "sourceTable": "G42",
          "sourceCells": {
            "numerator": [
              "C36",
              "D36"
            ],
            "denominator": "I36"
          },
          "basis": "Place of enumeration",
          "components": {
            "coupleFamilyWithChildren": 5130,
            "oneParentFamily": 1815
          },
          "notes": "For multiple-family households, G42 classifies the household using the primary family's composition."
        },
        "medianHouseholdIncome": {
          "value": 1925,
          "unit": "AUD per week",
          "applicablePopulation": "Occupied private dwellings; published ABS median household income",
          "sourceTable": "G02",
          "sourceCells": {
            "value": "B19"
          },
          "basis": "Place of enumeration"
        },
        "tenure": {
          "denominator": 14118,
          "denominatorLabel": "Total occupied private dwellings in G37, excluding visitor-only and other non-classifiable households",
          "basis": "Place of enumeration",
          "sourceTable": "G37",
          "ownerOccupied": {
            "count": 10954,
            "percentage": 77.6,
            "components": {
              "ownedOutright": 4342,
              "ownedWithMortgage": 6612
            },
            "sourceCells": [
              "G14",
              "G16"
            ]
          },
          "renting": {
            "count": 2885,
            "percentage": 20.4,
            "sourceCells": [
              "G25"
            ],
            "notes": "G37 rented total excludes dwellings occupied rent-free; those are included in other tenure."
          },
          "otherTenure": {
            "count": 124,
            "percentage": 0.9,
            "sourceCells": [
              "G27"
            ]
          },
          "notStated": {
            "count": 152,
            "percentage": 1.1,
            "sourceCells": [
              "G29"
            ]
          },
          "denominatorCell": "G31"
        },
        "overseasBornPopulation": {
          "count": 6570,
          "denominator": 38851,
          "percentage": 16.9,
          "numeratorLabel": "Persons born outside Australia",
          "denominatorLabel": "Total persons",
          "sourceTable": "G01",
          "sourceCells": {
            "numerator": [
              "D44"
            ],
            "denominator": "D17"
          },
          "basis": "Place of usual residence",
          "notes": "The G01 'Elsewhere' numerator includes inadequately described birthplaces and people at sea, and excludes birthplace not stated. The denominator is all persons."
        },
        "topOverseasCountriesOfBirth": [
          {
            "name": "England",
            "count": 1340,
            "denominator": 38851,
            "percentage": 3.4,
            "sourceTable": "G09c",
            "sourceCell": "K23",
            "basis": "Place of usual residence"
          },
          {
            "name": "India",
            "count": 671,
            "denominator": 38851,
            "percentage": 1.7,
            "sourceTable": "G09c",
            "sourceCell": "K29",
            "basis": "Place of usual residence"
          },
          {
            "name": "New Zealand",
            "count": 647,
            "denominator": 38851,
            "percentage": 1.7,
            "sourceTable": "G09c",
            "sourceCell": "K44",
            "basis": "Place of usual residence"
          },
          {
            "name": "Philippines",
            "count": 334,
            "denominator": 38851,
            "percentage": 0.9,
            "sourceTable": "G09c",
            "sourceCell": "K48",
            "basis": "Place of usual residence"
          },
          {
            "name": "Scotland",
            "count": 231,
            "denominator": 38851,
            "percentage": 0.6,
            "sourceTable": "G09c",
            "sourceCell": "K51",
            "basis": "Place of usual residence"
          }
        ],
        "topLanguagesSpokenAtHome": [
          {
            "name": "English only",
            "count": 33649,
            "denominator": 38851,
            "percentage": 86.6,
            "sourceTable": "G13c",
            "sourceCell": "G12",
            "basis": "Place of usual residence"
          },
          {
            "name": "Italian",
            "count": 353,
            "denominator": 38851,
            "percentage": 0.9,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          },
          {
            "name": "Punjabi",
            "count": 318,
            "denominator": 38851,
            "percentage": 0.8,
            "sourceTable": "G13c",
            "sourceCell": "G32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 195,
            "denominator": 38851,
            "percentage": 0.5,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hindi",
            "count": 178,
            "denominator": 38851,
            "percentage": 0.5,
            "sourceTable": "G13c",
            "sourceCell": "G30",
            "basis": "Place of usual residence"
          }
        ],
        "topNonEnglishLanguagesSpokenAtHome": [
          {
            "name": "Italian",
            "count": 353,
            "denominator": 38851,
            "percentage": 0.9,
            "sourceTable": "G13c",
            "sourceCell": "G37",
            "basis": "Place of usual residence"
          },
          {
            "name": "Punjabi",
            "count": 318,
            "denominator": 38851,
            "percentage": 0.8,
            "sourceTable": "G13c",
            "sourceCell": "G32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Mandarin",
            "count": 195,
            "denominator": 38851,
            "percentage": 0.5,
            "sourceTable": "G13c",
            "sourceCell": "G20",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hindi",
            "count": 178,
            "denominator": 38851,
            "percentage": 0.5,
            "sourceTable": "G13c",
            "sourceCell": "G30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Tagalog",
            "count": 160,
            "denominator": 38851,
            "percentage": 0.4,
            "sourceTable": "G13c",
            "sourceCell": "G52",
            "basis": "Place of usual residence"
          }
        ],
        "religiousAffiliationSummary": [
          {
            "name": "No religion / secular or other spiritual beliefs",
            "count": 16571,
            "denominator": 38851,
            "percentage": 42.7,
            "sourceTable": "G14",
            "sourceCell": "D43",
            "basis": "Place of usual residence"
          },
          {
            "name": "Christianity",
            "count": 18651,
            "denominator": 38851,
            "percentage": 48.0,
            "sourceTable": "G14",
            "sourceCell": "D30",
            "basis": "Place of usual residence"
          },
          {
            "name": "Buddhism",
            "count": 399,
            "denominator": 38851,
            "percentage": 1.0,
            "sourceTable": "G14",
            "sourceCell": "D9",
            "basis": "Place of usual residence"
          },
          {
            "name": "Hinduism",
            "count": 410,
            "denominator": 38851,
            "percentage": 1.1,
            "sourceTable": "G14",
            "sourceCell": "D31",
            "basis": "Place of usual residence"
          },
          {
            "name": "Islam",
            "count": 314,
            "denominator": 38851,
            "percentage": 0.8,
            "sourceTable": "G14",
            "sourceCell": "D32",
            "basis": "Place of usual residence"
          },
          {
            "name": "Judaism",
            "count": 44,
            "denominator": 38851,
            "percentage": 0.1,
            "sourceTable": "G14",
            "sourceCell": "D33",
            "basis": "Place of usual residence"
          },
          {
            "name": "Other religions",
            "count": 375,
            "denominator": 38851,
            "percentage": 1.0,
            "sourceTable": "G14",
            "sourceCell": "D38",
            "basis": "Place of usual residence"
          },
          {
            "name": "Religious affiliation not stated",
            "count": 2092,
            "denominator": 38851,
            "percentage": 5.4,
            "sourceTable": "G14",
            "sourceCell": "D44",
            "basis": "Place of usual residence"
          }
        ]
      },
      "additionalHouseholdContext": {
        "cantoneseSpokenAtHome": {
          "count": 71,
          "denominator": 38851,
          "percentage": 0.2,
          "numeratorLabel": "Persons who used Cantonese at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G19"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "mandarinSpokenAtHome": {
          "count": 195,
          "denominator": 38851,
          "percentage": 0.5,
          "numeratorLabel": "Persons who used Mandarin at home",
          "denominatorLabel": "All persons in G13, including language/proficiency not stated",
          "sourceTable": "G13c",
          "sourceCells": {
            "numerator": [
              "G20"
            ],
            "denominator": "G65"
          },
          "basis": "Place of usual residence"
        },
        "hongKongBornPopulation": {
          "count": 35,
          "denominator": 38851,
          "percentage": 0.1,
          "numeratorLabel": "Persons born in Hong Kong (SAR of China)",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K28"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        },
        "chinaBornPopulation": {
          "count": 134,
          "denominator": 38851,
          "percentage": 0.3,
          "numeratorLabel": "Persons born in China, excluding SARs and Taiwan",
          "denominatorLabel": "All persons in G09, including country of birth not stated",
          "sourceTable": "G09c",
          "sourceCells": {
            "numerator": [
              "K20"
            ],
            "denominator": "K65"
          },
          "basis": "Place of usual residence"
        }
      }
    }
  ]
} as const;

export type DwellingCommunityContextRecord =
  (typeof DWELLING_COMMUNITY_CONTEXT.records)[number];

export const DWELLING_COMMUNITY_CONTEXT_BY_SUBURB = Object.fromEntries(
  DWELLING_COMMUNITY_CONTEXT.records.map((record) => [record.suburb, record]),
) as Record<string, DwellingCommunityContextRecord>;
