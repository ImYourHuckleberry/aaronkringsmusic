// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const LessonTypes = {
  "IN_PERSON": "IN_PERSON",
  "ONLINE": "ONLINE"
};

const { Contact } = initSchema(schema);

export {
  Contact,
  LessonTypes
};