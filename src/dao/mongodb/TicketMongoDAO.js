const Ticket = require('../../models/Ticket');

class TicketMongoDAO {
  async create(ticketData) {
    const ticket = new Ticket(ticketData);
    return await ticket.save();
  }
}

module.exports = TicketMongoDAO;