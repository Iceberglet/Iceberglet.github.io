Fancy Form Elements
==============================================

API Example:
------------
```jsx
<FancySelect valueKey={'ccy1'} invalidProtocol='keep' label='Currency'
             values={[{key: 'usdinr', label: 'USDINR'}, {key: 'eurusd', label: 'EURUSD'}, {key: 'usdjpy', label: 'USDJPY'},
                      {key: 'usdcny', label: 'USDCNY'}, {key: 'audsgd', label: 'AUDSGD'}, {key: 'gbpusd', label: 'GBPUSD'},
                      {key: 'INREUR', label: 'INREUR'}, {key: 'CNYJPY', label: 'CNYJPY'}, {key: 'usdjpy', label: 'USDJPY'}]}
                      />
<FancyInput valueKey={'cpty'} label='Counterparty' />
<FancyInput valueKey={'risk'} label='Risk Analysis' />
<FancyInputNumber valueKey={'number'} label='Number'/>
<FancyCheckBoxes isMultiple={true} valueKey={'CheckBox'} values={[{key: 'check-me', value: 'Check Us!'}, {key: 'check-me2', value: 'Me As Well!'}]}/>
```

1. Using props `onConfirmChange`, the updated value will be passed into the `onConfirmChange`, together with `valueKey` to facilitate form processing.
  e.g.
  ```javascript
  onConfirmChange: function({valueKey, value}){
    //process valueKey and value pair
  }
  ```

2. For **FancySelect**, the value is `{key: label:}` object that is part of props values array
  In case of invalid choices, the value can be undefined, an empty string, previous good value, or raw input value, depending on the `invalidProtocol` passed (`'keep'`, `'discard'` or `'empty'`)

3. For **FancyCheckBoxes**, you can set its behaviour through props such as `isMultiple`, `isEnabled`, `forceSelection`.

4. `onConfirmChange` is called when
  (For **FancyInput**, it is called when input value is CHANGED)
  (For **FancySelect**, it is called when user - 1.Click on a value to select it. 2.Remove focus. 3.Press enter )
