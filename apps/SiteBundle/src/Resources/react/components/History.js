import React from 'react';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';

import Footer from './Footer';
import Nav from './Nav';

class History extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section id="History">
        <Nav/>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <h1>History</h1>
            </div>
          </div>
          <div className="row blockoverflow">
            <div className="col-12">


              <VerticalTimeline>
                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  date="2011 - present"
                  iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                  icon={ <i className="icon-briefcase"></i> }
                >
                  <h3 className="vertical-timeline-element-title">Creative Director</h3>
                  <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
                  <p>
                    Creative Direction, User Experience, Visual Design, Project Management, Team Leading
                  </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  date="2010 - 2011"
                  iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                  icon={ <i className="icon-briefcase"></i> }
                >
                  <h3 className="vertical-timeline-element-title">Art Director</h3>
                  <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
                  <p>
                    Creative Direction, User Experience, Visual Design, SEO, Online Marketing
                  </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  date="2008 - 2010"
                  iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                  icon={ <i className="icon-briefcase"></i> }
                >
                  <h3 className="vertical-timeline-element-title">Web Designer</h3>
                  <h4 className="vertical-timeline-element-subtitle">Los Angeles, CA</h4>
                  <p>
                    User Experience, Visual Design
                  </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  date="2006 - 2008"
                  iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                  icon={ <i className="icon-briefcase"></i> }
                >
                  <h3 className="vertical-timeline-element-title">Web Designer</h3>
                  <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
                  <p>
                    User Experience, Visual Design
                  </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                  className="vertical-timeline-element--education"
                  date="April 2013"
                  iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
                  icon={ <i className="icon-trophy"></i> }
                >
                  <h3 className="vertical-timeline-element-title">Content Marketing for Web, Mobile and Social Media</h3>
                  <h4 className="vertical-timeline-element-subtitle">Online Course</h4>
                  <p>
                    Strategy, Social Media
                  </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                  className="vertical-timeline-element--education"
                  date="November 2012"
                  iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
                  icon={ <i className="icon-trophy"></i> }
                >
                  <h3 className="vertical-timeline-element-title">Agile Development Scrum Master</h3>
                  <h4 className="vertical-timeline-element-subtitle">Certification</h4>
                  <p>
                    Creative Direction, User Experience, Visual Design
                  </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                  className="vertical-timeline-element--education"
                  date="2002 - 2006"
                  iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
                  icon={ <i className="icon-trophy"></i> }
                >
                  <h3 className="vertical-timeline-element-title">Bachelor of Science in Interactive Digital Media Visual Imaging</h3>
                  <h4 className="vertical-timeline-element-subtitle">Bachelor Degree</h4>
                  <p>
                    Creative Direction, Visual Design
                  </p>
                </VerticalTimelineElement>
              </VerticalTimeline>


            </div>
          </div>
        </div>
        <Footer/>
      </section>
    );
  }
}

export default History;
