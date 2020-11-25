export const accountCharts = { CREATE: 'CREATE', DEFAULT: 'DEFAULT', IMPORT: 'IMPORT' }

export const accountMethods = { ACCURAL: 'ACCURAL', CASH: 'CASH' }

export const calculationBases = [
  { value: 'MONTHLY', label: 'Monthly' },
  { value: 'QUARTERLY', label: 'Quarterly' }
]

export const methods = [
  { value: 'STRAIGHT_LINE', label: 'Straight Line' },
  { value: 'UNIT_OF_PRODUCTION', label: 'Unit of Production' },
  { value: 'SUM_OF_THE_YEAR_DIGIT', label: 'Sum of the year Digit' },
  { value: 'DOUBLE_DECLINING', label: 'Double Declining' },
  { value: 'REDUCING_BALANCE', label: 'Reducing Balance' }
]

export const assetClasses = [
  { label: 'Tangible', value: 'TANGIBLE' },
  { label: 'Intangible', value: 'INTANGIBLE' },
];

export const defaultCurrencies = [
  { code: "NGN", description: "Naira", name: "Naira", symbol: "₦" },
  { code: "USD", description: "US Dollar", name: "Dollar", symbol: "$" },
  { code: "GBP", description: "Pound Sterling", name: "Pounds", symbol: "£" },
];