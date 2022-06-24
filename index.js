const { uuid } = require("uuidv4");
const { ApolloServer, gql } = require("apollo-server");

let negativeColour = "transparent";
let mainColour = "FFF000";
let secondaryColour = "964B00";
let outline = "000000";

const negativePixel = () => ({
  id: uuid(),
  value: negativeColour
});
const mainPixel = () => ({
  id: uuid(),
  value: mainColour
});
const secondaryPixel = () => ({
  id: uuid(),
  value: secondaryColour
});
const outlinePixel = () => ({
  id: uuid(),
  value: outline
});

const pixelatedImage = () => [
  [
    negativePixel(),
    negativePixel(),
    negativePixel(),
    negativePixel(),
    negativePixel(),
    negativePixel(),
    negativePixel(),
    negativePixel(),
    outlinePixel(),
    outlinePixel(),
    negativePixel(),
    negativePixel(),
    negativePixel(),
    negativePixel(),
    negativePixel()
  ],
  [
    negativePixel(),
    negativePixel(),
    negativePixel(),
    negativePixel(),
    outlinePixel(),
    outlinePixel(),
    outlinePixel(),
    outlinePixel(),
    outlinePixel(),
    outlinePixel(),
    outlinePixel(),
    outlinePixel(),
    outlinePixel(),
    outlinePixel(),
    outlinePixel()
  ],
  [
    negativePixel(),
    negativePixel(),
    negativePixel(),
    outlinePixel(),
    outlinePixel(),
    outlinePixel(),
    mainPixel(),
    outlinePixel(),
    outlinePixel(),
    outlinePixel(),
    mainPixel(),
    mainPixel(),
    mainPixel(),
    mainPixel(),
    outlinePixel()
  ],
  [
    negativePixel(),
    negativePixel(),
    outlinePixel(),
    mainPixel(),
    mainPixel(),
    mainPixel(),
    mainPixel(),
    mainPixel(),
    outlinePixel(),
    mainPixel(),
    mainPixel(),
    mainPixel(),
    mainPixel(),
    outlinePixel(),
    negativePixel()
  ],
  [
    negativePixel(),
    outlinePixel(),
    mainPixel(),
    mainPixel(),
    mainPixel(),
    mainPixel(),
    mainPixel(),
    outlinePixel(),
    outlinePixel(),
    mainPixel(),
    mainPixel(),
    mainPixel(),
    outlinePixel(),
    negativePixel(),
    negativePixel()
  ],
  [
    negativePixel(),
    outlinePixel(),
    mainPixel(),
    mainPixel(),
    mainPixel(),
    mainPixel(),
    mainPixel(),
    outlinePixel(),
    mainPixel(),
    mainPixel(),
    mainPixel(),
    outlinePixel(),
    negativePixel(),
    negativePixel(),
    negativePixel()
  ],
  [
    outlinePixel(),
    mainPixel(),
    mainPixel(),
    outlinePixel(),
    mainPixel(),
    mainPixel(),
    mainPixel(),
    mainPixel(),
    outlinePixel(),
    mainPixel(),
    mainPixel(),
    outlinePixel(),
    outlinePixel(),
    outlinePixel(),
    negativePixel()
  ],
  [
    outlinePixel(),
    mainPixel(),
    mainPixel(),
    mainPixel(),
    mainPixel(),
    { id: "cheek", value: "FF0000" },
    mainPixel(),
    outlinePixel(),
    outlinePixel(),
    mainPixel(),
    mainPixel(),
    mainPixel(),
    mainPixel(),
    outlinePixel(),
    negativePixel()
  ],
  [
    negativePixel(),
    outlinePixel(),
    mainPixel(),
    mainPixel(),
    mainPixel(),
    mainPixel(),
    mainPixel(),
    secondaryPixel(),
    secondaryPixel(),
    secondaryPixel(),
    secondaryPixel(),
    secondaryPixel(),
    outlinePixel(),
    negativePixel(),
    negativePixel()
  ],
  [
    negativePixel(),
    outlinePixel(),
    mainPixel(),
    outlinePixel(),
    mainPixel(),
    mainPixel(),
    mainPixel(),
    mainPixel(),
    mainPixel(),
    secondaryPixel(),
    secondaryPixel(),
    secondaryPixel(),
    secondaryPixel(),
    outlinePixel(),
    negativePixel()
  ],
  [
    negativePixel(),
    outlinePixel(),
    mainPixel(),
    outlinePixel(),
    outlinePixel(),
    mainPixel(),
    mainPixel(),
    secondaryPixel(),
    secondaryPixel(),
    secondaryPixel(),
    secondaryPixel(),
    secondaryPixel(),
    outlinePixel(),
    negativePixel(),
    negativePixel()
  ],
  [
    negativePixel(),
    outlinePixel(),
    mainPixel(),
    mainPixel(),
    mainPixel(),
    mainPixel(),
    mainPixel(),
    mainPixel(),
    mainPixel(),
    outlinePixel(),
    outlinePixel(),
    outlinePixel(),
    negativePixel(),
    negativePixel(),
    negativePixel()
  ],
  [
    negativePixel(),
    negativePixel(),
    outlinePixel(),
    outlinePixel(),
    mainPixel(),
    mainPixel(),
    mainPixel(),
    outlinePixel(),
    outlinePixel(),
    negativePixel(),
    negativePixel(),
    negativePixel(),
    negativePixel(),
    negativePixel(),
    negativePixel()
  ],
  [
    negativePixel(),
    negativePixel(),
    negativePixel(),
    negativePixel(),
    outlinePixel(),
    outlinePixel(),
    outlinePixel(),
    negativePixel(),
    negativePixel(),
    negativePixel(),
    negativePixel(),
    negativePixel(),
    negativePixel(),
    negativePixel()
  ]
];

