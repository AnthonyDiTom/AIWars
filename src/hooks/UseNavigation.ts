import { useHistory } from 'react-router-dom';
import { RoutePath } from '../Routes';

const UseNavigation = () => {
  const history = useHistory();

  return {
    navToP4Local() {
      const state = {
        ia: false,
      };
      history.push(RoutePath.p4Local, state);
    },

    navToP4vsIa() {
      const state = {
        ia: true,
      };
      history.push(RoutePath.p4Local, state);
    },

    navToP4online() {
      history.push(RoutePath.p4Online);
    },
  };
};

export default UseNavigation;
