import React from "react";
import Header from "components/Appointment/Header"
import Empty from "components/Appointment/Empty"
import Show from "components/Appointment/Show"
import Form from "components/Appointment/Form"
import useVisualMode from "hooks/useVisualMode"
import "components/Appointment/styles.scss";
import Status from "components/Appointment/Status"
// import Error from "components/Appointment/Error"


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING"


export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview).then(() => {
      transition(SHOW)
    })
    
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form 
        interviewers={props.interviewers}
        onCancel={back}
        onSave={save}
        />)}
      {mode === SAVING && (<Status message="Saving"/>)}
    </article>
  )
}