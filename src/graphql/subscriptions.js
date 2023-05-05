/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent($filter: ModelSubscriptionEventFilterInput) {
    onCreateEvent(filter: $filter) {
      id
      title
      subTitle
      extraInfo
      date
      time
      location
      veneueUrl
      bandUrl
      image
      otherBands {
        name
        webSite
      }
      ticketPrice
      ticketAvailability
      googleMapsUrl
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent($filter: ModelSubscriptionEventFilterInput) {
    onUpdateEvent(filter: $filter) {
      id
      title
      subTitle
      extraInfo
      date
      time
      location
      veneueUrl
      bandUrl
      image
      otherBands {
        name
        webSite
      }
      ticketPrice
      ticketAvailability
      googleMapsUrl
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent($filter: ModelSubscriptionEventFilterInput) {
    onDeleteEvent(filter: $filter) {
      id
      title
      subTitle
      extraInfo
      date
      time
      location
      veneueUrl
      bandUrl
      image
      otherBands {
        name
        webSite
      }
      ticketPrice
      ticketAvailability
      googleMapsUrl
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateContact = /* GraphQL */ `
  subscription OnCreateContact($filter: ModelSubscriptionContactFilterInput) {
    onCreateContact(filter: $filter) {
      id
      Name
      Email
      Phone
      LessonType
      Message
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateContact = /* GraphQL */ `
  subscription OnUpdateContact($filter: ModelSubscriptionContactFilterInput) {
    onUpdateContact(filter: $filter) {
      id
      Name
      Email
      Phone
      LessonType
      Message
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteContact = /* GraphQL */ `
  subscription OnDeleteContact($filter: ModelSubscriptionContactFilterInput) {
    onDeleteContact(filter: $filter) {
      id
      Name
      Email
      Phone
      LessonType
      Message
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
