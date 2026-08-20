import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";
import type { SensorReading } from "../types/sensor";
import { mockSensorReading } from "../data/mockData";

export function useLiveSensorData() {
  const [sensorData, setSensorData] = useState<SensorReading>(mockSensorReading);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const sensorRef = ref(database, "sensorReadings/latest");

    const unsubscribe = onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSensorData(data);
        setIsLive(true);
      }
    });

    return () => unsubscribe();
  }, []);

  return { sensorData, isLive };
}