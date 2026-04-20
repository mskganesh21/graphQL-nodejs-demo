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

    orders: async (_, args, { models }) => {
      return await models.Order.findAll({
        include: [
          {
            model: models.User,
            as: "user",
          },
          {
            model: models.OrderItem,
            as: "items",
            include: [
              {
                model: models.Product,
                as: "product",
              },
            ],
          },
        ],
      });
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
    user: (order) => order.user,
    items: (order) => order.items,
    total: (order) =>
      order.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0,
      ),
  },

  OrderItem: {
    product: async (item, _, { models }) => {
      return await models.Product.findByPk(item.productId);
    },
  },
};

export default resolvers;
