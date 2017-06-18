import React from 'react';
import { FancyTabPanel } from 'fancy-tab-panel';

const TabPanel = React.createClass({

  getInitialState(){
    return {
      items: ['Intro', 'Tab 1', 'Tab 2', 'Tab 3'],
      selected: 0
    }
  },

  onSelectTab(idx){
    this.setState({selected: idx})
  },

  onAddTab(){
    this.setState(s=>{
      s.items.push('New Tab');
      s.selected = s.items.length - 1
    })
  },

  onRemoveTab(idx, title){
    this.setState(s=>{
      s.items.splice(idx, 1)
      s.selected = Math.max(s.selected, s.items.length - 1)
    })
  },

  render(){
    return (<div>
        <FancyTabPanel onSelectTab = {this.onSelectTab}
                       onAddTab = {this.onAddTab}
                       onRemoveTab = {this.onRemoveTab}
                       selected = {this.state.selected}
                       items = {this.state.items}
          />
        <div>{'You Just Selected ' + this.state.items[this.state.selected]}</div>
      </div>)
  }
})

export const ItemTabPanel = {
  title: 'Fancy Tab Panel',
  boxItem: TabPanel,
  description: 'Fancy Tab Panel Description'
}
