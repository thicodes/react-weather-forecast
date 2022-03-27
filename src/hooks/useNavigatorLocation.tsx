import { Position } from "../App";

type Args = {
  onSuccess: (position: Position) => void;
};

const useNavigatorLocation = () => {
  const getNavigatorPermission = (args: Args) => {
    const { onSuccess } = args;
    if (navigator.geolocation) {
      navigator.permissions.query({ name: "geolocation" }).then((response) => {
        if (response.state === "granted") {
          navigator.geolocation.getCurrentPosition((position) => {
            onSuccess({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          });
          return;
        }
        if (response.state === "prompt") {
          navigator.geolocation.getCurrentPosition((position) => {
            onSuccess({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          });
          return;
        }
      });
    }
  };

  return {
    getNavigatorPermission,
  };
};

export default useNavigatorLocation;
