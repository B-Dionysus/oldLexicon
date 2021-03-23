/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateGame = /* GraphQL */ `
  subscription OnCreateGame {
    onCreateGame {
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
export const onUpdateGame = /* GraphQL */ `
  subscription OnUpdateGame {
    onUpdateGame {
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
export const onDeleteGame = /* GraphQL */ `
  subscription OnDeleteGame {
    onDeleteGame {
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
