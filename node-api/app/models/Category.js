const { Schema, default: mongoose } = require("mongoose");

const CategorySchema = new Schema(
  {
    name: { type: String, require: true },
    parentId: { type: Schema.Types.ObjectId, ref: "Category", default: null },
    // subcategories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

CategorySchema.virtual("subcategories", {
  ref: "Category",
  localField: "_id",
  foreignField: "parentId",
});

CategorySchema.pre("save", async function (next) {
  if (this.parentId) {
    const parent = await this.model("Category").findById(this.parentId);
    parent.subcategories.push(this._id);
    await parent.save();
  }
  next();
});

module.exports = mongoose.model("Category", CategorySchema);
