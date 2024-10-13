import MainScreen from '../../pages/main-screen/main-screen';
import {AppScreenProps} from './app-screen-props.ts';

export function App({placesCount}: AppScreenProps): JSX.Element {
  return (
    <MainScreen placesCount={placesCount}/>
  );
}
