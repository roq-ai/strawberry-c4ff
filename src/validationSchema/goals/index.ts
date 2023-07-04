import * as yup from 'yup';

export const goalValidationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string(),
  user_id: yup.string().nullable(),
});
