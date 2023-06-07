import UsersModel from "./UsersModel.js";
import { updateSubscribersSchema } from "./usersValidationSchema.js";

export const getUsers = async (req, res) => {
   try {
      if (req.query.ids) {
         const ids = req.query.ids;
         const idsArray = ids.split(",");
         const users = await UsersModel.find({ _id: { $in: idsArray } });
         res.json({ status: "success", data: users });
      } else if (req.query.recommend) {
         const ids = req.query.recommend;
         const idsArray = ids.split(",");
         const users = await UsersModel.find({ _id: { $nin: idsArray } }).limit(5);
         res.json({ status: "success", data: users });
      } else {
         const users = await UsersModel.find();
         res.json({ status: "success", data: users });
      }
   } catch (err) {
      res.status(400).json({ status: "error", message: err.message });
   }
};

export const getUser = async (req, res) => {
   try {
      const userId = req.params.id;

      const user = await UsersModel.findById(userId);

      if (!user) {
         return res.status(404).json({ error: "User not found" });
      }

      res.json(user);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
   }
};

export const addUser = async (req, res) => {
   try {
      const { name, subscriptions } = req.body;
      const icon = req.file.buffer;
      const user = await new UsersModel({
         name,
         icon,
         subscriptions,
      }).save();
      res.json({ status: "success", data: user });
   } catch (err) {
      res.status(400).json({ status: "error", message: err.message });
   }
};

export const editUserSubscribers = async (req, res) => {
   const userId = req.params.id;
   const { subscriptions } = req.body;
   try {
      const { error } = updateSubscribersSchema.validate({ subscriptions });

      if (error) {
         return res.status(400).json({ message: error.details[0].message });
      }

      const user = await UsersModel.findByIdAndUpdate(userId, { subscriptions }, { new: true });

      if (!user) {
         return res.status(404).json({ message: "User not found" });
      }

      return res.json({ status: "success", data: user });
   } catch (err) {
      console.error(err);
      res.status(500).json({ status: "error", message: err.message });
   }
};
