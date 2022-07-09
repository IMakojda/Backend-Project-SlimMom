const { createError } = require('../helpers/errors');
// ФОРМУЛА ДЛЯ РОЗРАХУНКУ ДЕННОЇ НОРМИ КАЛОРІЙ ЖІНКАМ
// 10 * вага + 6.25 * зріст - 5 * вік - 161 - 10 * (вага - бажана вага)

const defaultCalculator = async (req, res, next) => {
  const { userData } = req.body;

  res.json('defaultCalculator');
  // try {
  //   const { userData } = req.body;
  //   const all = await contactService.listContacts(req.user._id, req.query);
  //   res.json(all);
  // } catch (e) {
  //   next(e);
  // }
};

const userCalculator = async (req, res, next) => {
  const { userId } = req.params;
  console.log('userId:', userId);
  res.json('feature not finished yet');
  // try {
  //   const { contactId } = req.params;
  //   const contact = await contactService.getContactById(contactId);
  //   if (!contact) {
  //     throw createError(404, 'Not found');
  //   } else {
  //     res.json(contact);
  //   }
  // } catch (e) {
  //   next(e);
  // }
};

module.exports = {
  defaultCalculator,
  userCalculator,
};
