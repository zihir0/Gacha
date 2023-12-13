import Item from "../models/Items.js";

/* READ */
export const getItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findById(id);
    res.status(200).json(item);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);

    if (item) {
      const { name, description, rarity, type, image, droprate } = req.body;

      // Prepare the updated fields
      const updatedFields = {
        name,
        description,
        rarity,
        type,
        image,
        droprate,
      };

      const updatedItem = await Item.findByIdAndUpdate(
        id,
        { $set: updatedFields },
        { new: true }
      );

      if (!updatedItem) {
        return res.status(404).json({ message: "Item not found" });
      } else {
        res.status(200).json(updatedItem);
      }
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findByIdAndDelete(id);
    res.status(200).json(item);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const addItem = async (req, res) => {
  try {
    const { name, description, rarity, type, image, droprate } = req.body;

    const newItem = new Item({
      name,
      description,
      rarity,
      type,
      image,
      droprate,
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
