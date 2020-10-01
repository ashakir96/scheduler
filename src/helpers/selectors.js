export function getAppointmentsForDay(state, day) {
  const currentDay = state.days.filter((dayEntry) => dayEntry.name === day)
  if (state.days.length === 0 || currentDay.length === 0) {
    return [];
  }
  const appointments = currentDay[0].appointments.map((appt) => state.appointments[appt]);
  
  return appointments;
}


export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewerId = {...interview, interviewer: state.interviewers[interview.interviewer]}
  return interviewerId;
}

export function getInterviewerForDay(state, day) {
  const currentDay = state.days.filter((dayEntry) => dayEntry.name === day)
  if (state.days.length === 0 || currentDay.length === 0) {
    return [];
  }
  const interviewers = currentDay[0].interviewers.map((interviewer) => state.interviewers[interviewer]);
  
  return interviewers;
}