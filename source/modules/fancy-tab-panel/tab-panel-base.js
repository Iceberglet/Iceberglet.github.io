import React from 'react'
import { Tab } from './tab';
import { FancyTabPanel } from './tab-panel-core'

export const TabPanelBase = React.createClass({

  getInitialState(){
    let items = [new Tab('Intro'),
            new Tab('Tab 1'),
            new Tab('Tab 2'),
            new Tab('Tab 3')]
    return {
      items, selected: items[0].id
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
        if(s.items.length > 0)
          s.selected = s.items[s.items.length - 1].id
      }
      return s;
    })
  },

  onFinishDrag(items){
    this.setState({
      items
    })
  },

  render(){
    let item = this.state.items.find(item=>item.id === this.state.selected) || {};
    return (<div>
        <FancyTabPanel onSelectTab = {this.onSelectTab}
                       onAddTab = {this.onAddTab}
                       onRemoveTab = {this.onRemoveTab}
                       onFinishDrag = {this.onFinishDrag}
                       selected = {this.state.selected}
                       items = {this.state.items}
          />
        <div>{'You Just Selected ' + item.title}</div>
      </div>)
  }
})
