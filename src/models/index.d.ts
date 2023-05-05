import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";

export enum TicketAvailability {
  ON_SALE = "ON_SALE",
  SOLD_OUT = "SOLD_OUT",
  COMING_SOON = "COMING_SOON",
  FREE = "FREE"
}

export enum LessonTypes {
  IN_PERSON = "IN_PERSON",
  ONLINE = "ONLINE"
}

type EagerOtherBands = {
  readonly name?: string | null;
  readonly webSite?: string | null;
}

type LazyOtherBands = {
  readonly name?: string | null;
  readonly webSite?: string | null;
}

export declare type OtherBands = LazyLoading extends LazyLoadingDisabled ? EagerOtherBands : LazyOtherBands

export declare const OtherBands: (new (init: ModelInit<OtherBands>) => OtherBands)

type EagerEvent = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Event, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title?: string | null;
  readonly subTitle?: string | null;
  readonly extraInfo?: string | null;
  readonly date?: string | null;
  readonly time?: string | null;
  readonly location?: string | null;
  readonly veneueUrl?: string | null;
  readonly bandUrl?: string | null;
  readonly image?: string | null;
  readonly otherBands?: (OtherBands | null)[] | null;
  readonly ticketPrice?: string | null;
  readonly ticketAvailability?: TicketAvailability | keyof typeof TicketAvailability | null;
  readonly googleMapsUrl?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyEvent = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Event, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title?: string | null;
  readonly subTitle?: string | null;
  readonly extraInfo?: string | null;
  readonly date?: string | null;
  readonly time?: string | null;
  readonly location?: string | null;
  readonly veneueUrl?: string | null;
  readonly bandUrl?: string | null;
  readonly image?: string | null;
  readonly otherBands?: (OtherBands | null)[] | null;
  readonly ticketPrice?: string | null;
  readonly ticketAvailability?: TicketAvailability | keyof typeof TicketAvailability | null;
  readonly googleMapsUrl?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Event = LazyLoading extends LazyLoadingDisabled ? EagerEvent : LazyEvent

export declare const Event: (new (init: ModelInit<Event>) => Event) & {
  copyOf(source: Event, mutator: (draft: MutableModel<Event>) => MutableModel<Event> | void): Event;
}

type EagerContact = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Contact, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Name: string;
  readonly Email: string;
  readonly Phone?: string | null;
  readonly LessonType: LessonTypes | keyof typeof LessonTypes;
  readonly Message: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyContact = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Contact, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Name: string;
  readonly Email: string;
  readonly Phone?: string | null;
  readonly LessonType: LessonTypes | keyof typeof LessonTypes;
  readonly Message: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Contact = LazyLoading extends LazyLoadingDisabled ? EagerContact : LazyContact

export declare const Contact: (new (init: ModelInit<Contact>) => Contact) & {
  copyOf(source: Contact, mutator: (draft: MutableModel<Contact>) => MutableModel<Contact> | void): Contact;
}