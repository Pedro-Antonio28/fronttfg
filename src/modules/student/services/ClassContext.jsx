// src/shared/contexts/ClassContext.js
import { createContext, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '@/shared/functions/axiosConfig';

const ClassContext = createContext();

export const ClassProvider = ({ children }) => {
  const { classId } = useParams();

  const [results, setResults] = useState([]);
  const [activities, setActivities] = useState([]);
  const [participants, setParticipants] = useState([]);

  const [loadingResults, setLoadingResults] = useState(false);
  const [loadingActivities, setLoadingActivities] = useState(false);
  const [loadingParticipants, setLoadingParticipants] = useState(false);

  const fetchResults = async () => {
    setLoadingResults(true);
    try {
      const response = await axios.get(`/student/class/${classId}/results`);
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching results:', error);
    } finally {
      setLoadingResults(false);
    }
  };

  const fetchActivities = async () => {
    setLoadingActivities(true);
    try {
      const { data } = await axios.get(`/student/class/${classId}/activities`);
      console.log(data);
      setActivities(data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoadingActivities(false);
    }
  };

  const fetchParticipants = async () => {
    setLoadingParticipants(true);
    try {
      const { data } = await axios.get(`/student/class/${classId}/participants`);
      setParticipants(data);
    } catch (error) {
      console.error('Error fetching participants:', error);
    } finally {
      setLoadingParticipants(false);
    }
  };

  return (
    <ClassContext.Provider
      value={{
        classId,
        results,
        activities,
        participants,
        fetchResults,
        fetchActivities,
        fetchParticipants,
        loadingResults,
        loadingActivities,
        loadingParticipants,
      }}
    >
      {children}
    </ClassContext.Provider>
  );
};

export const useClass = () => useContext(ClassContext);
