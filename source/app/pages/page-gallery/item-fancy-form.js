import React from 'react';
import { FancyInput, FancyInputNumber, FancySelect } from 'fancy-form'

const FancyFormContainer = React.createClass({
  render(){
    return <div className='occupy center-children'>
    <div>
      <FancySelect valueKey={'ccy1'} invalidProtocol='keep' label='Currency'
                   values={[{key: 'usdinr', label: 'USDINR'}, {key: 'eurusd', label: 'EURUSD'}, {key: 'usdjpy', label: 'USDJPY'},
                            {key: 'usdcny', label: 'USDCNY'}, {key: 'audsgd', label: 'AUDSGD'}, {key: 'gbpusd', label: 'GBPUSD'},
                            {key: 'INREUR', label: 'INREUR'}, {key: 'CNYJPY', label: 'CNYJPY'}, {key: 'usdjpy', label: 'USDJPY'}]}
                            />
      <FancyInput valueKey={'cpty'} label='Counterparty' />
    </div>
    <div>
      <FancyInput valueKey={'risk'} label='Risk Analysis' />
      <FancyInputNumber valueKey={'number'} label='Number'/>
    </div>
  </div>}
})

export const ItemFancyForm = {
  title: 'Fancy Form',
  boxItem: FancyFormContainer,
  description: ['Fancy Form Description']
}
