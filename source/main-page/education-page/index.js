import React from 'react'
import PropTypes from 'prop-types'
import AnimatedTabs from 'animated-tabs'

import './index.scss'

const ANIMATION_TIME = 500;

//contentList: [{title, content}]
const fabricateLeaf = ({contentList, imgUrl})=>{
  return <div className='occupy leaf'>
    <div className='leaf-content'>
      {contentList.map(c=>{
          return <div className='leaf-item' key={c.title}>
            <div className='item-title'>{c.title}</div>
            <div className='item-content'>{c.content}</div>
          </div>
      })}
    </div>
    <div className='leaf-image'>
      <div>
        <img src={imgUrl} />
      </div>
    </div>
  </div>
}

const Tabs = [
  {
    icon: 'resources/icon-school/changsha_yizhong.jpg',
    content: fabricateLeaf({
      imgUrl: 'resources/icon-school/image_yizhong.jpg',
      contentList: [{
        title: 'School Name',
        content: 'First Middle School of Changsha'
      }, {
        title: 'Location',
        content: 'Changsha, Hunan, China'
      }, {
        title: 'My Years Here',
        content: '2003 - 2006'
      }, {
        title: 'My Life Here',
        content: 'Has been memerable. As the alma-mater of Mao Tse-Tung, it is the best high school you can find in my hometown. \n\n' +
                  'While time has wiped away much of the coursework from my memory, I can still vividly recall the excitement upon ' +
                  'hearing the bell-rings (of the end of class, of course), the lunch rush-hour, and the smell of newly borrowed ' +
                  'novels from the school library (as shown to the right). In the years when computers and internet have not taken ' +
                  'over my life, time was best spent savouring the stories recounted by Hugo, Tolstoy, or Dumas.'
      }]
    })
  },
  {
    icon: 'resources/icon-school/Maris_Stella_High_School_Crest.png',
    content: fabricateLeaf({
      imgUrl: 'resources/icon-school/image_marist.jpg',
      contentList: [{
        title: 'School Name',
        content: 'Maris Stella High School'
      }, {
        title: 'Location',
        content: 'Singapore'
      }, {
        title: 'My Years Here',
        content: '2006 - 2009'
      }, {
        title: 'My Life Here',
        content: 'I can no longer remember the emotions leading up to my decision to leave my family and my hometown, at the age of 15, ' +
                  'to a foreign country for high school education. Perhaps I was bored and wished for some adventure, or maybe I wanted ' +
                  'to have a look around the world, and this was my very first chance. \n\nIn short, I took the Singapore\'s government ' +
                  'scholarship, and started the 4-year program, of which I spent 2 years here. Luckily for me, I survived the cultural, ' +
                  'climatical and environmental transitions, which proved to be too abrupt and drastic for some of my comrades. I am ' +
                  'grateful for the hurdles and difficulties and the helps from friends as well as teacher, which in part pushed me towards ' +
                  'what I am now, during a crucial period of my formative times.'
      }]
    })
  },
  {
    icon: 'resources/icon-school/Raffles Institution.png',
    content: fabricateLeaf({
      imgUrl: 'resources/icon-school/image_ri.jpg',
      contentList: [{
        title: 'School Name',
        content: 'Raffles Institution (Junior College)'
      }, {
        title: 'Location',
        content: 'Singapore'
      }, {
        title: 'My Years Here',
        content: '2009 - 2011'
      }, {
        title: 'My Life Here',
        content: 'has been absolutely euphoric. After the drudgery of GCE O-Level, I was ecstatic to be welcomed by the knowledgeable ' +
                  'teachers and a myriad of activities that I could join. Being the pinnacle of Singaporean secondary education, RI offered ' +
                  'me even greater outlooks and visions into the world, and allowed me to meet the friends of a lifetime.'
      }]
    })
  },
  {
    icon: 'resources/icon-school/nus_logo.png',
    content: fabricateLeaf({
      imgUrl: 'resources/icon-school/image_nus.jpg',
      contentList: [{
        title: 'University Name',
        content: 'National University of Singapore'
      }, {
        title: 'Location',
        content: 'Singapore'
      }, {
        title: 'My Years Here',
        content: '2011 - 2013, 2015 - 2016'
      }, {
        title: 'My Life Here',
        content: 'I joined the NUS aiming to be THE best. Stepping into the college life with great confidence, I was able to excel ' +
                  'with ease at the academic level. This eventually lead me to be enrolled in the prestigious French-Double-Degree-Program ' +
                  'that NUS established with top partner colleges in France. \n\nCollege life is not just about finishing the degree requirements, ' +
                  'but also about experiencing life, the world, and expand the knowledge base. This is why I never hesitate to take courses ' +
                  'not at all related to my major but falls in my interest, such as Philosophy, Politics, or Environmental Studies.'
      }]
    })
  },
  {
    icon: 'resources/icon-school/Mines_ParisTech_logo.svg.png',
    content: fabricateLeaf({
      imgUrl: 'resources/icon-school/image_mines.png',
      contentList: [{
        title: 'University Name',
        content: 'Ecole des Mines de Paris'
      }, {
        title: 'Location',
        content: 'Paris, France'
      }, {
        title: 'My Years Here',
        content: '2013 - 2015'
      }, {
        title: 'My Life Here',
        content: 'When I received offers from both Ecole Polytechnique and Ecole des Mines de Paris, I chose the latter without much hesitation. '+
                  'Even though I sometimes wonder what my life would be like in l\'X, never did I regret my decision. \n\nAs you may not have heard ' +
                  'of this college, let me explain: it is one of the top French engineering schools, second only to l\'X, cradle of French elites. ' +
                  'Situated in central Paris (Minutes\' walk to the Louvre and Notre Dame), it is THE best place to be in Paris. The 2 years experience ' +
                  'allowed me to appreciate this great people as well their wonderful cultural heritage.'
      }]
    })
  },
  {
    icon: 'resources/icon-school/Technical University of Munich.png',
    content: fabricateLeaf({
      imgUrl: 'resources/icon-school/image_tum.jpg',
      contentList: [{
        title: 'University Name',
        content: 'Technical University of Munich'
      }, {
        title: 'Location',
        content: 'Munich, Germany'
      }, {
        title: 'My Moment Here',
        content: 'Oct 2014'
      }, {
        title: 'My Experience',
        content: 'Every year, college students in France can participate in a week of exchange life, and I chose TUM in my '+
                  'first year. The reason was of course not the slide nor German beer (well, not primarily), but to experience '+
                  'the education system from famously meticulous Germans. \n\nDuring the short course, ' +
                  'we did the project of simulating fluid mechanics with multi-threading optimization using C++, OpenCL and OpenGL, ' +
                  'and I experienced first-hand the German\'s invaluable conscientious attitude towards technical work.'
      }]
    })
  },
  {
    icon: 'resources/icon-school/University of Chemistry and Technology Prague.png',
    content: fabricateLeaf({
      imgUrl: 'resources/icon-school/image_uct.jpg',
      contentList: [{
        title: 'University Name',
        content: 'University of Chemistry and Technology, Prague'
      }, {
        title: 'Location',
        content: 'Prague, Czech'
      }, {
        title: 'My Moment Here',
        content: 'Mar 2015'
      }, {
        title: 'My Experience',
        content: 'One need not waste words describing how beautiful Prague is, and how bright the crown jewel her best university can ' +
                  'be. I thought I would witness the waning glory of Austrian-Hungarian Empire, only to be stunned by the tenacity and ' +
                  'perseverance of her people. Despite the hundreds years of rampaging wars and civil strife, Czech people maintained ' +
                  'great standard of education and of life.\n\n' +
                  'The week-long course I chose was on Automata theory. I have to admit that the topic is rather bland, and most of the time '+
                  'my heart flew outside the classroom, chasing after the warm sunshine upon this beautiful land.'
      }]
    })
  }
]

export default class EducationPage extends React.Component {
  static propTypes = {
    status: PropTypes.string,
    contentKey: PropTypes.string
  }

  render(){
    return <AnimatedTabs {...this.props} tabs={Tabs}/>
  }
}
