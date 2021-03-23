/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGame = /* GraphQL */ `
  query GetGame($id: ID!) {
    getGame(id: $id) {
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
export const listGames = /* GraphQL */ `
  query ListGames(
    $filter: ModelGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
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
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
