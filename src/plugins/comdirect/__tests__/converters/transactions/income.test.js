import { convertTransaction } from '../../../converters'

describe('convertTransaction', () => {
  it.each([
    [
      {
        reference: 'B6ED87AD442877BB/3',
        bookingStatus: 'BOOKED',
        bookingDate: '2020-04-28',
        amount: {
          value: '0.05',
          unit: 'EUR'
        },
        remitter: null,
        deptor: null,
        creditor: null,
        valutaDate: '2020-04-29',
        directDebitCreditorId: null,
        directDebitMandateId: null,
        endToEndReference: null,
        newTransaction: false,
        remittanceInfo: '01ERTRAEGNISGUTSCHRIFT VOM 27.04.20  02DEPOTBESTAND:                 83   03GIERIGER KATER AG DL -,06          04899960             USD 0,01        05Abr.Betrag Brutto 0,06 EUR         06Steuerabzug 0,01- EUR              ',
        transactionType: {
          key: 'INTEREST_DIVIDENDS',
          text: 'Interest / Dividends'
        }
      },
      {
        hold: true,
        date: new Date('2020-04-28'),
        movements: [
          {
            id: 'B6ED87AD442877BB/3',
            account: { id: 'account' },
            invoice: null,
            sum: 0.05,
            fee: 0
          }
        ],
        merchant: null,
        comment: '[Interest / Dividends] ERTRAEGNISGUTSCHRIFT VOM 27.04.20 | DEPOTBESTAND: | 83 | GIERIGER KATER AG DL -,06 | 899960 | USD 0,01 | Abr.Betrag Brutto 0,06 EUR | Steuerabzug 0,01- EUR'
      }
    ]
  ])('should convert an Interest / Dividends transaction', (apiTransaction, transaction) => {
    expect(convertTransaction(apiTransaction, { id: 'account', instrument: 'EUR' })).toEqual(transaction)
  })
})