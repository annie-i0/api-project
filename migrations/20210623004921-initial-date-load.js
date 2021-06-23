'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('show', [{
      network: 'Netflix',
      title: 'American Horror Story',
      createdBy: 'Ryan Murphy and Brad Falchuk',
      synopsis: 'An American anthology horror series with each season conceived as a self-contained miniseries, following a different set of characters and settings, and a story line with its own "beginning, middle, and end"',
      seasons: 9
    }, {
      network: 'Showtime',
      title: 'Penny Dreadful',
      createdBy: 'John Logan',
      synopsis: 'A British-American horror drama series. It follows deeply Catholic clairvoyant, Vanessa Ives, retired colonial-African explorer, Sir Malcolm Murray, and American sharpshooter Ethan Chandler, in a supernatural mystery that brings them into conflict and connection with a number of famous literary figures from 19thcentury Gothic fiction. This includes Victor Frankenstein, Dorian Gray, Henry Jekyll, and much of the cast of Bram Stoker’s Dracula.',
      seasons: 3
  }, {
      network: 'Netflix',
      title: 'The Haunting of Hill House',
      createdBy: 'Mike Flanagan',
      synopsis: 'An American supernatural horror drama series loosely based on the 1959 novel of the same name by Shirley Jackson. The story follows Hugh and Olivia Crain and their five children as they move into the Hill House. The Crains arrive at Hill House hoping to fix it up and sell it, but things don’t go exactly as planned. They are stuck there longer than expected and the family is subjected to the hauntings.',
      seasons: 1
  }, {
      network: 'HBO',
      title: 'Sharp Objects',
      createdBy: 'Marti Noxon',
      synopsis: 'An American psychological thriller miniseries based on a novel of the same name by Gillian Flynn. It follows Camille Preaker, an emotionally troubled reporter who returns to her hometown to cover the murders of two young girls.',
      seasons: 1
     
  }
 
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('show');
     
  }
};


