import { useCallback } from "react";
import countries from "world-countries";

const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

const useCountries = () => {
  // Functions
  const getAll = useCallback(() => formattedCountries, []);

  const getByValue = useCallback((value: string) => {
    return formattedCountries.find((item) => item.value === value);
  }, []);

  return {
    getAll,
    getByValue,
  };
};

export default useCountries;
