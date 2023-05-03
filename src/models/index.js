// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const LessonTypes = {
  "IN_PERSON": "IN_PERSON",
  "ONLINE": "ONLINE"
};

const { Event, Contact } = initSchema(schema);

export {
  Event,
  Contact,
  LessonTypes
};