class TicketRepository {
    constructor(dao) {
      this.dao = dao;
    }
  
    async create(ticketData) {
      return await this.dao.create(ticketData);
    }
  }
  
  module.exports = TicketRepository;