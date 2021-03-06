import {useState, useEffect} from "react"
import axios from "axios"

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {
      "1": {
        id: 1,
        time: "12pm",
        interview: null
      }
    },
    interviewers: {}
  });

  const changeSpots = (state, day, operator) => {
    for (let dayEntry of state.days) {
      if (dayEntry.name === day && operator === "minus") {
        dayEntry.spots = dayEntry.spots - 1
      }
      if (dayEntry.name === day && operator === "plus") {
        dayEntry.spots = dayEntry.spots + 1
      }
    }
  }

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
  }, [])

  const setDay = day => setState({ ...state, day });

  const bookInterview = (id, interview) => {
    
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, appointment).then((response) => {
      if (!state.appointments[id].interview) {
        changeSpots(state, state.day, "minus");
      }
      setState({...state, appointments});
    })
  }

  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`).then(() => {
      const nullAppointment = {
        ...state.appointments[id],
        interview: null
      };
      const appointments = {
        ...state.appointments,
        [id]: nullAppointment
      };
      changeSpots(state, state.day, "plus");
      setState({...state, appointments});
    });
  }

  return {setDay, state, bookInterview, cancelInterview}
}