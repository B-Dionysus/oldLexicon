/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createGame = /* GraphQL */ `
  mutation CreateGame(
    $input: CreateGameInput!
    $condition: ModelGameConditionInput
  ) {
    createGame(input: $input, condition: $condition) {
      id
      title
      description
      image
      creatorId
      categories
      posts {
        id
        creatorId
        name
        displayName
        body
        round
        links {
          id
          creatorId
          name
          displayName
          body
          round
          image
          createdAt
          updatedAt
        }
        image
        createdAt
        updatedAt
      }
      players {
        id
        secruityLevel
        image
        playerName
        characterName
        posts {
          id
          creatorId
          name
          displayName
          body
          round
          image
          createdAt
          updatedAt
        }
        games {
          id
          title
          description
          image
          creatorId
          categories
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateGame = /* GraphQL */ `
  mutation UpdateGame(
    $input: UpdateGameInput!
    $condition: ModelGameConditionInput
  ) {
    updateGame(input: $input, condition: $condition) {
      id
      title
      description
      image
      creatorId
      categories
      posts {
        id
        creatorId
        name
        displayName
        body
        round
        links {
          id
          creatorId
          name
          displayName
          body
          round
          image
          createdAt
          updatedAt
        }
        image
        createdAt
        updatedAt
      }
      players {
        id
        secruityLevel
        image
        playerName
        characterName
        posts {
          id
          creatorId
          name
          displayName
          body
          round
          image
          createdAt
          updatedAt
        }
        games {
          id
          title
          description
          image
          creatorId
          categories
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteGame = /* GraphQL */ `
  mutation DeleteGame(
    $input: DeleteGameInput!
    $condition: ModelGameConditionInput
  ) {
    deleteGame(input: $input, condition: $condition) {
      id
      title
      description
      image
      creatorId
      categories
      posts {
        id
        creatorId
        name
        displayName
        body
        round
        links {
          id
          creatorId
          name
          displayName
          body
          round
          image
          createdAt
          updatedAt
        }
        image
        createdAt
        updatedAt
      }
      players {
        id
        secruityLevel
        image
        playerName
        characterName
        posts {
          id
          creatorId
          name
          displayName
          body
          round
          image
          createdAt
          updatedAt
        }
        games {
          id
          title
          description
          image
          creatorId
          categories
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
      id
      creatorId
      name
      displayName
      body
      round
      links {
        id
        creatorId
        name
        displayName
        body
        round
        links {
          id
          creatorId
          name
          displayName
          body
          round
          image
          createdAt
          updatedAt
        }
        image
        createdAt
        updatedAt
      }
      image
      createdAt
      updatedAt
    }
  }
`;
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
      id
      creatorId
      name
      displayName
      body
      round
      links {
        id
        creatorId
        name
        displayName
        body
        round
        links {
          id
          creatorId
          name
          displayName
          body
          round
          image
          createdAt
          updatedAt
        }
        image
        createdAt
        updatedAt
      }
      image
      createdAt
      updatedAt
    }
  }
`;
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
      id
      creatorId
      name
      displayName
      body
      round
      links {
        id
        creatorId
        name
        displayName
        body
        round
        links {
          id
          creatorId
          name
          displayName
          body
          round
          image
          createdAt
          updatedAt
        }
        image
        createdAt
        updatedAt
      }
      image
      createdAt
      updatedAt
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      secruityLevel
      image
      playerName
      characterName
      posts {
        id
        creatorId
        name
        displayName
        body
        round
        links {
          id
          creatorId
          name
          displayName
          body
          round
          image
          createdAt
          updatedAt
        }
        image
        createdAt
        updatedAt
      }
      games {
        id
        title
        description
        image
        creatorId
        categories
        posts {
          id
          creatorId
          name
          displayName
          body
          round
          image
          createdAt
          updatedAt
        }
        players {
          id
          secruityLevel
          image
          playerName
          characterName
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      secruityLevel
      image
      playerName
      characterName
      posts {
        id
        creatorId
        name
        displayName
        body
        round
        links {
          id
          creatorId
          name
          displayName
          body
          round
          image
          createdAt
          updatedAt
        }
        image
        createdAt
        updatedAt
      }
      games {
        id
        title
        description
        image
        creatorId
        categories
        posts {
          id
          creatorId
          name
          displayName
          body
          round
          image
          createdAt
          updatedAt
        }
        players {
          id
          secruityLevel
          image
          playerName
          characterName
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      secruityLevel
      image
      playerName
      characterName
      posts {
        id
        creatorId
        name
        displayName
        body
        round
        links {
          id
          creatorId
          name
          displayName
          body
          round
          image
          createdAt
          updatedAt
        }
        image
        createdAt
        updatedAt
      }
      games {
        id
        title
        description
        image
        creatorId
        categories
        posts {
          id
          creatorId
          name
          displayName
          body
          round
          image
          createdAt
          updatedAt
        }
        players {
          id
          secruityLevel
          image
          playerName
          characterName
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
