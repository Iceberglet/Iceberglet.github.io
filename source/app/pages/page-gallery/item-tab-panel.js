import React from 'react';
import { FancyTabPanel } from 'fancy-tab-panel';

const TabPanel = React.createClass({

  getInitialState(){
    return {
      items: [{id: 1, content: 'Intro'},
              {id: 2, content: 'Tab 1'},
              {id: 3, content: 'Tab 2'},
              {id: 4, content: 'Tab 3'}],
      selected: 1,
      idCounter: 5
    }
  },

  onSelectTab(id){
    this.setState({selected: id})
  },

  onAddTab(){
    this.setState(s=>{
      s.items.push({id: s.idCounter, content: 'New Tab'});
      s.selected = s.idCounter
      s.idCounter += 1
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
        <div>{'You Just Selected ' + this.state.items.find(item=>item.id === this.state.selected).content}</div>
      </div>)
  }
})

export const ItemTabPanel = {
  title: 'Fancy Tab Panel',
  boxItem: TabPanel,
  description: 'Fancy Tab Panel Description'
}