let pixelatedImage1 = pixelatedImage();

const enumLookup = {
  bread1: "BREAD",
  croissant2: "CROISSANT",
  flatbread3: "FLATBREAD",
  baguette4: "BAGUETTE"
};

const likedPastries = ["bread1"];

let pasteryIds = ["bread1", "croissant2", "flatbread3", "baguette4"];

const makePastryObjects = (ids) =>
  ids.map((id) => ({
    id,
    icon: enumLookup[id],
    origin: { id: "Someplace1", code: "1234" }
  }));

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
    pixelImage: PixelImage
    pastries: [Pastry]
    pastry(id: ID): Pastry
  }

  type Mutation {
    changeMainColour(colour: String, id: ID): PixelImage
    likePastry(id: ID): Pastry
    pastryShuffle: [Pastry]
    addPastry(pastryId: ID, liked: Boolean, icon: PASTRY_ICON): PastryConnection
    removePastry(pastryId: ID): Boolean
  }

  type PastryConnection {
    pastry: Pastry
    date: String
    name: String
  }

  enum PASTRY_ICON {
    BREAD
    CROISSANT
    FLATBREAD
    BAGUETTE
  }

  type Country {
    id: ID
    code: String
  }

  type Pastry {
    id: ID
    icon: PASTRY_ICON
    liked: Boolean
    origin: Country
  }

  type Pixel {
    id: ID
    value: String
  }

  type PixelImage {
    id: ID
    pixelMatrix: [[Pixel]]
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: (root, args, context) => "Hello world!",
    pixelImage: (root, args, context) => {
      const id = uuid();
      return {
        id,
        pixelMatrix: pixelatedImage1
      };
    },
    pastries: (root, args, context) => {
      return makePastryObjects(pasteryIds);
    },
    pastry: (root, { id }, context) => {
      return makePastryObjects(pasteryIds).find((element) => element.id === id);
    }
  },
  Pastry: {
    liked: ({ id }, args, context) => {
      const isLiked = !!likedPastries.find((element) => element === id);
      return isLiked;
    }
  },
  Mutation: {
    changeMainColour: (root, { colour, id }, context) => {
      mainColour = colour;
      pixelatedImage1 = pixelatedImage();
      return {
        id,
        pixelMatrix: pixelatedImage1
      };
    },
    likePastry: (root, { id }, context) => {
      const likedIndex = likedPastries.indexOf(id);
      if (likedIndex > -1) {
        likedPastries.splice(likedIndex, 1);
      } else {
        likedPastries.push(id);
      }
      return makePastryObjects(pasteryIds).find((element) => element.id === id);
    },
    pastryShuffle: (root, args, context) => {
      [pasteryIds[1], pasteryIds[3]] = [pasteryIds[3], pasteryIds[1]];
      return makePastryObjects(pasteryIds);
    },
    addPastry: (root, { pastryId, liked, icon }, context) => {
      if (!pasteryIds.find((element) => element.id === pastryId)) {
        pasteryIds.push(pastryId);
        if (liked) {
          likedPastries.push(pastryId);
        }
        enumLookup[pastryId] = icon;
      }
      const pastry = makePastryObjects(pasteryIds).find(
        (element) => element.id === pastryId
      );
      return {
        pastry,
        date: Date.now(),
        name: "billy"
      };
    },
    removePastry: (root, { pastryId }, context) => {
      if (pasteryIds.indexOf(pastryId) > -1) {
        pasteryIds = pasteryIds.filter((elem) => elem !== pastryId);
        return true;
      }
      return false;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
