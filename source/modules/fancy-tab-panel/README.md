Fancy Tab Panel
==============================================

- **Installations:**
  - Install via NPM:  
  `npm install react-fancy-tab-panel`
  - Sample Program:  
  ```javascript
    import ReactFancyTabPanel from 'react-fancy-tab-panel'
    const TabPanelExample = ReactFancyTabPanel.TabPanelExample
    ...
      render(){
        return <TabPanelExample />
      }
    ...
  ```
  - Dependencies:  
    - Webpack, Sass loaders
    - React, React-Measure, etc. (installed by npm)

- **Demo:**  
  See https://iceberglet.github.io/ under page "Gallery->Fancy Tab Panel"

- **Basic Idea:**   
  - The `TabPanelCore` is designed to be **behaviour-agnostic**. That is to say, it hooks the user action to callbacks provided, and processes tabs mutations uniquely from change of props. E.g. when user clicks *add tab* button, the tab panel will simply call the `onAddTab` function and does nothing else. Therefore the behaviour is left completely open to the higher level. (e.g. one may initiate a dialogue in this callback to ask for the new tab name, then add the tab by modifying the `items` prop of the tab panel)
  - To Use a TabPanel, either use a `TabPanelBase` or modify it to suit your needs. Specifically, you need to consider the behaviours you need. (See below the relevant props to understand which props are relevant and how they are supposed to work)
  - If a callback is optional, and not provided, tab panel will assume that you forbid such action. (e.g. not providing `onAddTab` will prevent the add tab button from showing up)  

- **TabPanelCore Props:**   

  Property Name | Value needed | Is Required | Default | Note
  ------------- | ------------ | ----------- | ------- | ----
  items         | an array of `Tab` objects that are expected to be shown | yes | `undefined` | the order of items is the order of the tabs
  selected      | the `id` of the item selected. | yes | `undefined` | It is **YOUR** responsibility to make sure the `items` do contain a tab with such ID!
  onSelectTab   | a function that takes in the `id` of the tab, which can then mutate the state | no | `undefined` | here you can mutate `selected` to update the tabs
  onAddTab      | a function hooked when user clicks on the button to add a tab. | no | `undefined` | see **Basic Idea** on its logic
  onRemoveTab   | a function hooked when user removes a tab. takes in the `id` of the tab | no | `undefined` | see **Basic Idea** on its logic
  onFinishDrag  | a function hooked when user finishes dragging. takes in the array of tabs of the new order | yes | `undefined` | user is advised to update the newly ordered array of tabs, since tab-panel does not do anything
  allowRemoveAll | a boolean to tell if user can remove all tabs | no | `false` | if `onRemoveTab` is not given, then this bool is moot.
  allowDnD      | a boolean to tell if user can drag and drop to re-arrange tabs | no | `true` | setting this to false will make `onFinishDrag` moot.

- **API Example:**   
(Base Usage, same as in `tab-panel-base.js`)  
NOTE: User can extend this React class or implement a modified version as a functional wrapper
```javascript
  import React from 'react'
  import { Tab } from './tab';
  import { TabPanelCore } from './tab-panel-core'

  export const TabPanelBase = React.createClass({

    propTypes: {
      items: React.PropTypes.array.isRequired
    },

    getInitialState(){
      let items = this.props.items
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
          <TabPanelCore onSelectTab = {this.onSelectTab}
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
```
