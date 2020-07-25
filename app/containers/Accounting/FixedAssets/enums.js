
export const AccountChart = {
        CREATE: 'CREATE',
        DEFAULT: 'DEFAULT',
        IMPORT: 'IMPORT',
}

export const AccountMethod ={
        ACCURAL: 'ACCURAL',
        CASH: 'CASH'
}

export const DepreciationCalculationBase =
    [
        {
          value:'MONTHLY',
          label:'Monthly'      
        },
        {
         value:'QUARTERLY',
         label:'Quarterly'      
         }
        ]

        export const AssetMeasurement =[
          {
            value: 'CM',
            label: 'CM',
          },
          {
            value: 'MM',
            label: 'MM',
          },
          {
            value: 'KM',
            label: 'KM',
          },
          {
            value: 'M',
            label: 'M',
          }
        ]

        export const AssetStatus =
        [
          {
            value: 'GOOD',
            label: 'Good',
          },
          {
            value: 'BAD',
            label: 'Bad',
          },
          {
            value: 'INMAINTAINANCE',
            label: 'In Maintainance',
          },
          {
            value: 'LOST',
            label: 'lost',
          }
            ]        

export const DeprecitionMethod =
[     {
      value:'STRAIGHT_LINE',
      label:'Straight Line'
      },
      {
        value:'UNIT_OF_PRODUCTION',
        label:'Unit of Production'
        },
        {
        value:'SUM_OF_THE_YEAR_DIGIT',
         label:'Sum of the year Digit'
        },
        {
         value:'DOUBLE_DECLINING',
        label:'Double Declining'
         },
         {
          value:'REDUCING_BALANCE',
          label:'Reducing Balance'
        }
      ]
 