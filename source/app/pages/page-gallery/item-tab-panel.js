import React from 'react';
// import ReactFancyTabPanel from 'fancy-tab-panel'
import ReactFancyTabPanel from 'fancy-tab-panel'

const TabPanelExample = ReactFancyTabPanel.TabPanelExample

export const ItemTabPanel = {
  title: 'Fancy Tab Panel',
  boxItem: TabPanelExample,
  description: ['A Dynamic Tab Panel mimicking the chrome\'s design.',
    'This is just a crude version, but it has everything a tab panel can ask for:',
    '- Dynamically add and delete tabs',
    '- Drag and Drop for tab re-arrangement',
    'Does not use HTML5 DnD, but animation and SVG are still not IE8 friendly',
    'Leaves the entire freedom (Tab transition, naming, etc.) to further design'],
  bottomLine: <div>
    <a href = 'https://github.com/Iceberglet/Iceberglet.github.io/tree/master/source/modules/fancy-tab-panel'>
      <i className='fa fa-github fa-fw'/>
    </a>
  </div>
}
