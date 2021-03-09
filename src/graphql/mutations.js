/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
