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
  const [joinCode, setJoinCode] = useState(null);

  const [loadingResults, setLoadingResults] = useState(false);
  const [loadingActivities, setLoadingActivities] = useState(false);
  const [loadingParticipants, setLoadingParticipants] = useState(false);
  const [loadingCode, setLoadingCode] = useState(false);
  const rol = 'teacher';

  const fetchJoinCode = async () => {
    try {
      setLoadingCode(true);
      const { data } = await axios.get(`/teacher/class/${classId}/join-code`);
      setJoinCode(data.code);
    } catch (err) {
      setJoinCode('Error al obtener el código');
    } finally {
      setLoadingCode(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(joinCode);
  };

  const fetchResults = async () => {
    setLoadingResults(true);
    try {
      const response = await axios.get(`/teacher/class/${classId}/results`);
      setResults(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching results:', error);
    } finally {
      setLoadingResults(false);
    }
  };

  const fetchActivities = async () => {
    setLoadingActivities(true);
    try {
      const { data } = await axios.get(`/teacher/class/${classId}/activities`);
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
      const { data } = await axios.get(`/teacher/class/${classId}/participants`);
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
        joinCode,
        fetchResults,
        fetchActivities,
        fetchParticipants,
        fetchJoinCode,
        copyToClipboard,
        loadingResults,
        loadingActivities,
        loadingParticipants,
        loadingCode,
        rol,

      }}
    >
      {children}
    </ClassContext.Provider>
  );
};

export const useClass = () => useContext(ClassContext);
