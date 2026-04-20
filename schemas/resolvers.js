const resolvers = {
  Query: {
    users: async (_, __, { models }) => {
      return await models.User.findAll();
    },

    user: async (_, { id }, { models }) => {
      return await models.User.findByPk(id);
    },

    products: async (_, { category }, { models }) => {
      if (category) {
        return await models.Product.findAll({ where: { category } });
      }
      return await models.Product.findAll();
    },

    orders: async (_, { userId, status }, { models }) => {
      const where = {};
      if (userId) where.userId = userId;
      if (status) where.status = status;

      return await models.Order.findAll({ where });
    },

    order: async (_, { id }, { models }) => {
      return await models.Order.findByPk(id);
    },
  },

  Mutation: {
    createUser: async (_, { input }, { models }) => {
      return await models.User.create({
        email: input.email,
      });
    },
  },

  // 🔥 TYPE RESOLVERS

  User: {
    orders: async (user, { status }, { models }) => {
      const where = { userId: user.id };
      if (status) where.status = status;

      return await models.Order.findAll({ where });
    },

    orderCount: async (user, { status }, { models }) => {
      const where = { userId: user.id };
      if (status) where.status = status;

      return await models.Order.count({ where });
    },
  },

  Order: {
    user: async (order, _, { models }) => {
      return await models.User.findByPk(order.userId);
    },

    items: async (order, _, { models }) => {
      return await models.OrderItem.findAll({
        where: { orderId: order.id },
      });
    },

    total: async (order, _, { models }) => {
      const items = await models.OrderItem.findAll({
        where: { orderId: order.id },
      });

      let total = 0;

      for (let item of items) {
        const product = await models.Product.findByPk(item.productId);
        total += product.price * item.quantity;
      }

      return total;
    },
  },

  OrderItem: {
    product: async (item, _, { models }) => {
      return await models.Product.findByPk(item.productId);
    },
  },
};

export default resolvers;
