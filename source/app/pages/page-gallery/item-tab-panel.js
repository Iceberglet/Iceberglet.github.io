import React from 'react';
import { FancyTabPanel, Tab } from 'fancy-tab-panel';

const TabPanel = React.createClass({

  getInitialState(){
    return {
      items: [new Tab('Intro'),
              new Tab('Tab 1'),
              new Tab('Tab 2'),
              new Tab('Tab 3')],
      selected: 1
    }
  },

  onSelectTab(id){
    this.setState({selected: id})
  },

  onAddTab(){
    this.setState(s=>{
      let tab = new Tab('New Tab')
      s.items.push(tab);
      s.selected = tab.id
      return s;
    })
  },

  onRemoveTab(id){
    this.setState(s=>{
      let deleted = s.items.findIndex(item=>item.id === id)
      s.items.splice(deleted, 1)
      if(id === s.selected){
        s.selected = s.items[s.items.length - 1].id
      }
      return s;
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
        <div>{'You Just Selected ' + this.state.items.find(item=>item.id === this.state.selected).title}</div>
      </div>)
  }
})

export const ItemTabPanel = {
  title: 'Fancy Tab Panel',
  boxItem: TabPanel,
  description: 'Fancy Tab Panel Description'
}
