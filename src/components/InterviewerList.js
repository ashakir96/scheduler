import React from "react";
import InterviewerListItem from "components/InterviewerListItem"
import PropTypes from 'prop-types';
import "components/InterviewerList.scss"

export default function InterviewerList(props) {

  const interviewersPeople = props.interviewers.map((person) => {
    return <InterviewerListItem
      key={person.id}
      name={person.name}
      selected = {props.interviewer === person.id}
      avatar={person.avatar}
      setInterviewer= {() => props.setInterviewer(person.id)}/>
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewersPeople}</ul>
    </section>
  )
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};