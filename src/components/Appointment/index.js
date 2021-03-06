import React from "react";
import Header from "components/Appointment/Header"
import Empty from "components/Appointment/Empty"
import Show from "components/Appointment/Show"
import Form from "components/Appointment/Form"
import Confirm from "components/Appointment/Confirm"
import useVisualMode from "hooks/useVisualMode"
import "components/Appointment/styles.scss";
import Status from "components/Appointment/Status"
import Error from "components/Appointment/Error"


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING"
const DELETING = "DELETING"
const CONFIRM = "CONFIRM"
const EDIT = "EDIT"
const ERROR_SAVE = "ERROR_SAVE"
const ERROR_DELETE = "ERROR_DELETE"


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
    .catch((error) => {transition(ERROR_SAVE, true)})
  }

  const deleteFn = () => {

    transition(DELETING, true)

    props.cancelInterview(props.id).then(() => {
      transition(EMPTY)
    })
    .catch((error) => {transition(ERROR_DELETE, true)})
  }

  return (
    <article data-testid="appointment" className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => {transition(CONFIRM)}}
          onEdit={() => {transition(EDIT)}}
        />
      )}
      {mode === DELETING && (<Status message="Deleting"/>)}
      {mode === CONFIRM && (
        <Confirm 
          message="Delete the appointment?"
          onConfirm={deleteFn}
          onCancel={back}
        />)}
      {mode === CREATE && (
        <Form 
        interviewers={props.interviewers}
        onCancel={back}
        onSave={save}
        />)}
      {mode === EDIT && (
        <Form
        name={props.interview.student}
        interviewers={props.interviewers}
        interviewer={props.id}
        onSave={save}
        onCancel={back}
      />
      )} 
      {mode === ERROR_SAVE && (<Error message="Could not save" onClose={back}/>)}
      {mode === ERROR_DELETE && (<Error message="Could not delete appointment" onClose={back}/>)}
      {mode === SAVING && (<Status message="Saving"/>)}
    </article>
  )
}