import axios from "axios";
import { useEffect, useState } from "react";

type SearchGeoCodeResponse = {
  result: {
    addressMatches: [
      {
        coordinates: Coordinates;
      }
    ];
  };
};

type Coordinates = {
  x: number;
  y: number;
};

type UseGeoCode = {
  onSuccess: (coordinates: SearchGeoCodeResponse | null) => void;
};

const useGeoCode = (props: UseGeoCode) => {
  const { onSuccess } = props;
  const [geoCodeData, setGeoCodeData] = useState<SearchGeoCodeResponse | null>(
    null
  );
  const [isLoading, setLoading] = useState(false);

  const fetch = async (address: string) => {
    setLoading(true);
    const response = await axios.get<SearchGeoCodeResponse>(
      `/api/search-geocode/${address}`
    );
    setLoading(false);
    if (response.data) {
      setGeoCodeData(response?.data);
      onSuccess(response?.data);
      return;
    }
    setGeoCodeData(null);
    onSuccess(geoCodeData);
  };

  return {
    data: geoCodeData,
    isLoading,
    fetch,
  };
};

export default useGeoCode;
