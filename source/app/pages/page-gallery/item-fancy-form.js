import React from 'react';
import { FancyInput, FancyInputNumber, FancySelect } from 'fancy-form'

const FancyFormContainer = React.createClass({
  render(){
    return <div className='occupy center-children'>
    <div>
      <FancySelect valueKey={'currency'} invalidProtocol='keep' label='Currency'
                   values={[{key: 'usdcad', label: 'USDCAD'}, {key: 'eurusd', label: 'EURUSD'}, {key: 'usdjpy', label: 'USDJPY'},
                            {key: 'usdcny', label: 'USDCNY'}, {key: 'audsgd', label: 'AUDSGD'}, {key: 'gbpusd', label: 'GBPUSD'},
                            {key: 'euraud', label: 'EURUSD'}, {key: 'CNYJPY', label: 'CNYJPY'}, {key: 'usdjpy', label: 'USDJPY'}]}
                            />
      <FancyInput valueKey={'aa'} label='An Input Field' />
    </div>
    <div>
      <FancyInput valueKey={'bb'} label='Another Input Field' />
      <FancyInputNumber valueKey={'number'} label='Input Number Here'/>
    </div>
  </div>}
})

export const ItemFancyForm = {
  title: 'Fancy Form',
  boxItem: FancyFormContainer,
  description: ['Fancy Form Description'],
  bottomLine: <div>
    <a href = 'https://github.com/Iceberglet/Iceberglet.github.io/tree/master/source/modules/fancy-form'>
      <i className='fa fa-github fa-fw'/>
    </a>
  </div>
}
