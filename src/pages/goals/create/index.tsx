import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createGoal } from 'apiSdk/goals';
import { Error } from 'components/error';
import { goalValidationSchema } from 'validationSchema/goals';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { GoalInterface } from 'interfaces/goal';

function GoalCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: GoalInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createGoal(values);
      resetForm();
      router.push('/goals');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<GoalInterface>({
    initialValues: {
      title: '',
      description: '',
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: goalValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Goal
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="title" mb="4" isInvalid={!!formik.errors?.title}>
            <FormLabel>Title</FormLabel>
            <Input type="text" name="title" value={formik.values?.title} onChange={formik.handleChange} />
            {formik.errors.title && <FormErrorMessage>{formik.errors?.title}</FormErrorMessage>}
          </FormControl>
          <FormControl id="description" mb="4" isInvalid={!!formik.errors?.description}>
            <FormLabel>Description</FormLabel>
            <Input type="text" name="description" value={formik.values?.description} onChange={formik.handleChange} />
            {formik.errors.description && <FormErrorMessage>{formik.errors?.description}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'goal',
    operation: AccessOperationEnum.CREATE,
  }),
)(GoalCreatePage);
