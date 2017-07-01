import React from 'react'
import { TabPanelBase } from './tab-panel-base'
import { Tab } from './tab'

export const TabPanelExample = React.createClass({
  render(){
    return <TabPanelBase items = { [new Tab('Intro'),
            new Tab('Tab 1'),
            new Tab('Tab 2'),
            new Tab('Tab 3')]} />
  }
})
