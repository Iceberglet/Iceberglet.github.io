import React from 'react'
import PropTypes from 'prop-types'
import AnimatedTabs from 'animated-tabs'
import {load} from 'image-loader'

const ANIMATION_TIME = 500;

// import './index.scss'

//contentList: [{title, content}]
const fabricateLeaf = (contentList)=>{
  return <div className='occupy leaf'>
    <div className='leaf-content'>
      {contentList.map(c=>{
          return <div className='leaf-item' key={c.title}>
            <div className='item-title'>{c.title}</div>
            <div className='item-content'>{c.content}</div>
          </div>
      })}
    </div>
  </div>
}

const Tabs = [
  {
    icon: 'resources/icon-work/odoo.png',
    content: fabricateLeaf(
      [{
        title: 'Company Name',
        content: 'Elico Corp'
      }, {
        title: 'Company Intro',
        content: 'An ERP solution provider catering to SMEs'
      }, {
        title: 'Title',
        content: 'Software Engineer Intern'
      }, {
        title: 'Duration',
        content: 'July - Oct, 2015'
      }, {
        title: 'Tech Stacks',
        content: 'Python, Javascript'
      }, {
        title: 'Role and Responsibilities',
        content: 'As an intern in the company\'s new Singapore branch, I was responsible for the development of customized modules ' +
                  'of Odoo for its Singaporean clients. The technical part of the job revolves primarily around writing installable ' +
                  'modules and plugins, as well as system-level modifications on the out-of-box Odoo product in order to suit the ' +
                  'clients\'s needs. The Odoo API is primarily Python script and XML based. The former governs the internal logic ' +
                  'as well as data structure, and the latter controls UI and Modular hierarchy.'
      }]
    )
  },
  {
    icon: 'resources/icon-work/fm.png',
    content: fabricateLeaf(
      [{
        title: 'Company Name',
        content: 'FinMechanics'
      }, {
        title: 'Company Intro',
        content: 'A Technology-driven Fintech Startup focused on providing consultation services and financial solutions for Banks and other financial institution'
      }, {
        title: 'Title',
        content: 'Associate Consultant'
      }, {
        title: 'Duration',
        content: 'Nov 2016 - Now'
      }, {
        title: 'Tech Stacks',
        content: 'JavaEE, Web Technologies, Project Management'
      }, {
        title: 'Detailed Tech Stacks',
        content: 'ReactJS, HTML5, CSS3, Hibernate, MSSQL, SpringFramework'
      }, {
        title: 'Role and Responsibilities',
        content: 'Implemented the Company\'s Flagship product FMConnect as part of the small team. Designed the forex margin trading ' +
                  'system such that it is compatible with existing frameworks. Laid down the ground work for much of its UI overhaul. \n\n' +
                  ''
      }]
    )
  },
  {
    icon: 'resources/icon-work/anz-logo.png',
    content: fabricateLeaf(
      [{
        title: 'Company Name',
        content: 'Australia and New Zealand Banking Group, Singapore branch'
      }, {
        title: 'Company Intro',
        content: 'Commonly known as ANZ, the fourth largest bank by market capitalisation in Australia'
      }, {
        title: 'Title',
        content: 'Consultant'
      }, {
        title: 'Duration',
        content: 'Feb 2017 - Now'
      }, {
        title: 'Tech Stacks',
        content: 'JavaEE, Web Technologies, Project Management'
      }, {
        title: 'Detailed Tech Stacks',
        content: 'ReactJS, HTML5, CSS3, Hibernate, MSSQL, GWT, ApacheMQ, ApacheCamel, SpringFramework'
      }, {
        title: 'Role and Responsibilities',
        content: 'Has been part of many projects: \n\n' +
                  'Implemented the UI with ReactJS for the Cash and Liquidity Management Software. \n\n'+
                  'Took over the China STP project on short notice to salvage the implementation gap. \n\n'+
                  'Implemented the UI for the bank\'s Trade Reconciliation System to accommodate extra '+
                  'reconciliation paths. Designed and wrote the universal static data management as well '+
                  'as adaptation for Murex\'s package trade reconciliations.'
      }]
    )
  }
]

load(Tabs.map(t=>t.icon))

export default class WorkExp extends React.Component {
  static propTypes = {
    status: PropTypes.string,
    contentKey: PropTypes.string
  }

  render(){
    return <AnimatedTabs {...this.props} tabs={Tabs}/>
  }
}
