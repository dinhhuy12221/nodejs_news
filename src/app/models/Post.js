const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Post = new Schema(
    {
        name: { type: String, default: '', required: true },
        description: { type: String, default: '' },
        image: { type: String, maxLength: 255 },
        videoID: { type: String, required: true },
        level: { type: String },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    },
);

// Course.pre("save", function (next) {
//   this.slug = this.name.split(" ").join("-");
//   next();
// });

Post.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Post', Post);
