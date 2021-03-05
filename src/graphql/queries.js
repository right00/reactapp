/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNote = /* GraphQL */ `
  query GetNote($id: ID!) {
    getNote(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const listNotes = /* GraphQL */ `
  query ListNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTime = /* GraphQL */ `
  query GetTime($id: ID!) {
    getTime(id: $id) {
      id
      type
      start
      end
      createdAt
      updatedAt
    }
  }
`;
export const listTimes = /* GraphQL */ `
  query ListTimes(
    $filter: ModelTimeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTimes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        start
        end
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
