import {AuthData} from '../../../types/auth-data.ts';

export type LoginFormProps = {
  onFormSubmit: (data: AuthData) => void;
};
