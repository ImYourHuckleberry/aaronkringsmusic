// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const TicketAvailability = {
  "ON_SALE": "ON_SALE",
  "SOLD_OUT": "SOLD_OUT",
  "COMING_SOON": "COMING_SOON",
  "FREE": "FREE"
};

const LessonTypes = {
  "IN_PERSON": "IN_PERSON",
  "ONLINE": "ONLINE"
};

const { Event, Contact, OtherBands } = initSchema(schema);

export {
  Event,
  Contact,
  TicketAvailability,
  LessonTypes,
  OtherBands
};