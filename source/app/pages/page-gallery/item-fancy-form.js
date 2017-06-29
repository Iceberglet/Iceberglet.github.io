import React from 'react';
import { FancyInput, FancyInputNumber, FancySelect, FancyCheckBoxes } from 'fancy-form'

const FancyFormContainer = React.createClass({
  render(){
    return <div className='fill center-children' style={{height: '300px'}}>
    <div>
      <FancySelect valueKey={'currency'} invalidProtocol='keep' label='Currency'
                   values={[{key: 'usdcad', label: 'USDCAD'}, {key: 'eurusd', label: 'EURUSD'}, {key: 'usdjpy', label: 'USDJPY'},
                            {key: 'usdcny', label: 'USDCNY'}, {key: 'audsgd', label: 'AUDSGD'}, {key: 'gbpusd', label: 'GBPUSD'},
                            {key: 'euraud', label: 'EURUSD'}, {key: 'CNYJPY', label: 'CNYJPY'}, {key: 'usdjpy', label: 'USDJPY'}]}
                            />
      <FancyInput valueKey={'aa'} label='An Input Field' />
      <FancyCheckBoxes isMultiple={true} valueKey={'CheckBox'} values={[{key: 'check-me', value: 'Check Us!'}, {key: 'check-me2', value: 'Me As Well!'}]}/>
    </div>
    <div>
      <FancyInput valueKey={'bb'} label='Another Input Field' />
      <FancyInputNumber valueKey={'number'} label='Input Number Here'/>
      <FancyCheckBoxes valueKey={'CheckBox2'} label={'A Label'} values={[{key: 'check-me', value: 'Check Me!'}, {key: 'check-me2', value: 'No, Check Me!'}]}/>
    </div>
  </div>}
})

export const ItemFancyForm = {
  title: 'Fancy Form',
  boxItem: FancyFormContainer,
  description: ['A fancy yet elegant solution for form inputs',
      'Nothing much to say, since you can see it yourself',
      'See Github link below for API References'
    ],
  bottomLine: <div>
    <a href = 'https://github.com/Iceberglet/Iceberglet.github.io/tree/master/source/modules/fancy-form'>
      <i className='fa fa-github fa-fw'/>
    </a>
  </div>
}
