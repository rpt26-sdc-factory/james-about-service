import React from 'react';
import './style.css';

import Detail from './components/detail/Detail.jsx';
import Meta from './components/meta/Meta.jsx';
import Skills from './components/skills/Skills.jsx';

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseInfo: this.props.course,
      svgs: {},
      expanded: '',
    };
  }

  expand() {
    this.setState({ expanded: 'expanded' });
  }

  render() {
    const { courseInfo, svgs, expanded } = this.state;
    return (
      <div className="about">
        <div className="two-three">
          <Detail state={courseInfo} expanded={expanded} click={() => { this.expand(); }} />
          <Skills state={courseInfo} />
        </div>
        <div className="one-three">
          <Meta state={courseInfo} svgs={svgs} />
        </div>
      </div>
    );
  }
}

export default About;
