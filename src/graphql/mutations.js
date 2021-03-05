/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNote = /* GraphQL */ `
  mutation CreateNote(
    $input: CreateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    createNote(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const updateNote = /* GraphQL */ `
  mutation UpdateNote(
    $input: UpdateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    updateNote(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const deleteNote = /* GraphQL */ `
  mutation DeleteNote(
    $input: DeleteNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    deleteNote(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const createTime = /* GraphQL */ `
  mutation CreateTime(
    $input: CreateTimeInput!
    $condition: ModelTimeConditionInput
  ) {
    createTime(input: $input, condition: $condition) {
      id
      type
      start
      end
      createdAt
      updatedAt
    }
  }
`;
export const updateTime = /* GraphQL */ `
  mutation UpdateTime(
    $input: UpdateTimeInput!
    $condition: ModelTimeConditionInput
  ) {
    updateTime(input: $input, condition: $condition) {
      id
      type
      start
      end
      createdAt
      updatedAt
    }
  }
`;
export const deleteTime = /* GraphQL */ `
  mutation DeleteTime(
    $input: DeleteTimeInput!
    $condition: ModelTimeConditionInput
  ) {
    deleteTime(input: $input, condition: $condition) {
      id
      type
      start
      end
      createdAt
      updatedAt
    }
  }
`;
